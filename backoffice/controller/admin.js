



var api = 'https://preprodcivicbot.herokuapp.com/';
var token = sessionStorage.getItem('token');

$(document).ready(function () {
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
                            events: operateEvents,
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
            },
            error: function (err) {
                console.log("AJAX error in request: " + JSON.stringify(err, null, 2));
                //window.location.href = 'index.html';
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

            }
        });

        $('.nav-refresh').on('click', function () {
            console.log("REFRESHING TABLE...");
            refreshTable();
            refreshMedia();
        });
    }
});



$(window).load(function(){
    if(token){
        //$(".loading").fadeOut("slow");
        $(".content").fadeIn("slow");
    }

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

window.operateEvents = {
    'click .opciones': function (e, value, row, index) {
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
        var elemento="";

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
            publicAlerta = "Publicado";
            publicBtnTxt = "Des-Publicar";
            estiloBtnPub = 'btn-warning';
            estiloPubAlert = "label-success"
        }else if(!estadoPub){
            publicAlerta = "No Publicado";
            publicBtnTxt = "Publicar";
            estiloBtnPub = 'btn-primary';
            estiloPubAlert = "label-warning";
        }

        if(estadoEdi){
            editAlerta = "Editado";
            estiloEdiAlert = "label-success"
        }else if(!estadoEdi){
            editAlerta = "No Editado";
            estiloEdiAlert = "label-warning"
        }

        if(row.photo!=null){
            elemento= '<a href="#" class="thumbnail dialog-photo-click" style="max-width: 50%; !important;"><img id= "dialog-image" class="img-thumbnail" src="' + row.photo + '"/></a>';
        }else{
            elemento= '<p>'+row.text+'</p>'
        }

        vex.open({
            content:
            '<div class="container-fluid" style="height: inherit;">' +
                '<div class="row">' +
                    '<div class="col-xs-6 col-md-3" style="text-align:left">' +
                        '<h2>Elemento</h2>' +
                            elemento +
                    '</div>' +
                    '<div class="col-xs-6 col-md-3 " style="text-align:left">' +
                        '<h2>Propiedades</h2>' +
                            '<h4>Categoría: </h4>' +
                                '<select id="label" class="js-example-data-array">' +
                                    '<option value="' + labelId + '">' + label + '</option>' +
                                '</select>' +
                            '<br>' +
                            '<br>' +
                            '<h4>Partido: </h4>' +
                                '<select id="party" class="js-example-data-array">' +
                                    '<option value="' + partyId + '">' + party + '</option>' +
                                '</select>' +
                            '<br>' +
                            '<br>' +
                            '<h4>Municipio: </h4>' +
                                '<select id="location" class="js-example-data-array">' +
                                    '<option value="' + locationId + '">' + location + '</option>' +
                                '</select>' +
                            '<br>' +
                            '<br>' +
                            '<h4>Medio: </h4>' +
                                '<select id="media" class="js-example-data-array">' +
                                    '<option value="' + mediaId + '">' + media + '</option>' +
                                    '<option value="-1">AÑADIR...</option>' +
                                '</select>' +
                                '<input id="nuevoMedio" type="text" style="width: 70%; margin-top:10px" class="hidden">' +
                            '<br>' +
                    '</div>' +

                    '<div class="col-xs-6 col-md-3" style="text-align:left">' +
                        '<h2 style="text-align: left">Estado</h2>' +
                            '<h3><span class="label '+estiloPubAlert+'">'+publicAlerta+'</span></h3>'+
                            '<h3><span class="label '+estiloEdiAlert+'">'+editAlerta+'</span></h3>'+

                    '</div>' +
                    '<div class="col-xs-6 col-md-3" style="text-align:left">' +
                        '<h2 style="text-align: left">Acciones</h2>' +
                        '<div class="btn-group-vertical" role="group" aria-label="...">'+
                        '<button id="cancelar" type="button" class="btn btn-danger btn-lg" style="margin-right: 7px">Cancelar</button>' +
                        '<button id="publicar" type="button" class="btn '+estiloBtnPub+' btn-lg"style="margin-right: 7px">'+publicBtnTxt+'</button>' +
                        '<button id="guardar" type="button" class="btn btn-success btn-lg disabled">Guardar</button>' +
                        '</div>'+
                    '</div>' +
                '</div>' +
            '</div>',
            contentCSS: {width: '100%', height: '100%'},

            afterOpen: function ($vexContent) {
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
                    if (args.data.id == -1) {
                        $('#nuevoMedio').removeClass('hidden');
                        nuevoMedio = true;

                    }
                    else {
                        $('#nuevoMedio').addClass('hidden');
                    }
                });

                $('.dialog-photo-click').on('click', function(){
                    console.log("ROW PHOTO: "+row.photo);
                    //var options =  {};
                    var viewer = new Viewer(document.getElementById('dialog-image'));


                });

                $('.js-example-data-array').on("select2:select", function (e) {
                    $('#guardar').removeClass('disabled');

                });

                $('#label').on("select2:select", function (e) {
                    console.log("LABEL EDITADA");
                    editLabel = true;
                });
                $('#media').on("select2:select", function (e) {
                    console.log("MEDIA EDITADA");
                    editMedia = true;
                });
                $('#party').on("select2:select", function (e) {
                    console.log("PARTY EDITADA");
                    editParty = true;

                });
                $('#location').on("select2:select", function (e) {
                    console.log("LOCATION EDITADA");
                    editLocation = true;

                });


                $('#cancelar').on('click', function () {
                    $('.vex-close').trigger('click');
                });

                $('#guardar').on('click', function () {
                    if (editLabel) {
                        var labelId = $('#label').val();
                        $.ajax({
                            type: "POST",
                            url: api + "Private/setLabel",
                            data: {contribId: contribId, labelId: labelId},
                            headers: {
                                'Authorization': "Bearer " + token
                            },
                            success: function () {
                                console.log('CATEGORIA GUARDADA! ');
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
                                    console.log('NUEVO MEDIO CREADO Y ASIGNADO!');
                                },
                                error: function (err) {
                                    console.log("ERROR: " + JSON.stringify(err));
                                }
                            });
                        } else {
                            var mediaId = $('#media').val();
                            $.ajax({
                                type: "POST",
                                url: api + "Private/setMedia",
                                data: {contribId: contribId, mediaId: mediaId},
                                headers: {
                                    'Authorization': "Bearer " + token
                                },
                                success: function () {
                                    console.log('MEDIO ASIGNADO CORRECTAMENTE!');
                                }
                            });

                        }

                    }
                    if (editParty) {
                        var selectPartyId = $('#party').val();

                        console.log("PARTY SELECTED: "+selectPartyId);
                        $.ajax({
                            type: "POST",
                            url: api + "Private/setParty",
                            data: {contribId: contribId, partyId: selectPartyId},
                            headers: {
                                'Authorization': "Bearer " + token
                            },
                            success: function () {
                                console.log('PARTIDO ASIGNADO CORRECTAMENTE!');
                            }
                        });

                    }
                    if (editLocation) {
                        var locationId = $('#location').val();
                        $.ajax({
                            type: "POST",
                            url: api + "Private/setLocation",
                            data: {contribId: contribId, locationId: locationId},
                            headers: {
                                'Authorization': "Bearer " + token
                            },
                            success: function () {
                                console.log('MUNICIPIO ASIGNADO CORRECTAMENTE!');
                            }
                        });

                    }
                    $('#guardar').addClass('disabled');
                    $('.vex-close').trigger('click');

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
                                console.log("ELEMENTO PUBLICADO CORRECTAMENTE");
                                $('.vex-close').trigger('click');
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
                                console.log("ELEMENTO DES-PUBLICADO CORRECTAMENTE");
                                $('.vex-close').trigger('click');
                            }
                        });
                    }


                });

            },
            afterClose: function () {
                refreshTable();
                refreshMedia();
            }
        });

    },

    'click .table-image-click': function(e, value, row, index){

        var viewer = new Viewer(document.getElementById(row.photo));





    }
};


function operateFormatter(index, row, element) {
    return '<a class="btn opciones" href="#"><i class="fa fa-cogs fa-2x"></i></button></a>';
}

function imageFormatter(value, row) {
    if(row.photo!=null){
        return '<a class="btn table-image-click" href="#"><img id="'+row.photo+'" src="' + value + '" width="100" height="50"/></a>';
    }else{
        return '<p>'+row.text+'</p>'
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

function refreshTable(){
    console.log("REFRESHING");
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

