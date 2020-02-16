import React from "react";
import { Container, Alert } from "reactstrap";

const Welcome = () => {
  return (
    <Container>
      <Alert color="info">
        <h4>Welcome to MyExpense App.</h4>
        <p>Please Login to manage your expenses.</p>
      </Alert>
    </Container>
  );
};

export default Welcome;
