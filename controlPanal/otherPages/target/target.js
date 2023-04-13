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
        ht = "<tr> <th>الفئة العمرية</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].target_group +
            "</td><td><button data-id= '" +
            data[i].target_group +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td><td><button data-id= \'' +
            data[i].target_group +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `target_groups`");

  $("#add").click(function () {
    let target = $("#target").val();

    sqlAdd =
      "INSERT INTO `target_groups`(`target_group`) VALUES ('" + target + "')";

    $.ajax({
      url: "../../phpFile/add.php",
      data: { sqlAdd: sqlAdd },
      type: "post",
      success: function (out) {
        if (out == "successfully") {
          $("input").val("");
          $("#not").text("تمت الأضافة بنجاح");
          reload("SELECT * FROM `target_groups`");
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
      sql = "DELETE FROM `target_groups` WHERE `target_group` = '" + id + "'";
      $.ajax({
        url: "../../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          reload("SELECT * FROM `target_groups`");
        },
      });
    } else {
    }
  });

  let targetName;
  $("#table").on("click", ".edit-btn", function () {
    targetName = $(this).data("id");
    $("#target").val(targetName);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("#not").text("");
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#edit").click(function () {
    let newtargetName = $("#target").val();
    sql =
      "UPDATE `target_groups` SET `target_group`='" +
      newtargetName +
      "' WHERE `target_group`='" +
      targetName +
      "'";
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
            reload("SELECT * FROM `target_groups`");
            $("#not").text(
              "تم تعديل: (" + targetName + ") الى (" + newtargetName + ")"
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
    $("#not").text("");
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `target_groups`";
    } else {
      sql =
        "SELECT * FROM `target_groups` WHERE `target_group` like '%" +
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

  $("#nav i").click(function () {
    $("#smallList").toggle(100);
  });
});
