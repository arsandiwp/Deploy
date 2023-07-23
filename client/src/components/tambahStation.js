import { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useMutation } from "react-query";

import { API } from "../config/api";

function TambahStation() {
  const [form, setForm] = useState({
    name: "",
    kota: "",
  });
  console.log(form);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("name", form.name);
      formData.set("kota", form.kota);

      const response = await API.post("/station", formData);
      console.log("Add station success : ", response);
      setForm({
        name: "",
        kota: "",
      });
    } catch (error) {
      console.log("Add station error : ", error);
    }
  });

  return (
    <Container>
      <h2 className="my-4">Add Ticket</h2>
      <Form onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
            value={form.name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="kota">
          <Form.Control
            type="text"
            placeholder="Kota"
            name="kota"
            onChange={handleChange}
            value={form.kota}
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

export default TambahStation;
