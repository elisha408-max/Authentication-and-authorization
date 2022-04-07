import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { Table, Modal, Button } from "react-bootstrap";
import { MdDeleteOutline } from "react-icons/md";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiEdit2 } from "react-icons/fi";
import Edituser from "./Edituser";

const initialValues = {
  name: "",
  email: "",
  password: "",
};
const validationSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email("Not a Valid Mail").required(),
  password: Yup.string().min(6).max(12).required(),
});

export const User = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [id, setId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [todo, setTodo] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const inputName = useRef(null);
  // edit wala
  const [isOpen, setIsOpen] = React.useState(false);
  const hideModal = () => {
    console.log(inputName.current, "abc");
    setIsOpen(false);
  };
  const showModal = (id, email, name) => {
    setIsOpen(true);
    setId(id);
    setEmail(email);
    setName(name);
    // const data = todo.find((items) => items.id === id);
  };
  // .............
  const handleClose1 = () => setDeleteModal(false);
  const handleShow1 = () => setDeleteModal(true);

  const tryCode = () => {};
  const api = `https://ecom-react-task.herokuapp.com/user`;
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(api, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setTodo(res.data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [todo]);

  const deleteData = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `https://ecom-react-task.herokuapp.com/user/${id}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deletes successfully");
    } catch (err) {}
  };

  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    try {
      const response = await axios({
        method: "post",
        url: "https://ecom-react-task.herokuapp.com/user",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });

      console.log(response);
    } catch (err) {}
  };

  // const deleteId = (id) => {
  //   let filteredItem = todo.filter((item) => item.id !== id);
  //   console.log(filteredItem, "filteredItem");
  //   setTodo(filteredItem);
  //   console.log(filteredItem, "filteredItem");
  // };

  return (
    <div>
      <div className="m-5">
        <div className="screen-container">
          <h2>User Table</h2>
        </div>
        <div>
          <h5 className="text-end">
            <Button onClick={handleShow}>
              <BsPlusLg />
              Add User
            </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Screen</Modal.Title>
              </Modal.Header>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <Modal.Body>
                  <Form>
                    <div className="row">
                      <div className="col-6">
                        <label for="name">Name</label>
                        <span>
                          <Field type="text" id="name" name="name" />
                        </span>
                        <ErrorMessage name="name" className="text-danger" />
                      </div>

                      <div className="col-6">
                        <label for="email">Email</label>
                        <span>
                          <Field type="text" id="email" name="email" />
                        </span>
                        <ErrorMessage name="email" className="text-danger" />
                      </div>
                      <div className="col-6">
                        <label for="password">Password</label>
                        <span>
                          <Field
                            type="password"
                            id="password"
                            name="password"
                          />
                        </span>
                        <ErrorMessage name="password" className="text-danger" />
                      </div>
                    </div>

                    <Modal.Footer>
                      <Button type="submit" variant="primary">
                        Add User
                      </Button>
                      <Button variant="danger" onClick={handleClose}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Form>
                </Modal.Body>
              </Formik>
            </Modal>
          </h5>
        </div>

        <Table
          striped
          bordered
          hover
          variant="primary"
          className="mt-5"
          size="lg"
        >
          <thead>
            <tr>
              <th>S.N.</th>
              <th>User</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((items, index) => {
              // console.log(items.id, "itemsId");
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{items.id}</td>
                  <td>{items.email}</td>
                  <td>
                    {" "}
                    <FiEdit2
                      className="me-3 editButton"
                      onClick={() =>
                        showModal(items.id, items.name, items.email)
                      }
                    />{" "}
                    <Edituser
                      isOpen={isOpen}
                      name={name}
                      email={email}
                      id={id}
                      hideModal={hideModal}
                    />
                    {/* <Modal show={isOpen} onHide={hideModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Screen</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div className="row" ref={inputName}>
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
                    </Modal> */}
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
                        <Button
                          variant="danger"
                          // onClick={handleClose1}
                          onClick={() => deleteData(items.id)}
                        >
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

            {/* <tr>
              <td>2</td>
              <td>Sita</td>
              <td>sita@gmail.com</td>
              <td>
                {" "}
                <FiEdit2 className="me-3 editButton" onClick={showModal} />{" "}
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
            </tr> */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
