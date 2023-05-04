$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

  $("#bar").click(function () {
    $(".navbare").toggleClass("active");
    $(this).toggleClass("fa-times");
  });

  let sql = "SELECT `activity_name` FROM `activities`";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sql },
    dataType: "json",
    type: "post",
    success: function (data) {
      let options = "<option value='all'>جميع الأنشطة</option>";
      for (i = 0; i < data.length; i++) {
        options +=
          '<option value="' +
          data[i].activity_name +
          '">' +
          data[i].activity_name +
          "</option>";
        $("#names").html(options);
      }
    },
  });

  $("#name").keyup(function () {
    let searchValue = $(this).val();

    let sql =
      "SELECT `activity_name` FROM `activities` WHERE `activity_name` like '%" +
      searchValue +
      "%'";
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        options = "";
        for (i = 0; i < data.length; i++) {
          options +=
            '<option value="' +
            data[i].activity_name +
            '">' +
            data[i].activity_name +
            "</option>";
          $("#names").html(options);
        }
      },
    });
  });

  let sql2 = "SELECT `program_name` FROM `programs`";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sql2 },
    dataType: "json",
    type: "post",
    success: function (data) {
      let options = "<option value='all'>جميع البرامج</option>";
      for (i = 0; i < data.length; i++) {
        options +=
          '<option value="' +
          data[i].program_name +
          '">' +
          data[i].program_name +
          "</option>";
        $("#programs").html(options);
      }
    },
  });

  $("#program").keyup(function () {
    let searchValue = $(this).val();

    let sql =
      "SELECT `program_name` FROM `programs` WHERE `program_name` like '%" +
      searchValue +
      "%'";
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        options = "";
        for (i = 0; i < data.length; i++) {
          options +=
            '<option value="' +
            data[i].program_name +
            '">' +
            data[i].program_name +
            "</option>";
          $("#programs").html(options);
        }
      },
    });
  });

  let sql3 = "SELECT `project_name` FROM `project`";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sql3 },
    dataType: "json",
    type: "post",
    success: function (data) {
      let options = "<option value='all'>جميع المشاريع</option>";
      for (i = 0; i < data.length; i++) {
        options +=
          '<option value="' +
          data[i].project_name +
          '">' +
          data[i].project_name +
          "</option>";
        $("#projects").html(options);
      }
    },
  });

  $("#project").keyup(function () {
    let searchValue = $(this).val();

    let sql =
      "SELECT `project_name` FROM `project` WHERE `project_name` like '%" +
      searchValue +
      "%'";
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        options = "";
        for (i = 0; i < data.length; i++) {
          options +=
            '<option value="' +
            data[i].project_name +
            '">' +
            data[i].project_name +
            "</option>";
          $("#projects").html(options);
        }
      },
    });
  });

  let sql4 = "SELECT `activity_type` FROM `activity_type`";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sql4 },
    dataType: "json",
    type: "post",
    success: function (data) {
      let options = "<option value='all'>جميع أنواع الأنشطة</option>";
      for (i = 0; i < data.length; i++) {
        options +=
          '<option value="' +
          data[i].activity_type +
          '">' +
          data[i].activity_type +
          "</option>";
        $("#types2").html(options);
      }
    },
  });

  $("#types").keyup(function () {
    let searchValue = $(this).val();

    let sql =
      "SELECT `activity_type` FROM `activity_type` WHERE `activity_type` like '%" +
      searchValue +
      "%'";
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        options = "";
        for (i = 0; i < data.length; i++) {
          options +=
            '<option value="' +
            data[i].activity_type +
            '">' +
            data[i].activity_type +
            "</option>";
          $("#types2").html(options);
        }
      },
    });
  });

  let sql5 = "SELECT `goal_name` FROM `goals`";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sql5 },
    dataType: "json",
    type: "post",
    success: function (data) {
      let options = "<option value='all'>جميع الأهداف</option>";
      for (i = 0; i < data.length; i++) {
        options +=
          '<option value="' +
          data[i].goal_name +
          '">' +
          data[i].goal_name +
          "</option>";
        $("#aim2").html(options);
      }
    },
  });

  $("#aim").keyup(function () {
    let searchValue = $(this).val();

    let sql =
      "SELECT `goal_name` FROM `goals` WHERE `goal_name` like '%" +
      searchValue +
      "%'";
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        options = "";
        for (i = 0; i < data.length; i++) {
          options +=
            '<option value="' +
            data[i].goal_name +
            '">' +
            data[i].goal_name +
            "</option>";
          $("#aim2").html(options);
        }
      },
    });
  });

  let sql6 = "SELECT `area_name` FROM `area`";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sql6 },
    dataType: "json",
    type: "post",
    success: function (data) {
      let options = "<option value='all'>جميع المحافظات</option>";
      for (i = 0; i < data.length; i++) {
        options +=
          '<option value="' +
          data[i].area_name +
          '">' +
          data[i].area_name +
          "</option>";
        $("#govs").html(options);
      }
    },
  });

  $("#next").click(function () {
    $("#attribute").show();
    $("#activityReport").hide();

    $("#show_report").click(function () {
      if (!$(".chick").is(":checked")) {
        $("#not").text("لم تقم بالأختيار!");
      } else {
        $("#not").text("");
        var sql =
          "SELECT " +
          ($("#ch_activityName").is(":checked") ? "`activity_name`, " : "") +
          ($("#ch_date").is(":checked")
            ? "`activity_start_date`, `activity_end_date`, "
            : "") +
          ($("#ch_gov").is(":checked") ? "`governorate`, " : "") +
          ($("#ch_area").is(":checked") ? "`activity_area`, " : "") +
          ($("#ch_det").is(":checked") ? "`activity_details`, " : "") +
          ($("#ch_aim").is(":checked") ? "`activity_aim`, " : "") +
          ($("#ch_project").is(":checked") ? "`project_name`, " : "") +
          ($("#ch_program").is(":checked") ? "`program_name`, " : "") +
          ($("#ch_activityType").is(":checked") ? "`activity_type`, " : "") +
          ($("#ch_period").is(":checked")
            ? "`activity_period` FROM `activities` WHERE "
            : "");

        if (sql.substr(-2) === ", ") {
          sql = sql.substr(0, sql.length - 2) + " FROM `activities` WHERE ";
        }

        let name =
          $("#names").val() == "all"
            ? "1 && "
            : "activity_name = '" + $("#names").val() + "' &&";
        sql += name;
        let date =
          $("#date").val() == "" || $("#date1").val() == ""
            ? "1 && "
            : "`activity_start_date` > " +
              $("#date").val() +
              " && `activity_end_date`< " +
              $("#date1").val() +
              " && ";
        sql += date;
        let aim =
          $("#aim2").val() == "all"
            ? "1 && "
            : "activity_aim = '" + $("#aim2").val() + "' && ";
        sql += aim;
        let type =
          $("#types2").val() == "all"
            ? "1 && "
            : "activity_type = '" + $("#types2").val() + "' && ";
        sql += type;
        let program =
          $("#programs").val() == "all"
            ? "1 && "
            : "program_name = '" + $("#programs").val() + "' && ";
        sql += program;
        let project =
          $("#projects").val() == "all"
            ? "1 && "
            : "project_name = '" + $("#projects").val() + "' && ";
        sql += project;
        let gov =
          $("#govs").val() == "all"
            ? "1 && "
            : "governorate = '" + $("#govs").val() + "' && ";
        sql += gov;
        let area =
          $("#areas").val() == ""
            ? "1 && "
            : "activity_area = '" + $("#areas").val() + "' && ";
        sql += area;
        let period =
          $("#period").val() == ""
            ? "1 && "
            : "activity_period = '" + $("#period").val() + "' && ";
        sql += period;

        if (sql.substr(-2) === "& ") {
          sql = sql.substr(0, sql.length - 2) + "";
          sql = sql.substr(0, sql.length - 2) + "";
        }
      }

      $.ajax({
        url: "../../controlPanal/phpFile/show.php",
        data: { sql: sql },
        dataType: "json",
        type: "post",
        success: function (data) {
          $("#attribute").hide();
          var table = $("<table id='report_table'></table>");
          var headerRow = $("<tr></tr>");
          // Assuming data is an array of objects with keys as column names
          Object.keys(data[0]).forEach(function (key) {
            headerRow.append("<th>" + getArabicColumnName(key) + "</th>");
          });

          if ($("#ch_admins").is(":checked")) {
            headerRow.append("<th>المسؤولين</th>");
          }
          table.append(headerRow);

          // Create an object to store admin names and titles
          var adminNamesObj = {};

          data.forEach(function (row) {
            let activityName = row.activity_name;
            var dataRow = $("<tr></tr>");
            Object.keys(row).forEach(function (key) {
              dataRow.append("<td>" + row[key] + "</td>");
            });

            if ($("#ch_admins").is(":checked")) {
              let sql =
                "SELECT administrator_name, nickname FROM act_adm_nick WHERE activity_name = '" +
                activityName +
                "'";
              console.log(sql);
              $.ajax({
                url: "../../controlPanal/phpFile/show.php",
                data: { sql: sql },
                dataType: "json",
                type: "post",
                success: function (data1) {
                  data1.forEach(function (admin) {
                    if (
                      adminNamesObj.hasOwnProperty(admin.administrator_name)
                    ) {
                      adminNamesObj[admin.administrator_name].push(
                        admin.nickname
                      );
                    } else {
                      adminNamesObj[admin.administrator_name] = [
                        admin.nickname,
                      ];
                    }
                  });

                  // Create the adminNames string by iterating over the object
                  var adminNames = "";
                  Object.keys(adminNamesObj).forEach(function (adminName) {
                    var titles = adminNamesObj[adminName].join(", ");
                    adminNames += adminName + " (" + titles + "), ";
                  });
                  adminNames = adminNames.slice(0, -2); // remove the last comma

                  var adminCell = $("<td>" + adminNames + "</td>");
                  dataRow.append(adminCell);
                  table.append(dataRow);
                },
              });
            } else {
              table.append(dataRow);
            }

            
          });
          $("#report_table").replaceWith(table);
        },
        error: function (xhr, status, error) {
          console.log("Error: " + error);
        },
      });
    });
  });

  function getArabicColumnName(columnName) {
    // This is just an example, you would need to replace these with your own Arabic column names
    var arabicColumnNames = {
      activity_name: "الاسم",
      activity_start_date: "تاريخ البدء",
      activity_end_date: "تاريخ الأنتهاء",
      governorate: "المحافظة",
      activity_area: "المنطقة",
      activity_details: "التفاصيل",
      activity_aim: "الهدف",
      project_name: "المشروع",
      program_name: "البرنامج",
      activity_type: "نوع النشاط",
      activity_period: "المدة",
      // add more here
    };

    return arabicColumnNames[columnName];
  }

  $("#logout").click(function () {
    localStorage.setItem("login", 0);
    window.location.replace("../../login.html");
  });
});
