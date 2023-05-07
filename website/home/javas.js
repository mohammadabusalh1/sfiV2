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

  $("#bar").click(function () {
    $(".navbare").toggleClass("active");
    $(this).toggleClass("fa-times");
  });
});
