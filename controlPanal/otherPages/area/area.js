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
        ht = "<tr> <th>المحافظة</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].area_name +
            "</td><td><button data-id= '" +
            data[i].area_name +
            '\'\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `area`");

  $("#add").click(function () {
    let gov = $("#gov").val();

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

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `area`";
    } else {
      sql =
        "SELECT * FROM `area` WHERE `area_name` like '%" +
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
