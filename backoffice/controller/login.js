


var api = 'https://prodcivicbot.herokuapp.com/';
$(document).ready(function() {
    console.log("HELLO!!");
    $('.form-control').on('keypress', function() {
        $('#wrong-data').addClass('hidden');

    });

    $('#log-in').submit(function (event) {
        event.preventDefault();
        var email = $('#inputEmail').val();
        var password = $('#inputPassword').val();
        $.ajax({
            type: "GET",
            dataType: "json",
            url: api+"Private/login?email=" + email + '&password=' + password,
            headers: {
            },
            success: function (data) {
                sessionStorage.setItem('token',data.session.token);
                window.location.href='admin.html';

            }, error: function(error){
                if(error.status==400){
                    $('#wrong-data').removeClass('hidden');

                }
                console.log("ERROR "+JSON.stringify(error));

            }
        });
    });
});
