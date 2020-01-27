import React, { Component } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";

export default class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ["Name1", "Name2", "Name3", "Name4", "Name5", "Name5"],
        datasets: [
          {
            label: "Popular",
            data: [100, 90, 85, 86, 75, 30],
            backgroundColor: [
              "deeppink",
              "skyblue",
              "lightgreen",
              "yellow",
              "orange",
              "cyan"
            ]
          }
        ]
      }
    };
  }
  render() {
    return (
      <div className="Chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: "true",
              text: "My Popular List",
              fontSize: 25
            },
            legend: {
              display: false,
              position: "left"
            }
          }}
        />
      </div>
    );
  }
}
