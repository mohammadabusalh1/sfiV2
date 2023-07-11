$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../../login.html");
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
      url: "../../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "<tr> <th>المسميات</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].nickname +
            "</td><td><button data-id= '" +
            data[i].nickname +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td><td><button data-id= \'' +
            data[i].nickname +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `nicknames`");

  $("#add").click(function () {
    let name = $("#name").val();

    sqlAdd = "INSERT INTO `nicknames`(`nickname`) VALUES ('" + name + "')";

    $.ajax({
      url: "../../phpFile/add.php",
      data: { sqlAdd: sqlAdd },
      type: "post",
      success: function (out) {
        if (out == "successfully") {
          $("input").val("");
          $("#not").text("تمت الأضافة بنجاح");
          reload("SELECT * FROM `nicknames`");
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
      sql = "DELETE FROM `nicknames` WHERE `nickname` = '" + id + "'";
      $.ajax({
        url: "../../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          if (out == "remove successfully") {
            reload("SELECT * FROM `nicknames`");
          } else {
            alert(out);
          }
        },
      });
    } else {
    }
  });

  let nicknamesName;
  $("#table").on("click", ".edit-btn", function () {
    nicknamesName = $(this).data("id");
    $("#name").val(nicknamesName);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("#not").text("");
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#edit").click(function () {
    let newnicknamesName = $("#name").val();
    sql =
      "UPDATE `nicknames` SET `nickname`='" +
      newnicknamesName +
      "' WHERE `nickname`='" +
      nicknamesName +
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
          reload("SELECT * FROM `nicknames`");
          $("#not").text(
            "تم تعديل: (" + nicknamesName + ") الى (" + newnicknamesName + ")"
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
      sql = "SELECT * FROM `nicknames`";
    } else {
      sql = "SELECT * FROM `nicknames` WHERE `nickname` like '%" + val + "%'";
    }
    reload(sql);
  });

  $("#other").click(function () {
    $(".dropdown-content").toggleClass("hideDropDown");
  });

  $("#nav button span").click(function () {
    localStorage.setItem("login", 0);
    window.location.href = "../../../login.html";
  });

  $("#nav i").click(function () {
    $("#smallList").toggle(100);
  });
});
