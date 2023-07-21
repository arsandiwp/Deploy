// import ListTiket from "../components/listTiket";
import { Row, Col, Container } from "react-bootstrap";
import Edit from "../assets/img/edit.png";
import Search from "../assets/img/search.png";
import Trash from "../assets/img/trash.png";
import { useEffect, useState } from "react";
import ModalApproval from "../components/modalApproval";
import ModalInvoice from "../components/modalInvoice";
import DeleteData from "../components/modalDelete";

import { useMutation, useQuery } from "react-query";
import { API } from "../config/api";

function ListTransaksi() {
  const [showApproval, setShowApproval] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [idTransaction, setIdTransaction] = useState();

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfrimDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/transactions/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  let { data: transactions, refetch } = useQuery(
    "transactionsCache",
    async () => {
      const response = await API.get("/transactions");
      console.log(transactions);
      return response?.data?.data;
    }
  );

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfrimDelete(null);
    }
    // eslint-disable-next-line
  }, [confirmDelete]);

  return (
    <div>
      <Container>
        <h1 className="my-5">List Transaction</h1>
        <Row>
          <Col md={1}>
            <p>No</p>
          </Col>
          <Col md={2}>
            <p>Users</p>
          </Col>
          <Col md={4}>
            <p>Tiket</p>
          </Col>
          <Col>
            <p>Status Payment</p>
          </Col>
          <Col>
            <p>Action</p>
          </Col>
        </Row>
        {transactions?.map((data, index) => (
          <Row>
            <Col key={index} md={1}>
              <p>{index + 1}</p>
            </Col>
            <Col md={2}>
              <p>{data.user.fullName}</p>
            </Col>
            <Col md={4}>
              <p>
                Station {data.ticket.start_station.name} -{" "}
                Station {data.ticket.destination_station.name}
              </p>
            </Col>
            <Col>
            {data.status === "Pending" && (
                <div
                  className="text-danger"
                  style={{ width: "80px" }}
                >
                  <p className="">{data.status}</p>
                </div>
              )}
              {data.status === "success" && (
                <div
                  className="text-success"
                  style={{ width: "80px" }}
                >
                  <p className="">{data.status}</p>
                </div>
              )}
            </Col>

            <Col className="">
              <img
                src={Search}
                className="me-3"
                alt="search"
                onClick={() => { setShowInvoice(true); setIdTransaction(data.id)}}
                style={{ cursor: "pointer" }}
              />
              <img
                src={Edit}
                className="me-3"
                alt="edit"
                onClick={() => setShowApproval(true)}
                style={{ cursor: "pointer" }}
              />
              <img
                src={Trash}
                onClick={() => {
                  handleDelete(data.id);
                }}
                className="me-3"
                alt="tarsh"
              />
            </Col>
          </Row>
        ))}
      </Container>

      <ModalApproval show={showApproval} showApproval={setShowApproval} />

      <ModalInvoice show={showInvoice} id={idTransaction} showInvoice={setShowInvoice} />

      <DeleteData
        setConfirmDelete={setConfrimDelete}
        show={show}
        handleClose={handleClose}
      />

      {/* <ListTiket
        no="1"
        user="Anto"
        tiket="Surabaya - Jakarta"
        bukti="bca.jpg"
        status="pending"
      />
      <ListTiket
        no="2"
        user="Bastian"
        tiket="Jakarta - Malang"
        bukti="bni.jpg"
        status="pending"
      />
      <ListTiket
        no="3"
        user="Amin"
        tiket="Jakarta - Bandung"
        bukti="permata.jpg"
        status="pending"
      />
      <ListTiket
        no="4"
        user="Haris"
        tiket="Sumedang - Jakarta"
        bukti="permata.jpg"
        status="pending"
      />
      <ListTiket
        no="5"
        user="Aziz"
        tiket="Jakarta - Serang"
        bukti="bi.jpg"
        status="pending"
      />
      <ListTiket
        no="6"
        user="Sugeng"
        tiket="Jakarta - Serang"
        bukti="bni.jpg"
        status="pending"
      /> */}
    </div>
  );
}

export default ListTransaksi;
