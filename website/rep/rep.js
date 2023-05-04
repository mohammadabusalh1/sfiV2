$(document).ready(function () {
  function reload(sql) {
    $.ajax({
      url: "../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht =
          "<tr> <th>إسم النشاط</th> <th> تاريخ النشاط</th> <th>المحافظة</th> <th>المنطقة</th>  <th>النوع</th> <th>التفاصيل</th> <th>البرنامج</th> <th>المشروع</th> <th>إختر</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].activity_name +
            "</td><td>" +
            data[i].activity_date +
            "</td><td>" +
            data[i].activity_Governorate +
            "</td><td>" +
            data[i].activity_area +
            "</td><td>" +
            data[i].activity_type +
            "</td><td>" +
            data[i].activity_details +
            "</td><td>" +
            data[i].program_name +
            "</td><td>" +
            data[i].project_name +
            "</td>" +
            "<td><button data-id=" +
            data[i].activity_name +
            ' class="click_btn">إختر</button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }

  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../login.html");
  }

  reload("SELECT * FROM `activities`");

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
      let options = "<option value='all'>جميع المحافظات</option>";
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

    var nameValue = $("#names").val();
    var dateValue = $("#date").val();
    var dateValue1 = $("#date1").val();
    var govValue = $("#govs").val();
    var areaValue = $("#areas").val();
    var typeValue = $("#types").val();
    var aim = $("#aim2").val();
    var period = $("#period").val();
    var programValue = $("#programs").val();
    var projectValue = $("#projects").val();

    $("#show_report").click(function () {});
  });

  $("#logout").click(function () {
    localStorage.setItem("login", 0);
    window.location.replace("../../login.html");
  });
});
