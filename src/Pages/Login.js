import localStorage from "local-storage";
import React, { Fragment, useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/Actions/user";
const Login = (props) => {
  const data = useSelector((state) => state.auth.dataUser);
  const loading = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [validated, setValidated] = useState(false);

  const Submit = (event) => {
    const form = event.currentTarget;
    const email = document.getElementById("mail").value;
    const password = document.getElementById("password").value;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const datas = {
        email: email,
        password: password,
      };
      dispatch(login(datas));
    }
    setValidated(true);
  };

  const err = data.error;

  useEffect(() => {
    toDash();
  }, [data]);

  const toDash = async () => {
    if (err === null) {
      const datas = data.result;
      await localStorage.set("token", datas.token);
      props.history.push("/");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <div className="mt-5 text-center">
          <h2>Login</h2>
        </div>
        <div className="d-flex justify-content-center">
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => Submit(e)}
            className="w-50"
          >
            {err != null ? <Alert variant="danger">{data.result}</Alert> : null}
            {loading.isRejected ? (
              <Alert variant="danger">Server Error</Alert>
            ) : null}
            <Form.Group controlId="mail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                id="mail"
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="Password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                id="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button className="w-100" variant="primary" type="submit">
              Submit{" "}
              {loading.isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : null}
            </Button>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
