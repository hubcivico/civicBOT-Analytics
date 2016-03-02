


run_waitMe();
var api = 'https://prodcivicbot.herokuapp.com/';
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
    }

});


function operateFormatter(index, row, element) {
    return '<a class="btn opciones" href="#"><i class="fa fa-cogs fa-2x"></i></button></a>';
}

function imageFormatter(value, row) {
    if(row.photo){
        console.log("IS A PHOTO!");
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
