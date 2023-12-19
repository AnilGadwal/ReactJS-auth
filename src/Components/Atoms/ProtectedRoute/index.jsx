import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../../Contexts/authContext";
import { useEffect, useState } from "react";
import { logout, toggleUserLoggedIn } from "../../../utils";

const ProtectedRoute = () => {
  const { token, setToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const server_url = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await fetch(`${server_url}/auth/refreshToken`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setToken(data.token);
          toggleUserLoggedIn('true')
        } else {
          toggleUserLoggedIn('false')
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        console.error("Error refreshing token:", error);
        setToken("");
        logout(process.env.REACT_APP_API_BASE_URL);
      } finally {
        setIsLoading(false);
      }
    };
    refreshToken();
  }, [setToken, server_url]);

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="loader" />
      </div>
    );
  }

  return token ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
