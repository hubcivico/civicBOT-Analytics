$(document).ready(function(){
  console.log("holas first ")
  $("#login_form").submit(function(event) {
    event.preventDefault();
    var email = $("#email").val();
    var password = $("#password").val();
    console.log("Holas1");

    $.ajax({
      type: "GET",
      url: "devcivicbot.herokuapp.com/Private/login",
      headers: {
        email : email,
        password : password
      },
      success: function() {
        localStorage.token = data.token;
        console.log("Holas");
        window.location.replace("http://stackoverflow.com");
      }
    });
  });
});
