function Validation() {
  this.check = function (value, spanId, message) {
    if (value === "") {
      get(spanId).style.display = "block";
      get(spanId).innerHTML = message;
      return false;
    }
    get(spanId).style.display = "none";
    get(spanId).innerHTML = "";
    return true;
  };
  this.kiemTra = function (idSelect, spanId, message) {
    console.log({idSelect});
    // chổ này phải là dom mới sử dụng selectedIndex đc nhé
    if (get(idSelect) !== 0) {
      get(spanId).style.display = "block";
      get(spanId).innerHTML = message;
      return false;
    }
    get(spanId).style.display = "none";
    get(spanId).innerHTML = "";
    return true;
  };
}
