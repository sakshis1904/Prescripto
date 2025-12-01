import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { doctors as mockDoctors } from "../assets/assets";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = async () => {
    // If no BACKEND URL is configured, fall back to local mock data
    if (!backendUrl) {
      // keep behavior deterministic and helpful for local dev
      setDoctors(mockDoctors);
      return;
    }

    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");
      if (data && data.success && Array.isArray(data.doctors)) {
        setDoctors(data.doctors);
      } else {
        // fallback to mock data so UI still shows useful content
        setDoctors(mockDoctors);
        if (data && data.message) toast.error(data.message);
      }
    } catch (error) {
      // if backend is unreachable or the request fails, load mock doctors
      console.error("getDoctorsData error:", error);
      setDoctors(mockDoctors);
      toast.error("Unable to reach backend — showing sample doctors.");
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
