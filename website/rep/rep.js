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

  function addTh(headerRow) {
    if ($("#ch_challs").is(":checked")) {
      headerRow.append("<th>التحديات</th>");
    }

    if ($("#ch_admins").is(":checked")) {
      headerRow.append("<th>المسؤولين</th>");
    }

    if ($("#ch_links").is(":checked")) {
      headerRow.append("<th>الروابط</th>");
    }

    if ($("#ch_benes").is(":checked")) {
      headerRow.append("<th>اصغر من 18</th>");
      headerRow.append("<th>من 18 الى 30</th>");
      headerRow.append("<th>ذكور</th>");
      headerRow.append("<th>إناث</th>");
    }

    if ($("#ch_emps").is(":checked")) {
      headerRow.append("<th>الموظفين</th>");
    }

    return headerRow;
  }

  $("#next").click(function () {
    $("#attribute").show();
    $("#activityReport").hide();
    $("html, body").animate({ scrollTop: 0 }, 500);

    $("#show_report").click(function () {
      if (!$(".chick").is(":checked")) {
        $("#not").text("لم تقم بالأختيار!");
      } else {
        $("#not").text("");
        $("#statics").css("display", "flex");
        var sql =
          "SELECT " +
          "`activity_name`, " +
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
          ($("#ch_period").is(":checked") ? "`activity_period` " : "");

        if (sql.substr(-2) === ", ") {
          sql = sql.substr(0, sql.length - 2) + " FROM `activities` WHERE ";
        } else {
          sql += " FROM `activities` WHERE ";
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
            : "activity_period >= '" +
              $("#period").val() +
              "' && activity_period <= '" +
              $("#period2").val() +
              "' && ";
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

          headerRow = addTh(headerRow);
          table.append(headerRow);

          // Create an object to store admin names and titles
          let period = 0;
          let adminsNum = 0;
          let male = 0;
          let female = 0;
          let totalbene = 0;

          data.forEach(function (row) {
            let activityName = row.activity_name;
            var adminNamesObj = {};
            var dataRow = $("<tr></tr>");
            Object.keys(row).forEach(function (key) {
              if (key == "activity_period") {
                period += parseInt(row[key]);
              }
              dataRow.append("<td>" + row[key] + "</td>");
            });

            let tdAdmins = "";
            let tdChalls;
            let tdLinks;
            let tdBenes;
            let tdEmp;
            const promises = [];
            if ($("#ch_admins").is(":checked")) {
              let sql =
                "SELECT administrator_name, nickname FROM act_adm_nick WHERE activity_name = '" +
                activityName +
                "'";
              promises.push(
                new Promise((resolve, reject) => {
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
                          adminsNum++;
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

                      var adminCell = "<td>" + adminNames + "</td>";
                      tdAdmins = adminCell;
                      resolve();
                    },
                  });
                })
              );
            }

            if ($("#ch_challs").is(":checked")) {
              let sql =
                "SELECT challenge FROM activ_chall WHERE activity_name = '" +
                activityName +
                "'";
              promises.push(
                new Promise((resolve, reject) => {
                  $.ajax({
                    url: "../../controlPanal/phpFile/show.php",
                    data: { sql: sql },
                    dataType: "json",
                    type: "post",
                    success: function (data1) {
                      let challenges = "";
                      for (var i = 0; i < data1.length; i++) {
                        challenges += data1[i].challenge + ", ";
                      }
                      tdChalls = "<td>" + challenges + "</td>";
                      resolve();
                    },
                  });
                })
              );
            }

            if ($("#ch_links").is(":checked")) {
              let sql =
                "SELECT link FROM links WHERE activity_name = '" +
                activityName +
                "'";
              promises.push(
                new Promise((resolve, reject) => {
                  $.ajax({
                    url: "../../controlPanal/phpFile/show.php",
                    data: { sql: sql },
                    dataType: "json",
                    type: "post",
                    success: function (data1) {
                      tdLinks = "<td>";
                      for (var i = 0; i < data1.length; i++) {
                        tdLinks +=
                          '<a href="' +
                          data1[i].link +
                          '">' +
                          data1[i].link +
                          "</a>, ";
                      }
                      tdLinks += "</td>";
                      resolve();
                    },
                  });
                })
              );
            }

            if ($("#ch_benes").is(":checked")) {
              let sql =
                "SELECT * FROM beneficiaries WHERE activity_name = '" +
                activityName +
                "'";
              const promise = $.ajax({
                url: "../../controlPanal/phpFile/show.php",
                data: { sql: sql },
                dataType: "json",
                type: "post",
                success: function (data1) {
                  let binis = "";
                  male += parseInt(data1[0].male);
                  female += parseInt(data1[0].female);
                  totalbene +=
                    parseInt(data1[0].male) + parseInt(data1[0].female);
                  for (var i = 0; i < data1.length; i++) {
                    binis += "<td>" + data1[i].less_than_18 + "</td> ";
                    binis += "<td>" + data1[i].age_18_30 + "</td> ";
                    binis += "<td>" + data1[i].male + "</td> ";
                    binis += "<td>" + data1[i].female + "</td> ";
                  }
                  tdBenes = binis;
                },
              });
              promises.push(promise);
            }

            if ($("#ch_emps").is(":checked")) {
              let sql =
                "SELECT * FROM `employees` WHERE `emp_id` in (SELECT `emp_id` FROM `act_emp` WHERE `activity_name` = '" +
                activityName +
                "')";
              promises.push(
                new Promise((resolve, reject) => {
                  $.ajax({
                    url: "../../controlPanal/phpFile/show.php",
                    data: { sql: sql },
                    dataType: "json",
                    type: "post",
                    success: function (data1) {
                      tdEmp = "<td>";
                      for (var i = 0; i < data1.length; i++) {
                        tdEmp += data1[i].emp_name + ", ";
                      }
                      tdEmp += "</td>";
                      resolve();
                    },
                  });
                })
              );
            }

            Promise.all(promises)
              .then(function () {
                // All AJAX calls have finished and their results have been assigned to the variables.
                dataRow.append(tdChalls, tdAdmins, tdLinks, tdBenes, tdEmp);
                table.append(dataRow);
                if ($("#ch_admins").is(":checked"))
                  $("#totalAdminNum").text(adminsNum);
                else $("#totalAdminNum").text(0);
                if ($("#ch_benes").is(":checked")) {
                  $("#totalMaleBeneNum").text(male);
                  $("#totalFemaleBeneNum").text(female);
                  $("#totalBeneNum").text(totalbene);
                } else {
                  $("#totalMaleBeneNum").text(0);
                  $("#totalFemaleBeneNum").text(0);
                  $("#totalBeneNum").text(0);
                }
              })
              .catch(function (error) {
                // Handle the error if any of the AJAX calls fail.
              });
          });
          $("#report_table").replaceWith(table);
          $("#totalTime").text(period);
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

  $("#all").click(function () {
    $(".chick").prop("checked", $(this).prop("checked"));
  });

  $("#logout").click(function () {
    localStorage.setItem("login", 0);
    window.location.replace("../../login.html");
  });
});
