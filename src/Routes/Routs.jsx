import { createBrowserRouter } from "react-router";
import RedirectIfAuthenticated from "../Components/Authentication/RedirectIfAuthenticated";
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";
import Error404 from "../Error/Error404";
import Home from "../Pages/Home";
import Root from "../Pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },

      {
        path: "login",
        element: (
          <RedirectIfAuthenticated>
            <Login></Login>
          </RedirectIfAuthenticated>
        ),
      },
      {
        path: "register",
        element: (
          <RedirectIfAuthenticated>
            <Register></Register>
          </RedirectIfAuthenticated>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Error404></Error404>,
  },
]);

export default router;
