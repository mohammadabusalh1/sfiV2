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
        ht = "<tr> <th>الهدف</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].goal_name +
            "</td><td><button data-id= '" +
            data[i].goal_name +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td><td><button data-id= \'' +
            data[i].goal_name +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `goals`");

  $("#add").click(function () {
    let aim = $("#aim").val();
    sqlAdd = "INSERT INTO `goals`(`goal_name`) VALUES ('" + aim + "')";
    $.ajax({
      url: "../../phpFile/add.php",
      data: { sqlAdd: sqlAdd },
      type: "post",
      success: function (out) {
        if (out == "successfully") {
          $("input").val("");
          $("#not").text("تمت الأضافة بنجاح");
          reload("SELECT * FROM `goals`");
        } else {
          $("#not").text("لم تتم الأضافة يرجى التأكد من المدخل");
        }
      },
    });
  });

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n == true) {
      let id = $(this).data("id");
      sql = "DELETE FROM `goals` WHERE `goal_name` = '" + id + "'";
      $.ajax({
        url: "../../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          if (out == "remove successfully") {
            reload("SELECT * FROM `goals`");
          } else {
            alert("لم يتم الحذف بسبب: " + out);
          }
        },
      });
    } else {
    }
  });

  let aimName;
  $("#table").on("click", ".edit-btn", function () {
    aimName = $(this).data("id");
    $("#aim").val(aimName);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#edit").click(function () {
    let newAimName = $("#aim").val();
    sql =
      "UPDATE `goals` SET `goal_name`='" +
      newAimName +
      "' WHERE `goal_name`='" +
      aimName +
      "'";
    $.ajax({
      url: "../../phpFile/update.php",
      data: { sqlup: sql },
      type: "post",
      success: function (out) {
        if (out == "New record update successfully") {
          if (out == "New record update successfully") {
            $("input").val("");
            $("#cancelEdit").toggle();
            reload("SELECT * FROM `goals`");
            $("#not").text(
              "تم تعديل: (" + aimName + ") الى (" + newAimName + ")"
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
      sql = "SELECT * FROM `goals`";
    } else {
      sql = "SELECT * FROM `goals` WHERE `goal_name` like '%" + val + "%'";
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
