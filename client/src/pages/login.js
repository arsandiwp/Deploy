import { useContext, useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
// import { AppContext } from "../App";
import { API, setAuthToken } from "../config/api";

function Login({ show, showLogin, showDaftar }) {
  const handleClose = () => showLogin(false);
  const changeModal = () => {
    handleClose();
    showDaftar(true);
  };

  // routing
  const navigate = useNavigate();
  // reducer
  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handeleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/login", form);

      console.log("login success : ", response);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data.user,
      });

      setAuthToken(localStorage.token);

      if (response.data.data.user.role === "admin") {
        navigate("/listtransaksi");
      } else {
        navigate("/");
      }

      setForm ({
        username: "",
        password: "",
      })
      
    } catch (error) {
      console.log("login failed : ", error);
    }
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Container className="">
        <Form className="" onSubmit={(e) => handeleSubmit.mutate(e)}>
          <h2 className="text-danger text-center fw-bold my-3">Login</h2>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={handleChange}
              id="username"
              name="username"
              className="d-inline-flex focus-ring focus-ring-danger py-1 px-2 text-decoration-none border rounded-2"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              id="password"
              name="password"
              className="d-inline-flex focus-ring focus-ring-danger py-1 px-2 text-decoration-none border rounded-2"
            />
          </Form.Group>
          <Button
            variant="danger"
            type="submit"
            className="rounded-pill fw-bold bg-gradient w-100 my-4"
            onClick={handleClose}
          >
            Login
          </Button>
          <p className="text-center">
            Belum Punya Akun ? Klik{" "}
            <b
              onClick={changeModal}
              style={{ cursor: "pointer" }}
              className="text-danger"
            >
              disini
            </b>
          </p>
        </Form>
      </Container>
    </Modal>
  );
}

export default Login;
