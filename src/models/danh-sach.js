function DanhSach() {
  this.arr = [];
  this.them = function (nv) {
    this.arr.push(nv);
  };
  this.tim = function (maNV) {
    var index = -1;
    this.arr.forEach(function (nv, i) {
      if (nv.maNV === maNV) {
        index = i;
      }
    });
    return index;
  };
  this.xoa = function (maNV) {
    var index = this.tim(maNV);
    if (index !== -1) {
      this.arr.splice(index, 1);
    }
  };
  this.layThongTin = function (maNV) {
    var index = this.tim(maNV);
    if (index !== -1) {
      return this.arr[index];
    }
    return null;
  };
  this.capNhat = function (nv) {
    var index = this.tim(nv.maNV);
    if (index !== -1) {
      this.arr[index] = nv;
    }
  };
  this.timKiem = function (keyword) {
    mang = [];
    this.arr.forEach(function (nv) {
      if (nv.hoTen.toLowerCase().indexOf(keyword.toLowerCase()) !== -1) {
        mang.push(nv);
      }
    });
    return mang;
  };
}
