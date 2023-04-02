$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

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
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td> <td><button data-id= \'' +
            data[i].administrator_name +
            '\' class="edit-btn">تعديل <i class="fas fa-edit" aria-hidden="true"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }

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

  $("#add,#edit").hover(
    function () {
      $(this).css({
        "background-color": "#C58940",
        color: "white",
      });
    },
    function () {
      $(this).css({
        "background-color": "transparent",
        color: "#C58940",
      });
    }
  );

  $("#info input:nth-child(2)").keyup(function () {
    if ($("#info input:nth-child(2)").val() == "") {
      $("#add").prop("disabled", true);
      $("#add").css({
        cursor: "auto",
      });
    } else {
      $("#add").prop("disabled", false);
      $("#add").css({
        cursor: "pointer",
      });
    }
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `participants`";
    } else {
      sql =
        "SELECT * FROM `participants` WHERE `participants_name` like '%" +
        val +
        "%' || `nickname` like '%" +
        val +
        "%'";
    }
    reload(sql);
  });

  sql = "SELECT * FROM `administrator`";
  reload(sql);

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n == true) {
      id = $(this).data("id");
      sql =
        "DELETE FROM `administrator` WHERE `administrator_name` = '" + id + "'";
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

  let id;
  $("#table").on("click", ".edit-btn", function () {
    id = $(this).data("id");
    sql =
      "SELECT * FROM `administrator` WHERE `administrator_name`='" + id + "'";
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
      id +
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
        } else {
          $("#not").text("لم يتم حفظ البيانات: " + out);
        }
      },
    });
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
    $(".dropdown-content").toggle();
  });
});
