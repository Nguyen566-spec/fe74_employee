function get(id) {
  return document.getElementById(id);
}

var ds = new DanhSach();
var validation = new Validation();

getLocalStorage();

function resetForm() {
  get("formNV").reset();
}

get("btnThem").addEventListener("click", function () {
  get("btnCapNhat").style.display = "none";
  get("btnThemNV").style.display = "flex";
  get("msnv").disabled = false;
  resetForm();
});

get("btnCapNhat").addEventListener("click", function () {
  var nv = layThongTin();
  ds.capNhat(nv);
  render(ds.arr);
  get("btnDong").click();
  setLocalStorage();
});

get("searchName").addEventListener("keyup", function () {
  var keyword = get("searchName").value;
  var mang = ds.timKiem(keyword);
  render(mang);
});

function layThongTin() {
  var msnv = get("msnv").value;
  var name = get("name").value;
  var email = get("email").value;
  var password = get("password").value;
  var date = get("datepicker").value;
  var chucvu = get("chucvu").value;
  var isValid = true;
  isValid &= validation.check(msnv, "tbMaNV", "Vui lòng nhập mã nhân viên");
  isValid &= validation.check(name, "tbTen", "Vui lòng nhập họ tên");
  isValid &= validation.check(email, "tbEmail", "Vui lòng nhập email");
  isValid &= validation.check(password, "tbMatKhau", "Vui lòng nhập mật khẩu");
  isValid &= validation.check(date, "tbNgay", "Vui lòng nhập ngày");
  isValid &= validation.kiemTra(chucvu, "tbChucVu", "Vui lòng nhập chức vụ");
  if (!isValid) return null;
  console.log({isValid});
  var nv = new NhanVien(msnv, name, email, password, date, chucvu);
  return nv;
}

get("btnThemNV").addEventListener("click", function () {
  var nv = layThongTin();
  ds.them(nv);
  render(ds.arr);
  get("btnDong").click();
  setLocalStorage();
});

// function render(data) {
//   var content = "";
//   for (var i = 0; i < data.length; i++) {
//     var nv = data[i];
//     content += "<tr>";
//     content += "<td>" + nv.maNV + "</td>";
//     content += "<td>" + nv.hoTen + "</td>";
//     content += "<td>" + nv.email + "</td>";
//     content += "<td>" + nv.ngaySinh + "</td>";
//     content += "<td>" + nv.chucVu + "</td>";
//     content += "</tr>";
//     get("tableDanhSach").innerHTML = content;
//   }
// }

function render(data) {
  var content = "";
  console.log("dât" , data)
  data.forEach(function (nv) {
    content += `<tr>
      <td>${nv.maNV}</td>
      <td>${nv.hoTen}</td>
      <td>${nv.email}</td>
      <td>${nv.ngaySinh}</td>
      <td>${nv.chucVu}</td>
      <td>
        <button class='btn btn-success' data-toggle='modal' data-target='#myModal' onclick='editNV("${nv.maNV}")'>Cập nhật</button>
        <button class='btn btn-danger' onclick='deleteNV("${nv.maNV}")'>Xóa</button>
      </td>
    </tr>`;
  });
  get("tableDanhSach").innerHTML = content;
}

function editNV(maNV) {
  get("btnThemNV").style.display = "none";
  get("btnCapNhat").style.display = "flex";
  var nv = ds.layThongTin(maNV);
  if (nv) {
    get("msnv").value = nv.maNV;
    get("msnv").disabled = true;
    get("name").value = nv.hoTen;
    get("email").value = nv.email;
    get("password").value = nv.matKhau;
    get("datepicker").value = nv.ngaySinh;
    get("chucvu").value = nv.chucVu;
  }
}

function deleteNV(maNV) {
  ds.xoa(maNV);
  render(ds.arr);
  setLocalStorage();
}

function setLocalStorage() {
  var dataString = JSON.stringify(ds.arr);
  localStorage.setItem("dsnv", dataString);
}

function getLocalStorage() {
  var data = localStorage.getItem("dsnv");
  ds.arr = JSON.parse(data);
  render(ds.arr);
}
