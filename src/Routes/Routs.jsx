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
import Users from "../Components/Dashboard/Users/Users";
import AllRequest from "../Components/Dashboard/AllRequest/AllRequest";
import Profile from "../Components/Dashboard/Profile/Profile";
import DonationRequests from "../Pages/DonationRequests/DonationRequestsPage";
import Funding from "../Pages/Funding/Funding";
import DonationRequestDetails from "../Components/DonationRequests/DonationRequestDetails";
import SearchDonor from "../Components/Banner/SearchDonor";
import UpdateRequest from "../Components/Dashboard/MyDonationRequest/UpdateRequest";
import PaymentSuccess from "../Pages/Funding/PaymentSuccess";
import PaymentCancelled from "../Pages/Funding/PaymentCancelled";
import PaymentHistory from "../Components/Dashboard/PaymentHistory";

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
      {
        path: "donation-requests",
        element: <DonationRequests></DonationRequests>,
      },
      {
        path: "donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails></DonationRequestDetails>
          </PrivateRoute>
        ),
      },

      {
        path: "funding",
        element: <Funding></Funding>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: "search-donor",
        element: <SearchDonor></SearchDonor>,
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
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "/dashboard/all-users",
        element: <Users></Users>,
      },
      {
        path: "/dashboard/all-blood-donation-request",
        element: <AllRequest></AllRequest>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/update/request/:id",
        element: <UpdateRequest></UpdateRequest>,
      },
    ],
  },
]);

export default router;
