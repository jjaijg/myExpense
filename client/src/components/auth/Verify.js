import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import {
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert
} from "reactstrap";
import { verifyAccount, sendVerifyLink } from "../../actions/authActions";

export class Verify extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    verifyAccount: PropTypes.func.isRequired,
    sendVerifyLink: PropTypes.func.isRequired
  };

  state = {
    email: "",
    msg: null
  };

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    // get email
    const { email } = this.state;
    // get confirmation token
    const { confirmation } = this.props.match.params;
    // Atempt to cofirm Account
    confirmation
      ? this.props.verifyAccount(email, confirmation)
      : this.props.sendVerifyLink(email);
  };
  render() {
    // const { msg } = this.state;
    const { confirmation } = this.props.match.params;
    const { msg: errMsg, success, id } = this.props.error;
    const alert =
      success || id === "EMAIL_VERIFY_SENT" ? (
        <Alert color="success">{errMsg.msg}</Alert>
      ) : errMsg.msg && (id === "VERIFY_FAIL" || id === "EMAIL_VERIFY_FAIL") ? (
        <Alert color="danger">{errMsg.msg}</Alert>
      ) : null;
    return (
      <Container>
        {/* {msg ? <Alert color="danger">{msg}</Alert> : null} */}
        {alert}
        <h4>Account Confirmation</h4>
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            {confirmation ? (
              <Label for="email">Enter Email to confirm</Label>
            ) : (
              <Label for="email">Enter Email to send Verification</Label>
            )}
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="mb-3"
              onChange={this.onChange}
            />

            <Button color="dark" block style={{ marginTop: "2rem" }}>
              {confirmation ? "Verify Email" : "Send verify link"}
            </Button>
          </FormGroup>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default withRouter(
  connect(mapStateToProps, { verifyAccount, sendVerifyLink })(Verify)
);
