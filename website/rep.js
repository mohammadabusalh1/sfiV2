$(document).ready(function () {
    function reload(sql) {
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "<tr> <th>إسم النشاط</th> <th> تاريخ النشاط</th> <th>المحافظة</th> <th>المنطقة</th>  <th>النوع</th> <th>التفاصيل</th> <th>البرنامج</th> <th>المشروع</th> <th>إختر</th></tr>";
                for (i = 0; i < data.length; i++) {
                    ht += "<tr><td>" + data[i].activity_name + "</td><td>" + data[i].activity_date
                        + "</td><td>" + data[i].activity_Governorate + "</td><td>" + data[i].activity_area
                        + "</td><td>" + data[i].activity_type + "</td><td>" + data[i].activity_details
                        + "</td><td>" + data[i].program_name + "</td><td>" + data[i].project_name
                        + "</td>" + "<td><button data-id=" +
                        data[i].activity_name + " class=\"click_btn\">إختر</button></td></tr>";
                }
                $(".table").html(ht);
            }
        });
    }

    if (localStorage.getItem('login') == 0 || localStorage.getItem('login') == null) {
        window.location.replace("../login.html");
    }


    reload("SELECT * FROM `activities`");

    $("#bar").click(function () {
        $(".navbare").toggleClass("active");
        $(this).toggleClass("fa-times");
    });

    $("#search").keyup(function () {
        value = $(this).val();
        sql = "SELECT * FROM `activities` WHERE `activity_name` like '%" + value + "%' || `activity_date` like '%" + value +
            "%' || `activity_Governorate` like '%" + value + "%' || `activity_area` like '%" + value +
            "%' || `activity_type` like '%" + value + "%' || `activity_details` like '%" + value + "%' || `program_name` like '%" + value + "%'";
        reload(sql);
    });


    $("table").on('click', '.click_btn', function () {
        id = $(this).data('id');
        localStorage.setItem('name', id);
        localStorage.removeItem("sql");
        localStorage.removeItem('chall');
        localStorage.removeItem('links');
        localStorage.removeItem('bini_info');
        localStorage.removeItem('att');
        localStorage.removeItem('emp_info');
        localStorage.removeItem('parti_info');
        localStorage.removeItem('targt');
        localStorage.removeItem('goale');
        window.open("showReport.html", "_blank");
    });

    $("#name").prop("disabled", true);
    $("#names").prop("disabled", true);
    $("#date").prop("disabled", true);
    $("#date1").prop("disabled", true);
    $("#gov").prop("disabled", true);
    $("#govs").prop("disabled", true);
    $("#area").prop("disabled", true);
    $("#areas").prop("disabled", true);
    $("#type").prop("disabled", true);
    $("#types").prop("disabled", true);
    $("#program").prop("disabled", true);
    $("#programs").prop("disabled", true);
    $("#project").prop("disabled", true);
    $("#projects").prop("disabled", true)

    $("#cb_name").click(function () {
        if ($(this).prop("checked")) {
            $("#name").prop("disabled", false);
            $("#names").prop("disabled", false);
        } else {
            $("#name").prop("disabled", true);
            $("#names").prop("disabled", true);
        }
    });

    $("#cb_date").click(function () {
        if ($(this).prop("checked")) {
            $("#date").prop("disabled", false);
            $("#date1").prop("disabled", false);
        } else {
            $("#date").prop("disabled", true);
            $("#date1").prop("disabled", true);
        }
    });

    $("#cb_gov").click(function () {
        if ($(this).prop("checked")) {
            $("#gov").prop("disabled", false);
            $("#govs").prop("disabled", false);
        } else {
            $("#gov").prop("disabled", true);
            $("#govs").prop("disabled", true);
        }
    });

    $("#cb_area").click(function () {
        if ($(this).prop("checked")) {
            $("#area").prop("disabled", false);
            $("#areas").prop("disabled", false);
        } else {
            $("#area").prop("disabled", true);
            $("#areas").prop("disabled", true);
        }
    });

    $("#cb_type").click(function () {
        if ($(this).prop("checked")) {
            $("#type").prop("disabled", false);
            $("#types").prop("disabled", false);
        } else {
            $("#type").prop("disabled", true);
            $("#types").prop("disabled", true);
        }
    });

    $("#cb_program").click(function () {
        if ($(this).prop("checked")) {
            $("#program").prop("disabled", false);
            $("#programs").prop("disabled", false);
        } else {
            $("#program").prop("disabled", true);
            $("#programs").prop("disabled", true);
        }
    });

    $("#cd_project").click(function () {
        if ($(this).prop("checked")) {
            $("#project").prop("disabled", false);
            $("#projects").prop("disabled", false);
        } else {
            $("#project").prop("disabled", true);
            $("#projects").prop("disabled", true);
        }
    });

    let sql = "SELECT `activity_name` FROM `activities`";
    $.ajax({
        url: "../controlPanal/phpFile/show.php",
        data: { sql: sql },
        dataType: "json",
        type: "post",
        success: function (data) {
            let options = "";
            for (i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].activity_name + '">' + data[i].activity_name + '</option>';
                $("#names").html(options);
            }
        }
    });

    $("#name").keyup(function () {
        let searchValue = $(this).val();

        let sql = "SELECT `activity_name` FROM `activities` WHERE `activity_name` like '" + searchValue + "%'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                options = "";
                for (i = 0; i < data.length; i++) {
                    options += '<option value="' + data[i].activity_name + '">' + data[i].activity_name + '</option>';
                    $("#names").html(options);
                }
            }
        });
    });


    let sql2 = "SELECT `program_name` FROM `programs`";
    $.ajax({
        url: "../controlPanal/phpFile/show.php",
        data: { sql: sql2 },
        dataType: "json",
        type: "post",
        success: function (data) {
            let options = "";
            for (i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].program_name + '">' + data[i].program_name + '</option>';
                $("#programs").html(options);
            }
        }
    });

    $("#program").keyup(function () {
        let searchValue = $(this).val();

        let sql = "SELECT `program_name` FROM `programs` WHERE `program_name` like '" + searchValue + "%'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                options = "";
                for (i = 0; i < data.length; i++) {
                    options += '<option value="' + data[i].program_name + '">' + data[i].program_name + '</option>';
                    $("#programs").html(options);
                }
            }
        });
    });


    let sql3 = "SELECT `project_name` FROM `project`";
    $.ajax({
        url: "../controlPanal/phpFile/show.php",
        data: { sql: sql3 },
        dataType: "json",
        type: "post",
        success: function (data) {
            let options = "";
            for (i = 0; i < data.length; i++) {
                options += '<option value="' + data[i].project_name + '">' + data[i].project_name + '</option>';
                $("#projects").html(options);
            }
        }
    });

    $("#project").keyup(function () {
        let searchValue = $(this).val();

        let sql = "SELECT `project_name` FROM `project` WHERE `project_name` like '" + searchValue + "%'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                options = "";
                for (i = 0; i < data.length; i++) {
                    options += '<option value="' + data[i].project_name + '">' + data[i].project_name + '</option>';
                    $("#projects").html(options);
                }
            }
        });
    });



    $("#next").click(function () {
        $("#attribute").toggle();
        $("#filter").toggle();

        var nameValue = $("#names").val();
        var dateValue = $("#date").val();
        var dateValue1 = $("#date1").val()
        var govValue = $("#govs").val();
        var areaValue = $("#areas").val();
        var typeValue = $("#types").val();
        var programValue = $("#programs").val();
        var projectValue = $("#projects").val();

        $("#show_report").click(function () {

            var inputValues = [];
            $("#attribute input[type='checkbox']").each(function () {
                inputValues.push($(this).is(":checked"));
            });

            let query = "SELECT *";

            localStorage.removeItem('chall');
            localStorage.removeItem('links');
            localStorage.removeItem('bini_info');
            localStorage.removeItem('att');
            localStorage.removeItem('emp_info');
            localStorage.removeItem('parti_info');
            localStorage.removeItem('targt');
            localStorage.removeItem('goale');

            localStorage.setItem('chall', 0);
            localStorage.setItem('links', 0);
            localStorage.setItem('bini_info', 0);
            localStorage.setItem('att', 0);
            localStorage.setItem('emp_info', 0);
            localStorage.setItem('parti_info', 0);
            localStorage.setItem('targt', 0);
            localStorage.setItem('goale', 0);

            if (inputValues[0]) {
                localStorage.setItem('chall', 1);
            }
            if (inputValues[1]) {
                localStorage.setItem('links', 1);
            }
            if (inputValues[2]) {
                localStorage.setItem('bini_info', 1);
            }
            if (inputValues[3]) {
                localStorage.setItem('att', 1);
            }
            if (inputValues[4]) {
                localStorage.setItem('emp_info', 1);
            }
            if (inputValues[5]) {
                localStorage.setItem('parti_info', 1);
            }
            if (inputValues[6]) {
                localStorage.setItem('targt', 1);
            }
            if (inputValues[7]) {
                localStorage.setItem('goale', 1);
            }


            query += " FROM activities WHERE 1";
            if (nameValue != "" && $("#cb_name").is(":checked")) {
                query += " AND activity_name like '%" + nameValue + "%'";
            }
            if (dateValue != "" && dateValue1 != "" && $("#cb_date").is(":checked")) {
                query += " AND activity_date BETWEEN '" + dateValue + "' AND '" + dateValue1 + "'";
            }
            if (govValue != "" && $("#cb_gov").is(":checked")) {
                query += " AND activity_Governorate = '" + govValue + "'";
            }
            if (areaValue != "" && $("#cb_area").is(":checked")) {
                query += " AND activity_area = '" + areaValue + "'";
            }
            if (typeValue != "" && $("#cb_type").is(":checked")) {
                query += " AND activity_type = '" + typeValue + "'";
            }
            if (programValue != "" && $("#cb_program").is(":checked")) {
                query += " AND program_name = '" + programValue + "'";
            }
            if (projectValue != "" && $("#cd_project").is(":checked")) {
                query += " AND project_name = '" + projectValue + "'";
            }

            localStorage.setItem('sql', query);
            localStorage.removeItem('name');
            window.open("showReport.html", "_blank");
        });


    });

});