$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

  $("#logout").click(function () {
    localStorage.setItem("login", 0);
    window.location.replace("../../login.html");
  });
  function reload(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht =
          "<tr> <th>إسم النشاط</th> <th> تاريخ بدء النشاط</th> <th> تاريخ إنتهاءالنشاط</th> <th>المحافظة</th> <th>المنطقة</th>  <th>التفاصيل</th> <th> الهدف</th> <th> المدة</th> <th>البرنامج</th> <th>المشروع</th> <th> النوع</th> <th>الحذف</th><th>النعديل</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].activity_name +
            "</td><td>" +
            data[i].activity_start_date +
            "</td><td>" +
            data[i].activity_end_date +
            "</td><td>" +
            data[i].governorate +
            "</td><td>" +
            data[i].activity_area +
            "</td><td>" +
            data[i].activity_details +
            "</td><td>" +
            data[i].activity_aim +
            "</td><td>" +
            data[i].activity_period +
            "</td><td>" +
            data[i].program_name +
            "</td><td>" +
            data[i].project_name +
            "</td><td>" +
            data[i].activity_type +
            "</td>" +
            "<td><button data-id= '" +
            data[i].activity_name +
            '\' class="remove-btn">حذف  <i class="fa fa-remove"></i></button></td> <td><button data-id= \'' +
            data[i].activity_name +
            '\' class="edit-btn">تعديل  <i class="fas fa-edit"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `activities`");

  $("#search").keyup(function () {
    value = $(this).val();
    sql =
      "SELECT * FROM `activities` WHERE `activity_name` like '%" +
      value +
      "%' || `activity_start_date` like '%" +
      value +
      "%' || `activity_end_date` like '% " +
      value +
      "%' || `governorate` like '%" +
      value +
      "%' || `activity_area` like '%" +
      value +
      "%' || `activity_type` like '%" +
      value +
      "%' || `activity_details` like '%" +
      value +
      "%' || `program_name` like '%" +
      value +
      "%' || `activity_period` like '%" +
      value +
      "%' || `project_name` like '%" +
      value +
      "%' || `activity_aim` like '%" +
      value +
      "%'";
    reload(sql);
  });

  function ReloadPro(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].project_name +
            '">' +
            data[i].project_name +
            "</option>";
        }
        $("#pro").html(ht);
        ReloadAims(
          "SELECT goal_name FROM `goal_pro` where  project_name='" +
            $("#pro").val() +
            "'"
        );
      },
    });
  }
  ReloadPro("SELECT project_name FROM `project`");

  function ReloadProg(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].program_name +
            '">' +
            data[i].program_name +
            "</option>";
        }
        $("#prog").html(ht);
      },
    });
  }
  ReloadProg("SELECT program_name FROM `programs`");

  function ReloadGov(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].area_name +
            '">' +
            data[i].area_name +
            "</option>";
        }
        $("#gov").html(ht);
      },
    });
  }
  ReloadGov("SELECT area_name FROM `area`");

  function ReloadType(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].activity_type +
            '">' +
            data[i].activity_type +
            "</option>";
        }
        $("#type").html(ht);
      },
    });
  }
  ReloadType("SELECT activity_type FROM `activity_type`");

  function ReloadAims(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].goal_name +
            '">' +
            data[i].goal_name +
            "</option>";
        }
        $("#aim").html(ht);
      },
    });
  }

  $("#pro").change(function () {
    ReloadAims(
      "SELECT goal_name FROM `goal_pro` where  project_name='" +
        $("#pro").val() +
        "'"
    );
  });

  let name1;
  $("#next").click(function () {
    if (
      $("#name").val() == "" ||
      $("#pro").val() == "" ||
      $("#prog").val() == "" ||
      $("#start_date").val() == "" ||
      $("#end_date").val() == "" ||
      $("#gov").val() == "" ||
      $("#area").val() == "" ||
      $("#type").val() == "" ||
      $("#det").val() == "" ||
      $("#activity_period").val() == "" ||
      $("#aim").val() == "" ||
      $("#end_date").val() < $("#start_date").val()
    ) {
      $("#not").text("يرجى ملء جميع الحقول بالشكل الصحيح !");

      // Check if any of the input values are empty
      if ($("#name").val() === "") {
        $("#name").css("border-color", "red");
      } else {
        $("#name").css("border-color", "#ccc");
      }

      if ($("#pro").val() === "") {
        $("#pro").css("border-color", "red");
      } else {
        $("#pro").css("border-color", "#ccc");
      }

      if ($("#prog").val() === "") {
        $("#prog").css("border-color", "red");
      } else {
        $("#prog").css("border-color", "#ccc");
      }
      if ($("#start_date").val() === "") {
        $("#start_date").css("border-color", "red");
      } else {
        $("#start_date").css("border-color", "#ccc");
      }

      if ($("#end_date").val() === "") {
        $("#end_date").css("border-color", "red");
      } else {
        $("#end_date").css("border-color", "#ccc");
      }

      if ($("#gov").val() === "") {
        $("#gov").css("border-color", "red");
      } else {
        $("#gov").css("border-color", "#ccc");
      }

      if ($("#area").val() === "") {
        $("#area").css("border-color", "red");
      } else {
        $("#area").css("border-color", "#ccc");
      }

      if ($("#type").val() === "") {
        $("#type").css("border-color", "red");
      } else {
        $("#type").css("border-color", "#ccc");
      }

      if ($("#det").val() === "") {
        $("#det").css("border-color", "red");
      } else {
        $("#det").css("border-color", "#ccc");
      }

      if ($("#activity_period").val() === "") {
        $("#activity_period").css("border-color", "red");
      } else {
        $("#activity_period").css("border-color", "#ccc");
      }

      if ($("#aim").val() === "") {
        $("#aim").css("border-color", "red");
      } else {
        $("#aim").css("border-color", "#ccc");
      }

      if ($("#end_date").val() < $("#start_date").val()) {
        $("#end_date").css("border-color", "red");
        $("#start_date").css("border-color", "red");
        $("#DateNot").text("يرجى التأكد من التاريخ !");
      }

      $("html, body").animate({ scrollTop: 0 }, 800);
    } else {
      $("#he1").css("display", "none");
      $("#he2").css("display", "flex");
      $("#tableShow").hide();
      reload("SELECT * FROM `activities`");
    }
  });

  function ReloadAdmin(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].administrator_name +
            "-" +
            data[i].email +
            '">' +
            data[i].administrator_name +
            "</option>";
        }
        $("#partName").html(ht);
      },
    });
  }
  ReloadAdmin("SELECT * FROM `administrator`");

  function ReloadEmployee(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].emp_id +
            "-" +
            data[i].emp_name +
            '">' +
            data[i].emp_name +
            "</option>";
        }
        $("#empName").html(ht);
      },
    });
  }
  ReloadEmployee("SELECT * FROM `employees`");

  function ReloadNickname(sql) {
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].nickname +
            '">' +
            data[i].nickname +
            "</option>";
        }
        $("#nickname").html(ht);
      },
    });
  }
  ReloadNickname("SELECT * FROM `nicknames`");

  $("#prev1").click(function () {
    $("#he1").toggle();
    $("#he2").toggle();
    $("#close1").toggle();
    $("#not").text("");
    $("input, textarea").css("border-color", "#ccc");
  });

  $("#prev2").click(function () {
    $("#he2").toggle();
    $("#he3").toggle();
  });

  $("#prev3").click(function () {
    $("#he3").toggle();
    $("#he4").toggle();
  });

  let AdminNicknameArray = [];
  const AdminNicknameDiv = $("#AdminNickname");
  $("#addNickNameForAdmin").click(function () {
    nickname = $("#nickname").val();

    if (!AdminNicknameArray.includes(nickname) && nickname !== "") {
      AdminNicknameArray.push(nickname);

      // Map AdminArray to an array of HTML elements
      const newAdminArray = AdminNicknameArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeAdminNickname")
          .data("id", e);
        div.append(h6, button);
        return div;
      });

      // Add the new HTML elements to AdminNicknameDiv
      AdminNicknameDiv.html(newAdminArray);
      AdminNicknameDiv.show();
    }
  });

  $(document).on("click", ".removeAdminNickname", function () {
    const id = $(this).data("id");

    // Remove the corresponding fins from AdminArray
    AdminNicknameArray = AdminNicknameArray.filter((e) => e !== id);

    // Remove the corresponding HTML element from adminInsertedDiv
    $(this).parent().remove();

    // Hide adminInsertedDiv if there are no fins left
    if (AdminNicknameArray.length === 0) {
      AdminNicknameDiv.hide();
    }
  });

  let AdminArray = [];
  const adminInsertedDiv = $("#adimnCont");
  $("#bt_parti").click(function () {
    if (AdminNicknameArray.length > 0) {
      partName = $("#partName").val();
      let arr = partName.split("-");
      const AdminName = arr[0];
      const AdminEmail = arr[1];
      const adminObj = {
        AdminName: AdminName,
        AdminEmail: AdminEmail,
        AdminNicknameArray: AdminNicknameArray,
      };

      let isNotExsist = true;
      for (i = 0; i < AdminArray.length; i++) {
        if (
          AdminArray[i].AdminName == AdminName &&
          AdminArray[i].AdminEmail == AdminEmail
        ) {
          isNotExsist = false;
        }
      }

      if (isNotExsist == true && AdminNicknameArray.length > 0) {
        AdminArray.push(adminObj);
        const newAdminArray = AdminArray.map((e) => {
          const div = $("<div>");
          const h6 = $("<h6>").text(
            e.AdminName + " " + e.AdminNicknameArray.join(", ")
          );
          const button = $("<button>")
            .text("حذف")
            .addClass("removeAdmin")
            .data("id", e.AdminName + "-" + e.AdminEmail);
          div.append(h6, button);
          return div;
        });

        adminInsertedDiv.html(newAdminArray);
        adminInsertedDiv.show();
        AdminNicknameArray = [];
        AdminNicknameDiv.hide();
      } else {
        $("#not2").text("المسؤول موجود مسبقا");
      }
    } else {
      $("#not2").text("لم تتم الإضافة يرجى إضافة مسمى");
      $("#nickname").css("border-color", "red");
    }
  });

  $(document).on("click", ".removeAdmin", function () {
    const id = $(this).data("id");

    // Remove the corresponding fins from AdminArray
    AdminArray = AdminArray.filter(
      (e) => e.AdminName + "-" + e.AdminEmail !== id
    );

    // Remove the corresponding HTML element from adminInsertedDiv
    $(this).parent().remove();

    // Hide adminInsertedDiv if there are no fins left
    if (AdminArray.length === 0) {
      adminInsertedDiv.hide();
    }
  });

  let empArray = [];
  const EmpInsertedDiv = $("#EmpCont");
  $("#bt_empname").click(function () {
    empName = $("#empName").val();

    let arr = empName.split("-");
    const EmpId = arr[0];
    const EmpName = arr[1];
    const empObj = {
      EmpId: EmpId,
      EmpName: EmpName,
    };
    // Check if empObj is already in empArray
    let isNotExsist = true;
    for (i = 0; i < empArray.length; i++) {
      if (empArray[i].EmpId == EmpId) {
        isNotExsist = false;
      }
    }

    if (isNotExsist == true && empName.length > 0) {
      empArray.push(empObj);
      // Map empArray to an array of HTML elements
      const newEmpArray = empArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e.EmpName);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeEmp")
          .data("id", e.EmpId);
        div.append(h6, button);
        return div;
      });

      // Add the new HTML elements to EmpInsertedDiv
      EmpInsertedDiv.html(newEmpArray);
      EmpInsertedDiv.show();
    }
  });

  $(document).on("click", ".removeEmp", function () {
    const id = $(this).data("id");

    // Remove the corresponding fins from AdminArray
    empArray = empArray.filter((e) => e.EmpId !== id);

    // Remove the corresponding HTML element from adminInsertedDiv
    $(this).parent().remove();

    // Hide adminInsertedDiv if there are no fins left
    if (empArray.length === 0) {
      EmpInsertedDiv.hide();
    }
  });

  $("#next2").click(function () {
    $("#he2").css("display", "none");
    $("#he3").css("display", "flex");
  });

  $("#next3").click(function () {
    if (
      $("#male").val() == "" ||
      $("#female").val() == "" ||
      $("#age_18").val() == "" ||
      $("#age_18_30").val() == ""
    ) {
      $("#not3").text("يرجى ملء جميع الحقول بالشكل الصحيح !");

      // Check if any of the input values are empty
      if ($("#male").val() === "") {
        $("#male").css("border-color", "red");
      } else {
        $("#male").css("border-color", "#ccc");
      }

      if ($("#female").val() === "") {
        $("#female").css("border-color", "red");
      } else {
        $("#female").css("border-color", "#ccc");
      }

      if ($("#age_18").val() === "") {
        $("#age_18").css("border-color", "red");
      } else {
        $("#age_18").css("border-color", "#ccc");
      }
      if ($("#age_18_30").val() === "") {
        $("#age_18_30").css("border-color", "red");
      } else {
        $("#age_18_30").css("border-color", "#ccc");
      }
    } else {
      $("#he3").css("display", "none");
      $("#he4").css("display", "flex");
    }
  });

  let linksArray = [];
  const linkContDiv = $("#linkCont");
  $("#bt_link").click(function () {
    links = $("#links").val();
    let id = generateIdFromStringCharacters(links);

    let LinksObject = {
      id: id,
      links: links,
    };

    let isNotExist = true;

    linksArray.forEach((e) => {
      if (e.links === links) {
        isNotExist = false;
      }
    });

    if (isNotExist && links !== "") {
      linksArray.push(LinksObject);

      const newLinksArray = linksArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e.links);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeLinks-btn")
          .data("id", e.id);
        div.append(h6, button);
        return div;
      });

      linkContDiv.html(newLinksArray);
      linkContDiv.show();
    }
  });

  $(document).on("click", ".removeLinks-btn", function () {
    const id = $(this).data("id");

    // Remove the corresponding fins from AdminArray
    linksArray = linksArray.filter((e) => e.id !== id);

    // Remove the corresponding HTML element from adminInsertedDiv
    $(this).parent().remove();

    // Hide adminInsertedDiv if there are no fins left
    if (linksArray.length === 0) {
      linkContDiv.hide();
    }
  });

  let imageArr = [];
  $("#bt_att").click(function () {
    var formData = new FormData();
    formData.append("file", $("#file")[0].files[0]);
    formData.append("activityName", name1);

    $.ajax({
      url: "../php/addImage.php",
      data: formData,
      type: "POST",
      contentType: false,
      processData: false,
      success: function (out) {
        if (out != "الملف حجمه كبير" && out != "يوجد مشكلة في تحميل الملف")
          imageArr.push(out);
        else {
          alert(out);
        }
        relodImage();
      },
    });
  });

  function relodImage() {
    const newImageArr = imageArr.map((e) => {
      return (
        '<tr> <td><img style="width: 150px;height: 150px;" src="../img/images/' +
        e +
        '" alt=""></td> <td><button data-id="' +
        e +
        '" class="img_remove">حذف</button></td> </tr>'
      );
    });

    $("#imageTable").html(
      '<tr> <th width="70%">صور</th> <th width="10%">حذف</th> </tr>' +
        newImageArr
    );
  }

  $("#imageTable").on("click", ".img_remove", function () {
    const id = $(this).data("id");
    imageArr = imageArr.filter((e) => e !== id);
    $.ajax({
      url: "../php/removeImage.php",
      data: { name: id },
      type: "get",
      success: function (out) {},
    });
    relodImage();
  });

  let challArray = [];
  const challContDiv = $("#challCont");
  $("#bt_chall").click(function () {
    chall = $("#chall").val();
    let id = generateIdFromStringCharacters(chall);

    let challObject = {
      id: id,
      chall: chall,
    };

    let isNotExsist = true;
    for (let i = 0; i < challArray.length; i++) {
      const challObject2 = challArray[i];
      if (challObject2.id === id) {
        isNotExsist = false;
      }
    }

    if (isNotExsist && chall !== "") {
      challArray.push(challObject);

      const newChallArray = challArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e.chall);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeChall_btn")
          .data("id", e.id);
        div.append(h6, button);
        return div;
      });

      challContDiv.html(newChallArray);
      challContDiv.show();
    }
  });

  $(document).on("click", ".removeChall_btn", function () {
    const id = $(this).data("id");

    // Remove the corresponding fins from AdminArray
    challArray = challArray.filter((e) => e.id !== id);

    // Remove the corresponding HTML element from adminInsertedDiv
    $(this).parent().remove();

    // Hide adminInsertedDiv if there are no fins left
    if (challArray.length === 0) {
      challContDiv.hide();
    }
  });

  $("#next4").click(function () {
    name1 = $("#name").val();
    pro = $("#pro").val();
    prog = $("#prog").val();
    start_date = $("#start_date").val();
    end_date = $("#end_date").val();
    gov = $("#gov").val();
    area = $("#area").val();
    type = $("#type").val();
    det = $("#det").val();
    activity_period = $("#activity_period").val();
    aim = $("#aim").val();

    sqlAdd =
      "INSERT INTO `activities`(`activity_name`, `activity_start_date`, `activity_end_date`, `governorate`, `activity_area`, `activity_details`, `activity_aim`, `activity_period`, `project_name`, `program_name`, `activity_type`) VALUES " +
      "('" +
      name1 +
      "','" +
      start_date +
      "','" +
      end_date +
      "','" +
      gov +
      "','" +
      area +
      "','" +
      det +
      "','" +
      aim +
      "','" +
      activity_period +
      "','" +
      pro +
      "','" +
      prog +
      "','" +
      type +
      "')";

    $.ajax({
      url: "../../controlPanal/phpFile/add.php",
      data: { sqlAdd: sqlAdd },
      type: "post",
      success: function (out) {
        if (out == "successfully") {
          Promise.all([
            new Promise((resolve, reject) => {
              if (AdminArray.length !== 0) {
                let sqlArray = AdminArray.flatMap((e) => {
                  let objArray = e.AdminNicknameArray.map((f) => {
                    return (
                      "INSERT INTO act_adm_nick(activity_name, administrator_name, nickname, admin_email) VALUES ('" +
                      name1 +
                      "', '" +
                      e.AdminName +
                      "', '" +
                      f +
                      "', '" +
                      e.AdminEmail +
                      "')"
                    );
                  });
                  return objArray;
                });

                let promises = sqlArray.map((e) => {
                  return new Promise((resolve, reject) => {
                    $.ajax({
                      url: "../../controlPanal/phpFile/add.php",
                      data: { sqlAdd: e },
                      type: "post",
                      success: function (out) {
                        if (out == "successfully") {
                          resolve();
                        } else {
                          reject(
                            "Failed to add administrators. Please check the information provided on the second page."
                          );
                        }
                      },
                    });
                  });
                });

                Promise.all(promises)
                  .then(() => resolve())
                  .catch((err) => reject(err));
              } else {
                resolve();
              }
            }),

            new Promise((resolve, reject) => {
              if (empArray.length !== 0) {
                let sqlArray = empArray.map((e) => {
                  return (
                    "INSERT INTO act_emp(emp_id, activity_name) VALUES ('" +
                    e.EmpId +
                    "', '" +
                    name1 +
                    "')"
                  );
                });

                let promises = sqlArray.map((e) => {
                  return new Promise((resolve, reject) => {
                    $.ajax({
                      url: "../../controlPanal/phpFile/add.php",
                      data: { sqlAdd: e },
                      type: "post",
                      success: function (out) {
                        if (out == "successfully") {
                          resolve();
                        } else {
                          reject(
                            "Failed to add employees. Please check the information provided on the third page."
                          );
                        }
                      },
                    });
                  });
                });

                Promise.all(promises)
                  .then(() => resolve())
                  .catch((err) => reject(err));
              } else {
                resolve();
              }
            }),

            new Promise((resolve, reject) => {
              let male = $("#male").val();
              let female = $("#female").val();
              let age_18 = $("#age_18").val();
              let age_18_30 = $("#age_18_30").val();

              let sql =
                "INSERT INTO `beneficiaries`(`less_than_18`, `age_18_30`, `male`, `female`, `activity_name`) VALUES ('" +
                age_18 +
                "','" +
                age_18_30 +
                "','" +
                male +
                "','" +
                female +
                "','" +
                name1 +
                "')";

              $.ajax({
                url: "../../controlPanal/phpFile/add.php",
                data: { sqlAdd: sql },
                type: "post",
                success: function (out) {
                  if (out == "successfully") {
                    resolve();
                  } else {
                    reject(
                      "Failed to add beneficiaries. Please check the information provided on the third page."
                    );
                  }
                },
              });
            }),

            new Promise((resolve, reject) => {
              if (linksArray.length !== 0) {
                let sqlArray = linksArray.map((e) => {
                  return (
                    "INSERT INTO `links`(`link`, `activity_name`) VALUES ('" +
                    e.links +
                    "','" +
                    name1 +
                    "')"
                  );
                });
                sqlArray.forEach((e) => {
                  $.ajax({
                    url: "../../controlPanal/phpFile/add.php",
                    data: { sqlAdd: e },
                    type: "post",
                    success: function (out) {
                      if (out == "successfully") {
                        resolve();
                      } else {
                        $("#not4").text(
                          "لم تتم الإضافة يرجى التأكد من الروابط في رابع صفحة"
                        );
                        reject(
                          "Failed to add beneficiaries. Please check the information provided on the third page."
                        );
                      }
                    },
                  });
                });
              }
            }),

            new Promise((resolve, reject) => {
              if (imageArr.length !== 0) {
                let sqlArray = imageArr.map((e) => {
                  return (
                    "INSERT INTO `attachments`(`attachment`, `activity_name`) VALUES ('" +
                    e +
                    "','" +
                    name1 +
                    "')"
                  );
                });
                sqlArray.forEach((e) => {
                  $.ajax({
                    url: "../../controlPanal/phpFile/add.php",
                    data: { sqlAdd: e },
                    type: "post",
                    success: function (out) {
                      if (out == "successfully") {
                        resolve();
                      } else {
                        $("#not4").text(
                          "لم تتم الإضافة يرجى التأكد من الصور في رابع صفحة"
                        );
                        reject(
                          "Failed to add beneficiaries. Please check the information provided on the third page."
                        );
                      }
                    },
                  });
                });
              }
            }),

            new Promise((resolve, reject) => {
              if (challArray.length !== 0) {
                let sqlArray = challArray.map((e) => {
                  return (
                    "INSERT INTO `activ_chall`(`challenge`, `activity_name`) VALUES ('" +
                    e.chall +
                    "','" +
                    name1 +
                    "')"
                  );
                });

                sqlArray.forEach((e) => {
                  $.ajax({
                    url: "../../controlPanal/phpFile/add.php",
                    data: { sqlAdd: e },
                    type: "post",
                    success: function (out) {
                      if (out == "successfully") {
                        resolve();
                      } else {
                        $("#not4").text(
                          "لم تتم الإضافة يرجى التأكد من التحديات في رابع صفحة"
                        );
                        reject(
                          "Failed to add beneficiaries. Please check the information provided on the third page."
                        );
                      }
                    },
                  });
                });
              }
            }),
          ]).then(() => {
            window.location.replace("../activity/activity.html");
          });
        } else {
          $("#not4").text(
            "لم تتم الإضافة يرجى التأكد من البيانات من معلومات النشاط في اول صفحة"
          );
        }
      },
    });
  });

  function generateIdFromStringCharacters(str) {
    var validCharacters = str.replace(/[^\w]/g, "");

    var unicodeArray = [];
    for (var i = 0; i < validCharacters.length; i++) {
      unicodeArray.push(validCharacters.charCodeAt(i));
    }

    var id = "id_" + unicodeArray.join("_");

    return id;
  }

  $(document).on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");
    if (n) {
      id = $(this).data("id");
      table = "activities";
      feild = "activity_name";
      sql = "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {
          reload("SELECT * FROM `activities`");
        },
      });

      sql = "DELETE FROM `activ_bene` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {},
      });

      sql = "DELETE FROM `activ_chall` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {},
      });

      sql = "DELETE FROM `act_emp` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {},
      });

      sql = "DELETE FROM `act_adm_nick` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {},
      });

      sql = "SELECT * FROM `attachments` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/show.php",
        data: { sql: sql },
        dataType: "json",
        type: "post",
        success: function (data) {
          for (i = 0; i < data.length; i++) {
            $.ajax({
              url: "../php/removeImage.php",
              data: { name: data[i].attachment },
              type: "get",
              success: function (out) {},
            });
          }
        },
      });

      sql = "DELETE FROM `attachments` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {},
      });

      sql = "DELETE FROM `links` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {},
      });

      sql = "DELETE FROM `beneficiaries` WHERE `activity_name`='" + id + "'";
      $.ajax({
        url: "../../controlPanal/phpFile/remove.php",
        data: { sql: sql },
        type: "post",
        success: function (out) {},
      });
    }
  });

  $(".close").click(function () {
    if (confirm("هل انت متأكد من الألغاء")) {
      if (imageArr.length > 0) {
        for (i = 0; i < imageArr.length; i++) {
          $.ajax({
            url: "../php/removeImage.php",
            data: { name: imageArr[i] },
            type: "get",
            success: function (out) {
              window.location.replace("../activity/activity.html");
            },
          });
        }
      } else {
        window.location.replace("../activity/activity.html");
      }
    }
  });

  let id;
  $(document).on("click", ".edit-btn", function () {
    id = $(this).data("id");
    window.location.replace("../activityEdit/activityEdit.html?name=" + id);
  });

  $("#bar").click(function () {
    $(".navbare").toggleClass("active");
    $(this).toggleClass("fa-times");
  });
});
