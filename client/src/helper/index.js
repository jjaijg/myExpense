export function compare(a, b) {
  const doneA = a.doneAt;
  const doneB = b.doneAt;

  let comparison = 0;
  if (doneA < doneB) {
    comparison = 1;
  } else if (doneA > doneB) {
    comparison = -1;
  }
  return comparison;
}

export const colorGenerator = n => {
  // storing all letter and digit combinations
  // for html color code
  let colors = [];
  let letters = "0123456789ABCDEF";

  // html color code starts with #
  let color = "#";

  // generating 6 times as HTML color code consist
  // of 6 letter or digits
  for (let _ = 0; _ < n; _++) {
    for (let i = 0; i < 6; i++)
      color += letters[Math.floor(Math.random() * 16)];
    colors.push(color);
    color = "#";
  }
  return colors;
};
