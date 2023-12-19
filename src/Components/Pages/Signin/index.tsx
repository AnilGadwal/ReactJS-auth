import React, { useEffect, useState } from "react";
import BackgrondImage from "../../Atoms/BackgroundImage";
import OrLine from "../../Atoms/OrLine";
import InputField from "../../Atoms/InputField";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../../Atoms/ErrorMessage";
import { useAuth } from "../../../Contexts/authContext";
import { getUserStatus } from "../../../utils";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  const { setToken} = useAuth();
  const urlParams = new URLSearchParams(window.location.search);
  const registered = urlParams.get('registered');

  useEffect(() => {
    if(getUserStatus()){
     navigate('/')
    }
  }, [navigate])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearInputFields = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const server_url = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = formData;
    try {
      const requestBody = {
        email,
        password,
      };

      const response = await fetch(`${server_url}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorResponseData = await response.json();
        setError(errorResponseData.message);
        throw new Error(errorResponseData.message || "Something went wrong");
      }

      const data = await response.json();

      if (response.ok) {
        clearInputFields();
        setToken(data.token)
        navigate('/')
      }
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="grid-container">
      <BackgrondImage imageName={"image3"} />
      <div className="form-section">
      {registered ? <span className="registration-sucess">Hurray 🥳, Registered sucessfully, now please login with the same credentials...</span> : null}
        <span className="form-heading">Sign In 👋</span>
        <form
          onSubmit={handleSubmit}
          className="form-container"
          autoComplete="off"
        >
          <InputField
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            label="Email"
          />
          <InputField
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            label="Password"
          />
          {error ? <ErrorMessage text={error} /> : null}
          <button className="primary-btn" type="submit">
            Sign In
          </button>
        </form>
        <OrLine />
        <Link to="/signup">
          <button className="primary-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default Signin;
