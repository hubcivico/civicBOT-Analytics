var api = 'https://preprodcivicbot.herokuapp.com/';
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
            sessionStorage.removeItem('token');
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
    },
    afterClose: function() {
        $('#elemento').empty();
        $('#publicAlerta').removeClass();
        $('#editAlerta').removeClass();
        $('#publicAlerta').empty();
        $('#editAlerta').empty();
        $('#publicar').removeClass();
        $('#publicar').empty();
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

window.operateEvents = {
    'click .opciones': function (e, value, row, index) {
        console.log("OPERATING EVENT");
        var estadoPub = row.published;
        var estadoEdi = row.edited;
        var publicBtnTxt="";
        var estiloBtnPub ="";
        var estiloPubAlert = "";
        var estiloEdiAlert = "";
        var publicAlerta ="";
        var editAlerta ="";
        var contribId = row.id;
        var label = "";
        var labelId = "";
        var party = "";
        var partyId = "";
        var location = "";
        var locationId = "";
        var media = "";
        var mediaId = "";
        var elementoDial="";
        var nuevoMedio = false;
        var editLabel = false;
        var editParty = false;
        var editMedia = false;
        var editLocation = false;

        if (row.label) {
            label = row.label.name;
            labelId = row.label.id;
        }
        if (row.party) {
            party = row.party.party;
            partyId = row.party.id;
        }
        if (row.location) {
            location = row.location.name;
            locationId = row.location.id;
        }
        if (row.media) {
            media = row.media.media;
            mediaId = row.media.id;

        }
        if(estadoPub){
            $('#publicAlerta').addClass('label label-success');
            $('#publicAlerta').text(" Publicado ");
            $('#publicar').addClass('btn btn-warning');
            $('#publicar').text("Des-Publicar");
        }else if(!estadoPub){
            $('#publicAlerta').addClass('label label-warning');
            $('#publicAlerta').text(" No Publicado ");
            $('#publicar').addClass('btn btn-primary');
            $('#publicar').text("Publicar");
        }

        if(estadoEdi){
            $('#editAlerta').addClass('label label-success');
            $('#editAlerta').text(" Editado ");
        }else if(!estadoEdi){
            $('#editAlerta').addClass('label label-warning');
            $('#editAlerta').text(" No Editado ");
        }

        if(row.photo){
            elementoDial= '<a href="#" class="thumbnail dialog-photo-click"><img style="height: 340px;width: 100%;" id= "dialog-image" class="img-responsive" src="' + row.photo + '"/></a>';
        }else{
            elementoDial= '<textarea class="form-control" rows="8" readonly>'+row.text+'</textarea>'
        }
        $('#elemento').append(elementoDial);
        labelSelect.val(labelId).trigger('change'); // Notify only Select2 of changes
        partySelect.val(partyId).trigger('change');
        mediaSelect.val(mediaId).trigger('change');
        locationSelect.val(locationId).trigger('change');

        $('#mediaSelect').on("select2:select", function (e) {
            var args = JSON.stringify(e.params, function (key, value) {
                //if (value && value.nodeName) return "[DOM node]";
                if (value instanceof $.Event) return "data";
                return value;
            });
            args = JSON.parse(args);
            if (args.data.id == -1) {
                $('#nuevoMedio').removeClass('hidden');
                nuevoMedio = true;

            }
            else {
                $('#nuevoMedio').addClass('hidden');
                editMedia = true;
            }
        });
        $('.dialog-photo-click').on('click', function(){
            var viewer = new Viewer(document.getElementById('dialog-image'));


        });
        $('.js-example-data-array').on("select2:select", function (e) {
            $('#guardar').removeClass('disabled');

        });
        $('#labelSelect').on("select2:select", function (e) {
            editLabel = true;
        });
        $('#partySelect').on("select2:select", function (e) {
            editParty = true;

        });
        $('#locationSelect').on("select2:select", function (e) {
            editLocation = true;

        });
        $('#cancelar').on('click', function () {
            labelSelect.val(labelId).trigger('change'); // Notify only Select2 of changes
            partySelect.val(partyId).trigger('change');
            mediaSelect.val(mediaId).trigger('change');
            locationSelect.val(locationId).trigger('change');
        });
        $('#guardar').on('click', function () {
            run_waitMe();
            if (editLabel) {
                var labelId = $('#labelSelect').val();
                $.ajax({
                    type: "POST",
                    url: api + "Private/setLabel",
                    data: {contribId: contribId, labelId: labelId},
                    headers: {
                        'Authorization': "Bearer " + token
                    },
                    success: function () {
                        editLabel=false;

                    },
                    error: function (err) {
                        console.log("ERROR: " + JSON.stringify(err));
                    }
                });

            }
            if (editMedia) {
                if (nuevoMedio) {
                    var nombreMedio = $('#nuevoMedio').val();
                    $.ajax({
                        type: "POST",
                        url: api + "Private/setMedia",
                        data: {contribId: contribId, mediaName: nombreMedio},
                        headers: {
                            'Authorization': "Bearer " + token
                        },
                        success: function () {
                            nuevoMedio=false;
                            editMedia=false;
                        },
                        error: function (err) {
                            console.log("ERROR: " + JSON.stringify(err));
                        }
                    });
                } else {
                    var mediaId = $('#mediaSelect').val();
                    $.ajax({
                        type: "POST",
                        url: api + "Private/setMedia",
                        data: {contribId: contribId, mediaId: mediaId},
                        headers: {
                            'Authorization': "Bearer " + token
                        },
                        success: function () {
                            nuevoMedio=false;
                            editMedia=false;
                        }
                    });

                }

            }
            if (editParty) {
                var selectPartyId = $('#partySelect').val();
                $.ajax({
                    type: "POST",
                    url: api + "Private/setParty",
                    data: {contribId: contribId, partyId: selectPartyId},
                    headers: {
                        'Authorization': "Bearer " + token
                    },
                    success: function () {
                        editParty=false;
                    }
                });

            }
            if (editLocation) {
                var locationId = $('#locationSelect').val();
                $.ajax({
                    type: "POST",
                    url: api + "Private/setLocation",
                    data: {contribId: contribId, locationId: locationId},
                    headers: {
                        'Authorization': "Bearer " + token
                    },
                    success: function () {
                        editLocation=false;
                    }
                });

            }
            $('#guardar').addClass('disabled');
            $('#nuevoMedio').addClass('hidden');
            $('.content').waitMe('hide');
            $('.closebt').trigger('click');

        });
        $('#publicar').on('click', function(){
            if(!estadoPub){
                $.ajax({
                    type: "POST",
                    url: api + "Private/setToPublish",
                    data: {contribId: contribId, publish: 1 },
                    headers: {
                        'Authorization': "Bearer " + token
                    },
                    success: function () {
                        $('.closebt').trigger('click');
                    }
                });
            }else if(estadoPub){
                $.ajax({
                    type: "POST",
                    url: api + "Private/setToPublish",
                    data: {contribId: contribId, publish: 0 },
                    headers: {
                        'Authorization': "Bearer " + token
                    },
                    success: function () {
                        $('.closebt').trigger('click');
                    }
                });
            }


        });
        $('#demo01').trigger('click');

    }
};

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
                        title: "Fecha de publicaci&oacuten",
                        align: 'center',
                        sortable: true,
                        formatter: fechaFormatter

                    }, {
                        field: 'label.name',
                        title: 'Categoria',
                        align: 'center',
                        sortable: true


                    }, {
                        field: 'party.party',
                        title: "Partido pol&iacutetico",
                        align: 'center',
                        sortable: true

                    }, {
                        field: 'location.name',
                        title: "Municipio",
                        align: 'center',
                        sortable: true

                    }, {
                        field: 'media.media',
                        title: 'Medios de comunicaci&oacuten',
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