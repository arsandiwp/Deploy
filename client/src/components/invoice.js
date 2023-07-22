import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import Error from "../assets/img/error.png";
import Qr from "../assets/img/qr.png";
import { useNavigate, useParams } from "react-router-dom";

import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";
import { useEffect } from "react";

function Invoice() {
  let param = useParams();
  let id = parseInt(param.id)

  let navigate = useNavigate();

  let { data: transaction } = useQuery("myTicketCache", async () => {
    const response = await API.get(`/transactions/${id}`);
    return response.data.data;
  });

  const handleBuy = useMutation (async () => {
    try {

      const response = await API.get(`/getpayment/${id}`);
      console.log("ini response", response);
      
      const token = response.data.data.token;
      console.log("ini token", token)

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onError: function (result) {
          console.log(result);
          navigate("/tiketsaya");
        },
        onClose: function () {
          alert("Close popup kawannnn")
        },
      });
    } catch (error) {
      console.log(error)
    }
  })

    useEffect (() => {
    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  return (
    <Container>
      <h2 className="my-4">Invoice</h2>
        <Stack direction="horizontal">
          <div className="">
            {/* Invoice  */}
            <Row
              className="bg-body-secondary border rounded"
              style={{ width: "95%" }}
            >
              <Col md={2} className="mt-2">
                <img src={Error} className="d-block mx-auto mt-3" alt="error" />
              </Col>
              <Col md={10}>
                <p>
                  Silahkan melakukan pembayaran melalui M-Banking, E-Banking dan
                  ATM ke No.rek Yang Tertera.
                </p>
                <p>No.rek : 673601012200538</p>
              </Col>
            </Row>

            <div
              className="mt-4 border p-2 d-block rounded"
              style={{ width: "95%" }}
              
            >
              <Row className="">
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

              <Row className="" style={{ width: "" }}>
                <Col>
                  <p className="text-secondary">673601012200538</p>
                </Col>
                <Col>
                  <p className="text-secondary">{transaction?.user.fullName}</p>
                </Col>
                <Col>
                  <p className="text-secondary">{transaction?.user.no_hp}</p>
                </Col>
                <Col>
                  <p className="text-secondary">{transaction?.user.email}</p>
                </Col>
              </Row>
            </div>
            {/* Invoice */}

            <h2 className="my-4">Rincian Harga</h2>

            <Row className="border py-3" style={{ width: "50%" }}>
              <Col>
                <p>Argo Wilis (Dewasa)x1</p>
              </Col>

              <Col>
                <p>Rp. {transaction?.ticket.price}</p>
              </Col>
            </Row>

            <Row className="border bg-body-secondary" style={{ width: "50%" }}>
              <Col>
                <p>Total</p>
              </Col>
              <Col>
                <p className="fw-bold">Rp. {transaction?.ticket.price}</p>
              </Col>
            </Row>

            <Row className="border mt-3" style={{ width: "50%" }}>
              <Col style={{ padding: "0", margin: "0" }}>
                <Button type="submit" onClick={() => handleBuy.mutate(id)} variant="danger" className="bg-gradient w-100">
                  Bayar Sekarang
                </Button>
              </Col>
            </Row>
          </div>

          <div className="" style={{ width: "35%", marginTop: "-170px" }}>
            <Row className="border bg-body-secondary rounded">
              <Col md={9} className="p-2">
                <h4>Kereta Api</h4>
              </Col>
              <Col>
                <img src={Qr} className="mt-2" alt="Qr Code" />
                <p>INV0101</p>
              </Col>
            </Row>

            <Row className="">
              <Col className="">
                <h4>{transaction?.ticket.name_train}</h4>
                <p>{transaction?.ticket.type_train}</p>
              </Col>
            </Row>

            <Row className="">
              <Col md={5}>
                <h6>{transaction?.ticket.start_time}</h6>
                <p>{transaction?.ticket.start_date}</p>
              </Col>
              <Col>
                <h6>{transaction?.ticket.start_station.kota}</h6>
                <p>Station {transaction?.ticket.start_station.name}</p>
              </Col>
            </Row>

            <Row className="">
              <Col md={5}>
                <h6>{transaction?.ticket.arival_time}</h6>
                <p>{transaction?.ticket.start_date}</p>
              </Col>
              <Col>
                <h6>{transaction?.ticket.destination_station.kota}</h6>
                <p>Station {transaction?.ticket.destination_station.name}</p>
              </Col>
            </Row>
          </div>
          {/* <div className="p-2">Third item</div> */}
        </Stack>
    </Container>
  );
}

export default Invoice;
