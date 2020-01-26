import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import {
  Form,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
  Alert,
  Spinner
} from "reactstrap";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { connect } from "react-redux";
import { addTransaction } from "../actions/transactionActions";

export class TransactionModal extends Component {
  static propTypes = {
    addTransaction: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
    loading: PropTypes.bool
  };

  state = {
    modal: false,
    expense: "",
    doneFor: "",
    doneAt: new Date(),
    msg: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = (name, value) => {
    this.setState({
      [name]: value
    });
  };

  handleDate = date => {
    this.setState({
      doneAt: date
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { expense, doneFor, doneAt } = this.state;
    const today = new Date();
    if (!expense || !doneFor) {
      this.setState({
        msg: "Enter all Fields"
      });
    } else if (doneAt > today) {
      this.setState({
        doneAt: today,
        msg: "Date should be less than today"
      });
    } else {
      this.setState({
        msg: ""
      });
      const newTransaction = {
        expense,
        doneFor,
        doneAt
      };

      // Add Transaction via reducer
      this.props.addTransaction(newTransaction);

      // Close Modal
      this.toggle();
    }
  };

  validateExpense = evt => {
    let { name, value } = evt.target;
    if (value === "" || value === "0" || !parseInt(value)) {
      value = "";
    }
    this.onChange(name, value);
  };
  validateDoneFor = evt => {
    let { name, value } = evt.target;
    this.onChange(name, value);
  };

  render() {
    const { msg } = this.state;
    return (
      <div>
        {this.props.isAuthenticated ? (
          <Button
            color="dark"
            style={{ marginBottom: "2rem" }}
            onClick={this.toggle}
          >
            Add Transaction
          </Button>
        ) : (
          <Alert color="info">
            <h4 className="text-center">Please Login to Manage Expenses</h4>
          </Alert>
        )}
        <Modal centered isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Expense</ModalHeader>
          <ModalBody>
            {msg ? <Alert color="danger">{msg}</Alert> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="expense">Expense</Label>
                <Input
                  type="text"
                  id="expense"
                  name="expense"
                  placeholder="Enter Expense"
                  value={this.state.expense}
                  onChange={this.validateExpense}
                />
                <Label for="doneFor">Done For</Label>
                <Input
                  type="text"
                  id="doneFor"
                  name="doneFor"
                  placeholder="Enter Purpose"
                  value={this.state.doneFor}
                  onChange={this.validateDoneFor}
                />

                <Label for="doneAt">Done At</Label>
                <DatePicker
                  selected={this.state.doneAt}
                  onChange={this.handleDate}
                  className="datePicker form-control"
                />
                <Button
                  color="dark"
                  style={{ marginTop: "2rem" }}
                  block
                  disabled={this.props.loading}
                >
                  {this.props.loading ? (
                    <Fragment>
                      {"Add Transaction "}
                      <Spinner
                        style={{
                          width: "1.2rem",
                          height: "1.2rem",
                          marginLeft: "5px"
                        }}
                      />
                    </Fragment>
                  ) : (
                    "Add Transaction"
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
  loading: state.transaction.loading
});
export default connect(mapStateToProps, { addTransaction })(TransactionModal);
