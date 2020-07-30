import React, { Fragment, useEffect, useState } from "react";
import { Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLevelById,
  updatePermission,
  clearOther,
} from "../Redux/Actions/user";
const SettingPerm = (props) => {
  const respon = useSelector((state) => state.user.levelId.result);
  const condition = useSelector((state) => state.user);
  const check = useSelector((state) => state.user.other);
  const id = props.match.params.id;

  const dispatch = useDispatch();

  const [add, setAdd] = useState();
  const [edit, setEdit] = useState();
  const [deletes, setDeletes] = useState();
  const [namePerm, setNamePerm] = useState();

  const update = () => {
    const data = {
      name: namePerm,
      add: add ? "1" : "0",
      edit: edit ? "1" : "0",
      delete: deletes ? "1" : "0",
    };

    dispatch(updatePermission(data));
  };

  useEffect(() => {
    dispatch(GetLevelById(id));
  }, []);

  useEffect(() => {
    if (respon !== undefined) {
      setAdd(respon.perm_add);
      setEdit(respon.perm_edit);
      setDeletes(respon.perm_delete);
      setNamePerm(respon.name);
    }
  }, [respon]);

  useEffect(() => {
    if (check.error === null) {
      props.history.push("/setting");
    }
  }, [check]);

  return (
    <Fragment>
      <div className="container">
        <div className="mt-4">
          <h2>Setting Level Permmisions </h2>
        </div>
        <div className="mt-3">
          {condition.isLoading ? (
            <Spinner
              as="span"
              animation="border"
              size="lg"
              role="status"
              aria-hidden="true"
            />
          ) : (
            <Fragment>
              <div className="custom-control custom-checkbox">
                <Form.Check
                  label="Add"
                  onChange={() => setAdd(!add)}
                  checked={add ? true : false}
                />
              </div>
              <div className="custom-control custom-checkbox">
                <Form.Check
                  label="Edit"
                  onChange={() => setEdit(!edit)}
                  checked={edit ? true : false}
                />
              </div>
              <div className="custom-control custom-checkbox">
                <Form.Check
                  label="Delete"
                  onChange={() => setDeletes(!deletes)}
                  checked={deletes ? true : false}
                />
              </div>
              <button onClick={() => update()} className="btn btn-primary mt-4">
                Submit
              </button>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};
export default SettingPerm;
