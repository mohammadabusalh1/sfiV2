$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../login.html");
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


  
});
