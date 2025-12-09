import { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import Error404 from "../../Error/Error404";

const RedirectIfAuthenticated = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Error404></Error404>;
  }

  return children;
};

export default RedirectIfAuthenticated;
