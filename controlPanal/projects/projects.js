$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

  // get all financier name to select when crate projects
  function finReload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].project_financier_name +
            " - " +
            data[i].governorate +
            " - " +
            data[i].city +
            '">' +
            data[i].project_financier_name +
            " - " +
            data[i].governorate +
            " - " +
            data[i].city +
            "</option>";
        }
        $("#fins").html(ht);
      },
    });
  }

  finReload("SELECT * FROM `financier`");
  //=============================================

  // add all fins that inserted to array
  let finsArray = [];

  const finsInsertedDiv = $("#finsInserted");

  $("#addFin").click(function () {
    const fins = $("#fins").val();

    // Check if fins is already in finsArray
    if (!finsArray.includes(fins)) {
      finsArray.push(fins);

      // Map finsArray to an array of HTML elements
      const newFinsArray = finsArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeFin")
          .data("id", e);
        div.append(h6, button);
        return div;
      });

      // Add the new HTML elements to finsInsertedDiv
      finsInsertedDiv.html(newFinsArray);
      finsInsertedDiv.show();
    }
  });

  // Add a click event listener to the document, and check if the clicked element is a removeFin button
  $(document).on("click", ".removeFin", function () {
    const id = $(this).data("id");

    // Remove the corresponding fins from finsArray
    finsArray = finsArray.filter((e) => e !== id);

    // Remove the corresponding HTML element from finsInsertedDiv
    $(this).parent().remove();

    // Hide finsInsertedDiv if there are no fins left
    if (finsArray.length === 0) {
      finsInsertedDiv.hide();
    }
  });

  //=============================================

  // get all goals name to select when crate projects
  function goalReload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
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
        $("#goal").html(ht);
      },
    });
  }

  goalReload("SELECT * FROM `goals`");
  //=============================================

  // add all goals that inserted to array
  let goalsArray = [];

  const goalsInsertedDiv = $("#goalInserted");

  $("#addGoal").click(function () {
    const goal = $("#goal").val();

    // Check if goal is already in goalArray
    if (!goalsArray.includes(goal)) {
      goalsArray.push(goal);

      // Map goalArray to an array of HTML elements
      const newGoalArray = goalsArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeGoal")
          .data("id", e);
        div.append(h6, button);
        return div;
      });

      // Add the new HTML elements to goalInsertedDiv
      goalsInsertedDiv.html(newGoalArray);
      goalsInsertedDiv.show();
    }
  });

  // Add a click event listener to the document, and check if the clicked element is a removeGoal button
  $(document).on("click", ".removeGoal", function () {
    const id = $(this).data("id");

    // Remove the corresponding goal from goalsArray
    goalsArray = goalsArray.filter((e) => e !== id);

    // Remove the corresponding HTML element from goalsInsertedDiv
    $(this).parent().remove();

    // Hide goalsInsertedDiv if there are no goal left
    if (goalsArray.length === 0) {
      goalsInsertedDiv.hide();
    }
  });
  //=============================================

  // get all areas name to select when crate projects
  function areaReload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
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
        $("#area").html(ht);
      },
    });
  }

  areaReload("SELECT * FROM `area`");
  //=============================================

  // add all areas that inserted to array
  let areasArray = [];

  const areasInsertedDiv = $("#areaInserted");

  $("#addArea").click(function () {
    const area = $("#area").val();

    // Check if area is already in areaArray
    if (!areasArray.includes(area)) {
      areasArray.push(area);

      // Map AreaArray to an array of HTML elements
      const newAreaArray = areasArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeArea")
          .data("id", e);
        div.append(h6, button);
        return div;
      });

      // Add the new HTML elements to areasInsertedDiv
      areasInsertedDiv.html(newAreaArray);
      areasInsertedDiv.show();
    }
  });

  // Add a click event listener to the document, and check if the clicked element is a removeGoal button
  $(document).on("click", ".removeArea", function () {
    const id = $(this).data("id");

    // Remove the corresponding goal from goalsArray
    areasArray = areasArray.filter((e) => e !== id);

    // Remove the corresponding HTML element from goalsInsertedDiv
    $(this).parent().remove();

    // Hide goalsInsertedDiv if there are no goal left
    if (areasArray.length === 0) {
      areasInsertedDiv.hide();
    }
  });
  //=============================================

  // get all areas name to select when crate projects
  function targetReload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht = "";
        for (i = 0; i < data.length; i++) {
          ht +=
            '<option value="' +
            data[i].target_group +
            '">' +
            data[i].target_group +
            "</option>";
        }
        $("#target").html(ht);
      },
    });
  }

  targetReload("SELECT * FROM `target_groups`");
  //=============================================

  // add all target that inserted to array
  let targetsArray = [];

  const targetsInsertedDiv = $("#targetInserted");

  $("#addTarget").click(function () {
    const target = $("#target").val();

    // Check if area is already in targetsArray
    if (!targetsArray.includes(target)) {
      targetsArray.push(target);

      // Map targetsArray to an array of HTML elements
      const newTargetArray = targetsArray.map((e) => {
        const div = $("<div>");
        const h6 = $("<h6>").text(e);
        const button = $("<button>")
          .text("حذف")
          .addClass("removeTarget")
          .data("id", e);
        div.append(h6, button);
        return div;
      });

      // Add the new HTML elements to targetsInsertedDiv
      targetsInsertedDiv.html(newTargetArray);
      targetsInsertedDiv.show();
    }
  });

  // Add a click event listener to the document, and check if the clicked element is a removeGoal button
  $(document).on("click", ".removeTarget", function () {
    const id = $(this).data("id");

    // Remove the corresponding goal from goalsArray
    targetsArray = targetsArray.filter((e) => e !== id);

    // Remove the corresponding HTML element from goalsInsertedDiv
    $(this).parent().remove();

    // Hide goalsInsertedDiv if there are no goal left
    if (targetsArray.length === 0) {
      targetsInsertedDiv.hide();
    }
  });
  //=============================================

  function add(sql) {
    $.ajax({
      url: "../phpFile/add.php",
      data: { sqlAdd: sql },
      type: "post",
      success: function (out) {},
    });
  }

  function reload(sql) {
    $.ajax({
      url: "../phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        ht =
          "<tr> <th>إسم المشروع</th> <th>قيمة المشروع</th> <th>فكرة المشروع</th> <th>تاريخ البدء</th> <th>تاريخ الانتهاء</th> <th> الحذف</th> <th> تعديل</th></tr>";
        for (i = 0; i < data.length; i++) {
          ht +=
            "<tr><td>" +
            data[i].project_name +
            "</td><td>" +
            data[i].project_value +
            " " +
            data[i].value_type +
            "</td><td>" +
            data[i].project_idea +
            "</td><td>" +
            data[i].start_date +
            "</td><td>" +
            data[i].end_date +
            "</td> <td><button data-id= '" +
            data[i].project_name +
            '\' class="remove-btn">حذف <i class="fa fa-remove" aria-hidden="true"></i></button></td> <td><button data-id= \'' +
            data[i].project_name +
            '\' class="edit-btn">تعديل <i class="fas fa-edit"></i></button></td></tr>';
        }
        $(".table").html(ht);
      },
    });
  }
  reload("SELECT * FROM `project`");

  $("#add").on("click", function () {
    // Check if any of the input values are empty
    if (
      $("#name").val() === "" ||
      $("#value").val() === "" ||
      $("#idea").val() === "" ||
      $("#startDate").val() === "" ||
      $("#endDate").val() === ""
    ) {
      $("#alert").text("يرجى ملء جميع الحقول !");

      // Check if any of the input values are empty
      if ($("#name").val() === "") {
        $("#name").css("border-color", "red");
      } else {
        $("#name").css("border-color", "");
      }

      if ($("#value").val() === "") {
        $("#value").css("border-color", "red");
      } else {
        $("#value").css("border-color", "");
      }

      if ($("#idea").val() === "") {
        $("#idea").css("border-color", "red");
      } else {
        $("#idea").css("border-color", "");
      }

      if ($("#startDate").val() === "") {
        $("#startDate").css("border-color", "red");
      } else {
        $("#startDate").css("border-color", "");
      }

      if ($("#endDate").val() === "") {
        $("#endDate").css("border-color", "red");
      } else {
        $("#endDate").css("border-color", "");
      }

      return false;
    } else {
      var name = $("#name").val();
      var value = $("#value").val();
      var valueType = $("#valueType").val();
      var idea = $("#idea").val();
      var startDate = $("#startDate").val();
      var endDate = $("#endDate").val();

      sqlAdd =
        "INSERT INTO `project` (`project_name`, `project_value`, `project_idea`, `value_type`, `start_date`, `end_date`) VALUES ('" +
        name +
        "','" +
        value +
        "','" +
        idea +
        "','" +
        valueType +
        "','" +
        startDate +
        "','" +
        endDate +
        "')";

      $.ajax({
        url: "../phpFile/add.php",
        data: { sqlAdd: sqlAdd },
        type: "post",
        success: function (out) {
          if (out == "successfully") {
            if (finsArray.length > 0) {
              for (i = 0; i < finsArray.length; i++) {
                let sql =
                  "INSERT INTO `fin_pro`(`project_financier_name`, `project_name`) VALUES ('" +
                  finsArray[i] +
                  "','" +
                  name +
                  "')";
                add(sql);
              }
            }

            if (goalsArray.length > 0) {
              for (i = 0; i < goalsArray.length; i++) {
                let sql =
                  "INSERT INTO `goal_pro`(`goal_name`, `project_name`) VALUES ('" +
                  goalsArray[i] +
                  "','" +
                  name +
                  "')";
                add(sql);
              }
            }

            if (areasArray.length > 0) {
              for (i = 0; i < areasArray.length; i++) {
                let sql =
                  "INSERT INTO `pro_area`(`area_name`, `project_name`) VALUES ('" +
                  areasArray[i] +
                  "','" +
                  name +
                  "')";
                add(sql);
              }
            }

            if (targetsArray.length > 0) {
              for (i = 0; i < targetsArray.length; i++) {
                let sql =
                  "INSERT INTO `targ_pro`(`target_group`, `project_name`) VALUES ('" +
                  targetsArray[i] +
                  "','" +
                  name +
                  "')";
                add(sql);
              }
            }

            $("#alert").text("تمت الأضافة");
            $("input").val("");
            finsArray = [];
            goalsArray = [];
            areasArray = [];
            targetsArray = [];
            $(".inserted").hide();
            reload("SELECT * FROM `project`");
          } else {
            alert(out);
          }
        },
      });
    }
  });

  $("#tableDis input").keyup(function () {
    val = $(this).val();
    if (val == "") {
      sql = "SELECT * FROM `project`";
    } else {
      sql =
        "SELECT * FROM `project` WHERE `project_name` like '%" +
        val +
        "%' || `project_value` like '%" +
        val +
        "%' || `project_idea` like '%" +
        val +
        "%' || `value_type` like '%" +
        val +
        "%' || `start_date` like '%" +
        val +
        "%' || `end_date` like '%" +
        val +
        "%'";
    }
    reload(sql);
  });
  //=============================================

  function deleteRow(sql) {
    $.ajax({
      url: "../phpFile/remove.php",
      data: { sql: sql },
      type: "post",
      success: function (out) {},
    });
  }

  $("#table").on("click", ".remove-btn", function () {
    let n = confirm("تأكيد الحذف");

    if (n) {
      id = $(this).data("id");
      table = "project";
      feild = "project_name";
      let sql =
        "DELETE FROM `" + table + "` WHERE `" + feild + "` = '" + id + "'";
      let sql1 = "DELETE FROM `fin_pro` WHERE `" + feild + "` = '" + id + "'";
      let sql2 = "DELETE FROM `goal_pro` WHERE `" + feild + "` = '" + id + "'";
      let sql3 = "DELETE FROM `pro_area` WHERE `" + feild + "` = '" + id + "'";
      let sql4 = "DELETE FROM `targ_pro` WHERE `" + feild + "` = '" + id + "'";
      deleteRow(sql);
      deleteRow(sql1);
      deleteRow(sql2);
      deleteRow(sql3);
      deleteRow(sql4);

      let sql12 =
        "UPDATE `activities` SET `project_name`='' WHERE `project_name`='" +
        id +
        "';";
      $.ajax({
        url: "../phpFile/update.php",
        data: { sql: sql12 },
        dataType: "json",
        type: "post",
        success: function (data) {},
      });

      sql = "SELECT * FROM `project`";
      reload(sql);
    }
  });

  //=============================================

  function remove(sql) {
    $.ajax({
      url: "../phpFile/remove.php",
      data: { sql: sql },
      type: "post",
      success: function (out) {},
    });
  }
  let projectName;
  // add event listener to edit button
  $(document).on("click", ".edit-btn", function () {
    // get project name from button data-id attribute
    projectName = $(this).data("id");

    $("#edit").toggle();
    $("#add").toggle();
    $("#endWithoutSave").toggle();
    // make AJAX call to fetch project information
    $.ajax({
      url: "../phpFile/show.php",
      data: {
        sql:
          "SELECT * FROM `project` WHERE `project_name` = '" +
          projectName +
          "'",
      },
      dataType: "json",
      type: "post",
      success: function (data) {
        // set input field values
        $("#name").val(data[0].project_name);
        $("#value").val(data[0].project_value);
        $("#valueType").val(data[0].value_type);
        $("#idea").val(data[0].project_idea);
        $("#startDate").val(data[0].start_date);
        $("#endDate").val(data[0].end_date);

        var sqlFinanciers =
          "SELECT `project_financier_name` FROM `fin_pro` WHERE `project_name` = '" +
          projectName +
          "'";
        $.ajax({
          url: "../phpFile/show.php",
          data: { sql: sqlFinanciers },
          dataType: "json",
          type: "post",
          success: function (out) {
            for (let i = 0; i < out.length; i++) {
              finsArray.push(out[i].project_financier_name);
            }
            // Map finsArray to an array of HTML elements
            const newFinsArray = finsArray.map((e) => {
              const div = $("<div>");
              const h6 = $("<h6>").text(e);
              const button = $("<button>")
                .text("حذف")
                .addClass("removeFin")
                .data("id", e);
              div.append(h6, button);
              return div;
            });

            // Add the new HTML elements to finsInsertedDiv
            finsInsertedDiv.html(newFinsArray);
            finsInsertedDiv.show();
          },
        });

        var sqlGoals =
          "SELECT `goal_name` FROM `goal_pro` WHERE `project_name` = '" +
          projectName +
          "'";
        $.ajax({
          url: "../phpFile/show.php",
          data: { sql: sqlGoals },
          dataType: "json",
          type: "post",
          success: function (out) {
            for (let i = 0; i < out.length; i++) {
              goalsArray.push(out[i].goal_name);
            }
            // Map goalArray to an array of HTML elements
            const newGoalArray = goalsArray.map((e) => {
              const div = $("<div>");
              const h6 = $("<h6>").text(e);
              const button = $("<button>")
                .text("حذف")
                .addClass("removeGoal")
                .data("id", e);
              div.append(h6, button);
              return div;
            });

            // Add the new HTML elements to goalInsertedDiv
            goalsInsertedDiv.html(newGoalArray);
            goalsInsertedDiv.show();
          },
        });

        var sqlAreas =
          "SELECT `area_name` FROM `pro_area` WHERE `project_name` = '" +
          projectName +
          "'";

        $.ajax({
          url: "../phpFile/show.php",
          data: { sql: sqlAreas },
          dataType: "json",
          type: "post",
          success: function (out) {
            for (let i = 0; i < out.length; i++) {
              areasArray.push(out[i].area_name);
            }
            // Check if area is already in areaArray

            // Map AreaArray to an array of HTML elements
            const newAreaArray = areasArray.map((e) => {
              const div = $("<div>");
              const h6 = $("<h6>").text(e);
              const button = $("<button>")
                .text("حذف")
                .addClass("removeArea")
                .data("id", e);
              div.append(h6, button);
              return div;
            });

            // Add the new HTML elements to areasInsertedDiv
            areasInsertedDiv.html(newAreaArray);
            areasInsertedDiv.show();
          },
        });

        var sqlTargets =
          "SELECT `target_group` FROM `targ_pro` WHERE `project_name` = '" +
          projectName +
          "'";

        $.ajax({
          url: "../phpFile/show.php",
          data: { sql: sqlTargets },
          dataType: "json",
          type: "post",
          success: function (out) {
            for (let i = 0; i < out.length; i++) {
              targetsArray.push(out[i].target_group);
            }
            const newTargetArray = targetsArray.map((e) => {
              const div = $("<div>");
              const h6 = $("<h6>").text(e);
              const button = $("<button>")
                .text("حذف")
                .addClass("removeTarget")
                .data("id", e);
              div.append(h6, button);
              return div;
            });

            // Add the new HTML elements to targetsInsertedDiv
            targetsInsertedDiv.html(newTargetArray);
            targetsInsertedDiv.show();
          },
        });

        $("#tableDis").hide();
      },
      error: function () {
        // show error message and hide buttons
        $("#alert")
          .text("حدث خطأ أثناء تحميل بيانات المشروع")
          .addClass("alert-danger")
          .removeClass("alert-success")
          .show();
        $("#add").show();
        $("#edit").hide();
      },
    });
  });

  $("#edit").click(function () {
    nameAdd = $("#name").val();
    value = $("#value").val();
    valueType = $("#valueType").val();
    satrtDate = $("#startDate").val();
    endDate = $("#endDate").val();
    idea = $("#idea").val();
    sqlup =
      "UPDATE `project` SET `project_name`='" +
      nameAdd +
      "',`project_value`='" +
      value +
      "',`project_idea`='" +
      idea +
      "',`value_type`='" +
      valueType +
      "',`start_date`='" +
      satrtDate +
      "',`end_date`='" +
      endDate +
      "' WHERE project_name = '" +
      projectName +
      "'";
    $.ajax({
      url: "../phpFile/update.php",
      data: { sqlup: sqlup },
      type: "post",
      success: function () {
        let sqlFinDelete =
          "DELETE FROM `fin_pro` WHERE `project_name`='" + projectName + "'";
        remove(sqlFinDelete);
        let sqlgoalDelete =
          "DELETE FROM `goal_pro` WHERE `project_name`='" + projectName + "'";
        remove(sqlgoalDelete);
        let sqlareaDelete =
          "DELETE FROM `pro_area` WHERE `project_name`='" + projectName + "'";
        remove(sqlareaDelete);
        let sqlTargetDelete =
          "DELETE FROM `targ_pro` WHERE `project_name`='" + projectName + "'";
        remove(sqlTargetDelete);

        if (finsArray.length > 0) {
          for (i = 0; i < finsArray.length; i++) {
            let sql =
              "INSERT INTO `fin_pro`(`project_financier_name`, `project_name`) VALUES ('" +
              finsArray[i] +
              "','" +
              nameAdd +
              "')";
            add(sql);
          }
        }

        if (goalsArray.length > 0) {
          for (i = 0; i < goalsArray.length; i++) {
            let sql =
              "INSERT INTO `goal_pro`(`goal_name`, `project_name`) VALUES ('" +
              goalsArray[i] +
              "','" +
              nameAdd +
              "')";
            add(sql);
          }
        }

        console.log(areasArray);
        if (areasArray.length > 0) {
          for (i = 0; i < areasArray.length; i++) {
            let sql =
              "INSERT INTO `pro_area`(`area_name`, `project_name`) VALUES ('" +
              areasArray[i] +
              "','" +
              nameAdd +
              "')";
            add(sql);
          }
        }

        if (targetsArray.length > 0) {
          for (i = 0; i < targetsArray.length; i++) {
            let sql =
              "INSERT INTO `targ_pro`(`target_group`, `project_name`) VALUES ('" +
              targetsArray[i] +
              "','" +
              nameAdd +
              "')";
            add(sql);
          }
        }
        $("input").val("");
        $("textarea").val("");
        finsArray = [];
        goalsArray = [];
        areasArray = [];
        targetsArray = [];
        $(".inserted").hide();
        $("#tableDis").show();
        $("#edit").toggle();
        $("#add").toggle();
        $("#endWithoutSave").toggle();
        reload("SELECT * FROM `project`");
      },
    });
  });

  $("#endWithoutSave").click(function () {
    $("input").val("");
    $("textarea").val("");
    finsArray = [];
    goalsArray = [];
    areasArray = [];
    targetsArray = [];
    $(".inserted").hide();
    $("#tableDis").show();
    $("#edit").toggle();
    $("#add").toggle();
    $("#endWithoutSave").toggle();
  });
});
