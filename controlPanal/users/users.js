$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

  $(document).on("click", function (event) {
    // Get the target element that was clicked
    const clickedElement = event.target;

    // Get the dropdown element you want to exclude
    const dropdownElement = $("#myDropdown");

    const h = $("#myDropdownText");
    const icon = $("#myDropdownIcon");

    // Check if the clicked element is the dropdown or its child elements
    if (
      dropdownElement.has(clickedElement).length > 0 ||
      h.is(clickedElement) ||
      icon.is(clickedElement)
    ) {
      return; // Do nothing if the clicked element is inside the dropdown
    }

    // Add the hideDropDown class to the dropdown
    dropdownElement.addClass("hideDropDown");
  });

  function reload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht =
          "<tr> <th>الاسم</th> <th>كلمة المرور</th> <th>الصلاحيات</th> <th>الحذف</th><th>النعديل</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].username +
            "</td><td>" +
            data[i].password +
            "</td><td>" +
            data[i].permission +
            "</td> <td><button data-id= '" +
            data[i].username +
            '\' class="remove-btn">حذف <i class="fa fa-remove" aria-hidden="true"></i></button></td> <td><button data-id= \'' +
            data[i].id +
            '\' class="edit-btn">تعديل <i class="fas fa-edit"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }

  $("#nav i").click(function () {
    $("#smallList").toggle(200);
  });

  $("#links img").click(function () {
    window.location.replace("Home.html");
  });

  $("#nav button span").click(function () {
    localStorage.setItem("login", 0);
    window.location.href = "../../login.html";
  });

  $("#add").click(function () {
    nameAdd = $("#name").val();
    passAdd = $("#password").val();
    pirAdd = $("#pir").val();
    sqlAdd =
      "INSERT INTO users (`username`, `password`, `permission`) VALUES ('" +
      nameAdd +
      "','" +
      passAdd +
      "','" +
      pirAdd +
      "')";

    if (
      $("#name").val() === "" ||
      $("#password").val() === "" ||
      $("#pir").val() === ""
    ) {
      $("#not").text("يرجى ملء جميع الحقول !");

      // Check if any of the input values are empty
      if ($("#name").val() === "") {
        $("#name").css("border-color", "red");
      } else {
        $("#name").css("border-color", "");
      }

      if ($("#password").val() === "") {
        $("#password").css("border-color", "red");
      } else {
        $("#password").css("border-color", "");
      }

      if ($("#pir").val() === "") {
        $("#pir").css("border-color", "red");
      } else {
        $("#pir").css("border-color", "");
      }
    } else {
      $("input").css("border-color", "#ccc");
      $.ajax({
        url: "../phpFile/add.php",
        data: { sqlAdd: sqlAdd },
        type: "post",
        success: function (out) {
          if (out == "successfully") {
            $("#not").text("تمت الاضافة");
            sql = "SELECT * FROM `users`";
            reload(sql);
            $("input").val("");
          } else {
            $("#not").text(" لم تتم الاضافة يرجى التأكد من البيانات: " + out);
          }
        },
      });
    }
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `users`";
    } else {
      sql =
        "SELECT * FROM `users` WHERE `permission` like '%" +
        val +
        "%' || `username` like '%" +
        val +
        "%' || `password` like '%" +
        val +
        "%'";
    }
    reload(sql);
  });

  sql = "SELECT * FROM `users`";
  reload(sql);

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n) {
      id = $(this).data("id");
      table = "users";
      feild = "username";
      sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "'";
      $.ajax({
        url: "../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          reload("SELECT * FROM `users`");
        },
      });
    }
  });

  let id;
  $("#table").on("click", ".edit-btn", function () {
    id = $(this).data("id");
    $("#not").text("");
    sql = "SELECT * FROM `users` WHERE `id`='" + id + "'";
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      type: "post",
      dataType: "json",
      success: function (out) {
        name = out[0].username;
        password = out[0].password;
        pir = out[0].permission;

        $("#name").val(name);
        $("#password").prop("type", "text");
        $("#password").val(password);
        $("#pir").val(pir);

        setTimeout(function () {
          window.location.replace("users.html#hero");
        }, 400);

        $("#add").toggle();
        $("#edit").toggle();
        $("#cancelEdit").toggle();
        $("#tableDis").toggle();
      },
    });
  });

  $("#cancelEdit").click(function () {
    $("input").val("");
    $("#add").toggle();
    $("#edit").toggle();
    $("#tableDis").toggle();
    $("#cancelEdit").toggle();
    $("#alert").text("");
  });

  $("#edit").click(function () {
    nameAdd = $("#name").val();
    passAdd = $("#password").val();
    pirAdd = $("#pir").val();
    sqlup =
      "UPDATE `users` SET `username`='" +
      nameAdd +
      "',`password`='" +
      passAdd +
      "',`permission`='" +
      pirAdd +
      "' WHERE id = '" +
      id +
      "'";
    $.ajax({
      url: "../phpFile/update.php",
      data: { sqlup: sqlup },
      type: "post",
      success: function (out) {
        if (out == "New record update successfully") {
          $("input").val("");
          $("#password").prop("type", "password");
          $("#tableDis").toggle();
          $("#add").toggle();
          $("#edit").toggle();
          $("#cancelEdit").toggle();
          reload("SELECT * FROM `users`");
          setTimeout(function () {
            window.location.replace("users.html#table");
          }, 400);
        } else {
          $("#alert").text(" لم تتم الاضافة يرجى التأكد من البيانات: " + out);
        }
      },
    });
  });

  $("#other").click(function () {
    $(".dropdown-content").toggleClass("hideDropDown");
  });
});
