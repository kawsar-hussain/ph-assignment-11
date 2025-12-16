import { createBrowserRouter } from "react-router";
import RedirectIfAuthenticated from "../Components/Authentication/RedirectIfAuthenticated";
import Login from "../Components/Authentication/Login/Login";
import Register from "../Components/Authentication/Register/Register";
import Error404 from "../Error/Error404";
import Home from "../Pages/Home";
import Root from "../Pages/Root";
import PrivateRoute from "../Provider/PrivateRoute";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardMain from "../Components/Dashboard/DashboardMain";
import CreateDonationRequest from "../Components/Dashboard/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequest from "../Components/Dashboard/MyDonationRequest/MyDonationRequest";

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
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardMain></DashboardMain>,
      },
      {
        path: "/dashboard/create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "/dashboard/my-donation-requests",
        element: <MyDonationRequest></MyDonationRequest>,
      },
    ],
  },
]);

export default router;
