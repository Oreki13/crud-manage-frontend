import React, { createRef, Fragment, useEffect, useState } from "react";
import { Button, Col, Form, Row, Alert, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUpdate,
  GetById,
  GetLevel,
  updateUser,
} from "../Redux/Actions/user";
const EditUser = (props) => {
  const [image, setImage] = useState();
  const [tmpImg, setTmpImg] = useState();
  const [errImg, setErrImg] = useState();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const res = useSelector((state) => ({
    action: state.auth.update,
    level: state.user.level.result,
    byId: state.user.getById.result,
    condition: state.auth,
  }));
  const respon = useSelector((state) => state.auth.other);
  const levels = useSelector((state) => state.user.level.result);
  const dispatch = useDispatch();
  const idUser = props.match.params.id;

  const Submit = () => {
    const form = new FormData();
    form.set("name", username);
    form.set("email", email);
    form.set("level", position);
    form.set("profile", image);
    console.log(username, email, position);
    dispatch(updateUser(idUser, form));
  };

  useEffect(() => {
    if (res.action.error === null) {
      dispatch(clearUpdate());
      props.history.push("/");
    }

    console.log(respon);
  }, [res.action]);

  useEffect(() => {
    dispatch(GetLevel());
    dispatch(GetById(idUser));
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
        {res.condition.isRejected ? (
          <Alert variant="danger">Server Error</Alert>
        ) : null}
        <div className="mt-4 text-center">
          <h2>Edit User</h2>
        </div>
        {res.byId ? (
          <Fragment>
            <Row className="justify-content-center">
              <Col md={5}>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    isInvalid={res.action.result === "name" ? true : false}
                    id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={res.byId.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {res.action.result === "name"
                      ? "Username Already Exist"
                      : "Please choose a username"}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="mail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    isInvalid={res.action.result === "email" ? true : false}
                    id="mail"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={res.byId.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {res.action.result === "email"
                      ? "Email Already Exist"
                      : "Please choose a Email"}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="position">
                  <Form.Label>Position</Form.Label>
                  <Form.Control
                    as="select"
                    id="position"
                    onChange={(e) => setPosition(e.target.value)}
                  >
                    {levels
                      ? levels.map((data) => {
                          if (res.byId.level === data.id_level) {
                            return (
                              <option selected value={data.id_level}>
                                {data.name}
                              </option>
                            );
                          } else {
                            return (
                              <option value={data.id_level}>{data.name}</option>
                            );
                          }
                        })
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
                      src={
                        tmpImg
                          ? tmpImg
                          : process.env.REACT_APP_URL + res.byId.img_profile
                      }
                    />
                  </div>
                </div>
              </Col>
            </Row>
            <div className="mt-3 d-flex justify-content-center">
              <Button
                className="d-block w-50"
                variant="primary"
                type="submit"
                onClick={() => Submit()}
              >
                Submit{" "}
                {res.condition.isLoading ? (
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
          </Fragment>
        ) : (
          <div className="text-center">
            <Spinner
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};
export default EditUser;
