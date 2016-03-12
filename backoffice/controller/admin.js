


var api = 'https://prodcivicbot.herokuapp.com/';
var token = sessionStorage.getItem('token');

$(document).ready(function () {
    run_waitMe();
    sessionStorage.removeItem('labelList');
    sessionStorage.removeItem('partyList');
    sessionStorage.removeItem('locationList');
    sessionStorage.removeItem('mediaList');

    if(token) {
        $.ajax({
            type: "GET",
            url: api + "Private/getContributionList",
            headers: {
                'Authorization': "Bearer " + token
            },
            success: function (data) {
                $('#table').bootstrapTable({
                    data: data,
                    stickyHeader: true,
                    rowStyle: function rowStyle(value, row, index) {
                        return {
                            classes: 'text-nowrap another-class',
                            css: {"font-size": "12px", "vertical-align": "middle"}
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
                            formatter: imageFormatter
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
            }
        });

        window.operateEvents = {
            'click .opciones': function (e, value, row, index) {
                console.log("OPERATING EVENT ID: "+row.id);
                $('#contributionID').text(row.id);
                var estadoPub = row.published;
                var estadoEdi = row.edited;
                var publicAlerta ="";
                var editAlerta ="";
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
                        editMedia = true;

                    }
                    else {
                        $('#nuevoMedio').addClass('hidden');
                        editMedia = true;
                        nuevoMedio = false;
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
                    var contribId = $('#contributionID').text();
                    if (editLabel && contribId!="") {
                        console.log("GUARDANDO NUEVA ETIQUETA PARA: "+row.id);
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
                        console.log("GUARDANDO NUEVO MEDIO PARA: "+row.id);
                        if (nuevoMedio) {
                            var nombreMedio = $('#nuevoMedio').val();
                            console.log("NUEVO MEDIO: "+nombreMedio);
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
                        console.log("GUARDANDO NUEVO PARTIDO PARA: "+row.id);
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
                        console.log("GUARDANDO NUEVO MUNICIPIO PARA: "+row.id);
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
                    var contribId = $('#contributionID').text();
                    if(!estadoPub && contribId!=""){
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
    }

});


function operateFormatter(index, row, element) {
    return '<a class="btn opciones" href="#"><i class="fa fa-cogs fa-2x"></i></button></a>';
}

function imageFormatter(value, row) {
    if(row.photo){
        return '<img id="'+row.photo+'" src="' + value + '" width="100" height="50"/>';
    }else{
        return '<p>'+row.text.substring(0,20)+'</p>'
    }
}

function publishedFormatter(value, row) {
    if (row.published == true) {
        return '<i class="fa fa-check fa-2x" style="color: green;"></i>';
    } else {
        return '<i class="fa fa-times fa-2x" style="color: orange;"></i>';
    }
}

function editedFormatter(value, row) {
    if (row.edited == true) {
        return '<i class="fa fa-check fa-2x" style="color: green;"></i>';
    } else {
        return '<i class="fa fa-times fa-2x" style="color: orange"></i>';
    }
}

function fechaFormatter(value, row) {
    var string = String(value);
    var fecha = string.split("T");
    return fecha[0];
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
