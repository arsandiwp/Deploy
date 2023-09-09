import { Button, Container, Form } from "react-bootstrap";

import { useMutation } from "react-query";
import { API } from "../config/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TambahTiket() {
  let navigate = useNavigate();
  // Store Data Ticket
  const [stations, setStations] = useState([]);
  const [form, setFrom] = useState({
    name_train: "",
    type_train: "",
    start_date: "",
    start_station_id: "",
    start_time: "",
    destination_station_id: "",
    arival_time: "",
    price: "",
    qty: "",
  });
  console.log(form);

  // fetching data station
  const getStations = async () => {
    try {
      const response = await API.get("/stations");
      setStations(response.data.data.stations);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFrom({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // store data with formdata
      const formData = new FormData();
      formData.set("name_train", form.name_train);
      formData.set("type_train", form.type_train);
      formData.set("start_date", form.start_date);
      formData.set("start_station_id", form.start_station_id);
      formData.set("start_time", form.start_time);
      formData.set("destination_station_id", form.destination_station_id);
      formData.set("arival_time", form.arival_time);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      // insert ticket data
      const response = await API.post("/ticket", formData);
      console.log("Add Ticket Success : ", response);
      setFrom({
        name_train: "",
        type_train: "",
        start_date: "",
        start_station_id: "",
        start_time: "",
        destination_station_id: "",
        arival_time: "",
        price: "",
        qty: "",
      });

      navigate("/listtransaksi");
      alert("Add Ticket Success");
    } catch (error) {
      console.log("Add Ticket Failed : ", error);
      alert("Add Ticket Failed");
    }
  });

  useEffect(() => {
    getStations();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Add Ticket</h2>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className="mb-3" controlId="nametrain">
          <Form.Control
            type="text"
            placeholder="Name Train"
            name="name_train"
            onChange={handleChange}
            value={form.name_train}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="typetrain">
          <Form.Select
            defaultValue="Type Train"
            name="type_train"
            onChange={handleChange}
            value={form.type_train}
          >
            <option hidden>Type Train</option>
            <option value="Luxury">Luxury</option>
            <option value="Eksekutif">Eksekutif</option>
            <option value="Bisnis">Bisnis</option>
            <option value="Ekonomi">Ekonomi</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="startdate">
          <Form.Control
            type="text"
            placeholder="Start Date"
            name="start_date"
            onChange={handleChange}
            value={form.start_date}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="startstationid">
          <Form.Select
            name="start_station_id"
            onChange={handleChange}
            value={form.start_station_id}
          >
            <option hidden>Start Station</option>
            {stations?.map((item) => (
              <option key={item.id} value={item?.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="starttime">
          <Form.Control
            type="text"
            placeholder="Start Time"
            name="start_time"
            onChange={handleChange}
            value={form.start_time}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="destinationstationid">
          <Form.Select
            name="destination_station_id"
            onChange={handleChange}
            value={form.destination_station_id}
          >
            <option hidden>Destination Station</option>
            {stations?.map((item) => (
              <option key={item.id} value={item?.id}>
                {item.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="arivaltime">
          <Form.Control
            type="text"
            placeholder="Arival Time"
            name="arival_time"
            onChange={handleChange}
            value={form.arival_time}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="pricee">
          <Form.Control
            type="text"
            placeholder="Price"
            name="price"
            onChange={handleChange}
            value={form.price}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="qtyy">
          <Form.Control
            type="text"
            placeholder="Qty"
            name="qty"
            onChange={handleChange}
            value={form.qty}
          />
        </Form.Group>

        <Button
          variant="success"
          className="bg-gradient w-100 my-3"
          type="submit"
        >
          Save
        </Button>
      </Form>
    </Container>
  );
}

export default TambahTiket;
