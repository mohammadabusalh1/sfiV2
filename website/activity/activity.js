$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }

  $("#next").click(function () {
    $("#he1").hide();
    $("#he2").show();
  });
});
