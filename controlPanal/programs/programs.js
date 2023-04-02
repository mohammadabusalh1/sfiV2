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
        ht = "<tr> <th>البرنامج</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].program_name +
            "</td><td><button data-id= '" +
            data[i].program_name +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td>' +
            "<td><button data-id= '" +
            data[i].program_name +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td>';
        }
        $(".table").html(ht);
      },
    });
  }

  $("#add").click(function () {
    nameAdd = $("#name").val();
    sqlAdd =
      "INSERT INTO `programs`(`program_name`) VALUES ('" + nameAdd + "')";

    $.ajax({
      url: "../phpFile/add.php",
      data: { sqlAdd: sqlAdd },
      type: "post",
      success: function (out) {
        if (out == "successfully") {
          $("#not").text('تمت إضافة "' + nameAdd + '" إلى البرامج');
          $("#name").val("");
        } else {
          $("#not").text("يوجد خطأ: " + out);
        }
      },
    });

    sql = "SELECT * FROM `programs`";
    reload(sql);
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `programs`";
    } else {
      sql =
        "SELECT * FROM `programs` WHERE `program_name` like '%" + val + "%'";
    }
    reload(sql);
  });

  sql = "SELECT * FROM `programs`";
  reload(sql);

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n == true) {
      id = $(this).data("id");
      sql = "DELETE FROM `programs` WHERE `program_name` = '" + id + "'";
      $.ajax({
        url: "../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          reload("SELECT * FROM `programs`");
        },
      });
    }
  });

  let programName;
  $("#table").on("click", ".edit-btn", function () {
    programName = $(this).data("id");
    $("#name").val(programName);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#cancelEdit").click(function () {
    $("input").val("");
    $("#add").toggle();
    $("#edit").toggle();
    $("#tableDis").toggle();
    $("#cancelEdit").toggle();
  });

  $("#edit").click(function () {
    let newProgramName = $("#name").val();
    sql =
      "UPDATE `activities` SET `program_name`='" +
      newProgramName +
      "' WHERE `program_name`='" +
      programName +
      "'";
    $.ajax({
      url: "../phpFile/update.php",
      data: { sqlup: sql },
      type: "post",
      success: function (out) {
        if (out == "New record update successfully") {
          sql =
            "UPDATE `programs` SET `program_name`='" +
            newProgramName +
            "' WHERE `program_name`='" +
            programName +
            "'";
          $.ajax({
            url: "../phpFile/update.php",
            data: { sqlup: sql },
            type: "post",
            success: function (out) {
              if (out == "New record update successfully") {
                $("input").val("");
                $("#cancelEdit").toggle();
                reload("SELECT * FROM `programs`");
                $("#not").text(
                  "تمت تعديل: (" +
                    programName +
                    ") الى (" +
                    newProgramName +
                    ")"
                );
              } else {
                $("#not").text("يوجد هذا الخطأ: " + out);
              }
            },
          });
        } else {
          $("#not").text("يوجد هذا الخطأ: " + out);
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
