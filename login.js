$(document).ready(function () {
  if(localStorage.getItem("login") == null){
    localStorage.setItem("login", 0);
  }
  $("#login").click(function () {
    name = $("#nameIn").val();
    pass = $("#password").val();
    pir = $('input[name="pir"]:checked').val();
    sql =
      "SELECT * FROM `users` WHERE `username`='" +
      name +
      "' && `password`='" +
      pass +
      "' && `permission`='" +
      pir +
      "'";
    $.ajax({
      url: "controlPanal/phpFile/show.php",
      data: { sql: sql },
      dataType: "json",
      type: "post",
      success: function (data) {
        if (data.length > 0) {
          if (pir == "admin") {
            localStorage.setItem("login", 1);
            window.location.replace("controlPanal/home/Home.html");
          } else if (pir == "user") {
            window.location.replace("website/home/Mian.html");
            localStorage.setItem("login", 1);
          }
        } else {
          setInterval(function () {
            $("#massage").text("المستخدم غير موجود !");
            $("#nameIn").css("border-color","red");
            $("#password").css("border-color","red");
          }, 300);
        }
      },
    });
  });
});
