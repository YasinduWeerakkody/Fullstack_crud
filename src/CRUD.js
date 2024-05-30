import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CRUD = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [isActive, setIsActive] = useState("");

  const [editID, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editcategory, setEditCategory] = useState("");
  const [editIsActive, setEditIsActive] = useState("");

  const empdata = [
    {
      id: 1,
      name: "Phone",
      category: "iphone",
      isActive: 1,
    },
    {
      id: 2,
      name: "car",
      category: "vehicle",
      isActive: 1,
    },
    {
      id: 3,
      name: "birds",
      category: "parrot",
      isActive: 1,
    },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    // setData(empdata);
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7284/api/Brand")
      .then((result) => {
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (ID) => {
    if (window.confirm("Are you sure to delete") == true) {
      axios
        .delete(`https://localhost:7284/api/Brand/${ID}`)
        .then((result) => {
          if (result.status === 200) {
            toast.success("Has been deleted");
            getData();
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleEdit = (ID) => {
    handleShow();
    axios
      .get(`https://localhost:7284/api/Brand/${ID}`)
      .then((result) => {
        setEditName(result.data.name);
        setEditCategory(result.data.category);
        setEditIsActive(result.data.isActive);
        setEditId(ID);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdate = () => {
    const url = `https://localhost:7284/api/Brand/${editID}`;
    const data = {
      id: editID,
      name: editName,
      category: editcategory,
      isActive: editIsActive,
    };

    axios
      .put(url, data)
      .then((result) => {
        handleClose();
        getData();
        clear();
        toast.success("Has been Updated");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSave = () => {
    const url = "https://localhost:7284/api/Brand";
    const data = {
      name: name,
      category: category,
      isActive: isActive,
    };

    axios
      .post(url, data)
      .then((result) => {
        getData();
        clear();
        toast.success("Has been Added");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const clear = () => {
    setName("");
    setCategory("");
    setIsActive(0);
    setEditName("");
    setEditCategory("");
    setEditIsActive(0);
    setEditId("");
  };

  const handleActiveChange = (e) => {
    if (e.target.checked) {
      setIsActive(1);
    } else {
      setIsActive(0);
    }
  };

  const handleEditActiveChange = (e) => {
    if (e.target.checked) {
      setEditIsActive(1);
    } else {
      setEditIsActive(0);
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              placeholder="enter your name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              placeholder="enter your category"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive == 1 ? true : false}
              onChange={(e) => handleActiveChange(e)}
              value={isActive}
            />
            <label>IsActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={() => handleSave()}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>IsActive</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td>{item.isActive}</td>
                    <td colSpan={2}>
                      <button
                        className="btn btn-danger m-2"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary m-2"
                        onClick={() => handleEdit(item.id)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })
            : "Loading...."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>update Table</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                placeholder="enter your name"
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                placeholder="enter your category"
                className="form-control"
                value={editcategory}
                onChange={(e) => setEditCategory(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={editIsActive == 1 ? true : false}
                onChange={(e) => handleEditActiveChange(e)}
                value={editIsActive}
              />
              <label>IsActive</label>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default CRUD;
