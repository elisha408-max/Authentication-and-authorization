import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Form, Formik, ErrorMessage } from "formik";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";
import * as Yup from "yup";
const Screen = () => {
  const [show, setShow] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [todo, setTodo] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isOpen, setIsOpen] = React.useState(false);
  const hideModal = () => {
    setIsOpen(false);
  };
  const handleClose1 = () => setDeleteModal(false);
  const handleShow1 = () => setDeleteModal(true);

  const showModal = () => {
    setIsOpen(true);
  };

  // const onSubmit = async (values, resetForm) => {
  //   formik.resetForm();
  //   console.log(values, "values");

  // };

  const api = " https://ecom-react-task.herokuapp.com/user";
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);

  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setTodo(res.data.data);
        return res.data.data;
      });
  }, []);
  console.log(todo, "todo");
  const data = {
    name: "Elisha",
    email: "akdjfk@gmail.com",
    password: "kjgfdgj",
  };
  axios
    .put(api, { headers: { Authorization: `Bearer ${token}` } }, data)
    .then((data) => {
      console.log(data);
    });

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      console.log(values);
    },

    validationSchema,
  });

  return (
    <>
      <div className="m-5">
        <h3>User Setup</h3>
        <div className="d-flex justify-content-end">
          <button
            type="button"
            className="btn  mt-3 text-white btn-lg"
            style={{ background: "#4f4f8a" }}
            onClick={handleShow}
          >
            + <span className="ms-2">Add User</span>
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Screen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="row">
                  <div className="col-6">
                    <label
                      for="name"
                      className="form-label"
                      style={{ marginRight: "600px" }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <span className="text-danger">{formik.errors.name}</span>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <label
                      for="email"
                      className="form-label"
                      style={{ marginRight: "600px" }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.email && formik.touched.email ? (
                      <span className="text-danger">{formik.errors.email}</span>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <label
                      for="password"
                      className="form-label"
                      style={{ marginRight: "600px" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      autocomplete="on"
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <span className="text-danger">
                        {formik.errors.password}
                      </span>
                    ) : null}
                  </div>
                </div>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={handleClose}
                    type="submit"
                  >
                    Add
                  </Button>
                  <Button variant="primary" onClick={handleClose}>
                    Cancel
                  </Button>
                </Modal.Footer>
              </form>
            </Modal.Body>
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
              <th>User</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todo.map((items, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{items.id}</td>
                  <td>{items.email}</td>
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
    </>
  );
};

export default Screen;
