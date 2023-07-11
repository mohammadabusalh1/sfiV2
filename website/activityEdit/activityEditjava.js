$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

  var queryString = window.location.search;
  var activityName = new URLSearchParams(queryString).get("name");

  $("#logout").click(function () {
    localStorage.setItem("login", 0);
    window.location.replace("../../login.html");
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

  function ReloadAims(sql, aim) {
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
          $("#aim").html(ht);
          if (aim != "" && aim != null) {
            $("#aim").val(aim);
          }
        }
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

  sql =
    "SELECT * FROM `activities` WHERE `activity_name`='" + activityName + "'";
  let aim;
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sql },
    dataType: "json",
    type: "post",
    success: function (out) {
      for (i = 0; i < out.length; i++) {
        $("#name").val(out[0].activity_name);
        $("#start_date").val(out[0].activity_start_date);
        $("#end_date").val(out[0].activity_end_date);
        $("#activity_period").val(out[0].activity_period);
        $("#pro").val(out[0].project_name);
        $("#prog").val(out[0].program_name);
        $("#area").val(out[0].activity_area);
        $("#type").val(out[0].activity_type);
        $("#det").val(out[0].activity_details);
        $("#gov").val(out[0].governorate);
        $("#aim").val(out[0].activity_aim);
        ReloadAims(
          "SELECT goal_name FROM `goal_pro` where  project_name='" +
            out[0].project_name +
            "'",
          out[0].activity_aim
        );
      }
    },
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
        $("#not").text("يرجى التأكد من التاريخ !");
      }

      $("html, body").animate({ scrollTop: 0 }, 800);
    } else {
      $("#he1").css("display", "none");
      $("#he2").css("display", "flex");
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
  let sqlGetAdmin =
    "SELECT * FROM `act_adm_nick` where `activity_name`='" + activityName + "'";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sqlGetAdmin },
    dataType: "json",
    type: "post",
    success: function (data) {
      let ht = data.map((e) => {
        let sqlGetAdminNickname =
          "SELECT `nickname` FROM `act_adm_nick` WHERE `administrator_name`='" +
          e.administrator_name +
          "' && `activity_name`='" +
          activityName +
          "' && `admin_email`='" +
          e.admin_email +
          "'";
        // Return a promise from inner AJAX call
        return new Promise((resolve, reject) => {
          $.ajax({
            url: "../../controlPanal/phpFile/show.php",
            data: { sql: sqlGetAdminNickname },
            dataType: "json",
            type: "post",
            success: function (data) {
              let arr = [];
              for (i = 0; i < data.length; i++) {
                arr.push(data[i].nickname);
              }
              resolve({ e, arr }); // Resolve the promise with the data
            },
            error: function (error) {
              reject(error); // Reject the promise if there's an error
            },
          });
        }).then(({ e, arr }) => {
          const adminObj = {
            AdminName: e.administrator_name,
            AdminEmail: e.admin_email,
            AdminNicknameArray: arr,
          };

          let isNotExsist = true;
          for (i = 0; i < AdminArray.length; i++) {
            if (
              AdminArray[i].AdminName == e.administrator_name &&
              AdminArray[i].AdminEmail == e.admin_email
            ) {
              isNotExsist = false;
            }
          }

          if (isNotExsist) {
            AdminArray.push(adminObj);

            // Create the h6 element after the promise is resolved
            let div = $("<div>");
            const h6 = $("<h6>").text(
              e.administrator_name + " " + arr.join(", ")
            );
            const button = $("<button>")
              .text("حذف")
              .addClass("removeAdmin")
              .data("id", e.administrator_name + "-" + e.admin_email);
            div.append(h6, button);
            return div;
          }
        });
      });

      // Use Promise.all to wait for all promises to resolve
      Promise.all(ht).then((results) => {
        $("#adimnCont").html(results);
        $("#adimnCont").show();
      });
    },
  });

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
  let sqlEmpIds =
    "SELECT * FROM `act_emp` where `activity_name`='" + activityName + "'";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sqlEmpIds },
    dataType: "json",
    type: "post",
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        let sqlEmp =
          "SELECT * FROM `employees` WHERE `emp_id`='" + data[i].emp_id + "'";
        $.ajax({
          url: "../../controlPanal/phpFile/show.php",
          data: { sql: sqlEmp },
          dataType: "json",
          type: "post",
          success: function (data1) {
            for (i = 0; i < data1.length; i++) {
              let empObj = {
                EmpId: data1[i].emp_id,
                EmpName: data1[i].emp_name,
              };
              empArray.push(empObj);
            }
            reloadEmp();
          },
        });
      }
    },
  });
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
    }
    reloadEmp();
  });

  function reloadEmp() {
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

  let sqlBene =
    "SELECT * FROM `beneficiaries` where `activity_name`='" +
    activityName +
    "'";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sqlBene },
    dataType: "json",
    type: "post",
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        $("#male").val(data[i].male);
        $("#female").val(data[i].female);
        $("#age_18").val(data[i].less_than_18);
        $("#age_18_30").val(data[i].age_18_30);
      }
    },
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
    $("#he3").css("display", "none");
    $("#he4").css("display", "flex");
  });

  let linksArray = [];
  let sqlLinks =
    "SELECT * FROM `links` where `activity_name`='" + activityName + "'";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sqlLinks },
    dataType: "json",
    type: "post",
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        let LinksObject = {
          id: data[i].link_id,
          links: data[i].link,
        };
        linksArray.push(LinksObject);
      }
      reloadLinks();
    },
  });
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
      reloadLinks();
    }
  });

  function reloadLinks() {
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
        relodImage2();
      },
    });
  });

  function relodImage2() {
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

  function relodImage() {
    let sqlLinks =
      "SELECT * FROM `attachments` where `activity_name`='" +
      activityName +
      "'";
    $.ajax({
      url: "../../controlPanal/phpFile/show.php",
      data: { sql: sqlLinks },
      dataType: "json",
      type: "post",
      success: function (data) {
        for (i = 0; i < data.length; i++) {
          imageArr.push(data[i].attachment);
        }
        relodImage2();
      },
    });
  }
  relodImage();

  $("#imageTable").on("click", ".img_remove", function () {
    const id = $(this).data("id");
    imageArr = imageArr.filter((e) => e !== id);
    $.ajax({
      url: "../php/removeImage.php",
      data: { name: id },
      type: "get",
      success: function (out) {},
    });
    relodImage2();
  });

  $(document).on("click", ".file_remove_btn", function () {
    const id = $(this).data("id");

    filesArray = filesArray.filter((e) => e.name !== id);

    $(this).parent().remove();

    if (filesArray.length === 0) {
      attachCont.hide();
    }
  });

  let challArray = [];
  let sqlChall =
    "SELECT * FROM `activ_chall` where `activity_name`='" + activityName + "'";
  $.ajax({
    url: "../../controlPanal/phpFile/show.php",
    data: { sql: sqlChall },
    dataType: "json",
    type: "post",
    success: function (data) {
      for (i = 0; i < data.length; i++) {
        let challObject = {
          id: data[i].challenge_id,
          chall: data[i].challenge,
        };
        challArray.push(challObject);
      }
      reloadChall();
    },
  });
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
      reloadChall();
    }
  });

  function reloadChall() {
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

  $(".next4").click(function () {
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
      "UPDATE `activities` SET `activity_name`='" +
      name1 +
      "',`activity_start_date`='" +
      start_date +
      "',`activity_end_date`='" +
      end_date +
      "',`governorate`='" +
      gov +
      "',`activity_area`='" +
      area +
      "',`activity_details`='" +
      det +
      "',`activity_aim`='" +
      aim +
      "',`activity_period`='" +
      activity_period +
      "',`project_name`='" +
      pro +
      "',`program_name`='" +
      prog +
      "',`activity_type`='" +
      type +
      "' WHERE `activity_name`='" +
      activityName +
      "'";

    $.ajax({
      url: "../../controlPanal/phpFile/add.php",
      data: { sqlAdd: sqlAdd },
      type: "post",
      success: function (out) {
        if (out == "successfully") {
          Promise.all([
            new Promise((resolve, reject) => {
              let adminRemoveSql =
                "DELETE FROM `act_adm_nick` WHERE `activity_name`='" +
                activityName +
                "'";
              $.ajax({
                url: "../../controlPanal/phpFile/remove.php",
                data: { sql: adminRemoveSql },
                type: "post",
                success: function (out) {
                  if (AdminArray.length !== 0) {
                    let sqlArray = AdminArray.flatMap((e) => {
                      let objArray = e.AdminNicknameArray.map((f) => {
                        return (
                          "INSERT INTO `act_adm_nick`(`activity_name`, `administrator_name`, `nickname`) VALUES ('" +
                          name1 +
                          "', '" +
                          e.AdminName +
                          "', '" +
                          f +
                          "')"
                        );
                      });
                      return objArray;
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
                            $("#not2").text("لم تتم الإضافة: " + out);
                            reject(
                              "Failed to add administrators. Please check the information provided on the second page."
                            );
                          }
                        },
                      });
                    });
                  }
                },
              });
            }),
            new Promise((resolve, reject) => {
              let empRemoveSql =
                "DELETE FROM `act_emp` WHERE `activity_name`='" +
                activityName +
                "'";
              $.ajax({
                url: "../../controlPanal/phpFile/remove.php",
                data: { sql: empRemoveSql },
                type: "post",
                success: function (out) {
                  if (empArray.length !== 0) {
                    let sqlArray = empArray.map((e) => {
                      return (
                        "INSERT INTO `act_emp`(`emp_id`, `activity_name`) VALUES ('" +
                        e.EmpId +
                        "', '" +
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
                            $("#not3").text("لم تتم الإضافة: " + out);
                            reject(
                              "Failed to add administrators. Please check the information provided on the second page."
                            );
                          }
                        },
                      });
                    });
                  }
                },
              });
            }),
            new Promise((resolve, reject) => {
              let male = $("#male").val();
              let female = $("#female").val();
              let age_18 = $("#age_18").val();
              let age_18_30 = $("#age_18_30").val();

              let sqlBene =
                "UPDATE `beneficiaries` SET `less_than_18`='" +
                age_18 +
                "',`age_18_30`='" +
                age_18_30 +
                "',`male`='" +
                male +
                "',`female`='" +
                female +
                "' WHERE `activity_name`='" +
                activityName +
                "'";
              $.ajax({
                url: "../../controlPanal/phpFile/add.php",
                data: { sqlAdd: sqlBene },
                type: "post",
                success: function (out) {
                  if (out == "successfully") {
                    resolve();
                  } else {
                    $("#not3").text("لم تتم الإضافة: " + out);
                    reject(
                      "Failed to add administrators. Please check the information provided on the second page."
                    );
                  }
                },
              });
            }),
            new Promise((resolve, reject) => {
              let LinksRemoveSql =
                "DELETE FROM `links` WHERE `activity_name`='" +
                activityName +
                "'";
              $.ajax({
                url: "../../controlPanal/phpFile/remove.php",
                data: { sql: LinksRemoveSql },
                type: "post",
                success: function (out) {
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
                            reject(
                              "Failed to add administrators. Please check the information provided on the second page."
                            );
                          }
                        },
                      });
                    });
                  }
                },
              });
            }),
            new Promise((resolve, reject) => {
              let filesRemoveSql =
                "DELETE FROM `attachments` WHERE `activity_name`='" +
                activityName +
                "'";
              $.ajax({
                url: "../../controlPanal/phpFile/remove.php",
                data: { sql: filesRemoveSql },
                type: "post",
                success: function (out) {
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
                              "Failed to add administrators. Please check the information provided on the second page."
                            );
                          }
                        },
                      });
                    });
                  }
                },
              });
            }),
            new Promise((resolve, reject) => {
              let challRemoveSql =
                "DELETE FROM `activ_chall` WHERE `activity_name`='" +
                activityName +
                "'";
              $.ajax({
                url: "../../controlPanal/phpFile/remove.php",
                data: { sql: challRemoveSql },
                type: "post",
                success: function (out) {
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
                            reject(
                              "Failed to add administrators. Please check the information provided on the second page."
                            );
                          }
                        },
                      });
                    });
                  }
                },
              });
            }),
          ]).then(() => {
            window.location.replace("../activity/activity.html");
          });
        } else {
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

  $(".close").click(function () {
    if (confirm("هل انت متأكد من الألغاء")) {
      let sqlLinks =
        "SELECT * FROM `attachments` where `activity_name`='" +
        activityName +
        "'";
      // let arr = [];
      const fetchLinks = () => {
        return new Promise((resolve, reject) => {
          $.ajax({
            url: "../../controlPanal/phpFile/show.php",
            data: { sql: sqlLinks },
            dataType: "json",
            type: "post",
            success: function (data) {
              const arr = [];
              for (let i = 0; i < data.length; i++) {
                arr.push(data[i].attachment);
                console.log(data[i].attachment);
              }
              resolve(arr);
            },
            error: function (err) {
              reject(err);
            },
          });
        });
      };

      const removeImages = (arr) => {
        const promises = [];
        for (let i = 0; i < imageArr.length; i++) {
          if (!arr.includes(imageArr[i])) {
            const promise = new Promise((resolve, reject) => {
              $.ajax({
                url: "../php/removeImage.php",
                data: { name: imageArr[i] },
                type: "get",
                success: function (out) {
                  resolve(out);
                },
                error: function (err) {
                  reject(err);
                },
              });
            });
            promises.push(promise);
          }
        }
        return Promise.all(promises);
      };

      fetchLinks()
        .then((arr) => removeImages(arr))
        .then((results) => {
          // handle results here
        })
        .catch((err) => {
          // handle error here
        });

      $.when
        .apply(
          $,
          $.map($(".ajax-call"), function (call) {
            return call[0];
          })
        )
        .then(function () {
          // All AJAX requests have completed, redirect the user
          window.location.replace("../activity/activity.html");
        });
    }
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
});
