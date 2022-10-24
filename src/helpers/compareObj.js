function compareObj(a, b, id) {
  a.sort((a, b) => a[id] - b[id]);
  b.sort((a, b) => a[id] - b[id]);
  return JSON.stringify(a) === JSON.stringify(b);
}

export default compareObj;
