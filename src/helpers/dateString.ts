const dateString = (datenumber: string | number) => {
  if (datenumber) {
    let d = new Date(datenumber);
    let x = d.toString();
    let result = x.substring(0, x.length - 8);
    return result;
  } else {
    return '';
  }
};

export default dateString;
