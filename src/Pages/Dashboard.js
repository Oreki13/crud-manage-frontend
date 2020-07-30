import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, GetAll } from "../Redux/Actions/user";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const response = useSelector((state) => ({
    listUser: state.user.listUser.result,
    totalPage: state.user.listUser.totalPage,
    status: state.auth.status.result,
    condition: state.user,
  }));
  const [paramSort, setParamSort] = useState("id");
  const [initPage, setInitPage] = useState(1);

  useEffect(() => {
    getData();
  }, [paramSort, initPage]);

  const getData = async () => {
    await dispatch(GetAll(paramSort, initPage));
  };

  const onDelete = (id) => {
    dispatch(deleteUser(id));
    props.history.push("/");
  };

  const handleSort = (param) => {
    if (param === paramSort) {
      setParamSort("id");
    } else {
      setParamSort(param);
    }
  };
  const handelPrev = () => {
    setInitPage(initPage - 1);
  };
  const handelNext = () => {
    setInitPage(initPage + 1);
  };

  return (
    <Fragment>
      <div className="container">
        {response.condition.isRejected ? (
          <Alert variant="danger">Server Error</Alert>
        ) : null}
        <div
          className="mt-4 d-flex justify-content-between"
          style={{ flexWrap: "wrap" }}
        >
          <h2>List User</h2>
          <div>
            {!response.status ? null : response.status.level === 1 ? (
              <button
                onClick={() => props.history.push("/setting")}
                className="btn btn-primary mr-3 "
              >
                Setting Permission
              </button>
            ) : null}
            {!response.status ? (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            ) : response.status.perm_add === 1 ? (
              <button
                onClick={() => props.history.push("/addUser")}
                className="btn btn-primary "
              >
                Add User
              </button>
            ) : null}
          </div>
        </div>
        <div className="mt-3">
          {response.listUser && response.status ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>
                    <div className="d-flex justify-content-around">
                      <span>Name</span>
                      <span onClick={() => handleSort("name")}>
                        <IconArrow />
                      </span>
                    </div>
                  </th>
                  <th>
                    <div className="d-flex justify-content-around">
                      <span>Email</span>
                      <span onClick={() => handleSort("email")}>
                        <IconArrow />
                      </span>
                    </div>
                  </th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {response.listUser.map((list, key) => {
                  if (list.id !== response.status.userid) {
                    return (
                      <Fragment key={key}>
                        <tr>
                          <td>{list.name}</td>
                          <td>{list.email}</td>
                          <td className="text-center">
                            {response.status.perm_edit !== 0 ? (
                              <span
                                onClick={() =>
                                  props.history.push(`editUser/${list.id}`)
                                }
                                className="badge badge-primary mr-2"
                              >
                                Edit
                              </span>
                            ) : null}

                            {response.status.perm_delete !== 0 ? (
                              <span
                                onClick={() => onDelete(list.id)}
                                className="badge badge-danger"
                              >
                                Delete
                              </span>
                            ) : null}
                          </td>
                        </tr>
                      </Fragment>
                    );
                  }
                })}
              </tbody>
            </Table>
          ) : (
            <div className="text-center mb-5">
              <Spinner
                as="span"
                animation="border"
                size="lg"
                role="status"
                aria-hidden="true"
              />
            </div>
          )}
          <div className="text-center">
            <Button
              onClick={() => handelPrev()}
              disabled={initPage === 1 ? true : false}
              variant="primary"
            >
              Prev
            </Button>
            <span className="mx-2">
              {response.condition.isLoading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                initPage + "/" + response.totalPage
              )}
            </span>
            <Button
              onClick={() => handelNext()}
              disabled={initPage === response.totalPage ? true : false}
              variant="primary"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const IconArrow = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-arrow-down-up"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M11 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"
      />
      <path
        fillRule="evenodd"
        d="M10.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L11 3.707 8.354 6.354a.5.5 0 1 1-.708-.708l3-3zm-9 7a.5.5 0 0 1 .708 0L5 12.293l2.646-2.647a.5.5 0 1 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
      />
      <path
        fillRule="evenodd"
        d="M5 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"
      />
    </svg>
  );
};

export default Dashboard;
