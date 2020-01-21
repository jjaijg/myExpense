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
