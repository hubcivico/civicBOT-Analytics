var api = 'https://prodcivicbot.herokuapp.com/';
var token = sessionStorage.getItem('token');

//run_waitMe();


$(".content").fadeIn("slow");

$('.nav-refresh').on('click', function () {
    run_waitMe();
    refreshTable();
    refreshMedia();
    getTotalActiveUsers();
    getTotalReceivedMsg();
    getTotalReceivedImg();
    getTodayContribNum();

});

$('#logOut').on('click', function(){
    $.ajax({
        type: 'POST',
        url: api + "Private/logout",
        headers: {
            'Authorization': "Bearer " + token
        },
        success: function (data) {
            console.log("GOOD BYE!!!");
            sessionStorage.clear();
            $(".content").fadeOut("slow");
            window.location.href = 'index.html'
        },
        error: function (err){
            console.log("ERR: "+err);
            //window.location.href = "index.html"
        }
    })

});

$('#newUser').on('click', function(){
    $('#signup').trigger('click');
});

$('#crearUsuario').on('click', function(){
    var email = $('#inputEmail1').val();
    var password = $('#inputPassword1').val();
    var confirmPassword = $('#inputPassword2').val();

    if(password != confirmPassword){
        alert("Las contraseñas han de coincidir");
    }else if(password==confirmPassword){
        $.ajax({
            type: "POST",
            url: api + "Private/create",
            data: {email: email, password: password, confirmPassword: confirmPassword},
            headers: {
                'Authorization': "Bearer " + token
            },
            success: function () {
                $('.closebt2').trigger('click');

            },
            error: function (err) {
                console.log("ERROR: " + JSON.stringify(err));
                alert("Usuario no creado");
            }
        });

    }
});


$.ajax({
    type: "GET",
    dataType: "json",
    url: api + "Private/getPartyList",
    headers: {
        'Authorization': "Bearer " + token
    },
    success: function (data) {
        var array = [];
        for (var i = 0; i < data.length; i++) {
            array.push({id: data[i].id, text: data[i].party});
        }

        sessionStorage.setItem('partyList', JSON.stringify(array));
        $("#partySelect").select2({
            data: JSON.parse(sessionStorage.getItem('partyList'))
        });
    }
});

$.ajax({
    type: "GET",
    dataType: "json",
    url: api + "Private/getMediaList",
    headers: {
        'Authorization': "Bearer " + token
    },
    success: function (data) {
        var array = [];
        for (var i = 0; i < data.length; i++) {
            array.push({id: data[i].id, text: data[i].media});
        }

        sessionStorage.setItem('mediaList', JSON.stringify(array));
        $("#mediaSelect").select2({
            data: JSON.parse(sessionStorage.getItem('mediaList'))
        });
    }
});

$.ajax({
    type: "GET",
    dataType: "json",
    url: api + "Private/getLabelList",
    headers: {
        'Authorization': "Bearer " + token
    },
    success: function (data) {
        var array = [];
        for (var i = 0; i < data.length; i++) {
            array.push({id: data[i].id, text: data[i].name});
        }

        sessionStorage.setItem('labelList', JSON.stringify(array));
        $("#labelSelect").select2({
            data: JSON.parse(sessionStorage.getItem('labelList'))
        });
    }
});

$.ajax({
    type: "GET",
    dataType: "json",
    url: api + "Private/getLocationList",
    headers: {
        'Authorization': "Bearer " + token
    },
    success: function (data) {
        var array = [];
        for (var i = 0; i < data.length; i++) {
            array.push({id: data[i].id, text: data[i].name});
        }

        sessionStorage.setItem('locationList', JSON.stringify(array));
        $("#locationSelect").select2({
            data: JSON.parse(sessionStorage.getItem('locationList'))
        });

    }
});

var partySelect = $("#partySelect").select2({
    data: JSON.parse(sessionStorage.getItem('partyList'))
});
var mediaSelect = $("#mediaSelect").select2({
    data: JSON.parse(sessionStorage.getItem('mediaList'))
});
var labelSelect = $("#labelSelect").select2({
    data: JSON.parse(sessionStorage.getItem('labelList'))
});
var locationSelect = $("#locationSelect").select2({
    data: JSON.parse(sessionStorage.getItem('locationList'))
});

$("#demo01").animatedModal({
    modalTarget:'animatedModal',
    animatedIn:'lightSpeedIn',
    animatedOut:'bounceOutDown',
    color:'rgba(0,0,0,.8)',
    // Callbacks
    beforeOpen: function() {

    },
    afterOpen: function() {

    },
    beforeClose: function() {
        $('#elemento').empty();
        $('#publicAlerta').removeClass();
        $('#editAlerta').removeClass();
        $('#publicAlerta').empty();
        $('#editAlerta').empty();
        $('#publicar').removeClass();
        $('#publicar').empty();
        $('#contributionID').text('');
    },
    afterClose: function() {
        refreshTable();
        refreshMedia();
    }
});
$("#signup").animatedModal({
    modalTarget:'animatedModal2',
    animatedIn:'zoomIn',
    animatedOut:'bounceOutDown',
    color:'rgba(0,0,0,.8)',
    // Callbacks
    beforeOpen: function() {

    },
    afterOpen: function() {

    },
    beforeClose: function() {

    },
    afterClose: function() {

    }
});

getTotalActiveUsers();
getTotalReceivedMsg();
getTotalReceivedImg();
getTodayContribNum();



function refreshTable(){
    //run_waitMe();
    $.ajax({
        type: "GET",
        url: api + "Private/getContributionList",
        headers: {
            'Authorization': "Bearer " + token
        },
        success: function (data) {
            $('#table').bootstrapTable('destroy').bootstrapTable({
                data: data,
                stickyHeader: true,
                rowStyle: function rowStyle(value, row, index) {
                    return {
                        classes: 'text-nowrap another-class',
                        css: {"font-size": "12px", "vertical-align" : "middle"}
                    };
                },
                columns: [{
                    field: 'id',
                    title: "ID",
                    align: 'center',
                    sortable: true
                },
                    {
                        field: 'createdAt',
                        title: "Fecha",
                        align: 'center',
                        sortable: true,
                        formatter: fechaFormatter

                    }, {
                        field: 'label.name',
                        title: 'Categoría',
                        align: 'center',
                        sortable: true


                    }, {
                        field: 'party.party',
                        title: "Partido",
                        align: 'center',
                        sortable: true

                    }, {
                        field: 'location.name',
                        title: "Municipio",
                        align: 'center',
                        sortable: true

                    }, {
                        field: 'media.media',
                        title: 'Medio',
                        align: 'center',
                        sortable: true

                    }, {
                        field: 'photo',
                        title: 'Datos',
                        align: 'center',
                        sortable: false,
                        formatter:imageFormatter
                    }, {
                        field: 'published',
                        title: 'Publicado?',
                        align: 'center',
                        sortable: true,
                        formatter: publishedFormatter

                    }, {
                        field: 'edited',
                        title: 'Editado?',
                        align: 'center',
                        sortable: true,
                        formatter: editedFormatter

                    }, {
                        field: 'operate',
                        title: 'Opciones',
                        align: 'center',
                        sortable: false,
                        events: operateEvents,
                        formatter: operateFormatter
                    }]
            });
            $('.content').waitMe('hide');
        },
        error: function (err) {
            console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
            //window.location.href = 'index.html';
        }
    });


}

function refreshMedia(){
    sessionStorage.removeItem('mediaList');
    $.ajax({
        type: "GET",
        dataType: "json",
        url: api + "Private/getMediaList",
        headers: {
            'Authorization': "Bearer " + token
        },
        success: function (data) {
            var array = [];
            for (var i = 0; i < data.length; i++) {
                array.push({id: data[i].id, text: data[i].media});
            }

            sessionStorage.setItem('mediaList', JSON.stringify(array));

        }
    });

}

function getTotalActiveUsers () {
    $.getJSON(api + "Public/gettotalactiveusers", function (data) {
        odoUsers.innerHTML = data.count;
    });

}

function getTotalReceivedMsg (){

    $.getJSON(api + "Public/gettotalreceivedmsg", function (data) {
        odoMsg.innerHTML = data.count;
    });
}

function getTotalReceivedImg (){

    $.getJSON(api + "Public/getTotalReceivedImg", function (data) {
        odoImg.innerHTML = data.count;

    });

}

function getTodayContribNum () {

    $.getJSON(api + "Public/gettodaycontribnum", function (data) {
        odoToday.innerHTML = data.count;
    });

}

function run_waitMe(){
    $('.content').waitMe({
//none, rotateplane, stretch, orbit, roundBounce, win8,
//win8_linear, ios, facebook, rotation, timer, pulse,
//progressBar, bouncePulse or img
        effect: 'stretch',

//place text under the effect (string).
        text: 'Descargando más RAM ;)',

//background for container (string).
        bg: 'rgba(255,255,255,0.7)',

//color for background animation and text (string).
        color: '#000',

//change width for elem animation (string).
        sizeW: '',

//change height for elem animation (string).
        sizeH: ''

// url to image
        //source: 'fonts/img.svg'

// callback

    });
}