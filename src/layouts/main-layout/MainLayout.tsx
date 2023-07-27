import { Outlet } from "react-router-dom";

/**
 * Main layout component representing the main layout of the application.
 * It renders the child components defined in the routes.
 * @returns {React.JSX.Element} The rendered main layout component.
 */
const MainLayout = (): React.JSX.Element => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainLayout;
