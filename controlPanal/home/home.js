$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }
  $("#nav i").click(function () {
    $("#smallList").toggle(100);
  });

  $(document).on("click", function (event) {
    // Get the target element that was clicked
    const clickedElement = event.target;

    // Get the dropdown element you want to exclude
    const dropdownElement = $("#myDropdown");

    const h = $("#myDropdownText");
    const icon = $("#myDropdownIcon");

    // Check if the clicked element is the dropdown or its child elements
    if (
      dropdownElement.has(clickedElement).length > 0 ||
      h.is(clickedElement) ||
      icon.is(clickedElement)
    ) {
      return; // Do nothing if the clicked element is inside the dropdown
    }

    // Add the hideDropDown class to the dropdown
    dropdownElement.addClass("hideDropDown");
  });

  $("#links img").click(function () {
    window.location.replace("Home.html");
  });

  $("#nav button span").click(function () {
    localStorage.setItem("login", 0);
    window.location.href = "../../login.html";
  });

  $(".card:nth-child(1)").click(function () {
    window.location.replace("../users/users.html");
  });
  $(".card:nth-child(2)").click(function () {
    window.location.replace("../projects/projects.html");
  });
  $(".card:nth-child(3)").click(function () {
    window.location.replace("../parti/parti.html");
  });
  $(".card:nth-child(4)").click(function () {
    window.location.replace("../programs/programs.html");
  });
  $(".card:nth-child(5)").click(function () {
    window.location.replace("../employee/employee.html");
  });
  $(".card:nth-child(6)").click(function () {
    window.location.replace("../otherPages/aim/aim.html");
  });
  $(".card:nth-child(7)").click(function () {
    window.location.replace("../otherPages/activityType/activityType.html");
  });
  $(".card:nth-child(8)").click(function () {
    window.location.replace("../otherPages/area/area.html");
  });
  $(".card:nth-child(9)").click(function () {
    window.location.replace("../otherPages/fin/fin.html");
  });
  $(".card:nth-child(10)").click(function () {
    window.location.replace("../otherPages/target/target.html");
  });
  $(".card:nth-child(11)").click(function () {
    window.location.replace("../otherPages/nickname/nickname.html");
  });

  $("#other").click(function () {
    $(".dropdown-content").toggleClass("hideDropDown");
  });
});
