import React from "react";
import {
  Card,
  CardBody,
  CardText,
  CardTitle,
  Badge,
  CardSubtitle
} from "reactstrap";
import DeleteConfirmModal from "./DeleteConfirmModal";

const TransactionCard = ({ _id, color, expense, doneFor, dd, name }) => {
  return (
    <Card className="mb-3 mr-3" outline color={color}>
      <CardBody>
        <CardTitle>
          <strong className="name">{name}</strong>
          <DeleteConfirmModal id={_id} />
          <CardText>
            <Badge color="light">{dd.toDateString()}</Badge>
            <Badge color="light" className="ml-1">
              {dd.toLocaleTimeString()}
            </Badge>
          </CardText>
        </CardTitle>
        <hr></hr>
        <CardSubtitle className="mb-3">
          <h5>
            Rs. <Badge color={color}>{expense}</Badge>
          </h5>
        </CardSubtitle>
        <CardText>
          <Badge color="info">{doneFor.toUpperCase()}</Badge>
        </CardText>
      </CardBody>
    </Card>
  );
};

export default TransactionCard;
