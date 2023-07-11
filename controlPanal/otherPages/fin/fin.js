$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../../login.html");
  }

  let contact_informations = [];

  const contact_information_div = $("#contact_information_added");

  $("#add_contact_information").click(function () {
    const contact_information = $("#contact_information").val();

    // Check if fins is already in finsArray
    if (
      !contact_informations.includes(contact_information) &&
      contact_information != ""
    ) {
      contact_informations.push(contact_information);

      // Map finsArray to an array of HTML elements
      const new_contact_informations = contact_informations.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e);
        const button = $("<button>")
          .text("حذف")
          .addClass("remove_contact_information")
          .data("id", e);
        div.append(h6, button);
        return div;
      });

      // Add the new HTML elements to finsInsertedDiv
      contact_information_div.html(new_contact_informations);
      contact_information_div.show();
    }
  });

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

  $(document).on("click", ".remove_contact_information", function () {
    let id = $(this).data("id");
    const info = id.split("-");

    contact_informations = contact_informations.filter((e) => e !== info[0]);

    $(this).parent().remove();

    if (contact_informations.length === 0) {
      contact_information_div.hide();
    }
  });

  function reload(sql) {
    $.ajax({
      url: "../../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        const dataResult = data.map((e) => {
          const arr = [" " + e.information + " "];
          const ob = {
            Background_and_Mission: e.Background_and_Mission,
            country: e.country,
            information: arr,
            organization: e.organization,
          };
          return ob;
        });

        const fins = [];
        const names = [];

        for (i = 0; i < dataResult.length; i++) {
          if (names.includes(dataResult[i].organization)) {
            const index = names.indexOf(dataResult[i].organization);
            const arr = fins[index].information;
            fins[index].information = [...arr, ...dataResult[i].information];
          } else {
            names.push(dataResult[i].organization);
            fins.push(dataResult[i]);
          }
        }

        ht =
          "<tr> <th>الممول</th> <th>الخلفية والرسالة</th> <th>الدولة</th> <th>معلومات الأتصال</th> <th>تعديل</th> <th>حذف</th></tr>";
        for (i = 0; i < fins.length; i++) {
          ht +=
            "<tr><td>" +
            fins[i].organization +
            "</td><td>" +
            fins[i].Background_and_Mission +
            "</td><td>" +
            fins[i].country +
            "</td><td>" +
            fins[i].information +
            "</td><td><button data-id= '" +
            fins[i].organization +
            '\' class="edit-btn">تعديل <i class="fa fa-edit"></i></button></td> <td><button data-id= \'' +
            fins[i].organization +
            '\' class="remove-btn">حذف <i class="fa fa-remove"></i></button></td>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload(
    "SELECT * FROM financier INNER JOIN contact_information ON" +
      " contact_information.organization=financier.organization;"
  );

  $("#add").click(function () {
    let organization = $("#name").val();
    let country = $("#country").val();
    let Background_and_Mission = $("#backgound").val();

    if (organization != "" && country != "" && Background_and_Mission != "") {
      sqlAdd =
        "INSERT INTO `financier`(`organization`, `Background_and_Mission`, `country`) VALUES ('" +
        organization +
        "','" +
        Background_and_Mission +
        "','" +
        country +
        "')";

      $.ajax({
        url: "../../phpFile/add.php",
        data: { sqlAdd: sqlAdd },
        type: "post",
        success: function (out) {
          if (out == "successfully") {
            for (i = 0; i < contact_informations.length; i++) {
              sqlAdd =
                "INSERT INTO `contact_information`(`organization`, `information`) VALUES ('" +
                organization +
                "','" +
                contact_informations[i] +
                "')";

              $.ajax({
                url: "../../phpFile/add.php",
                data: { sqlAdd: sqlAdd },
                type: "post",
                success: function () {
                  $("input").val("");
                  $("#not").text("تمت الأضافة بنجاح");
                  reload(
                    "SELECT * FROM financier INNER JOIN contact_information ON" +
                      " contact_information.organization=financier.organization;"
                  );
                },
              });
            }
          } else {
            console.log(out);
            $("#not").text("لم تتم الأضافة ");
          }
        },
      });
    } else {
      $("#not").text("يوجد بيانات فارغة");
    }
  });

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n == true) {
      let id = $(this).data("id");
      sql =
        "DELETE FROM `contact_information` WHERE `organization` = '" + id + "'";
      $.ajax({
        url: "../../phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          const sql2 =
            "DELETE FROM `financier` WHERE `organization` = '" + id + "'";

          $.ajax({
            url: "../../phpFile/remove.php",
            data: { sql: sql2 },
            type: "post",
            success: function (out) {
              reload(
                "SELECT * FROM financier INNER JOIN contact_information ON" +
                  " contact_information.organization=financier.organization;"
              );
            },
          });
        },
      });
    } else {
    }
  });

  let id = "";
  $("#table").on("click", ".edit-btn", function () {
    id = $(this).data("id");

    contact_information_div.html("");
    contact_informations = [];
    const sql = "SELECT * FROM `financier` WHERE `organization`='" + id + "'";

    $.ajax({
      url: "../../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        $("#name").val(data[0].organization);
        $("#country").val(data[0].country);
        $("#backgound").val(data[0].Background_and_Mission);

        $("#edit").show();
        $("#add").hide();
        $("#cancelEdit").toggle();
        $("#not").text("");
        $("html, body").animate({ scrollTop: 0 }, "slow");

        const sql =
          "SELECT `information` FROM `contact_information` WHERE `organization`='" +
          data[0].organization +
          "'";

        $.ajax({
          url: "../../phpFile/show.php",
          data: { sql: sql },
          dataType: "json",
          type: "post",
          success: function (data1) {
            // Map finsArray to an array of HTML elements
            const new_contact_informations = data1.map((e) => {
              contact_informations.push(e.information);
              const div = $("<div>");
              const h6 = $("<h6>").text(e.information);
              const button = $("<button>")
                .text("حذف")
                .addClass("remove_contact_information")
                .data("id", e.information + "-" + data[0].organization);
              div.append(h6, button);
              return div;
            });

            // Add the new HTML elements to finsInsertedDiv
            contact_information_div.html(new_contact_informations);
            contact_information_div.show();
          },
        });
      },
    });
  });

  $("#edit").click(function () {
    let organization = $("#name").val();
    let country = $("#country").val();
    let Background_and_Mission = $("#backgound").val();

    sql =
      "UPDATE `financier` SET `organization` ='" +
      organization +
      "', `country`='" +
      country +
      "',`Background_and_Mission`='" +
      Background_and_Mission +
      "'  WHERE `organization` = '" +
      id +
      "'";

    $.ajax({
      url: "../../phpFile/update.php",
      data: { sqlup: sql },
      type: "post",
      success: function (out) {
        if (out == "New record update successfully") {
          sql =
            "DELETE FROM `contact_information` WHERE `organization` = '" +
            id +
            "'";
          $.ajax({
            url: "../../phpFile/remove.php",
            data: { sql: sql },
            type: "post",
            success: function (out) {
              for (i = 0; i < contact_informations.length; i++) {
                sqlAdd =
                  "INSERT INTO `contact_information`(`organization`, `information`) VALUES ('" +
                  organization +
                  "','" +
                  contact_informations[i] +
                  "')";

                $.ajax({
                  url: "../../phpFile/add.php",
                  data: { sqlAdd: sqlAdd },
                  type: "post",
                  success: function () {
                    reload(
                      "SELECT * FROM financier INNER JOIN contact_information ON" +
                        " contact_information.organization=financier.organization;"
                    );

                    if (i == contact_informations.length) {
                      contact_information_div.html("");
                      contact_informations = [];
                    }
                  },
                });
              }
            },
          });

          $("input").val("");
          $("#cancelEdit").hide();
          $("#edit").hide();
          $("#add").show();
          $("#not").text(
            "تم تعديل: (" +
              id +
              ") الى (" +
              organization +
              "-" +
              country +
              "-" +
              Background_and_Mission +
              ")"
          );
        } else {
          $("#not").text("يوجد هذا الخطأ: " + out);
        }
      },
    });
  });

  $("#cancelEdit").click(function () {
    contact_information_div.html("");
    contact_informations = [];
    $("input").val("");
    $("#add").toggle();
    $("#edit").toggle();
    $("#cancelEdit").toggle();
    $("#not").text("");
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `financier`";
    } else {
      sql =
        "SELECT * FROM `financier` WHERE `project_financier_name` like '%" +
        val +
        "%' || `governorate` like '%" +
        val +
        "%' || `city` like '%" +
        val +
        "%'";
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
