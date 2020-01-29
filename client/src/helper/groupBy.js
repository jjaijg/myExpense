import { colorGenerator } from "./index";
export const byDoneFor = arr => {
  console.log(arr);
  let grpBy = {};
  arr.map(({ expense, doneFor }) => {
    const donefor = doneFor.toLowerCase().trim();
    if (grpBy.hasOwnProperty(donefor)) {
      grpBy[donefor] += expense;
    } else {
      grpBy[donefor] = expense;
    }
  });
  const chartData = {
    labels: Object.keys(grpBy),
    datasets: [
      {
        label: "Expense",
        data: Object.values(grpBy),
        backgroundColor: colorGenerator(Object.keys(grpBy).length)
      }
    ]
  };
  console.log(chartData);
  return chartData;
};
