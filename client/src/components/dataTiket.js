import { Col, Container, Row } from "react-bootstrap";
import Arrow from "../assets/img/Arrow.png";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import Login from "../pages/login";
import Daftar from "../pages/daftar";
import ModalData from "./modalData";

import { useQuery } from "react-query";
import { API, setAuthToken, getApi } from "../config/api";



function DataTiket({startStation, destinationStation, search}) {

  setAuthToken(localStorage.token);


  let { data: ticket, refetch } = 
  useQuery("ticketsHomeCache", async () => {
    const response = search? (await API.get(`/ticket?start_station_id=${startStation}&destination_station_id=${destinationStation}`))
    : (await API.get("/tickets"))
    console.log("ini respon", response)
    return response.data.data
  });

 getApi()

  console.log("ini ticket", ticket)


  const handleBuy = async (id) => {
    try {
      const formData = new FormData()
      formData.set("ticket_id", id)
      const response = await API.post("/transaction", formData);
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);

  const [showLogin, setShowLogin] = useState(false);
  const [showDaftar, setShowDaftar] = useState(false);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    refetch();
  }, [search]);

  return (
    <Container className="text-center mt-3">

      {ticket?.map((data, index) => (
        <Row
          className="border pt-2 mb-4"
          style={{ cursor: "pointer" }}
          key={index}
          onClick={() => {
            !state.isLogin ? setShowLogin(true) : setShowData(true);
            handleBuy(data.id);
          }}
        >
          <Col className="">
            <p className="fw-bold">{data.name_train}</p>
            <p>{data.type_train}</p>
          </Col>
          <Col className="">
            <p className="fw-bold">{data.start_time}</p>
            <p>{data.start_station.name}</p>
          </Col>
          <Col className="">
            <img src={Arrow} width="" height="" className="mt-4" alt="arrow" />
          </Col>
          <Col className="">
            <p className="fw-bold">{data.arival_time}</p>
            <p>{data.destination_station.name}</p>
          </Col>
          <Col className="">
            <p className="fw-bold">{parseInt(data.arival_time) - parseInt(data.start_time)} Jam</p>
          </Col>
          <Col md={4} className="">
            <p className="fw-bold text-danger">Rp. {data.price}</p>
          </Col>
        </Row>
      ))}
      ;
      <Login
        show={showLogin}
        showLogin={setShowLogin}
        showDaftar={setShowDaftar}
      />
      <Daftar show={showDaftar} showDaftar={setShowDaftar} />
      <ModalData show={showData} showData={setShowData} />
    </Container>
  );
}

export default DataTiket;
