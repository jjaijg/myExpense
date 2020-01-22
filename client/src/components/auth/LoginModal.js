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

import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class LoginModal extends Component {
  state = {
    modal: false,
    email: "",
    password: "",
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    isLoading: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
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
    const { email, password } = this.state;
    // create new user obj
    const user = {
      email,
      password
    };
    // Atempt to login
    this.props.login(user);
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.msg
        });
      } else {
        this.setState({ msg: null });
      }
    }

    // if authenticated close the modal
    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }

  render() {
    const { msg } = this.state;

    return (
      <div>
        <NavLink href="#" onClick={this.toggle}>
          Login
        </NavLink>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="mb-3"
                  onChange={this.onChange}
                />

                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
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
                      {"Login "}
                      <Spinner
                        style={{
                          width: "1.2rem",
                          height: "1.2rem",
                          marginLeft: "3px"
                        }}
                      />
                    </Fragment>
                  ) : (
                    "Login"
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

export default connect(mapStateToProps, { login, clearErrors })(LoginModal);
