import { Navigate,useNavigate } from "react-router-dom";
import { useEffect } from "react";



function Dashboard() {
      
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    navigate("/login");

  };
    const token = localStorage.getItem("token");

  if (!token) {

    return <Navigate to="/login" replace />;

  }

    return (
      <div>
        <h1>Dashboard</h1>

        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }


export default Dashboard;
