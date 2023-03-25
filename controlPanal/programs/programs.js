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
        ht = "<tr> <th>البرنامج</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].program_name +
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
        alert(out);
      },
    });

    sql = "SELECT * FROM `programs`";
    reload(sql);
  });

  $("#info button").prop("disabled", true);

  $("#info button").css({
    cursor: "auto",
  });

  $("#info button").hover(
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
      $("#info button").prop("disabled", true);
      $("#info button").css({
        cursor: "auto",
      });
    } else {
      $("#info button").prop("disabled", false);
      $("#info button").css({
        cursor: "pointer",
      });
    }
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

  $("#nav i").click(function () {
    $("#smallList").toggle(300);
  });

  $("#links img").click(function () {
    window.location.replace("Home.html");
  });

  $("#nav button span").click(function () {
    window.location.replace("../login.html");
  });
});
