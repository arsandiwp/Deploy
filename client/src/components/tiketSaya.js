import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Train from "../assets/img/myticket.png";
import Qr from "../assets/img/qr.png";

import { useQuery } from "react-query";
import { API, setAuthToken } from "../config/api";
import ModalETiket from "./modalETiket";
import { useState } from "react";

function Tiketsaya() {
  setAuthToken(localStorage.token);
  const [showETiket, setShowETiket] = useState(false);
  const [idTransaction, setIdTransaction] = useState();

  let navigate = useNavigate();

  let { data: myTicket } = useQuery("TicketCachee", async () => {
    const response = await API.get("/transaction-user");
    return response.data.data;
  });
  console.log(myTicket);

  const handleBuy = async (id) => {
    try {
      const response = await API.get(`/transactions/${id}`);
      navigate(`/invoice/${id}`);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="">
      <h2 className="my-4">Tiket Saya</h2>
      {myTicket?.map((data, index) => (
        <div
          className="mx-auto shadow bg-body rounded p-3 mb-5"
          style={{ width: "90%" }}
        >
          <Row className="" key={index}>
            <Col md={4} className="p-0">
              <img
                src={Train}
                className="d-inline-block align-top ps-3 pe-5 bg-danger bg-gradient"
                alt="Brand"
                style={{ borderEndEndRadius: 50, marginTop: "-14px" }}
              />
            </Col>
            <Col md={{ span: 4, offset: 4 }} className="text-end">
              <h3>Kereta Api</h3>
            </Col>
          </Row>

          <Row className="mt-4" style={{ marginTop: "" }}>
            <Col md={3}>
              <h4>{data.ticket.name_train}</h4>
              <p>{data.ticket.type_train}</p>
            </Col>
            <Col md={1}>
              <div
                style={{
                  marginTop: "20px",
                  borderColor: "pink",
                  borderRadius: "100%",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  width: "1rem",
                  height: "1rem",
                }}
              ></div>
              <div
                style={{
                  borderColor: "#D0D0D0",
                  borderStyle: "solid",
                  borderWidth: "0 2px 0 0",
                  height: "4rem",
                  width: "2px",
                  margin: "3px 0 3px 7px",
                }}
              ></div>
            </Col>
            <Col md={3}>
              <h5>{data.ticket.start_time}</h5>
              <p className="text-secondary">{data.ticket.start_date}</p>
            </Col>
            <Col md={3}>
              <h5>{data.ticket.start_station.kota}</h5>
              <p className="text-secondary">
                Station {data.ticket.start_station.name}
              </p>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={3} className="">
              {data.status === "Pending" && (
                <div
                  className="bg-danger text-center rounded text-light"
                  style={{ width: "80px" }}
                >
                  <p className="">{data.status}</p>
                </div>
              )}
              {data.status === "success" && (
                <div
                  className="bg-success text-center rounded text-light"
                  style={{ width: "80px" }}
                >
                  <p className="">{data.status}</p>
                </div>
              )}
            </Col>
            <Col md={1}>
              <div
                style={{
                  borderColor: "pink",
                  borderRadius: "50%",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  width: "1rem",
                  height: "1rem",
                  background: "pink",
                }}
              ></div>
            </Col>
            <Col>
              <h5>{data.ticket.arival_time}</h5>
              <p className="text-secondary">{data.ticket.start_date}</p>
            </Col>
            <Col md={3}>
              <h5>{data.ticket.destination_station.kota}</h5>
              <p className="text-secondary">
                Station {data.ticket.destination_station.name}
              </p>
            </Col>
            {data.status === "Pending" && (
              <Col md={2} style={{ marginTop: "-50px" }}></Col>
            )}
            {data.status === "success" && (
              <Col md={2} style={{ marginTop: "-50px" }}>
                <img src={Qr} alt="Qr Code" />
                <p>TCK0101</p>
              </Col>
            )}
          </Row>

          <Row>
            <Col>
              <p>No. Tanda Pengenal</p>
            </Col>
            <Col>
              <p>Nama Pemesanan</p>
            </Col>
            <Col>
              <p>No Handphone</p>
            </Col>
            <Col>
              <p>Email</p>
            </Col>
            <Col></Col>
            <hr className="" style={{ width: "80%", marginTop: "-10px" }}></hr>
          </Row>

          <Row className="text-secondary" style={{ marginTop: "-10px" }}>
            <Col>
              <p>673601012200538</p>
            </Col>
            <Col>
              <p>{data.user.fullName}</p>
            </Col>
            <Col>
              <p>{data.user.no_hp}</p>
            </Col>
            <Col>
              <p>{data.user.email}</p>
            </Col>
            <Col>
              {data.status === "Pending" && (
                <Button
                  variant="danger"
                  type="submit"
                  className="bg-gradient w-100"
                  onClick={() => handleBuy(data.id)}
                >
                  Bayar Sekarang
                </Button>
              )}
              {data.status === "success" && (
                <Button
                  variant="success"
                  className="w-100"
                  onClick={() => {
                    setShowETiket(true);
                    setIdTransaction(data.id);
                  }}
                >
                  Sudah Bayar
                </Button>
              )}
            </Col>
          </Row>
        </div>
      ))}
      ;
      <ModalETiket
        show={showETiket}
        id={idTransaction}
        showETiket={setShowETiket}
      />
    </Container>
  );
}

export default Tiketsaya;
