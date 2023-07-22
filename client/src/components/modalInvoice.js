import { Container, Modal, Row, Col } from "react-bootstrap";
import Qr from "../assets/img/qr-code.png";
import Train from "../assets/img/myticket.png";

import { API } from "../config/api";
import { useQuery } from "react-query";

function ModalInvoice({ show, showInvoice, id }) {
  const handleClose = () => showInvoice(false);
  console.log("ini id ayanggg", id);

  let { data: transaction } = useQuery(["transaction", id], async () => {
    const response = await API.get(`/transactions/${id}`);
    return response.data.data;
  });

  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Row>
        <Col>
          <img
            src={Train}
            className="d-inline-block align-top ps-3 pe-5 bg-danger bg-gradient"
            alt="Brand"
            style={{ borderEndEndRadius: 50 }}
          />
        </Col>
      </Row>

      <Container className="rounded">
        <div className="my-4">
          <h1>INVOICE</h1>
          <p>Kode Invoice: INV0101</p>
        </div>

        <Row className="">
          <Col>
            <h3 className="fw-bold">Kereta Api</h3>
            <p>{transaction?.ticket.start_date}</p>
          </Col>
          <Col md={5} className="text-center">
            <img src={Qr} className="" alt="Qr" />
            <p>TCK0101</p>
          </Col>
        </Row>

        <Row className="" style={{ marginTop: "-150px" }}>
          <Col>
            <h3 className="fw-bold">{transaction?.ticket.name_train}</h3>
            <p>{transaction?.ticket.type_train}</p>
          </Col>
        </Row>

        <Row className=" ms-2">
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

        <Row className="ms-2">
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
            <p>{transaction?.user.no_hp}</p>
          </Col>
        </Row>

        <Row className="bg-body-secondary py-2 border-top border-secondary">
          <Col md={9}>
            <h4 className="fw-bold">Total</h4>
          </Col>
          <Col>
            <h4 className="fw-bold text-danger">Rp.250.000</h4>
          </Col>
        </Row>
      </Container>
    </Modal>
  );
}

export default ModalInvoice;
