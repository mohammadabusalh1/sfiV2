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
    if ($("#name").val() === "") {
      $("#not").text("يرجى ملء جميع الحقول !");
      if ($("#name").val() === "") {
        $("#name").css("border-color", "red");
      } else {
        $("#name").css("border-color", "#ccc");
      }
    } else {
      $("#name").css("border-color", "#ccc");
      $.ajax({
        url: "../phpFile/add.php",
        data: { sqlAdd: sqlAdd },
        type: "post",
        success: function (out) {
          if (out == "successfully") {
            $("#not").text('تمت إضافة "' + nameAdd + '" إلى البرامج');
            $("#name").val("");
            sql = "SELECT * FROM `programs`";
            reload(sql);
          } else {
            $("#not").text("يوجد خطأ: " + out);
          }
        },
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

  let programName;
  $("#table").on("click", ".edit-btn", function () {
    programName = $(this).data("id");
    $("#name").val(programName);
    $("#edit").show();
    $("#add").hide();
    $("#cancelEdit").toggle();
    $("#tableDis").toggle();
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });

  $("#cancelEdit").click(function () {
    $("#not").text("");
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
                  "تم تعديل: (" + programName + ") الى (" + newProgramName + ")"
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
    $(".dropdown-content").toggleClass("hideDropDown");
  });
});
