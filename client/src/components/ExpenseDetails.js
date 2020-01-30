import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { byType } from "../helper/groupBy";
import { getTransactions } from "../actions/transactionActions";

const createDetails = arr => {
  const exp = byType(arr);
  return (
    <Fragment>
      <h4>Earned : {exp.earned}</h4>
      <h4>Expense : {exp.spent}</h4>
    </Fragment>
  );
};

class ExpenseDetails extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }
  render() {
    const { loading, transactions } = this.props.transaction;

    const render = loading ? <h4>Loading...</h4> : createDetails(transactions);

    return <div>{render}</div>;
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, { byType, getTransactions })(
  ExpenseDetails
);
