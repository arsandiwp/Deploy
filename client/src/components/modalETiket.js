import { Container, Modal, Row, Col } from "react-bootstrap";
import Train from "../assets/img/myticket.png";
import Pass from "../assets/img/pass.png";
import Clock from "../assets/img/clock.png";
import Warning from "../assets/img/warning.png";
import Code from "../assets/img/qr-code.png";

import { API } from "../config/api";
import { useQuery } from "react-query";

function ModalETiket({ show, showETiket, id }) {
  const handleClose = () => showETiket(false);

  let { data: transaction } = useQuery(["TicketCache", id], async () => {
    const response = await API.get(`/transactions/${id}`);
    return response.data.data;
  });

  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Container className="p-4">
        <Row className="mt-3">
          <Col>
            <div className="">
              <h1>E-Ticket</h1>
              <p>Kode Invoice: INV0101</p>
            </div>
          </Col>
          <Col className="p-0">
            <img
              src={Train}
              className="d-inline-block align-top ps-5 pe-3 bg-danger bg-gradient"
              alt="Brand"
              style={{ borderEndStartRadius: 50, marginLeft: "250px" }}
            />
          </Col>
        </Row>

        <Row className="">
          <Col>
            <h3 className="fw-bold">Kereta Api</h3>
            <p>{transaction?.ticket.start_date}</p>
          </Col>
        </Row>

        <Row className="">
          <Col>
            <h3 className="fw-bold">{transaction?.ticket.name_train}</h3>
            <p>{transaction?.ticket.type_train}</p>
          </Col>
          <Col md={4} className="text-center" style={{ marginTop: "-60px" }}>
            <img src={Code} alt="qr-code" />
            <p>TCK0101</p>
          </Col>
        </Row>

        <Row className="" style={{ marginTop: "-100px" }}>
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
          <Col>
            <h4 className="fw-bold">{transaction?.ticket.start_time}</h4>
            <p>{transaction?.ticket.start_date}</p>
          </Col>
          <Col md={9}>
            <h4 className="fw-bold">
              {transaction?.ticket.start_station.name}
            </h4>
            <p>Station {transaction?.ticket.start_station.name}</p>
          </Col>
        </Row>

        <Row className="">
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
            <h4 className="fw-bold">{transaction?.ticket.arival_time}</h4>
            <p>{transaction?.ticket.start_date}</p>
          </Col>
          <Col md={9}>
            <h4 className="fw-bold">
              {transaction?.ticket.destination_station.name}
            </h4>
            <p>Station {transaction?.ticket.destination_station.name}</p>
          </Col>
        </Row>

        <Row className="border-top border-secondary pt-4">
          <Col md={1}>
            <img src={Pass} className="" alt="Pass" />
          </Col>
          <Col md={3}>
            <p>Tunjukkan e-ticket dan identitas para penumpang saat checkin</p>
          </Col>
          <Col md={1}>
            <img src={Clock} className="" alt="clock" />
          </Col>
          <Col>
            <p>
              Check-in <span className="fw-bold">paling lambat 90 menit</span>{" "}
              sebelum keberangkatan
            </p>
          </Col>
          <Col md={1}>
            <img src={Warning} className="" alt="warning" />
          </Col>
          <Col>
            <p>Waktu tertera adalah waktu stasiunsetempat</p>
          </Col>
        </Row>

        <Row className="fw-bold text-center border-top border-secondary pt-3">
          <Col>
            <p>No. Tanda Pengenal</p>
          </Col>
          <Col>
            <p>Nama Pemesan</p>
          </Col>
          <Col>
            <p>No. Handphone</p>
          </Col>
          <Col>
            <p>Email</p>
          </Col>
        </Row>

        <Row className="text-center">
          <Col>
            <p>673601012200538</p>
          </Col>
          <Col>
            <p>{transaction?.user.fullName}</p>
          </Col>
          <Col>
            <p>{transaction?.user.no_hp}</p>
          </Col>
          <Col>
            <p>{transaction?.user.email}</p>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}

export default ModalETiket;
