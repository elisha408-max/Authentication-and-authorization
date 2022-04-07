import React from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Table, Modal, Button } from "react-bootstrap";
import axios from "axios";

const Edituser = ({ isOpen, name, email, id, hideModal }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const initialValues = {
    name: name,
    email: email,
    password: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email("Not a Valid Mail").required(),
    password: Yup.string().min(6).max(12).required(),
  });
  const onSubmit = async (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();

    try {
      const response = await axios({
        method: "put",
        url: `https://ecom-react-task.herokuapp.com/user/${id}`,
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

  return (
    <>
      <Modal show={isOpen} onHide={hideModal}>
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
                    <Field type="password" id="password" name="password" />
                  </span>
                  <ErrorMessage name="password" className="text-danger" />
                </div>
              </div>

              <Modal.Footer>
                <Button type="submit" variant="primary">
                  Add User
                </Button>
                <Button variant="danger" onClick={hideModal}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Formik>
      </Modal>
    </>
  );
};

export default Edituser;
