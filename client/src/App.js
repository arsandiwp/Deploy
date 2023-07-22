import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/home";
import Tiketsaya from "./components/tiketSaya";
import { Route, Routes } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import Header from "./components/header";
import Invoice from "./components/invoice";
import TambahTiket from "./components/tambahTiket";
import ListTransaksi from "./pages/listTransaksi";
import PrivatRoute from "./privateroute/privatroute";
import { API, setAuthToken } from "./config/api";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import TambahStation from "./components/tambahStation";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
    // eslint-disable-next-line
  }, [isLoading]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check");
      console.log("check user success : ", response);
      // get user data
      let payload = response.data.data;
      // get token from local storage
      payload.token = localStorage.token;
      // send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed : ", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   // const json = JSON.stringify(token);
  //   // setAuthToken(localStorage.getItem("token"))
  //   window.localStorage.setItem("token", token);
  // }, [token]);


  return (
    <>
      <Header />
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/tiketsaya" element={<Tiketsaya />}></Route>
          <Route path="/invoice/:id" element={<Invoice />}></Route>
          <Route exact path="/" element={<PrivatRoute />}>
            <Route path="/listtransaksi" element={<ListTransaksi />}></Route>
            <Route path="/tambahtiket" element={<TambahTiket />}></Route>
            <Route path="/tambahstation" element={<TambahStation />}></Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
