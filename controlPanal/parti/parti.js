$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

  $(document).on("click", function (event) {
    // Get the target element that was clicked
    const clickedElement = event.target;

    // Get the dropdown element you want to exclude
    const dropdownElement = $("#myDropdown");

    const h = $("#myDropdownText");
    const icon = $("#myDropdownIcon");

    // Check if the clicked element is the dropdown or its child elements
    if (
      dropdownElement.has(clickedElement).length > 0 ||
      h.is(clickedElement) ||
      icon.is(clickedElement)
    ) {
      return; // Do nothing if the clicked element is inside the dropdown
    }

    // Add the hideDropDown class to the dropdown
    dropdownElement.addClass("hideDropDown");
  });

  function reload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht =
          "<tr> <th>الاسم</th> <th>الجنس</th>" +
          " <th>الدرجة العلمية</th> <th>تاريخ الميلاد</th>" +
          "<th>الهاتف</th> <th>الايميل</th> <th>المحافظة</th>" +
          "<th>المنطقة</th> <th>حذف</th> <th>تعديل</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].administrator_name +
            "</td> <td>" +
            data[i].sex +
            "</td> <td>" +
            data[i].university_degree +
            "</td> <td>" +
            data[i].birthday +
            "</td> <td>" +
            data[i].phone +
            "</td> <td>" +
            data[i].email +
            "</td> <td>" +
            data[i].governorate +
            "</td> <td>" +
            data[i].city +
            "</td> <td><button data-id= '" +
            data[i].administrator_name +
            "-" +
            data[i].email +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td> <td><button data-id= \'' +
            data[i].administrator_name +
            "-" +
            data[i].email +
            '\' class="edit-btn">تعديل <i class="fas fa-edit" aria-hidden="true"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  sql = "SELECT * FROM `administrator`";
  reload(sql);

  $("#add").click(function () {
    nameAdd = $("#name").val();
    sex = $("#sex").val();
    degree = $("#degree").val();
    phone = $("#phone").val();
    email = $("#email").val();
    gov = $("#gov").val();
    city = $("#city").val();
    birthday = $("#birthday").val();

    if (
      nameAdd === "" ||
      sex === "" ||
      degree === "" ||
      phone === "" ||
      email === "" ||
      gov === "" ||
      city === "" ||
      birthday === ""
    ) {
      $("#not").text("من فضلك أضف جميع البيانات");
      var emptyFields = [];

      if (nameAdd === "") {
        emptyFields.push("#name");
      }
      if (sex === "") {
        emptyFields.push("#sex");
      }
      if (degree === "") {
        emptyFields.push("#degree");
      }
      if (phone === "") {
        emptyFields.push("#phone");
      }
      if (email === "") {
        emptyFields.push("#email");
      }
      if (gov === "") {
        emptyFields.push("#gov");
      }
      if (city === "") {
        emptyFields.push("#city");
      }

      if (birthday === "") {
        emptyFields.push("#birthday");
      }
      if (emptyFields.length > 0) {
        $(emptyFields.join(",")).css("border-color", "red");
      }
    } else {
      $("input").css("border-color", "#ccc");
      sqlAdd =
        "INSERT INTO `administrator`(`administrator_name`, `sex`, `university_degree`, `birthday`, `phone`, `email`, `governorate`, `city`) VALUES ('" +
        nameAdd +
        "','" +
        sex +
        "','" +
        degree +
        "','" +
        birthday +
        "','" +
        phone +
        "','" +
        email +
        "','" +
        gov +
        "','" +
        city +
        "')";
      $.ajax({
        url: "../phpFile/add.php",
        data: { sqlAdd: sqlAdd },
        type: "post",
        success: function (out) {
          if (out == "successfully") {
            $("input").val("");
            $("#not").text("تمت الأضافة");
            reload("SELECT * FROM `administrator`");
          } else {
            $("#not").text("لم يتم حفظ البيانات: " + out);
          }
        },
      });
    }
  });

  function areaReload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].area_name +
            '">' +
            data[i].area_name +
            "</option>";
        }
        $("#gov").html(ht);
      },
    });
  }
  areaReload("SELECT * FROM `area`");

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `administrator`";
    } else {
      sql =
        "SELECT * FROM `administrator` WHERE `administrator_name` like '%" +
        val +
        "%' || `sex` like '%" +
        val +
        "%'|| `university_degree` like '%" +
        val +
        "%'|| `birthday` like '%" +
        val +
        "%'|| `phone` like '%" +
        val +
        "%'|| `email` like '%" +
        val +
        "%'|| `governorate` like '%" +
        val +
        "%'|| `city` like '%" +
        val +
        "%'";
    }
    reload(sql);
  });

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n == true) {
      id = $(this).data("id");
      const myArray = id.split("-");
      sql =
        "DELETE FROM `administrator` WHERE `administrator_name` = '" +
        myArray[0] +
        "' && `email`='" +
        myArray[1] +
        "'";
      $.ajax({
        url: "../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          if (out == "remove successfully") {
            reload("SELECT * FROM `administrator`");
          } else {
            $("#not").text("لم يتم الحذف: " + out);
          }
        },
      });
    }
  });

  let myArray;
  $("#table").on("click", ".edit-btn", function () {
    $("#not").text("");
    let id = $(this).data("id");
    myArray = id.split("-");
    sql =
      "SELECT * FROM `administrator` WHERE `administrator_name`='" +
      myArray[0] +
      "' && `email`='" +
      myArray[1] +
      "'";
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      type: "post",
      dataType: "json",
      success: function (out) {
        administrator_name = out[0].administrator_name;
        sex = out[0].sex;
        university_degree = out[0].university_degree;
        birthday = out[0].birthday;
        phone = out[0].phone;
        email = out[0].email;
        governorate = out[0].governorate;
        city = out[0].city;

        $("#name").val(administrator_name);
        $("#sex").val(sex);
        $("#degree").val(university_degree);
        $("#phone").val(phone);
        $("#email").val(email);
        $("#gov").val(governorate);
        $("#city").val(city);
        $("#birthday").val(birthday);

        $("html, body").animate({ scrollTop: 0 }, "slow");

        $("#add").hide();
        $("#edit").show();
        $("#tableDis").hide();
        $("#cancelEdit").toggle();
      },
    });
  });

  $("#edit").click(function () {
    nameAdd = $("#name").val();
    sex = $("#sex").val();
    degree = $("#degree").val();
    phone = $("#phone").val();
    email = $("#email").val();
    gov = $("#gov").val();
    city = $("#city").val();
    birthday = $("#birthday").val();
    sqlup =
      "UPDATE `administrator` SET `administrator_name`='" +
      nameAdd +
      "',`sex`='" +
      sex +
      "',`university_degree`='" +
      degree +
      "',`birthday`='" +
      birthday +
      "',`phone`='" +
      phone +
      "',`email`='" +
      email +
      "',`governorate`='" +
      gov +
      "',`city`='" +
      city +
      "' WHERE `administrator_name`='" +
      myArray[0] +
      "' && `email`='" +
      myArray[1] +
      "'";

    $.ajax({
      url: "../phpFile/update.php",
      data: { sqlup: sqlup },
      type: "post",
      success: function (out) {
        if (out == "New record update successfully") {
          $("input").val("");
          $("#not").text("تم التعديل");
          reload("SELECT * FROM `administrator`");
          $("#add").toggle();
          $("#edit").toggle();
          $("#tableDis").toggle();
          $("#cancelEdit").toggle();
        } else {
          $("#not").text("لم يتم حفظ البيانات: " + out);
        }
      },
    });
  });

  $("#cancelEdit").click(function () {
    $("input").val("");
    $("#add").toggle();
    $("#edit").toggle();
    $("#tableDis").toggle();
    $("#cancelEdit").toggle();
    $("#not").text("");
  });

  $("#nav i").click(function () {
    $("#smallList").toggle(300);
  });

  $("#links img").click(function () {
    window.location.replace("Home.html");
  });

  $("#nav button span").click(function () {
    localStorage.setItem("login", 0);
    window.location.href = "../../login.html";
  });

  $("#other").click(function () {
    $(".dropdown-content").toggleClass("hideDropDown");
  });

  $("#save").click(function () {
    let nameAdd = $("#name").val();
    let sex = $("#sex").val();
    let degree = $("#degree").val();
    let phone = $("#phone").val();
    let email = $("#email").val();
    let gov = $("#gov").val();
    let city = $("#city").val();
    let birthday = $("#birthday").val();

    localStorage.setItem("name", nameAdd);
    localStorage.setItem("sex", sex);
    localStorage.setItem("degree", degree);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("gov", gov);
    localStorage.setItem("city", city);
    localStorage.setItem("birthday", birthday);
  });

  $("#reload").click(function () {
    $("#name").val(localStorage.getItem("name"));
    $("#sex").val(localStorage.getItem("sex"));
    $("#degree").val(localStorage.getItem("degree"));
    $("#phone").val(localStorage.getItem("phone"));
    $("#email").val(localStorage.getItem("email"));
    $("#gov").val(localStorage.getItem("gov"));
    $("#city").val(localStorage.getItem("city"));
    $("#birthday").val(localStorage.getItem("birthday"));
  });
});
