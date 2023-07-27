import "./Dashboard.scss";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";

import { embedDashboard } from "@superset-ui/embedded-sdk";
import { DashboardAccount } from "../../entities/Dashboard";
import dashboardConfig from "../../config/dashboard";

interface DashboardProps {
  dashboardID: string;
}

const createAPIInstance = (): AxiosInstance => {
  return axios.create({
    baseURL: dashboardConfig.baseURLProx,
    withCredentials: true,
  });
};

const getAccessToken = async (
  api: AxiosInstance,
  account: DashboardAccount
): Promise<string> => {
  const configRequestAccessToken: AxiosRequestConfig = {
    method: "post",
    url: "/api/v1/security/login",
    data: {
      username: account.username,
      password: account.password,
      provider: "db",
      refresh: false,
    },
  };

  const responseAccessToken: AxiosResponse = await api.request(
    configRequestAccessToken
  );

  return responseAccessToken.data.access_token;
};

const getCSRFToken = async (
  api: AxiosInstance,
  accessToken: string
): Promise<string> => {
  const configRequestCSRFToken: AxiosRequestConfig = {
    method: "GET",
    url: "api/v1/security/csrf_token",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  const responseCSRFToken: AxiosResponse = await api.request(
    configRequestCSRFToken
  );

  return responseCSRFToken.data.result;
};

const getGuestToken = async (
  api: AxiosInstance,
  accessToken: string,
  csrfToken: string,
  dashboardID: string
): Promise<string> => {
  const configRequestGuestToken: AxiosRequestConfig = {
    method: "POST",
    url: "api/v1/security/guest_token",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-CSRF-Token": csrfToken,
    },
    data: {
      user: {
        username: dashboardConfig.account.username,
      },
      resources: [
        {
          type: "dashboard",
          id: dashboardID,
        },
      ],
      rls: [],
    },
  };

  const responseGuestToken: AxiosResponse = await api.request(
    configRequestGuestToken
  );

  return responseGuestToken.data.token;
};

const useGuestToken = (dashboardID: DashboardProps["dashboardID"]) => {
  const [loading, setLoading] = useState(true);
  const [guestToken, setGuestToken] = useState<string | null>(null);
  const isFetched = useRef(false); // Track if tokens have been fetched

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        if (!isFetched.current) {
          isFetched.current = true;
          const api = createAPIInstance();
          const accessToken = await getAccessToken(
            api,
            dashboardConfig.account
          );
          const csrfToken = await getCSRFToken(api, accessToken);
          const guestToken = await getGuestToken(
            api,
            accessToken,
            csrfToken,
            dashboardID
          );

          setGuestToken(guestToken);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching guest token:", err);
        setLoading(false);
      }
    };

    fetchTokens();
  }, [dashboardConfig.account]);

  return { guestToken, loading };
};

const Dashboard: React.FC<DashboardProps> = ({ dashboardID }) => {
  const { guestToken, loading } = useGuestToken(dashboardID);

  useEffect(() => {
    if (guestToken) {
      embedDashboard({
        id: dashboardID,
        supersetDomain: dashboardConfig.baseURL,
        mountPoint: document.getElementById("dashboardEl")!,
        fetchGuestToken: async () => guestToken,
        dashboardUiConfig: {
          hideTitle: false,
        },
      });
    }
  }, [guestToken]);

  return (
    <div id="dashboardEl" className="dash-container">
      {loading && (
        <span>Chill out for a sec! We're hustling to bring it to you.</span>
      )}
    </div>
  );
};

export default Dashboard;
