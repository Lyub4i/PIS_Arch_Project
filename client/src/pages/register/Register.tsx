import React, { useEffect, useState } from "react";
import "./Register.scss";
import Header from "../../components/header/Header";
import { UserService } from "../../services/userService";
import { getRedirectedPage, saveUserId } from "../../services/localStorage";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegisterSubmit = async () => {
    console.log(formData);
    await UserService.register(formData.username, formData.password);
    await handleLoginSubmit();
  };

  const handleLoginSubmit = async () => {
    console.log(formData);
    await UserService.login(formData.username, formData.password);

    window.location.href = getRedirectedPage()!;
  };

  return (
    <div className="registerContent">
      <Header />
      <div className="registerForm">
        <div className="registerText">Register or Login</div>
        <div className="registerInput">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="registerInput">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="registerButtons">
          <div className="registerInput">
            <button onClick={handleRegisterSubmit}>Register</button>
          </div>
          <div className="registerInput right">
            <button onClick={handleLoginSubmit}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
