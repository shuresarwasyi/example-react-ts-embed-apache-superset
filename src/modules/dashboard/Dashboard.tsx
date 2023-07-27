import { Helmet } from "react-helmet-async";
// import { Link } from "react-router-dom";

import Dashboard from "../../components/dashboard/Dashboard";

const dashboardID: string = "13cd005c-bcb5-4295-84ef-08deca900263";
// const dashboardID: string = "cfaf34d4-52cf-4e9e-a692-59b38c416f9a";
// const dashboardID: string = "a0495ee3-d16b-499a-9251-30553bcb2532";

/**
 * Home component representing the home page.
 * @returns {React.JSX.Element} The rendered home page component.
 */
const DashboardPage = (): React.JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Home Page | Vite Modular App</title>
      </Helmet>
      <Dashboard dashboardID={dashboardID} />
    </>
  );
};

export default DashboardPage;
