import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  CardDeck,
  Container,
  Button,
  Badge,
  CardSubtitle
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import uuid from "uuid";

export class Transactions extends Component {
  state = {
    transactions: [
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 100,
        doneFor: "milk",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 100,
        doneFor: "milk",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 200,
        doneFor: "milk",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 300,
        doneFor: "ghee",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 400,
        doneFor: "milk",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 500,
        doneFor: "veg",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 200,
        doneFor: "milk",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 300,
        doneFor: "ghee",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 400,
        doneFor: "milk",
        doneAt: new Date()
      },
      {
        id: uuid(),
        doneBy: uuid(),
        expense: 500,
        doneFor: "veg",
        doneAt: new Date()
      }
    ]
  };
  render() {
    const { transactions } = this.state;
    return (
      <Container>
        <Button color="dark" className="sm mb-3">
          Add Transaction
        </Button>
        <TransitionGroup className="transactions-effect">
          <CardDeck>
            {transactions.map(({ id, doneBy, doneFor, expense, doneAt }) => {
              return (
                <CSSTransition key={id} classNames="fade" timeout={500}>
                  <Card
                    className="mb-3 mr-3"
                    key={id}
                    outline
                    color="secondary"
                  >
                    <CardBody>
                      <CardTitle>
                        <strong>Jai</strong>
                        <Button close className="text-danger" />
                        <CardText>
                          <Badge color="light">{doneAt.toDateString()}</Badge>
                        </CardText>
                      </CardTitle>
                      <hr></hr>
                      <CardSubtitle className="mb-3">
                        <h5>
                          Rs. <Badge color="danger">{expense}</Badge>
                        </h5>
                      </CardSubtitle>
                      <CardText>
                        <Badge color="info">{doneFor}</Badge>
                      </CardText>
                    </CardBody>
                  </Card>
                </CSSTransition>
              );
            })}
          </CardDeck>
        </TransitionGroup>
      </Container>
    );
  }
}

export default Transactions;
