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
        ht = "<tr> <th>المحافظة</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].area_name +
            "</td><td><button data-id= '" +
            data[i].area_name +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td><td><button data-id= \'' +
            data[i].area_name +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `area`");

  $("#add").click(function () {
    let gov = $("#gov").val();

    if (gov == "") {
      $("#not").text("يرجى ملء جميع الحقول !");
      if ($("#gov").val() === "") {
        $("#gov").css("border-color", "red");
      } else {
        $("#gov").css("border-color", "#ccc");
      }
    } else {
      $("#not").text("");
      $("#gov").css("border-color", "#ccc");
      sqlAdd = "INSERT INTO `area`(`area_name`) VALUES ('" + gov + "')";

      $.ajax({
        url: "../../phpFile/add.php",
        data: { sqlAdd: sqlAdd },
        type: "post",
        success: function (out) {
          if (out == "successfully") {
            $("input").val("");
            $("#not").text("تمت الأضافة بنجاح");
            reload("SELECT * FROM `area`");
          } else {
            $("#not").text("لم تتم الأضافة ");
          }
        },
      });
    }
  });

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n == true) {
      let id = $(this).data("id");
      sql = "DELETE FROM `area` WHERE `area_name` = '" + id + "'";
      $.ajax({
        url: "../../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          reload("SELECT * FROM `area`");
        },
      });
    } else {
    }
  });

  let areaName;
  $("#table").on("click", ".edit-btn", function () {
    areaName = $(this).data("id");
    $("#gov").val(areaName);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("#not").text("");
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#edit").click(function () {
    let newareaName = $("#gov").val();
    sql =
      "UPDATE `area` SET `area_name`='" +
      newareaName +
      "' WHERE `area_name`='" +
      areaName +
      "'";
    $.ajax({
      url: "../../phpFile/update.php",
      data: { sqlup: sql },
      type: "post",
      success: function (out) {
        if (out == "New record update successfully") {
          $("input").val("");
          $("#cancelEdit").hide();
          $("#edit").hide();
          $("#add").show();
          reload("SELECT * FROM `area`");
          $("#not").text(
            "تم تعديل: (" + areaName + ") الى (" + newareaName + ")"
          );
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
    $("#not").text("");
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `area`";
    } else {
      sql = "SELECT * FROM `area` WHERE `area_name` like '%" + val + "%'";
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
  $("#nav i").click(function () {
    $("#smallList").toggle(100);
  });
});
