import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, Modal, Button } from "react-bootstrap";
import { ToastContainer, toast, Slide } from "react-toastify";
import { FaImage } from "react-icons/fa";
import "../App.css"

const Post = () => {
  // Create Post
  const [text, setText] = useState("");
  const [owner, setOwner] = useState("");
  const [image, setImage] = useState("");
  const [tags, setTags] = useState([]);
  const [likes, setLikes] = useState();
  // Modal Create
  const [add, setAdd] = useState(false);
  const addClose = () => setAdd(false);
  const addShow = () => setAdd(true);

  // Edit Post
  const [textEdit, setTextEdit] = useState("");
  const [ownerEdit, setOwnerEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [tagsEdit, setTagsEdit] = useState([]);
  const [likesEdit, setLikesEdit] = useState();
  // Modal Edit
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = (id) => setShow(id);
  const handleShow = (id) => {
    const selectedPost = post.find((item) => item.id === id);
    console.log(selectedPost);
    setTextEdit(selectedPost.text);
    setOwnerEdit(selectedPost.owner);
    setImageEdit(selectedPost.image);
    setTagsEdit(selectedPost.tags);
    setLikesEdit(selectedPost.likes);
    setShow(true);
  };

  // Get All post
  const [post, setPost] = useState();

  // Alert
  const successAddedNotify = () => {
    toast.success("Successfully added new post", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const errorAddedNotify = () => {
    toast.danger("Error during add post", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const successEditNotify = () => {
    toast.success("Successfully edit post", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const errorEditNotify = () => {
    toast.danger("Error during edit post", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const successDeleteNotify = () => {
    toast.success("Successfully delete post", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const errorDeleteNotify = () => {
    toast.danger("Error during delete post", {
      position: "top-right",
      autoClose: 5000,
      theme: "light",
    });
  };

  const getPost = () => {
    axios({
      method: "get",
      url: "https://dummyapi.io/data/v1/post",
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
    })
      .then((response) => {
        console.log(response.data.data);
        setPost(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "https://dummyapi.io/data/v1/post/create",
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
      data: {
        text: text,
        owner: owner,
        image: image,
        likes: likes,
        tags: tags.split(", "),
      },
    })
      .then((response) => {
        console.log(response);
        addClose();
        setText("");
        setOwner("");
        setImage("");
        setLikes("");
        setTags("");
        successAddedNotify();
        getPost();
      })
      .catch((error) => {
        console.log(error);
        errorAddedNotify();
      });
  };

  const handleEdit = () => {
    axios({
      method: "put",
      url: `https://dummyapi.io/data/v1/post/${show}`,
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
      data: {
        text: textEdit,
        owner: ownerEdit,
        image: imageEdit,
        likes: likesEdit,
        tags: tagsEdit,
      },
    })
      .then((response) => {
        console.log(response);
        handleClose();
        setTextEdit("");
        setOwnerEdit("");
        setImageEdit("");
        setLikesEdit("");
        setTagsEdit([]);
        successEditNotify();
        getPost();
      })
      .catch((error) => {
        console.log(error);
        errorEditNotify();
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure want to delete this data?")) {
      axios({
        method: "delete",
        url: `https://dummyapi.io/data/v1/post/${id}`,
        headers: {
          "app-id": "62996cb2689bf0731cb00285",
        },
      })
        .then((response) => {
          console.log(response);
          successDeleteNotify();
          getPost();
        })
        .catch((error) => {
          console.log(error);
          errorDeleteNotify();
        });
    }
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
              Create Post
            </button>
          </div>
          <table className="table table-bordered border-dark">
            <thead>
              <tr className="text-center">
                <th className="col-4">Text</th>
                <th className="col-3">Tags</th>
                <th className="col-1">Image</th>
                <th className="col-2">User</th>
                <th className="col-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {post &&
                post.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.text}</td>
                      <td>
                        {item.tags.map((m, index) => {
                          return (
                            <span key={index}>{(index ? " #" : "#") + m}</span>
                          );
                        })}
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
                                  src={item.image}
                                  alt={item.text}
                                  className="img-fluid img-user"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.owner.firstName} {item.owner.lastName}
                      </td>
                      <td className="text-center">
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
                            onClick={() => handleDelete(item.id)}
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
                    name="owner"
                    onChange={(e) => setOwner(e.target.value)}
                  >
                    <option value="">Owner</option>
                    <option value="63c4f22f4f9237ae05cb9800">
                      Satrya Tangguh
                    </option>
                    <option value="63c01e55e5843478e721ccf6">
                      Aurel Mayori
                    </option>
                    <option value="63c0c3a7a6290e39e16484f6">The Puppy</option>
                    <option value="63c4f4a94f923729edcb9a31">John Doe</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="url"
                    placeholder="Image Url"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Likes"
                    name="likes"
                    value={likes}
                    onChange={(e) => setLikes(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
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
                Submit
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Title className="d-flex justify-content-center p-3">
              Edit Post
            </Modal.Title>
            <Modal.Body className="px-4">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Select
                    aria-label="title"
                    name="owner"
                    value={ownerEdit.id}
                    onChange={(e) => setOwnerEdit(e.target.value)}
                  >
                    <option value="">Owner</option>
                    <option value="63c4f22f4f9237ae05cb9800">
                      Satrya Tangguh
                    </option>
                    <option value="63c01e55e5843478e721ccf6">
                      Aurel Mayori
                    </option>
                    <option value="63c0c3a7a6290e39e16484f6">The Puppy</option>
                    <option value="63c4f4a94f923729edcb9a31">John Doe</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="text"
                    name="text"
                    value={textEdit}
                    onChange={(e) => setTextEdit(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="url"
                    placeholder="Image Url"
                    name="image"
                    value={imageEdit}
                    onChange={(e) => setImageEdit(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Likes"
                    name="likes"
                    value={likesEdit}
                    onChange={(e) => setLikesEdit(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Tags"
                    name="tags"
                    value={tagsEdit}
                    onChange={(e) => setTagsEdit(e.target.value)}
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
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Post;