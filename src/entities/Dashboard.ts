export interface DashboardAccount {
  username: string;
  password: string;
}

export interface DashboardConfig {
  baseURL: string;
  baseURLProx: string;
  account: DashboardAccount;
}
