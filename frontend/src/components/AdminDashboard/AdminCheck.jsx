import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminCheck = ({ element: Element }) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/userRole")
      .then((response) => {
        if (response.data.role === "admin") {
          setIsAdmin(true);
        } else {
          navigate("/");
        }
        setLoading(false);
      })
      .catch(() => {
        navigate("/");
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAdmin ? <Element /> : null;
};

export default AdminCheck;
