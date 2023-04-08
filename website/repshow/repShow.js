$(document).ready(function () {


    if (localStorage.getItem('login') == 0 || localStorage.getItem('login') == null) {
        window.location.replace("../login.html");
    }


    var name = localStorage.getItem('name');
    if (name != null) {
        $("#main").css("display", "flex");
        $("#activityName").text(name);

        var chall = localStorage.getItem('chall');
        if (chall != null && chall == 0) {
            $("#chall_table").toggle();
        }

        var links = localStorage.getItem('links');
        if (links != null && links == 0) {
            $("#links_table").toggle();
        }

        var bini_info = localStorage.getItem('bini_info');
        if (bini_info != null && bini_info == 0) {
            $("#ch1").toggle();
        }

        var att = localStorage.getItem('att');
        if (att != null && att == 0) {
            $("#att_table").toggle();
        }

        var emp_info = localStorage.getItem('emp_info');
        if (emp_info != null && emp_info == 0) {
            $("#emp_table").toggle();
        }

        var parti_info = localStorage.getItem('parti_info');
        if (parti_info != null && parti_info == 0) {
            $("#parti_table").toggle();
        }

        var targt = localStorage.getItem('targt');
        if (targt != null && targt == 0) {
            $("#ch2").toggle();
        }

        let sql = "SELECT * FROM `activities` WHERE `activity_name`='" + name + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {

                for (i = 0; i < data.length; i++) {

                    ht = '<tr> <th>التاريخ</th> <td>' + data[i].activity_date + '</td> <th id ="goaleTitle">الاهداف</th> </tr> <tr> <th>المحافظة</th> <td>' + data[i].activity_Governorate + '</td> ' +
                        '<td rowspan="6" id="goals"></td> </tr> <tr> <th>المشروع</th> ' +
                        '<td id ="projectName">' + data[i].project_name + '</td> </tr> <tr> <th>البرنامج</th> <td>' + data[i].program_name +
                        '</td> </tr> <tr> <th>المنطقة</th> <td>' + data[i].activity_area + '</td> ' +
                        '</tr> <tr> <th>النوع</th> <td>' + data[i].activity_type + '</td> </tr> <tr> <th>التفاصيل</th> <td>' + data[i].activity_details + '</td> </tr>';
                    $("#main_table").html(ht);

                    sql1 = "SELECT * FROM `goal_pro` WHERE `project_name`='" + data[i].project_name + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql1 },
                        dataType: "json",
                        type: "post",
                        success: function (data1) {
                            ht = "";
                            for (i = 0; i < data1.length; i++) {
                                ht += data1[i].goal_name + '<br><br>';
                            }
                            $("#goals").html(ht);
                            var goale = localStorage.getItem('goale');
                            if (goale != null && goale == 0) {
                                $("#goals").toggle();
                                $("#goaleTitle").toggle();
                            }

                        }
                    });
                }

            }
        });

        let sql10 = "SELECT * FROM `activ_chall` WHERE `activity_name`='" + name + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql10 },
            dataType: "json",
            type: "post",
            success: function (data) {
                let ht = "<tr><th>التحديات</th></tr>";
                for (i = 0; i < data.length; i++) {

                    let sql1 = "SELECT * FROM `challenges` WHERE `challenge_id`='" + data[i].challenge_id + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql1 },
                        dataType: "json",
                        type: "post",
                        success: function (data1) {
                            for (i = 0; i < data1.length; i++) {
                                ht += '<tr><td>' + data1[i].challenge + '</td></tr>';
                            }
                            $("#chall_table").html(ht);
                        }
                    });

                }

            }
        });

        sql = "SELECT * FROM `links` WHERE `activity_name`='" + name + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                ht = "<tr><th>الروابط</th></tr>";
                for (i = 0; i < data.length; i++) {
                    ht += '<tr> <td><a target="_blank" href="' + data[i].link + '">' + data[i].link + '</a></td> </tr>';
                }
                $("#links_table").html(ht);

            }
        });

        function relodImage() {
            $.ajax({
                url: 'php/getImg.php',
                data: { activityName: name },
                type: 'POST',
                success: function (out) {
                    if (out != "Image not found") {
                        $("#att_table").html(out);
                    } else {
                        alert(out);
                    }
                }
            });
        }
        relodImage();

        sql = "SELECT * FROM `act_emp` WHERE `activity_name`='" + name + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                for (i = 0; i < data.length; i++) {

                    sql1 = "SELECT * FROM `employees` WHERE `emp_id`='" + data[i].emp_id + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql1 },
                        dataType: "json",
                        type: "post",
                        success: function (data1) {
                            ht = "<tr><th>الموظفين</th></tr>";
                            for (i = 0; i < data1.length; i++) {
                                ht += '<tr><td>' + data1[i].emp_name + '</td></tr>';
                            }
                            $("#emp_table").html(ht);
                        }
                    });

                }
            }
        });


        let hty = "<tr> <th colspan=\"2\">المشاركين</th> </tr>";
        let dataLen = 0;
        sql = "SELECT * FROM `act_part` WHERE `activity_name`='" + name + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                let s = 0;
                for (i = 0; i < data.length; i++) {
                    sql1 = "SELECT * FROM `participants` WHERE `participants_name`='" + data[i].participant_name + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql1 },
                        dataType: "json",
                        type: "post",
                        success: function (data1) {
                            for (j = 0; j < data1.length; j++) {
                                hty += '<tr><td> ' + data1[j].participants_name + '</td><td>' + data1[j].nickname + '</td></tr>';
                                dataLen = data.length;
                                if (s == data.length - 1) {
                                    hty += "<tr><td colspan=\"2\"> العدد الكلي: " + dataLen + "</td><tr>";
                                    $("#parti_table").html(hty);
                                } else {
                                    s++;
                                }
                            }
                        }
                    });
                }




            }
        });

        let sql55 = "SELECT * FROM `activ_bene` WHERE `activity_name`='" + name + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql55 },
            dataType: "json",
            type: "post",
            success: function (data) {
                let hty = "<tr> <th colspan=\"3\">المستفيدين</th>"+
                " </tr><tr> <th>الأسم <th>العمر  <th>الجنس</th> </tr>";
                for (i = 0; i < data.length; i++) {
                hty += '<tr><td> ' + data[i].beneficiarie_name + '</td><td>' + data[i].beneficiarie_age + 
                '</td><td>' + data[i].beneficiarie_male + '</td></tr>';
                }
                $("#beni_table").html(hty);

            }
        });

        // Get the context of the canvas element we want to select
        var ctx = document.getElementById("myChart").getContext("2d");

        sql = "SELECT * FROM `activ_bene` WHERE `activity_name`='" + name + "' && `beneficiarie_male`='ذكر'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {
                meale = data.length;

                sql = "SELECT * FROM `activ_bene` WHERE `activity_name`='" + name + "' && `beneficiarie_male`='انثى'";
                $.ajax({
                    url: "../controlPanal/phpFile/show.php",
                    data: { sql: sql },
                    dataType: "json",
                    type: "post",
                    success: function (data) {
                        female = data.length;

                        var data = {
                            labels: ["الذكور", "الاناث"],
                            datasets: [
                                {
                                    data: [meale, female], //  Males: 10, Females: 20
                                    backgroundColor: [
                                        "#36A2EB",
                                        "#FFCE56"
                                    ],
                                    hoverBackgroundColor: [
                                        "#36A2EB",
                                        "#FFCE56"
                                    ]
                                }]
                        };

                        // Create the chart using the chart.js library
                        var myPieChart = new Chart(ctx, {
                            type: 'pie',
                            data: data
                        });

                    }
                });
            }
        });


        sql = "SELECT * FROM `activities` WHERE `activity_name`='" + name + "'";
        $.ajax({
            url: "../controlPanal/phpFile/show.php",
            data: { sql: sql },
            dataType: "json",
            type: "post",
            success: function (data) {

                for (i = 0; i < data.length; i++) {

                    project_name = data[i].project_name;


                    sql = "SELECT * FROM `targ_pro` WHERE `project_name`='" + project_name + "'";
                    $.ajax({
                        url: "../controlPanal/phpFile/show.php",
                        data: { sql: sql },
                        dataType: "json",
                        type: "post",
                        success: function (data) {

                            // Get the context of the canvas element we want to select
                            var ctx1 = document.getElementById("myChart1").getContext("2d");

                            targets = new Array();
                            dataTar = new Array();

                            for (i = 0; i < data.length; i++) {
                                targets[i] = data[i].target_group;
                                dataTar[i] = 1;
                            }

                            // Set the data for the graph
                            var data = {
                                labels: targets,
                                datasets: [
                                    {
                                        data: dataTar, // Total Beneficiaries: 30, Males: 10, Females: 20
                                        backgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56"
                                        ],
                                        hoverBackgroundColor: [
                                            "#FF6384",
                                            "#36A2EB",
                                            "#FFCE56"
                                        ]
                                    }]
                            };

                            // Create the chart using the chart.js library
                            var myPieChart = new Chart(ctx1, {
                                type: 'pie',
                                data: data
                            });

                        }
                    });



                }

            }
        });


    } else {

        $("#tableShow").css("display", "flex");

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


        var sql = localStorage.getItem('sql');
        reload(sql);


        $("table").on('click', '.click_btn', function () {
            id = $(this).data('id');
            localStorage.setItem('name', id);
            localStorage.removeItem("sql");
            window.open("showReport.html", "_blank");
        });

    }


});



