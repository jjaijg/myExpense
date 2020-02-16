import React, { Component, Fragment } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
  Spinner
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterModal extends Component {
  state = {
    modal: false,
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };
  toggle = () => {
    // Clear error before close modal
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    // get details
    const { name, email, password, confirmPassword } = this.state;
    // Check password
    if (!name || !email || !password || !confirmPassword) {
      // populate msg
      this.setState({
        msg: "Please enter all fields!!!"
      });
    } else if (password !== confirmPassword) {
      // populate msg
      this.setState({
        msg: "Password Does not match"
      });
    } else {
      // Reset error msg
      this.setState({
        msg: null
      });
      // create new user obj
      const newUser = {
        name,
        email,
        password
      };
      // Atempt to register
      this.props.register(newUser);
    }
  };

  render() {
    const { msg, success } = this.props.error;
    const { name, email, password, confirmPassword } = this.state;
    const alert = success ? (
      <Alert color="success">{msg.msg}</Alert>
    ) : msg.msg ? (
      <Alert color="danger">{msg.msg}</Alert>
    ) : null;
    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Register
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Register</ModalHeader>
          <ModalBody>
            {alert}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  value={name}
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={email}
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="Confirm password">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  className="mb-3"
                  onChange={this.onChange}
                />
                <Button
                  color="dark"
                  block
                  style={{ marginTop: "2rem" }}
                  disabled={this.props.isLoading}
                >
                  {this.props.isLoading ? (
                    <Fragment>
                      {"Register "}
                      <Spinner
                        style={{
                          width: "1.2rem",
                          height: "1.2rem",
                          marginLeft: "5px"
                        }}
                      />
                    </Fragment>
                  ) : (
                    "Register"
                  )}
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
  error: state.error
});

export default connect(mapStateToProps, { register, clearErrors })(
  RegisterModal
);
