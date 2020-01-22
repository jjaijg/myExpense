import React, { Component, Fragment } from "react";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Row,
  Col
} from "reactstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { confirmDelete } from "../actions/transactionActions";

class DeleteConfirmModal extends Component {
  state = {
    modal: false
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    confirmDelete: PropTypes.func.isRequired
  };
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <Fragment>
        <Button close className="text-danger" onClick={this.toggle} />
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Confirm Delete</ModalHeader>
          <ModalBody>
            <h5 className="text-center">
              Are you sure, Do you want to delete this transaction?
            </h5>
            <Row xs="2" className="mb-2">
              <Col className="text-center">
                <Button
                  color="info"
                  style={{ marginTop: "2rem" }}
                  onClick={this.toggle}
                >
                  Cancel
                </Button>
              </Col>
              <Col className="text-center">
                <Button
                  color="danger"
                  style={{ marginTop: "2rem" }}
                  onClick={e => {
                    this.props.confirmDelete(this.props.id);
                    this.toggle();
                  }}
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, {
  confirmDelete
})(DeleteConfirmModal);
