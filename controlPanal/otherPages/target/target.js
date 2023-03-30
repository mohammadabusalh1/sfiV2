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
          ht = "<tr> <th>الفئة العمرية</th> <th>حذف</th></tr>";
          for (i = 0; i < data.length; i++) {
            ht +=
              "<tr><td>" +
              data[i].target_group +
              "</td><td><button data-id= '" +
              data[i].target_group +
              '\'\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td>';
          }
          $(".table").html(ht);
        },
      });
    }
    reload("SELECT * FROM `target_groups`");
  
    $("#add").click(function () {
      let target = $("#target").val();
  
      sqlAdd =
        "INSERT INTO `target_groups`(`target_group`) VALUES ('" +
        target +
        "')";
  
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
  });
  