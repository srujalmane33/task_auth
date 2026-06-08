import { useState } from "react";
import { loginUser } from "../services/authSerices.js";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

    const handleChange = (e) => {
      
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await loginUser(formData);

    localStorage.setItem("token", res.data.token);

    alert("Login Successful");

    navigate("/dashboard");
  } catch (error) {
    alert(error.response?.data?.message || "Login Failed");
  }
};
    
    
    const handleGoogleSuccess = async (credentialResponse) => {
  try {
    const res = await axios.post(
      "http://localhost:3000/api/auth/google",
      {
        credential: credentialResponse.credential,
      }
    );

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button type="submit">
        <GoogleLogin
  onSuccess={handleGoogleSuccess}
  onError={() => console.log("Login Failed")}
/>
        </button>
      </form>
    </div>
  );
}

export default Login;