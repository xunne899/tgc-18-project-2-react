import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button,Form } from "react-bootstrap";
export default function InfoModal() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="More btn btn-dark my-1" style={{color:"#ebd8b8"}}>
        More
      </Button>
      <Modal  show={show} onHide={handleClose}>
        <Modal.Header  style={{background:"#ebd8b8"}} closeButton>
          <Modal.Title >Collection</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{background:"#ebd8b8"}}>Hello,you're reading this text in a modal!
        <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label >Username</Form.Label>
              <Form.Control
                type="user"
                placeholder="user"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{background:"#ebd8b8"}}>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
