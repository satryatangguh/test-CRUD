import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import "../App.css"
import imageError from "../assets/ImageError.jpg"

const Home = () => {
  // Error Image
  const onImageError = (e) => {
    e.target.src = imageError;
  };


  // Search
  const [searchTag, setSearchTag] = useState("");
  const [post, setPost] = useState([]);

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

  const handleSearch = () => {
    axios({
      method: "get",
      url: `https://dummyapi.io/data/v1/user/${searchTag}/post`,
      headers: {
        "app-id": "62996cb2689bf0731cb00285",
      },
    })
      .then((response) => {
        console.log(response);
        setPost(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <React.Fragment>
      <section className="container-fluid d-flex align-items-center py-3">
        <div className="my-auto">
          <Form onSubmit={handleSearch} style={{width: "400px",}}>
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search Tag"
                value={searchTag}
                onChange={(e) => setSearchTag(e.target.value)}
                aria-label="Search Tag"
                className="search-input"
              />
              <Button className="text-white bg-dark search-button" type="submit">
                <FaSearch />
              </Button>
            </Form.Group>
          </Form>
          <div className="row row-cols row-cols-lg-4 row-cols-md-2">
            {post &&
              post.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <div className="card-group">
                      <div className="card mh-100 shadow mt-4">
                        <img
                          src={item.image ? item.image : imageError}
                          className="card-imag-top mx-auto card-image"
                          alt={item.text}
                          onError={onImageError}
                        />
                        <div className="card-body d-flex flex-column p-2">
                          <h5 className=" fw-bold card-text">
                            {item.owner.firstName} {item.owner.lastName}
                          </h5>
                          <p className="card-text">{item.text}</p>
                          <p className="text-primary card-text tags">
                            {item.tags.map((m, index) => {
                              return (
                                <span key={index}>
                                  {(index ? " #" : "#") + m}
                                </span>
                              );
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Home;
