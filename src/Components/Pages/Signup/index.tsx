import React, { useEffect, useState } from "react";
import BackgrondImage from "../../Atoms/BackgroundImage";
import OrLine from "../../Atoms/OrLine";
import InputField from "../../Atoms/InputField";
import { Link, useNavigate } from "react-router-dom";
import { getUserStatus, isPasswordValid } from "../../../utils";
import ErrorMessage from "../../Atoms/ErrorMessage";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [passwordValidated, setPasswordValidated] = useState<boolean>(false);
  const [error, setError] = useState<string>()
  const navigate = useNavigate()

  useEffect(() => {
    if(getUserStatus()){
     navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    const passwordValid = isPasswordValid(formData.password)
    setPasswordValidated(passwordValid)
  }, [formData.password]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const clearInputFields = () =>{
    setFormData({
      name: "",
      email: "",
      password: "",
    });
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {name, email, password} = formData
    const server_url = process.env.REACT_APP_API_BASE_URL
    try {
      const requestBody = {
        name,
        email,
        password
      };
    
      const response = await fetch(`${server_url}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
    
      if (!response.ok) {
        const errorResponseData = await response.json();
        setError(errorResponseData.message)
        throw new Error(errorResponseData.message || 'Something went wrong');
      }

      const data = await response.json();
      console.log(data.message)

      if (response.ok) {
        clearInputFields();
        navigate("/signin?registered=true");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="grid-container">
      <BackgrondImage imageName={"image4"} />
      <div className="form-section">
        <span className="form-heading">Sign Up 🚀</span>
        <form
          onSubmit={handleSubmit}
          className="form-container"
          autoComplete="off"
        >
          <InputField
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            label="Name"
          />
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
            page="registration"
          />
          {error ? <ErrorMessage text={error} /> : null}
          <button className="primary-btn" type="submit" disabled={!passwordValidated}>
            Sign Up
          </button>
        </form>
        <OrLine />
        <Link to="/signin">
          <button className="primary-btn">Sign In</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
