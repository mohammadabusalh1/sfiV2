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
        ht = "<tr> <th>الهدف</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].goal_name +
            "</td><td><button data-id= '" +
            data[i].goal_name +
            '\'\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td>';
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
          $("#not").text("لم تتم الأضافة ");
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
          reload("SELECT * FROM `goals`");
        },
      });
    } else {
    }
  });

  $("#other").click(function () {
    $(".dropdown-content").toggle();
  });

  $("#nav button span").click(function () {
    localStorage.setItem("login", 0);
    window.location.href = "../../../login.html";
  });
});
