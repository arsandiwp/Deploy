import { Button, Container, Form, Modal } from "react-bootstrap";

function ModalApproval ({show, showApproval}) {
    const handleClose = () => showApproval(false);
    return (
        <Modal show={show} onHide={handleClose}>
            <Container className="my-4">
                <Form>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="1" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Kemem" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Surabaya - Jakarta" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="bca.jpg" disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Control type="text" placeholder="Approvaed" />
                    </Form.Group>
                    <Button variant="success" className="bg-gradient w-100">Save</Button>
                </Form>
            </Container>
        </Modal>
    );
};

export default ModalApproval;