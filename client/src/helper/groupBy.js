// import { colorGenerator } from "./index";
export const byDoneFor = arr => {
  let grpBy = {};
  arr.forEach(({ expense, doneFor }) => {
    const donefor = doneFor.toLowerCase().trim();
    if (grpBy.hasOwnProperty(donefor)) {
      grpBy[donefor] += expense;
    } else {
      grpBy[donefor] = expense;
    }
  });
  // const chartData = {
  //   labels: Object.keys(grpBy),
  //   datasets: [
  //     {
  //       label: "Expense",
  //       data: Object.values(grpBy),
  //       backgroundColor: colorGenerator(Object.keys(grpBy).length)
  //     }
  //   ]
  // };
  return grpBy;
};

export const byDoneAt = arr => {
  let grpBy = {};
  arr.forEach(trans => {
    const doneAt = new Date(trans.doneAt).toDateString();
    if (grpBy.hasOwnProperty(doneAt)) {
      grpBy[doneAt].push(trans);
    } else {
      grpBy[doneAt] = [trans];
    }
  });
  return grpBy;
};

export const byType = arr => {
  const exp = {
    spent: 0,
    earned: 0
  };
  arr.forEach(trans => {
    if (trans.type === "c") exp.earned += trans.expense;
    else exp.spent += trans.expense;
  });
  return exp;
};
