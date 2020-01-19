import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  InputGroup,
  Form,
  FormGroup,
  Label,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Input
} from "reactstrap";

import { connect } from "react-redux";
import { addTransaction } from "../actions/transactionActions";
import uuid from "uuid";

export class TransactionModal extends Component {
  static propTypes = {
    addTransaction: PropTypes.func.isRequired
  };

  state = {
    modal: false,
    expense: "",
    doneFor: ""
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

  onSubmit = e => {
    e.preventDefault();
    const newTransaction = {
      expense: this.state.expense,
      doneFor: this.state.doneFor
    };

    // Add Transaction via reducer
    this.props.addTransaction(newTransaction);

    // Close Modal
    this.toggle();
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
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={this.toggle}
        >
          Add Transaction
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add to Expense</ModalHeader>
          <ModalBody>
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
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Transaction
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default connect(null, { addTransaction })(TransactionModal);
