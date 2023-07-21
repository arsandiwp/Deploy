import { Container, Modal, Row, Col } from "react-bootstrap";
import Qr from "../assets/img/qr.png";
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
        <div className="my-5">
          <h1>INVOICE</h1>
          <p>Kode Invoice: INV0101</p>
        </div>

        <Row className="">
          <Col md={5}>
            <h3 className="fw-bold">Kereta Api</h3>
          </Col>
          <Col md={5}>
            <img src={Qr} className="" alt="Qr" />
            <p className="">TCK0101</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <h3 className="fw-bold">{transaction?.ticket.name_train}</h3>
            <p>{transaction?.ticket.type_train}</p>
          </Col>
        </Row>

        <Row className=" ms-2">
          <Col md={4}>
            <h4 className="fw-bold">{transaction?.ticket.start_time}</h4>
            <p>{transaction?.ticket.start_date}</p>
          </Col>
          <Col md={4}>
            <h4 className="fw-bold">{transaction?.ticket.start_station.name}</h4>
            <p>Station {transaction?.ticket.start_station.name}</p>
          </Col>
        </Row>

        <Row className="ms-2">
          <Col md={4}>
            <h4 className="fw-bold">{transaction?.ticket.arival_time}</h4>
            <p>{transaction?.ticket.start_date}</p>
          </Col>
          <Col md={4}>
            <h4 className="fw-bold">{transaction?.ticket.destination_station.name}</h4>
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
