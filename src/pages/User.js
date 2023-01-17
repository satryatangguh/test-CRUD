import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Modal, Button } from "react-bootstrap";
import { FaImage } from "react-icons/fa";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const User = () => {
  // Create User
  const [title, setTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");
  // Modal Create
  const [add, setAdd] = useState(false);
  const addClose = () => setAdd(false);
  const addShow = () => setAdd(true);

  // Edit User
  const [titleEdit, setTitleEdit] = useState("");
  const [firstNameEdit, setFirstNameEdit] = useState("");
  const [lastNameEdit, setLastNameEdit] = useState("");
  const [emailEdit, setEmailEdit] = useState("");
  const [pictureEdit, setPictureEdit] = useState("");
  // Modal Edit
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = (id) => setShow(id);

  const handleShow = (id) => {
    const selectedUser = user.find((item) => item.id === id);
    console.log(selectedUser);
    setTitleEdit(selectedUser.title);
    setFirstNameEdit(selectedUser.firstName);
    setLastNameEdit(selectedUser.lastName);
    setEmailEdit(selectedUser.email);
    setPictureEdit(selectedUser.picture);
    setShow(id);
  };

  // Get All User
  const [user, setUser] = useState();

  // Delete Modal
  const [deleteId, setDeleteId] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => {
    setDeleteShow(false);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setDeleteShow(true);
  };

  const handleDeleteItem = () => {
    setUser((pre) => {
      const newArray = [...pre];
      return newArray.filter((item) => item._id !== deleteId);
    });
    setDeleteShow(false);
  };

  // Alert
  const successAddedNotify = () => {
    toast.success("Successfully added new user", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const errorAddedNotify = () => {
    toast.danger("Error during add user", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const successDeleteNotify = () => {
    toast.success("Successfully delete user", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const errorDeleteNotify = () => {
    toast.danger("Error during delete user", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const getUser = () => {
    axios({
      method: "get",
      url: "https://dummyapi.io/data/v1/user?limit=10&page=1&created=1",
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://dummyapi.io/data/v1/user/create",
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
      data: {
        id: id,
        title: title,
        firstName: firstName,
        lastName: lastName,
        email: email,
        picture: picture,
      },
    })
      .then((response) => {
        console.log(response);
        addClose();
        setTitle("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPicture("");
        successAddedNotify();
        getUser();
      })
      .catch((error) => {
        console.log(error);
        errorAddedNotify();
      });
  };

  const handleEdit = () => {
    axios({
      method: "put",
      url: `https://dummyapi.io/data/v1/user/${show}`,
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
      data: {
        title: titleEdit,
        firstName: firstNameEdit,
        lastName: lastNameEdit,
        email: emailEdit,
        picture: pictureEdit,
      },
    })
      .then((response) => {
        console.log(response);
        handleClose();
        setTitleEdit("");
        setFirstNameEdit("");
        setLastNameEdit("");
        setEmailEdit("");
        setPictureEdit("");
        getUser();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios({
      method: "delete",
      url: `https://dummyapi.io/data/v1/user/${id}`,
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
    })
      .then((response) => {
        console.log(response);
        successDeleteNotify();
        getUser();
      })
      .catch((error) => {
        console.log(error);
        errorDeleteNotify();
      });
  };

  return (
    <React.Fragment>
      <section className="container-fluid d-flex align-items-center py-5">
        <div className="mx-auto my-auto">
          <div className="text-center mb-4">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => addShow()}
            >
              Create User
            </button>
          </div>
          <table className="table table-bordered border-dark">
            <thead>
              <tr className="text-center">
                <th scope="col">Name</th>
                <th scope="col">Picture</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-capitalize">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target={`#staticBackdrop_${item.id}`}
                        >
                          <FaImage />
                        </button>
                        {/* Modal Image */}
                        <div
                          className="modal fade"
                          id={`staticBackdrop_${item.id}`}
                          tabIndex="-1"
                          aria-labelledby="modal-title"
                          aria-hidden="true"
                        >
                          <div className="modal-dialog">
                            <div className="modal-content">
                              <div className="modal-header">
                                <button
                                  type="button"
                                  className="btn-close"
                                  data-bs-dismiss="modal"
                                  aria-label="Close"
                                ></button>
                              </div>
                              <div className="modal-body p-4">
                                <img
                                  src={item.picture}
                                  alt={item.firstName}
                                  className="img-fluid img-user"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Action"
                        >
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => handleShow(item.id)}
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleClickDelete(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>

          <ToastContainer transition={Slide} />

          {/* Create */}
          <Modal show={add} onHide={addClose}>
            <Modal.Title className="d-flex justify-content-center p-3">
              Create User
            </Modal.Title>
            <Modal.Body className="px-4">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                  >
                    <option>title</option>
                    <option value="mr">mr</option>
                    <option value="mrs">mrs</option>
                    <option value="miss">miss</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="url"
                    placeholder="Picture Url"
                    name="picture"
                    value={picture}
                    onChange={(e) => setPicture(e.target.value)}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={addClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAdd}>
                Create
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Title className="d-flex justify-content-center p-3">
              Edit User
            </Modal.Title>
            <Modal.Body className="px-4">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="title"
                    name="title"
                    value={titleEdit}
                    onChange={(e) => setTitleEdit(e.target.value)}
                  >
                    <option>title</option>
                    <option value="mr">mr</option>
                    <option value="mrs">mrs</option>
                    <option value="miss">miss</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    value={firstNameEdit}
                    onChange={(e) => setFirstNameEdit(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    value={lastNameEdit}
                    onChange={(e) => setLastNameEdit(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={emailEdit}
                    onChange={(e) => setEmailEdit(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="url"
                    placeholder="Picture Url"
                    name="picture"
                    value={pictureEdit}
                    onChange={(e) => setPictureEdit(e.target.value)}
                    required
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Modal Delete */}
          <Modal
            centered
            show={deleteShow}
            onHide={handleDeleteClose}
            animation={true}
          >
            <Modal.Body>
              <p className="fs-6 text-center">
                Are you sure want to delete this item?
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button variant="secondary" onClick={handleDeleteClose}>
                  No
                </Button>
                <Button
                  variant="danger"
                  onClick={handleDeleteItem}
                  // onClick={() => handleDelete(user && user.id)}
                >Yes</Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </section>
    </React.Fragment>
  );
};

export default User;
