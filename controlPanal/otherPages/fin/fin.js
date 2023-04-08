$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../../login.html");
  }

  function reload(sql) {
    $.ajax({
      url: "../../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht =
          "<tr> <th>الممول</th> <th>المحافظة</th> <th>المنطقة</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].project_financier_name +
            "</td><td>" +
            data[i].governorate +
            "</td><td>" +
            data[i].city +
            "</td><td><button data-id= '" +
            data[i].project_financier_name +
            "-" +
            data[i].governorate +
            "-" +
            data[i].city +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td> <td><button data-id= \'' +
            data[i].project_financier_name +
            "-" +
            data[i].governorate +
            "-" +
            data[i].city +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `financier`");

  function areaReload(sql) {
    $.ajax({
      url: "../../phpFile/show.php",
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

  $("#add").click(function () {
    let project_financier_name = $("#name").val();
    let governorate = $("#gov").val();
    let city = $("#area").val();
    sqlAdd =
      "INSERT INTO `financier`(`project_financier_name`, `governorate`, `city`) VALUES ('" +
      project_financier_name +
      "','" +
      governorate +
      "','" +
      city +
      "')";

    $.ajax({
      url: "../../phpFile/add.php",
      data: { sqlAdd: sqlAdd },
      type: "post",
      success: function (out) {
        if (out == "successfully") {
          $("input").val("");
          $("#not").text("تمت الأضافة بنجاح");
          reload("SELECT * FROM `financier`");
        } else {
          $("#not").text("لم تتم الأضافة ");
        }
      },
    });
  });

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n == true) {
      let id = $(this).data("id");
      const myArray = id.split("-");
      sql =
        "DELETE FROM `financier` WHERE `project_financier_name` = '" +
        myArray[0] +
        "' && `governorate`='" +
        myArray[1] +
        "' && `city`='" +
        myArray[2] +
        "'";
      $.ajax({
        url: "../../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          reload("SELECT * FROM `financier`");
        },
      });
    } else {
    }
  });

  let fin;
  let id;
  $("#table").on("click", ".edit-btn", function () {
    id = $(this).data("id");
    const arr = id.split("-");
    fin = arr;
    $("#name").val(arr[0]);
    $("#gov").val(arr[1]);
    $("#area").val(arr[2]);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("#not").text("");
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#edit").click(function () {
    let newfinName = $("#name").val();
    let newGovName = $("#gov").val();
    let newAreaName = $("#area").val();
    sql =
      "UPDATE `financier` SET `project_financier_name` ='" +
      newfinName +
      "', `governorate`='" +
      newGovName +
      "',`city`='" +
      newAreaName +
      "'  WHERE `project_financier_name` ='" +
      fin[0] +
      "' && `governorate`='" +
      fin[1] +
      "' && `city`='" +
      fin[2] +
      "'";
    console.log(sql);
    $.ajax({
      url: "../../phpFile/update.php",
      data: { sqlup: sql },
      type: "post",
      success: function (out) {
        if (out == "New record update successfully") {
          if (out == "New record update successfully") {
            $("input").val("");
            $("#cancelEdit").hide();
            $("#edit").hide();
            $("#add").show();
            reload("SELECT * FROM `financier`");
            $("#not").text(
              "تم تعديل: (" +
                id +
                ") الى (" +
                newfinName +
                "-" +
                newGovName +
                "-" +
                newAreaName +
                ")"
            );
          } else {
            $("#not").text("يوجد هذا الخطأ: " + out);
          }
        } else {
          $("#not").text("يوجد هذا الخطأ: " + out);
        }
      },
    });
  });

  $("#cancelEdit").click(function () {
    $("input").val("");
    $("#add").toggle();
    $("#edit").toggle();
    $("#cancelEdit").toggle();
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `financier`";
    } else {
      sql =
        "SELECT * FROM `financier` WHERE `project_financier_name` like '%" +
        val +
        "%' || `governorate` like '%" +
        val +
        "%' || `city` like '%" +
        val +
        "%'";
    }
    reload(sql);
  });

  $("#other").click(function () {
    $(".dropdown-content").toggle();
  });

  $("#nav button span").click(function () {
    localStorage.setItem("login", 0);
    window.location.href = "../../../login.html";
  });
});
