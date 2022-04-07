import React, { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FiSettings } from "react-icons/fi";
import { Form, Field, Formik, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
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

  const api = " https://ecom-react-task.herokuapp.com/roles";
  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(api, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setTodo(res.data.data);
        return res.data.data;
      });
  }, [todo]);

  const deleteRoledata = async (id) => {
    try {
      const response = await axios({
        method: "delete",
        url: `https://ecom-react-task.herokuapp.com/roles/${id}`,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Deletes successfully");
    } catch (err) {}
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    description: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    onSubmit: async (values, resetForm) => {
      formik.resetForm();
      console.log(values);
      try {
        const response = await axios({
          method: "post",
          url: "https://ecom-react-task.herokuapp.com/roles",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            name: values.name,
            description: values.description,
          },
        });

        console.log(response);
      } catch (err) {}
    },

    validationSchema,
  });
  return (
    <div className="m-5">
      <h3>Role Details</h3>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="btn  mt-3 text-white btn-lg"
          style={{ background: "#4f4f8a" }}
          onClick={handleShow}
        >
          + <span className="ms-2">Add Role</span>
        </button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Role </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  <label for="name">Name</label>
                  <span>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      onBlur={formik.handleBlur}
                    />
                  </span>
                  {formik.errors.name && formik.touched.name ? (
                    <span className="text-danger">{formik.errors.name}</span>
                  ) : null}
                </div>
                <div className="col-6">
                  <label for="description">Description</label>
                  <span>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      onBlur={formik.handleBlur}
                    />
                  </span>
                  {formik.errors.description && formik.touched.description ? (
                    <span className="text-danger">
                      {formik.errors.description}
                    </span>
                  ) : null}
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
            </form>
          </Modal.Body>
        </Modal>
        ;
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
            <th>Role Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((items, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{items.name}</td>
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
                      <Button
                        variant="secondary"
                        onClick={() => deleteRoledata(items.id)}
                      >
                        Delete
                      </Button>
                      <Button variant="primary" onClick={handleClose1}>
                        Cancel
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <FiSettings className="ms-3 editButton" />
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
