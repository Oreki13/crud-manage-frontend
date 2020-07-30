import React, { createRef, Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import NoImage from "../assets/img/noimage.png";
import { clearUpdate, GetLevel, register } from "../Redux/Actions/user";
const AddUser = (props) => {
  const [validated, setValidated] = useState(false);

  const [image, setImage] = useState();
  const [tmpImg, setTmpImg] = useState();
  const [errImg, setErrImg] = useState();

  const respon = useSelector((state) => state.auth.other);
  const condition = useSelector((state) => state.auth);
  const levels = useSelector((state) => state.user.level.result);
  const dispatch = useDispatch();

  const Submit = (event) => {
    const form = event.currentTarget;
    const username = document.getElementById("username").value;
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;
    const position = document.getElementById("position").value;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const datas = {
        name: username,
        email: email,
        password: password,
        position: position,
      };
      const form = new FormData();
      form.set("name", username);
      form.set("email", email);
      form.set("password", password);
      form.set("level", position);
      form.set("profile", image);

      dispatch(register(form));
    }
    setValidated(true);
  };

  useEffect(() => {
    if (respon.error === null) {
      dispatch(clearUpdate());
      props.history.push("/");
    } else {
      setValidated(false);
    }
  }, [respon]);

  useEffect(() => {
    dispatch(GetLevel());
  }, []);

  const file = createRef();
  const imageChange = (e) => {
    setTmpImg(null);
    if (e.type === "image/png" || e.type === "image/jpeg") {
      if (e.size > 2000000) {
        setErrImg("Image To Large");
      } else {
        setImage(e);
        setTmpImg(URL.createObjectURL(e));
        setErrImg(null);
      }
    } else {
      setErrImg("File Alowed Jpeg/Png");
    }
  };

  return (
    <Fragment>
      <div className="container">
        {condition.isRejected ? (
          <Alert variant="danger">Server Error</Alert>
        ) : null}
        <div className="mt-4 text-center">
          <h2>Add User</h2>
        </div>
        <Form noValidate validated={validated} onSubmit={(e) => Submit(e)}>
          <Row className="justify-content-center">
            <Col md={5}>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  required
                  isInvalid={respon.result === "name" ? true : false}
                  id="username"
                  type="text"
                  placeholder="Enter username"
                />
                <Form.Control.Feedback type="invalid">
                  {respon.result === "name"
                    ? "Username Already Exist"
                    : "Please choose a username"}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="mail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  isInvalid={respon.result === "email" ? true : false}
                  id="mail"
                  type="email"
                  placeholder="Enter email"
                />
                <Form.Control.Feedback type="invalid">
                  {respon.result === "email"
                    ? "Email Already Exist"
                    : "Please choose a Email"}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  id="password"
                  type="password"
                  placeholder="Password"
                />
                <Form.Control.Feedback type="invalid">
                  Please choose password
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Position</Form.Label>
                <Form.Control as="select" id="position">
                  {levels
                    ? levels.map((data, key) => (
                        <option key={key} value={data.id_level}>
                          {data.name}
                        </option>
                      ))
                    : null}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className={errImg ? "m-0" : null}>
                <Form.File
                  id="exampleFormControlFile1"
                  label="Image Profile"
                  onChange={() => imageChange(file.current.files[0])}
                  ref={file}
                />
              </Form.Group>
              {errImg ? <span>{errImg}</span> : null}
              <div className="image-box">
                <div>
                  <img
                    className="image-class"
                    src={tmpImg ? tmpImg : NoImage}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <div className="mt-3 d-flex justify-content-center">
            <Button className="d-block w-50" variant="primary" type="submit">
              Submit{" "}
              {condition.isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
            </Button>
          </div>
        </Form>
      </div>
    </Fragment>
  );
};
export default AddUser;
