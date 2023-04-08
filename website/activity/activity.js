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

  $("#next").click(function () {
    $("#he1").hide();
    $("#he2").show();
    $("input, select, textarea").each(function () {
      if ($(this).val() === "") {
        $(this).css("border", "1px solid red");
        $("#not").text("أدخل جميع البيانات")
      } else {
        $(this).css("border", "1px solid #ccc");
      }

      $("#search").css("border", "1px solid #ccc");
    });
  });


});
