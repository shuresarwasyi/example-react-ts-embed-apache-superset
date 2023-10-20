import { Helmet } from "react-helmet-async";

import Dashboard from "../../components/dashboard/Dashboard";

const dashboardID = "e3cc1942-ed4d-4e2d-992d-011c8b3d8430";

/**
 * Home component representing the home page.
 * @returns {React.JSX.Element} The rendered home page component.
 */
const DashboardPage = (): React.JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Dashboard Page | Vite Modular App</title>
      </Helmet>
      <Dashboard dashboardID={dashboardID} />
    </>
  );
};

export default DashboardPage;
