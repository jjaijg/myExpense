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
  Col,
  Row,
  Alert,
  Spinner
} from "reactstrap";

import { changeName } from "../../actions/authActions";

const Personal = ({ user, error, isLoading, changeName }) => {
  const [name, setName] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (error.id === "UPDATE_PROFILE_FAIL") {
      setMsg(error.msg.msg);
      setSuccess(false);
    } else if (error.id === "UPDATE_PROFILE_SUCCESS") {
      setMsg(error.msg.msg);
      setSuccess(true);
    } else setMsg("");
  }, [error]);

  const handleChange = e => {
    setName(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();

    setSuccess(false);
    if (!name) setMsg("Please enter all fields!!!");
    else if (name.length < 3) setMsg("Name must be minimum 3 characters.");
    else {
      setMsg("Updaing name");
      changeName(name);
    }
  };

  const color = success ? "success" : "danger";

  return (
    <Card outline color="info" className="mb-3">
      <CardHeader>
        <CardTitle>
          <h5>Personal Information</h5>
        </CardTitle>
      </CardHeader>
      <CardBody>
        {msg ? <Alert color={color}>{msg}</Alert> : null}

        <Form onSubmit={onSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              type="text"
              value={user.name}
              className="mb-3"
              hidden={isEdit}
              disabled
              onChange={handleChange}
            />
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              className="mb-3"
              value={name}
              hidden={!isEdit}
              onChange={handleChange}
            />

            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={user.email}
              disabled
              className="mb-3"
            />

            {isEdit ? (
              <Row xs="2">
                <Col>
                  <Button color="dark" block>
                    {isLoading ? (
                      <Fragment>
                        {"Update "}
                        <Spinner
                          style={{
                            width: "1.2rem",
                            height: "1.2rem",
                            marginLeft: "3px"
                          }}
                        />
                      </Fragment>
                    ) : (
                      "Update"
                    )}
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="button"
                    color="dark"
                    block
                    color="danger"
                    onClick={e => {
                      e.preventDefault();
                      setIsEdit(false);
                    }}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            ) : (
              <Button
                type="button"
                color="dark"
                block
                onClick={e => {
                  e.preventDefault();
                  setIsEdit(true);
                }}
              >
                Edit
              </Button>
            )}
          </FormGroup>
        </Form>
      </CardBody>
    </Card>
  );
};

Personal.propTypes = {
  user: PropTypes.object.isRequired,
  changeName: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  isLoading: state.auth.isLoading,
  error: state.error
});

export default connect(mapStateToProps, {
  changeName
})(Personal);
