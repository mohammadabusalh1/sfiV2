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
        ht = "<tr> <th>نوع النشاط</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].activity_type +
            "</td><td><button data-id= '" +
            data[i].activity_type +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td><td><button data-id= \'' +
            data[i].activity_type +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `activity_type`");

  $("#add").click(function () {
    let activity_type = $("#activityType").val();

    if (activity_type == "") {
      $("#not").text("يرجى ملء جميع الحقول !");
      if ($("#activityType").val() === "") {
        $("#activityType").css("border-color", "red");
      } else {
        $("#activityType").css("border-color", "#ccc");
      }
    } else {
      $("#not").text("");
      $("#activityType").css("border-color", "#ccc");
      sqlAdd =
        "INSERT INTO `activity_type`(`activity_type`) VALUES ('" +
        activity_type +
        "')";

      $.ajax({
        url: "../../phpFile/add.php",
        data: { sqlAdd: sqlAdd },
        type: "post",
        success: function (out) {
          if (out == "successfully") {
            $("input").val("");
            $("#not").text("تمت الأضافة بنجاح");
            reload("SELECT * FROM `activity_type`");
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
      sql = "DELETE FROM `activity_type` WHERE `activity_type` = '" + id + "'";
      $.ajax({
        url: "../../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          reload("SELECT * FROM `activity_type`");
        },
      });
    } else {
    }
  });

  let activityTypeName;
  $("#table").on("click", ".edit-btn", function () {
    activityTypeName = $(this).data("id");
    $("#activityType").val(activityTypeName);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("#not").text("");
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#edit").click(function () {
    let newactivityTypeName = $("#activityType").val();
    sql =
      "UPDATE `activity_type` SET `activity_type`='" +
      newactivityTypeName +
      "' WHERE `activity_type`='" +
      activityTypeName +
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
            reload("SELECT * FROM `activity_type`");
            $("#not").text(
              "تم تعديل: (" +
                activityTypeName +
                ") الى (" +
                newactivityTypeName +
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
    $("#not").text("");
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `activity_type`";
    } else {
      sql =
        "SELECT * FROM `activity_type` WHERE `activity_type` like '%" +
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
