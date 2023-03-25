$(document).ready(function () {
  if (
    localStorage.getItem("login") == 0 ||
    localStorage.getItem("login") == null
  ) {
    window.location.replace("../../login.html");
  }
  $("#nav i").click(function () {
    $("#smallList").toggle(300);
  });

  $("#links img").click(function () {
    window.location.replace("Home.html");
  });

  $("#nav button span").click(function () {
    window.location.href = "../login.html";
  });

  $(".card:nth-child(1)").click(function () {
    window.location.replace("users.html");
  });
  $(".card:nth-child(2)").click(function () {
    window.location.replace("projects.html");
  });
  $(".card:nth-child(3)").click(function () {
    window.location.replace("parti.html");
  });
  $(".card:nth-child(4)").click(function () {
    window.location.replace("nickname.html");
  });
  $(".card:nth-child(5)").click(function () {
    window.location.replace("programs.html");
  });
});
