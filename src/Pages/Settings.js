import React, { Fragment, useEffect } from "react";
import { Form, Table, Spinner, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetLevel, clearOther } from "../Redux/Actions/user";
const Setting = (props) => {
  const respon = useSelector((state) => state.user.level.result);
  const condition = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetLevel());
    dispatch(clearOther());
  }, []);

  return (
    <Fragment>
      <div className="container">
        {condition.isRejected ? (
          <Alert variant="danger">Server Error</Alert>
        ) : null}
        <div className="mt-4">
          <h2>Setting Level Permmisions </h2>
        </div>
        <div className="mt-3">
          {respon ? (
            <Table striped responsive>
              <thead>
                <tr className="text-center">
                  <th>#</th>
                  <th>Level Name</th>
                  <th>Add Permmision</th>
                  <th>Edit Permmision</th>
                  <th>Delete Permmision</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {respon.map((data, key) => (
                  <Fragment key={key}>
                    <tr>
                      <td>{key + 1}</td>
                      <td>{data.name}</td>
                      <td className="text-center">
                        <Form.Check
                          readOnly
                          checked={data.perm_add ? true : false}
                          size={10}
                        />
                      </td>
                      <td className="text-center">
                        {" "}
                        <Form.Check
                          readOnly
                          checked={data.perm_edit ? true : false}
                          size={10}
                        />
                      </td>
                      <td className="text-center">
                        {" "}
                        <Form.Check
                          readOnly
                          checked={data.perm_delete ? true : false}
                          size={10}
                        />
                      </td>
                      <td>
                        <span
                          onClick={() =>
                            props.history.push(`editSetting/${data.id_level}`)
                          }
                          className="badge badge-primary mr-2"
                        >
                          Edit
                        </span>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </Table>
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
      </div>
    </Fragment>
  );
};
export default Setting;
