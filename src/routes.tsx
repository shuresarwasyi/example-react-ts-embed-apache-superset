import { createBrowserRouter } from "react-router-dom";

import MainLayout from "./layouts/main-layout/MainLayout";
import DashboardPage from "./modules/dashboard/Dashboard";

// Create the routes configuration using createBrowserRouter
const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
    ],
  },
]);

export default routes;
