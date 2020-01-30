import React, { Component } from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

import { byDoneFor } from "../helper/groupBy";
import { getTransactions } from "../actions/transactionActions";
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {}
    };
  }
  componentDidMount() {
    if (!this.props.transaction.transactions.length)
      this.props.getTransactions();
    const { transactions } = this.props.transaction;
    this.setState({
      chartData: byDoneFor(transactions)
    });
  }
  render() {
    return (
      <Container>
        <Pie
          data={this.state.chartData}
          options={{
            title: {
              display: "true",
              text: "Transactions based on Purpose",
              fontSize: 25
            },
            legend: {
              display: true,
              position: "left"
            }
          }}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(mapStateToProps, { getTransactions })(Chart);
