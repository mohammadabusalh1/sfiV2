$(document).ready(function () {

    if (localStorage.getItem('login') == 0 || localStorage.getItem('login') == null) {
        window.location.replace("../login.html");
    }


    function ReloadPro(sql) {
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "";
                for (i = 0; i < data.length; i++) {
                    ht += "<option value=\"" + data[i].project_name + "\">" + data[i].project_name + "</option>";
                }
                $("#pro").html(ht);
            }
        });
    }
    ReloadPro("SELECT project_name FROM `project`");

    function ReloadProg(sql) {
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "";
                for (i = 0; i < data.length; i++) {
                    ht += "<option value=\"" + data[i].program_name + "\">" + data[i].program_name + "</option>";
                }
                $("#prog").html(ht);
            }
        });
    }
    ReloadProg("SELECT program_name FROM `programs`");

    function Reloadpart(sql) {
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "";
                for (i = 0; i < data.length; i++) {
                    ht += "<option value=\"" + data[i].participants_name + "\">" + data[i].participants_name + "</option>";
                }
                $("#partName").html(ht);
            }
        });
    }
    Reloadpart("SELECT participants_name FROM `participants`");

    function Reloadnick(sql) {
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "";
                for (i = 0; i < data.length; i++) {
                    ht += "<option value=\"" + data[i].nickname + "\">" + data[i].nickname + "</option>";
                }
                $("#nick").html(ht);
            }
        });
    }
    Reloadnick("SELECT nickname FROM `nicknames`");


    var queryString = window.location.search;
    var activityName = new URLSearchParams(queryString).get('name');

    sql = "SELECT * FROM `activities` WHERE `activity_name`='" + activityName + "'";

    $.ajax({
        url: "../controlPanal/phpFile/show.php",
        data: { sql: sql },
        dataType: "json",
        type: "post",
        success: function (out) {
            for (i = 0; i < out.length; i++) {
                $("#name").val(out[0].activity_name);
                $("#pro").val(out[0].project_name);
                $("#prog").val(out[0].program_name);
                $("#date").val(out[0].activity_date);
                $("#gov").val(out[0].activity_Governorate);
                $("#area").val(out[0].activity_area);
                $("#type").val(out[0].activity_type);
                $("#det").val(out[0].activity_details);
            }
        }
    });

    $("#bar").click(function () {
        $(".navbare").toggleClass("active");
        $(this).toggleClass("fa-times");
    });

    $("#next").click(function () {
        actName = $("#name").val();
        pro = $("#pro").val();
        prog = $("#prog").val();
        date = $("#date").val();
        gov = $("#gov").val();
        area = $("#area").val();
        type = $("#type").val();
        det = $("#det").val();

        sqlup = "UPDATE `activities` SET `activity_name`='" + actName
            + "',`activity_date`='" + date + "',`activity_Governorate`='" + gov +
            "',`activity_area`='" + area + "',`activity_type`='" + type + "',`activity_details`='" + det +
            "',`program_name`='" + prog + "',`project_name`='" + pro + "' WHERE `activity_name`='" + activityName + "'";
        $.ajax({
            url: "../controlPanal/phpFile/update.php",
            data: { sqlup: sqlup },
            type: "post",
            success: function (out) {
                if (out == "New record update successfully") {
                    $("#hero1").toggle();
                    $("#hero2").toggle();

                    sql = "SELECT `participant_name` FROM `act_part` WHERE `activity_name`='" + activityName + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql },
                        dataType: "json",
                        type: "post",
                        success: function (data) {
                            ht = "<tr><th>إسم المشارك</th> <th>الحذف</th></tr>";
                            for (i = 0; i < data.length; i++) {
                                ht += "<tr><td>" + data[i].participant_name + "</td><td><button data-id=" +
                                    data[i].participant_name + " class=\"remove-btn\">حذف</button></td></tr>";
                            }
                            $("#partTable").html(ht);

                            $("#partTable").on('click', '.remove-btn', function () {
                                id = $(this).data('id');
                                table = "act_part";
                                feild = "participant_name";
                                sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "' && `activity_name`='" + activityName + "'";
                                $.ajax({
                                    url: "../controlPanal/phpFile/remove.php",
                                    data: { sql: sql },
                                    type: "post",
                                    success: function (out) {
                                        sql = "SELECT `participant_name` FROM `act_part` WHERE `activity_name`='" + activityName + "'";
                                        $.ajax({
                                            url: "../controlPanal/phpFile/show.php",
                                            data: { sql: sql },
                                            dataType: "json",
                                            type: "post",
                                            success: function (data) {
                                                ht = "<tr><th>إسم المشارك</th> <th>الحذف</th></tr>";
                                                for (i = 0; i < data.length; i++) {
                                                    ht += "<tr><td>" + data[i].participant_name + "</td><td><button data-id=" +
                                                        data[i].participant_name + " class=\"remove-btn\">حذف</button></td></tr>";
                                                }
                                                $("#partTable").html(ht);
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });

                } else {
                    alert(out);
                }
            }
        });
    });

    Reloadpart("SELECT participants_name FROM `participants`");

    $("#bt_parti").click(function () {
        partName = $("#partName").val();

        sqlAdd2 = "INSERT INTO `act_part`(`participant_name`, `activity_name`) VALUES " +
            "('" + partName + "','" + activityName + "')";

        $.ajax({
            url: "../controlPanal/phpFile/add.php",
            data: { sqlAdd: sqlAdd2 },
            type: "post",
            success: function (out) {
                if (out == "successfully") {
                    partName = $("#partName").val("");
                    sql = "SELECT `participant_name` FROM `act_part` WHERE `activity_name`='" + activityName + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql },
                        dataType: "json",
                        type: "post",
                        success: function (data) {
                            ht = "<tr><th>إسم المشارك</th> <th>الحذف</th></tr>";
                            for (i = 0; i < data.length; i++) {
                                ht += "<tr><td>" + data[i].participant_name + "</td><td><button data-id=" +
                                    data[i].participant_name + " class=\"remove-btn\">حذف</button></td></tr>";
                            }
                            $("#partTable").html(ht);
                        }
                    });
                    alert("تمت الاضافة");
                } else {
                    alert(out);
                }
            }
        });

    });


    $("#next2").click(function () {
        $("#hero2").toggle();
        $("#hero3").toggle();

        $("#bt_empname").click(function () {

            empName = $("#empName").val();
            sqlAddempName = "INSERT INTO `employees`(`emp_name`) VALUES ('" + empName + "')";


            $.ajax({
                url: "../controlPanal/phpFile/add.php",
                data: { sqlAdd: sqlAddempName },
                type: "post",
                success: function (out) {

                    sqlMax = "SELECT MAX(`emp_id`) as idMax FROM `employees`";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        type: "post",
                        dataType: "json",
                        data: { sql: sqlMax },
                        success: function (output) {
                            empMax = output[0].idMax;

                            addEmpAct = "INSERT INTO `act_emp`(`emp_id`, `activity_name`) VALUES ('" + empMax + "','" + activityName + "')";
                            $.ajax({
                                url: "../controlPanal/phpFile/add.php",
                                data: { sqlAdd: addEmpAct },
                                type: "post",
                                success: function (out) {
                                    empName = $("#empName").val("");
                                    sql = "SELECT `emp_id` FROM `act_emp` WHERE `activity_name`='" + activityName + "'";
                                    $.ajax({
                                        url: "../controlPanal/phpFile/show.php",
                                        data: { sql: sql },
                                        dataType: "json",
                                        type: "post",
                                        success: function (data) {
                                            ht = "<tr><th>إسم الموظف</th> <th>الحذف</th></tr>";
                                            for (i = 0; i < data.length; i++) {
                                                sql = "SELECT * FROM `employees` WHERE `emp_id`='" + data[i].emp_id + "'";
                                                $.ajax({
                                                    url: "../controlPanal/phpFile/show.php",
                                                    data: { sql: sql },
                                                    dataType: "json",
                                                    type: "post",
                                                    success: function (data1) {
                                                        ht += "<tr><td>" + data1[0].emp_name + "</td><td><button data-id=" +
                                                            data1[0].emp_id + " class=\"remove-btn\">حذف</button></td></tr>";
                                                        $("#empTable").html(ht);
                                                    }
                                                });


                                            }
                                        }
                                    });
                                    alert("تمت الاضافة")
                                }
                            });

                        }
                    });

                }
            });


        });

        sql = "SELECT `emp_id` FROM `act_emp` WHERE `activity_name`='" + activityName + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "<tr><th>إسم الموظف</th> <th>الحذف</th></tr>";
                for (i = 0; i < data.length; i++) {
                    sql = "SELECT * FROM `employees` WHERE `emp_id`='" + data[i].emp_id + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql },
                        dataType: "json",
                        type: "post",
                        success: function (data1) {
                            ht += "<tr><td>" + data1[0].emp_name + "</td><td><button data-id=" +
                                data1[0].emp_id + " class=\"remove-btn\">حذف</button></td></tr>";
                            $("#empTable").html(ht);
                        }
                    });


                }
            }
        });

        $("#empTable").on('click', '.remove-btn', function () {
            id = $(this).data('id');
            table = "act_emp";
            feild = "emp_id";
            sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "' && `activity_name`='" + activityName + "'";
            $.ajax({
                url: "../controlPanal/phpFile/remove.php",
                data: { sql: sql },
                type: "post",
                success: function (out) {
                    sql = "SELECT `emp_id` FROM `act_emp` WHERE `activity_name`='" + activityName + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql },
                        dataType: "json",
                        type: "post",
                        success: function (data) {
                            ht = "<tr><th>إسم الموظف</th> <th>الحذف</th></tr>";
                            for (i = 0; i < data.length; i++) {
                                sql = "SELECT * FROM `employees` WHERE `emp_id`='" + data[i].emp_id + "'";
                                $.ajax({
                                    url: "../controlPanal/phpFile/show.php",
                                    data: { sql: sql },
                                    dataType: "json",
                                    type: "post",
                                    success: function (data1) {
                                        ht += "<tr><td>" + data1[0].emp_name + "</td><td><button data-id=" +
                                            data1[0].emp_id + " class=\"remove-btn\">حذف</button></td></tr>";
                                        $("#empTable").html(ht);
                                    }
                                });


                            }
                        }
                    });
                }
            });
        });

    });

    $("#next3").click(function () {
        $("#hero3").toggle();
        $("#hero4").toggle();

        sql = "SELECT `beneficiarie_name`, `beneficiarie_age`, `beneficiarie_male` FROM `activ_bene` WHERE `activity_name`='" + activityName + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "<tr><th>إسم المستفيد</th> <th>عمر المستفيد</th> <th>جنس المستفيد</th> <th>التعديل</th> <th>الحذف</th></tr>";
                for (i = 0; i < data.length; i++) {
                    ht += "<tr><td>" + data[i].beneficiarie_name + "</td> <td>" + data[i].beneficiarie_age
                        + "</td> <td>" + data[i].beneficiarie_male
                        + "</td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                        " class=\"edit-btn\">تعديل</button></td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                        " class=\"remove-btn\">حذف</button></td></tr>";
                }

                $("#biniTable").html(ht);
            }
        });

        $("#bt_bbniName").click(function () {
            biniName = $("#bini").val();
            biniAge = $("#biniAge").val();
            biniSex = $("#biniSex").val();

            sqlAdd7 = "INSERT INTO `activ_bene`(`activity_name`, `beneficiarie_name`, `beneficiarie_age`, `beneficiarie_male`) VALUES" +
                " ('" + activityName + "','" + biniName + "','" + biniAge + "','" + biniSex + "')";

            $.ajax({
                url: "../controlPanal/phpFile/add.php",
                data: { sqlAdd: sqlAdd7 },
                type: "post",
                success: function (out) {
                    if (out == "successfully") {
                        $("#bini").val("");
                        $("#biniAge").val("");
                        $("#biniSex").val("");
                        sql = "SELECT `beneficiarie_name`, `beneficiarie_age`, `beneficiarie_male` FROM `activ_bene` WHERE `activity_name`='" + activityName + "'";
                        $.ajax({
                            url: "../controlPanal/phpFile/show.php",
                            data: { sql: sql },
                            dataType: "json",
                            type: "post",
                            success: function (data) {
                                ht = "<tr><th>إسم المستفيد</th> <th>عمر المستفيد</th> <th>جنس المستفيد</th> <th>التعديل</th> <th>الحذف</th></tr>";
                                for (i = 0; i < data.length; i++) {
                                    ht += "<tr><td>" + data[i].beneficiarie_name + "</td> <td>" + data[i].beneficiarie_age
                                        + "</td> <td>" + data[i].beneficiarie_male
                                        + "</td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                                        " class=\"edit-btn\">تعديل</button></td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                                        " class=\"remove-btn\">حذف</button></td></tr>";
                                }

                                $("#biniTable").html(ht);
                            }
                        });
                        alert("تمت الاضافة");
                    } else {
                        alert(out);
                    }

                }
            });


        });

        $("#biniTable").on('click', '.remove-btn', function () {
            id = $(this).data('id');
            var arr = id.split("%");
            table = "activ_bene";
            feild = "beneficiarie_name";
            sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + arr[0] + "' && `activity_name`='" + activityName
                + "' && `beneficiarie_age`='" + arr[1] + "' && `beneficiarie_male`='" + arr[2] + "'";
            $.ajax({
                url: "../controlPanal/phpFile/remove.php",
                data: { sql: sql },
                type: "post",
                success: function (out) {
                    if (out == "remove successfully") {
                        sql = "SELECT `beneficiarie_name`, `beneficiarie_age`, `beneficiarie_male` FROM `activ_bene` WHERE `activity_name`='" + activityName + "'";
                        $.ajax({
                            url: "../controlPanal/phpFile/show.php",
                            data: { sql: sql },
                            dataType: "json",
                            type: "post",
                            success: function (data) {
                                ht = "<tr><th>إسم المستفيد</th> <th>عمر المستفيد</th> <th>جنس المستفيد</th> <th>التعديل</th> <th>الحذف</th></tr>";
                                for (i = 0; i < data.length; i++) {
                                    ht += "<tr><td>" + data[i].beneficiarie_name + "</td> <td>" + data[i].beneficiarie_age
                                        + "</td> <td>" + data[i].beneficiarie_male
                                        + "</td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                                        " class=\"edit-btn\">تعديل</button></td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                                        " class=\"remove-btn\">حذف</button></td></tr>";
                                }

                                $("#biniTable").html(ht);
                            }
                        });

                    } else {
                        alert(out);
                    }
                }
            });
        });

        let arr;
        $(document).on('click', '.edit-btn', function () {
            id = $(this).data('id');
            arr = id.split("%");
            $("#bini").val(arr[0]);
            $("#biniAge").val(arr[1]);
            $("#biniSex").val(arr[2]);

            $("#bt_bbniName").toggle();
            $("#bt_bbniNameEdit").toggle();
            $("#biniTable").toggle();
            $("#next4").toggle();
        });

        $("#bt_bbniNameEdit").click(function () {
            bini = $("#bini").val();
            biniAge = $("#biniAge").val();
            biniSex = $("#biniSex").val();

            sqlup = "UPDATE `activ_bene` SET `beneficiarie_name`='" + bini
                + "',`beneficiarie_age`='" + biniAge + "',`beneficiarie_male`='" + biniSex +
                "' WHERE `activity_name`='" + activityName + "' && `beneficiarie_name`='" + arr[0] +
                "' &&`beneficiarie_age`='" + arr[1] + "' && `beneficiarie_male`='" + arr[2] + "'";
            $.ajax({
                url: "../controlPanal/phpFile/update.php",
                data: { sqlup: sqlup },
                type: "post",
                success: function (out) {
                    if (out != "New record update successfully") {
                        alert(out)
                    } else {
                        sql = "SELECT `beneficiarie_name`, `beneficiarie_age`, `beneficiarie_male` FROM `activ_bene` WHERE `activity_name`='" + activityName + "'";
                        $.ajax({
                            url: "../controlPanal/phpFile/show.php",
                            data: { sql: sql },
                            dataType: "json",
                            type: "post",
                            success: function (data) {
                                ht = "<tr><th>إسم المستفيد</th> <th>عمر المستفيد</th> <th>جنس المستفيد</th> <th>التعديل</th> <th>الحذف</th></tr>";
                                for (i = 0; i < data.length; i++) {
                                    ht += "<tr><td>" + data[i].beneficiarie_name + "</td> <td>" + data[i].beneficiarie_age
                                        + "</td> <td>" + data[i].beneficiarie_male
                                        + "</td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                                        " class=\"edit-btn\">تعديل</button></td><td><button data-id=" + data[i].beneficiarie_name + "%" + data[i].beneficiarie_age + "%" + data[i].beneficiarie_male +
                                        " class=\"remove-btn\">حذف</button></td></tr>";
                                }

                                $("#biniTable").html(ht);
                            }
                        });

                        $("#bini").val("");
                        $("#biniAge").val("");
                        $("#biniSex").val("");
                        $("#bt_bbniName").toggle();
                        $("#bt_bbniNameEdit").toggle();
                        $("#biniTable").toggle();
                        $("#next4").toggle();
                    }
                }
            });
        });

    });

    $("#next4").click(function () {
        $("#hero4").toggle();
        $("#hero5").toggle();


        function linkLoad() {
            sql = "SELECT * FROM `links` WHERE `activity_name`='" + activityName + "'";
            $.ajax({
                url: "../controlPanal/phpFile/show.php",
                data: { sql: sql },
                dataType: "json",
                type: "post",
                success: function (data) {
                    ht = "<tr><th> الرابط</th> <th>الحذف</th></tr>";
                    for (i = 0; i < data.length; i++) {
                        ht += "<tr><td><a target=\"_blank\" href=" + data[i].link + ">" + data[i].link + "</a></td><td><button data-id=" + data[i].link_id +
                            " class=\"remove-btn\">حذف</button></td></tr>";
                    }
                    $("#linkTable").html(ht);
                }
            });
        }
        linkLoad();

        $("#bt_link").click(function () {
            links = $("#links").val();

            sqlAdd8 = "INSERT INTO `links`(`link`, `activity_name`) VALUES" +
                " ('" + links + "','" + activityName + "')";

            $.ajax({
                url: "../controlPanal/phpFile/add.php",
                data: { sqlAdd: sqlAdd8 },
                type: "post",
                success: function (out) {
                    if (out == "successfully") {
                        links = $("#links").val("");
                        linkLoad();
                        alert("تمت الاضافة");
                    } else {
                        alert(out);
                    }
                }
            });
        });


        $("#linkTable").on('click', '.remove-btn', function () {
            id = $(this).data('id');
            table = "links";
            feild = "link_id";
            sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "'";
            $.ajax({
                url: "../controlPanal/phpFile/remove.php",
                data: { sql: sql },
                type: "post",
                success: function (out) {
                    if (out == "remove successfully") {
                        linkLoad();
                    } else {
                        alert(out);
                    }
                }
            });
        });

        function challLoad() {
            sql = "SELECT * FROM `activ_chall` WHERE `activity_name`='" + activityName + "'";
            $.ajax({
                url: "../controlPanal/phpFile/show.php",
                data: { sql: sql },
                dataType: "json",
                type: "post",
                success: function (data) {
                    ht = "<tr><th> التحدي</th> <th>الحذف</th></tr>";
                    for (i = 0; i < data.length; i++) {
                        sql1 = "SELECT * FROM `challenges` WHERE `challenge_id`='" + data[i].challenge_id + "'";
                        $.ajax({
                            url: "../controlPanal/phpFile/show.php",
                            data: { sql: sql1 },
                            dataType: "json",
                            type: "post",
                            success: function (data1) {
                                ht += "<tr><td>" + data1[0].challenge + "</td><td><button data-id=" + data1[0].challenge_id +
                                    " class=\"remove-btn\">حذف</button></td></tr>";
                                $("#challTable").html(ht);
                            }
                        });
                    }
                    $("#challTable").html(ht);
                }
            });
        }
        challLoad();

        $("#bt_chall").click(function () {
            chall = $("#chall").val();

            sqlAdd8 = "INSERT INTO `challenges`(`challenge`) VALUES ('" + chall + "')";
            $.ajax({
                url: "../controlPanal/phpFile/add.php",
                data: { sqlAdd: sqlAdd8 },
                type: "post",
                success: function (out) {
                    if (out == "successfully") {
                        sqlAddChall9 = "SELECT MAX(`challenge_id`) as maxChall FROM `challenges`";
                        $.ajax({
                            url: "../controlPanal/phpFile/show.php",
                            data: { sql: sqlAddChall9 },
                            type: "post",
                            dataType: "json",
                            success: function (challOut) {
                                sqlAdd10 = "INSERT INTO `activ_chall`(`challenge_id`, `activity_name`) VALUES ('" + challOut[0].maxChall +
                                    "','" + activityName + "')";
                                $.ajax({
                                    url: "../controlPanal/phpFile/add.php",
                                    data: { sqlAdd: sqlAdd10 },
                                    type: "post",
                                    success: function (out2) {
                                        if (out2 == "successfully") {
                                            $("#chall").val("");
                                            challLoad();
                                            alert("تمت الاضافة");
                                        } else {
                                            alert(out2);
                                        }
                                    }
                                });
                            }
                        });
                    } else {
                        alert(out);
                    }
                }
            });
        });


        $("#challTable").on('click', '.remove-btn', function () {
            id = $(this).data('id');
            table = "activ_chall";
            feild = "challenge_id";
            sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "'";
            $.ajax({
                url: "../controlPanal/phpFile/remove.php",
                data: { sql: sql },
                type: "post",
                success: function (out) {
                    if (out == "remove successfully") {
                        sql16 = "DELETE FROM `challenges` WHERE `" + feild + "` = '" + id + "'";
                        $.ajax({
                            url: "../controlPanal/phpFile/remove.php",
                            data: { sql: sql16 },
                            type: "post",
                            success: function (out) {
                                if (out == "remove successfully") {
                                    challLoad();
                                } else {
                                    alert(out);
                                }
                            }
                        });
                    } else {
                        alert(out);
                    }
                }
            });

        });


    });

    $("#next5").click(function () {
        $("#hero5").toggle();
        $("#hero6").toggle();

        function relodImage() {

            $.ajax({
                url: 'php/getImg.php',
                data: { activityName: activityName },
                type: 'POST',
                success: function (out) {
                    if (out != "Image not found") {
                        $("#tab").html(out);
                    } else {
                        alert(out);
                    }
                }
            });
        }

        relodImage();

        $("#bt_att").click(function () {
            var formData = new FormData();
            formData.append('file', $('#file')[0].files[0]);
            formData.append('activityName', activityName);

            $.ajax({
                url: 'php/addImage.php',
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (out) {
                    if (out == "Image added successfully") {
                        relodImage();
                        alert("تمت الاضافة");
                    } else {
                        alert(out);
                    }
                }
            });
        });

        $("#tab").on('click', '.img_remove', function () {
            id = $(this).data('id');
            var arr = id.split(",");

            sql = "DELETE FROM `attachments` WHERE `attachment_id`='" + arr[0] + "'";
            $.ajax({
                url: "../controlPanal/phpFile/remove.php",
                data: { sql: sql },
                type: "post",
                success: function (out) {
                    if (out == "remove successfully") {

                        $.ajax({
                            url: "php/removeImage.php",
                            data: { name: arr[1] },
                            type: "get",
                            success: function (out) {
                                relodImage();
                            }
                        });
                    } else {
                        alert(out);
                    }
                }
            });

        });

    });

    $(".next6").click(function () {
        window.location.replace("activity.html");

        actName = $("#name").val();
        pro = $("#pro").val();
        prog = $("#prog").val();
        date = $("#date").val();
        gov = $("#gov").val();
        area = $("#area").val();
        type = $("#type").val();
        det = $("#det").val();

        sqlup = "UPDATE `activities` SET `activity_name`='" + actName
            + "',`activity_date`='" + date + "',`activity_Governorate`='" + gov +
            "',`activity_area`='" + area + "',`activity_type`='" + type + "',`activity_details`='" + det +
            "',`program_name`='" + prog + "',`project_name`='" + pro + "' WHERE `activity_name`='" + activityName + "'";
        $.ajax({
            url: "../controlPanal/phpFile/update.php",
            data: { sqlup: sqlup },
            type: "post",
            success: function (out) {
                if (out == "New record update successfully") {
                    $("#hero1").toggle();
                    $("#hero2").toggle();

                    sql = "SELECT `participant_name` FROM `act_part` WHERE `activity_name`='" + activityName + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql },
                        dataType: "json",
                        type: "post",
                        success: function (data) {
                            ht = "<tr><th>إسم المشارك</th> <th>الحذف</th></tr>";
                            for (i = 0; i < data.length; i++) {
                                ht += "<tr><td>" + data[i].participant_name + "</td><td><button data-id=" +
                                    data[i].participant_name + " class=\"remove-btn\">حذف</button></td></tr>";
                            }
                            $("#partTable").html(ht);

                            $("#partTable").on('click', '.remove-btn', function () {
                                id = $(this).data('id');
                                table = "act_part";
                                feild = "participant_name";
                                sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "' && `activity_name`='" + activityName + "'";
                                $.ajax({
                                    url: "../controlPanal/phpFile/remove.php",
                                    data: { sql: sql },
                                    type: "post",
                                    success: function (out) {
                                        sql = "SELECT `participant_name` FROM `act_part` WHERE `activity_name`='" + activityName + "'";
                                        $.ajax({
                                            url: "../controlPanal/phpFile/show.php",
                                            data: { sql: sql },
                                            dataType: "json",
                                            type: "post",
                                            success: function (data) {
                                                ht = "<tr><th>إسم المشارك</th> <th>الحذف</th></tr>";
                                                for (i = 0; i < data.length; i++) {
                                                    ht += "<tr><td>" + data[i].participant_name + "</td><td><button data-id=" +
                                                        data[i].participant_name + " class=\"remove-btn\">حذف</button></td></tr>";
                                                }
                                                $("#partTable").html(ht);
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });

                } else {
                    alert(out);
                }
            }
        });
    });

    $("#prev1").click(function () {
        $("#hero1").toggle();
        $("#hero2").toggle();
    });

    $("#prev2").click(function () {
        $("#hero2").toggle();
        $("#hero3").toggle();
    });

    $("#prev3").click(function () {
        $("#hero3").toggle();
        $("#hero4").toggle();
    });

    $("#prev4").click(function () {
        $("#hero5").toggle();
        $("#hero4").toggle();
    });

    $("#prev5").click(function () {
        $("#hero5").toggle();
        $("#hero6").toggle();
    });
});
