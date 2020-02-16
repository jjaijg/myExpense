import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Alert,
  Spinner
} from "reactstrap";

import { changePassword } from "../../actions/authActions";

const ChangePw = ({ error, changePassword, isLoading }) => {
  const [oldpw, setOldpw] = useState("");
  const [newpw, setNewpw] = useState("");
  const [confirmpw, setConfirmpw] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (error.id === "CHANGE_PW_FAIL") {
      setMsg(error.msg.msg);
      setSuccess(false);
    } else if (error.id === "CHANGE_PW_SUCCESS") {
      setMsg(error.msg.msg);
      setSuccess(true);
      setOldpw("");
      setNewpw("");
      setConfirmpw("");
    } else setMsg("");
  }, [error]);

  const onSubmit = e => {
    e.preventDefault();
    setSuccess(false);
    if (!oldpw || !newpw || !confirmpw) setMsg("Please enter all fields!!!");
    else if (oldpw.toLowerCase() === newpw.toLowerCase())
      setMsg("New password should not be same as old!!!");
    else if (newpw.toLowerCase().includes(oldpw.toLowerCase()))
      setMsg(
        "Does not meet requirement : should not be similar to old password."
      );
    else if (newpw.length < 5) setMsg("Password must be minimum 5 characters.");
    else if (newpw !== confirmpw) setMsg("Password doesnot match.");
    else {
      setMsg("Updating password");
      changePassword(oldpw, newpw);
    }
  };

  const color = success ? "success" : "danger";

  return (
    <Fragment>
      <Card outline color="danger" className="mb-3">
        <CardHeader>
          <CardTitle>
            <h5>Change Password</h5>
          </CardTitle>
        </CardHeader>
        <CardBody>
          {msg ? <Alert color={color}>{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="old password">Old Password</Label>
              <Input
                type="password"
                name="oldpw"
                id="oldpw"
                placeholder="Old password"
                className="mb-3"
                value={oldpw}
                onChange={e => setOldpw(e.target.value)}
              />

              <Label for="new password">New Password</Label>
              <Input
                type="password"
                name="newpw"
                id="newpw"
                placeholder="New password"
                className="mb-3"
                value={newpw}
                onChange={e => setNewpw(e.target.value)}
              />

              <Label for="confirm password">Confirm Password</Label>
              <Input
                type="password"
                name="confirmpw"
                id="confirmpw"
                placeholder="Confirm password"
                className="mb-3"
                value={confirmpw}
                onChange={e => setConfirmpw(e.target.value)}
              />

              <Button
                color="dark"
                block
                style={{ marginTop: "2rem" }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <Fragment>
                    {"Update Password "}
                    <Spinner
                      style={{
                        width: "1.2rem",
                        height: "1.2rem",
                        marginLeft: "3px"
                      }}
                    />
                  </Fragment>
                ) : (
                  "Update Password"
                )}
              </Button>
            </FormGroup>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

ChangePw.propTypes = {
  changePassword: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  isLoading: state.auth.isLoading,
  error: state.error
});

export default connect(mapStateToProps, { changePassword })(ChangePw);
