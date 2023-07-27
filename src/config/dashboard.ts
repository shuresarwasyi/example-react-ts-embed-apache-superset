import { DashboardConfig } from "../entities/Dashboard";

const dashboardConfig: DashboardConfig = {
  baseURL: import.meta.env.VITE_SUPERSET_BASE_URL,
  baseURLProx: import.meta.env.VITE_SUPERSET_BASE_URL_PROX,
  account: {
    username: import.meta.env.VITE_SUPERSET_ACCOUNT_USERNAME,
    password: import.meta.env.VITE_SUPERSET_ACCOUNT_PASSWORD,
  },
};

export default dashboardConfig;
