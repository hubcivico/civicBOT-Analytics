$(document).ready(function() {
  $('#login_form').submit(function (event) {
    event.preventDefault();
    var email = $('#email').val();
    var password = $('#password').val();
    console.log("Holas1");

    $.ajax({
      type: 'GET',
      url: "https://devcivicbot.herokuapp.com/Private/login?email=" + email + '&password=' + password
    }).done(function (data) {
      localStorage.token = data.session.token;
      console.log("Holas");
      window.location.href='admin.html';
    }).error(function(error){
      alert("Usuario no encontrado! juejuejue");
    });
  })
});
