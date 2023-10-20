import "./Dashboard.scss";

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useEffect, useRef, useState } from "react";

import { embedDashboard } from "@superset-ui/embedded-sdk";

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

const getAccessToken = async (api: AxiosInstance): Promise<string> => {
  const configRequestAccessToken: AxiosRequestConfig = {
    method: "post",
    url: "/api/v1/security/login",
    data: {
      username: dashboardConfig.account.username,
      password: dashboardConfig.account.password,
      provider: "db",
      refresh: false,
    },
  };

  const responseAccessToken: AxiosResponse = await api.request(
    configRequestAccessToken
  );

  return responseAccessToken.data.access_token;
};

const getGuestToken = async (
  api: AxiosInstance,
  accessToken: string,
  dashboardID: string
): Promise<string> => {
  const configRequestGuestToken: AxiosRequestConfig = {
    method: "POST",
    url: "api/v1/security/guest_token",
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
          const accessToken = await getAccessToken(api);
          const guestToken = await getGuestToken(api, accessToken, dashboardID);

          setGuestToken(guestToken);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching guest token:", err);
        setLoading(false);
      }
    };

    fetchTokens();
  });

  return { guestToken, loading };
};

const Dashboard: React.FC<DashboardProps> = ({ dashboardID }) => {
  const { guestToken, loading } = useGuestToken(dashboardID);

  useEffect(() => {
    if (guestToken) {
      embedDashboard({
        id: dashboardID,
        supersetDomain: dashboardConfig.baseURL,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        mountPoint: document.getElementById("dashboardEl")!,
        fetchGuestToken: async () => guestToken,
        dashboardUiConfig: {
          hideTitle: true,
        },
      });
    }
  }, [dashboardID, guestToken]);

  return (
    <div id="dashboardEl" className="dash-container">
      {loading && (
        <span>Chill out for a sec! We're hustling to bring it to you.</span>
      )}
    </div>
  );
};

export default Dashboard;
