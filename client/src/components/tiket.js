import { useContext, useEffect, useState } from "react";
import Train from "../assets/img/train2.png";
import Transfer from "../assets/img/transfer.png";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import DataTiket from "./dataTiket";

function Tiket() {
  const [stations, setStations] = useState([]);
  const [form, setForm] = useState({
    start_station_id: "",
    destination_station_id: "",
  });

  const getStations = async () => {
    try {
      const response = await API.get("/stations");
      setStations(response.data.data.stations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [search, setSearch] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    form.start_station_id == "" && form.destination_station_id == ""
      ? setSearch(false)
      : setSearch(true);
  };

  useEffect(() => {
    getStations();
  }, []);

  return (
    <Container style={{ marginTop: "-40px" }}>
      <Row className="shadow bg-body-tertiary rounded">
        <Col
          className=" bg-body-secondary"
          style={{ padding: "0", margin: "0" }}
        >
          <div className="bg-light mt-3">
            <img src={Train} width="" height="" className="py-2" alt="Icon Train" />{" "}
            Tiket Kerata api
          </div>
        </Col>

        <Col md={9} className="p-3">
          <h5>Tiket Kereta Api</h5>
          <Row>
            <Form.Group as={Col} controlId="asal" className="mt-2">
              <Form.Label>Awal</Form.Label>
              <Form.Select
                className="mb-3"
                value={form.start_station_id}
                name="start_station_id"
                onChange={handleChange}
              >
                <option hidden>Awal Station</option>
                {stations.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Col md={1}>
              <img
                src={Transfer}
                className="bg-danger g-gradient rounded-pill p-2"
                alt="Brand"
                style={{ marginTop: "35px" }}
              />
            </Col>

            <Form.Group as={Col} controlId="tujuan" className="mt-2">
              <Form.Label>Tujuan</Form.Label>
              <Form.Select
                className="mb-3"
                value={form.destination_station_id}
                name="destination_station_id"
                onChange={handleChange}
              >
                <option hidden>Tujuan Station</option>
                {stations.map((item, index) => (
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>

          <Row>
            <Form.Group as={Col} controlId="tglberangkat" className="mt-3">
              <Form.Label>Tanggal Berangkat</Form.Label>
              <Form.Control type="date" disabled/>
            </Form.Group>

            <Form.Group as={Col} controlId="" className="mt-3">
              <Form.Check type="checkbox" label="Pulang Pergi" disabled/>
            </Form.Group>

            <Form.Group as={Col} controlId="dewasa" className="mt-3">
              <Form.Label>Dewasa</Form.Label>
              <Form.Select aria-label="Default select example" disabled>
                <option hidden>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="bayi" className="mt-3">
              <Form.Label>Bayi</Form.Label>
              <Form.Select aria-label="Default select example" disabled>
                <option hidden>0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="" className="mt-5">
              <Button variant="danger" type="submit" onClick={handleClick} className="bg-gradient px-4 w-100">
                Cari Tiket
              </Button>
            </Form.Group>
          </Row>
        </Col>
      </Row>

      <Row className=" text-center mt-5">
        <Col>
          <p>Nama kereta</p>
        </Col>
        <Col>
          <p>Berangkat</p>
        </Col>
        <Col></Col>
        <Col>
          <p>Tiba</p>
        </Col>
        <Col>
          <p>Durasi</p>
        </Col>
        <Col md={4}>
          <p>Harga Per Orang</p>
        </Col>
      </Row>

      <DataTiket startStation={form.start_station_id} destinationStation={form.destination_station_id} search={search} />
    </Container>
  );
}

export default Tiket;
