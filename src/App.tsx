import "./index.css";

import { RouterProvider } from "react-router-dom";

import routes from "./routes.tsx";

/**
 * The main application component.
 * @returns {JSX.Element} The root component of the application.
 */
const App = (): JSX.Element => {
  return (
    <>
      <RouterProvider router={routes} fallbackElement={<>Loading...</>} />
    </>
  );
};

export default App;
