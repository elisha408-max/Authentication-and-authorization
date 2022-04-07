import React, { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
const Screen = () => {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [todo, setTodo] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const showModal = () => {
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
  };
  const handleClose1 = () => setDeleteModal(false);
  const handleShow1 = () => setDeleteModal(true);
  const api = " https://ecom-react-task.herokuapp.com/screens";
  const token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        console.log(res.data.data);
        setTodo(res.data.data);
        return res.data.data;
      });
  }, []);

  return (
    <div className="m-5">
      <h3>Screen Setup</h3>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn  mt-3 text-white btn-lg"
          style={{ background: "#4f4f8a" }}
          onClick={handleShow}
        >
          + <span className="ms-2">Add Screen</span>
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Screen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6">
                <label for="name">Name</label>
                <span>
                  <input type="text" id="name" />
                </span>
              </div>
              <div className="col-6">
                <label for="description">Description</label>
                <span>
                  <input type="text" id="description" />
                </span>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Add
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
        ;
      </div>
      <Table
        striped
        bordered
        hover
        variant="secondary"
        className="mt-5"
        size="lg"
      >
        <thead>
          <tr>
            <th>S.N.</th>
            <th>Screen Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((items, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{items.id}</td>
                <td>{items.description}</td>
                <td>
                  {" "}
                  <FiEdit2
                    className="me-3 editButton"
                    onClick={showModal}
                  />{" "}
                  <Modal show={isOpen} onHide={hideModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Edit Screen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row">
                        <div className="col-6">
                          <label for="name">Name</label>
                          <span>
                            <input type="text" id="name" />
                          </span>
                        </div>
                        <div className="col-6">
                          <label for="description">Description</label>
                          <span>
                            <input type="text" id="description" />
                          </span>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={hideModal}>
                        Add
                      </Button>
                      <Button variant="primary" onClick={hideModal}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <MdDeleteOutline
                    className="deleteButton"
                    onClick={handleShow1}
                  />{" "}
                  <Modal show={deleteModal} onHide={handleClose1}>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Screen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div className="row">
                        <h5>Are you sure to delete this screen?</h5>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={handleClose1}>
                        Delete
                      </Button>
                      <Button variant="primary" onClick={handleClose1}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Screen;
