var api = 'https://devcivicbot.herokuapp.com/';

$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: api + "Private/getContributionList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function (data) {
            $('#table').bootstrapTable({
                data: data,
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
                        sortable: true

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

                    },  {
                        field: 'photo',
                        title: 'Fotografia',
                        align: 'center',
                        sortable: false
                    }, {
                        field: 'published',
                        title: 'Publicado?',
                        align: 'center',
                        sortable: true

                    }, {
                        field: 'edited',
                        title: 'Editado?',
                        align: 'center',
                        sortable: true

                    },{
                        field: 'operate',
                        title: 'Opciones',
                        align: 'center',
                        sortable: false,
                        events: operateEvents,
                        formatter: operateFormatter
                    }]
            });
        },
        error: function (request, status, error) {
            alert("Error al cargar la tabla.");
            window.location.href = 'index.html';
        }
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: api + "Private/getPartyList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function (data) {
            var array = [];
            for(var i=0; i<data.length; i++){
                array.push({id: data[i].id, text: data[i].party});
            }

            sessionStorage.setItem('partyList', JSON.stringify(array));

        }
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: api + "Private/getMediaList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function (data) {
            var array = [];
            for(var i=0; i<data.length; i++){
                array.push({id: data[i].id, text: data[i].media});
            }

            sessionStorage.setItem('mediaList', JSON.stringify(array));

        }
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: api + "Private/getLabelList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function (data) {
            var array = [];
            for(var i=0; i<data.length; i++){
                array.push({id: data[i].id, text: data[i].name});
            }

            sessionStorage.setItem('labelList', JSON.stringify(array));

        }
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: api + "Private/getLocationList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function (data) {
            var array = [];
            for(var i=0; i<data.length; i++){
                array.push({id: data[i].id, text: data[i].name});
            }

            sessionStorage.setItem('locationList', JSON.stringify(array));

        }
    });

});

window.operateEvents = {
    'click .opciones': function (e, value, row, index) {
        var contribId = row.id;
        var label = "";
        var labelId = "";
        var party = "";
        var partyId = "";
        var location = "";
        var locationId = "";
        var media = "";
        var mediaId = "";

        if(row.label){
            label=row.label.name;
            labelId=row.label.id;
        }
        if(row.party){
            party=row.party.party;
            partyId=row.party.id;
        }
        if(row.location) {
            location=row.location.name;
            locationId=row.location.id;
        }
        if(row.media){
            media = row.media.media;
            mediaId = row.media.id;

        }

        vex.open({
            content:
            '<div class="container-fluid">' +
            '<div class="row">' +

            '<div class="col-md-4" style="text-align:center">' +
            '<h2>Propiedades</h2>'+
            '<p>Categoría: </p>'+
            '<select id="label" class="js-example-data-array">'+
            '<option value="'+labelId+'">'+label+'</option>' +
            '</select>' +
            '<br>' +
            '<br>' +
            '<p>Partido: </p>'+
            '<select id="party" class="js-example-data-array">' +
            '<option value="'+partyId+'">'+party+'</option>' +
            '</select>' +
            '<br>' +
            '<br>' +
            '<p>Municipio: </p>'+
            '<select id="location" class="js-example-data-array">' +
            '<option value="'+locationId+'">'+location+'</option>' +
            '</select>' +
            '<br>' +
            '<br>' +
            '<p>Medio: </p>'+
            '<select id="media" class="js-example-data-array">' +
            '<option value="'+mediaId+'">'+media+'</option>' +
            '<option value="-1">AÑADIR...</option>' +
            '</select>' +
            '<input id="nuevoMedio" type="text" style="width: 70%; margin-top:10px" class="hidden">'+
            '<br>' +
            '</div>' +
            '<div class="col-md-4" style="text-align:center">' +
            '<h2>Elemento</h2>'+
            '<img style="width:auto; height:312px; max-width: 454px;" src="'+row.photo+'"/>' +
            '</div>' +
            '<div class="col-md-4" style="text-align:center">' +
            '<h2 style="text-align: center">Estado</h2>'+
            '<div class="row" style="margin-top: 80%;">' +
            '<div class="col-md-12" style="text-align: right">' +
            '<button id="cancelar" type="button" class="btn btn-danger btn-lg" style="margin-right: 7px">Cancelar</button>'+
            '<button id="publicar" type="button" class="btn btn-warning btn-lg"style="margin-right: 7px">Publicar</button>'+
            '<button id="guardar" type="button" class="btn btn-success btn-lg disabled">Guardar</button>'+

            '</div>'+
            '</div>'+
            '</div>' +
            '</div>'+
            '' +
            '' +
            '' +

            '</div>',
            contentCSS: {width: '90%', height: '100%'},



            afterOpen: function($vexContent) {
                var nuevoMedio = false;
                var editLabel = false;
                var editParty = false;
                var editMedia = false;
                var editLocation = false;

                $("#party").select2({
                    data: JSON.parse(sessionStorage.getItem('partyList'))

                });
                $("#media").select2({
                    data: JSON.parse(sessionStorage.getItem('mediaList'))
                });
                $("#label").select2({
                    data: JSON.parse(sessionStorage.getItem('labelList'))
                });
                $("#location").select2({
                    data: JSON.parse(sessionStorage.getItem('locationList'))
                });

                $(".js-example-data-array").select2({width: '70%'});

                $('#media').on("select2:select", function (e) {
                    var args = JSON.stringify(e.params, function (key, value) {
                        //if (value && value.nodeName) return "[DOM node]";
                        if (value instanceof $.Event) return "data";
                        return value;
                    });
                    args = JSON.parse(args);
                    if(args.data.id == -1){
                        $('#nuevoMedio').removeClass('hidden');
                        nuevoMedio = true;

                    }
                    else{
                        $('#nuevoMedio').addClass('hidden');
                    }
                });

                $('.js-example-data-array').on("select2:select", function (e) {
                    $('#guardar').removeClass('disabled');

                });

                $('#label').on("select2:select", function (e) {
                    console.log("LABEL EDITADA");
                    editLabel=true;
                });
                $('#media').on("select2:select", function (e) {
                    console.log("MEDIA EDITADA");
                    editMedia=true;
                });
                $('#party').on("select2:select", function (e) {
                    console.log("PARTY EDITADA");
                    editParty=true;

                });
                $('#location').on("select2:select", function (e) {
                    console.log("LOCATION EDITADA");
                    editLocation=true;

                });



                $('#cancelar').on('click', function(){
                    $('.vex-close').trigger('click');
                });

                $('#guardar').on('click', function(){
                    if(editLabel){
                        var labelId = $('#label').val();
                        $.ajax({
                            type: "POST",
                            url: api + "Private/setLabel",
                            data: {contribId: contribId, labelId :  labelId },
                            headers: {
                                'Authorization': "Bearer " + localStorage.token
                            },
                            success: function () {
                                console.log('CATEGORIA GUARDADA! ');
                            },
                            error: function(err){
                                console.log("ERROR: "+JSON.stringify(err));
                            }
                        });

                    }
                    if(editMedia){
                        if(nuevoMedio){
                            var nombreMedio = $('#nuevoMedio').val();
                            $.ajax({
                                type: "POST",
                                url: api + "Private/setMedia",
                                data: {contribId: contribId, mediaName :  nombreMedio },
                                headers: {
                                    'Authorization': "Bearer " + localStorage.token
                                },
                                success: function () {
                                    console.log('NUEVO MEDIO CREADO Y ASIGNADO!');
                                },
                                error: function(err){
                                    console.log("ERROR: "+JSON.stringify(err));
                                }
                            });
                        }else{
                            var mediaId = $('#media').val();
                            $.ajax({
                                type: "POST",
                                url: api + "Private/setMedia",
                                data: {contribId: contribId, mediaId: mediaId },
                                headers: {
                                    'Authorization': "Bearer " + localStorage.token
                                },
                                success: function () {
                                    console.log('MEDIO ASIGNADO CORRECTAMENTE!');
                                }
                            });

                        }

                    }
                    if(editParty){
                        var partyId = $('#party').val();
                        $.ajax({
                            type: "POST",
                            url: api + "Private/setParty",
                            data: {contribId: contribId, partyId:+ partyId },
                            headers: {
                                'Authorization': "Bearer " + localStorage.token
                            },
                            success: function () {
                                console.log('PARTIDO ASIGNADO CORRECTAMENTE!');
                            }
                        });

                    }
                    if(editLocation){
                        var locationId = $('#location').val();
                        $.ajax({
                            type: "POST",
                            url: api + "Private/setLocation",
                            data: {contribId: contribId, locationId:locationId},
                            headers: {
                                'Authorization': "Bearer " + localStorage.token
                            },
                            success: function () {
                                console.log('MUNICIPIO ASIGNADO CORRECTAMENTE!');
                            }
                        });

                    }

                });

            },
            afterClose: function() {
                return console.log('vexClose');
            }
        });

    }
};


function operateFormatter(index, row, element) {
    return '<a class="btn opciones" href="#"><i class="fa fa-cogs"></i></button></a>';
}



