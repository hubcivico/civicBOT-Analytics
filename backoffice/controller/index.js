

var api = 'https://devcivicbot.herokuapp.com/';
$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: "https://devcivicbot.herokuapp.com/Private/getContributionList",
        headers: {
            'Authorization': "Bearer "+localStorage.token
        },
        success: function(data) {
            console.log('OK');
            $('#table').bootstrapTable({
                data: data,
                columns: [{
                    field: 'createdAt',
                    title: "Fecha de publicaci&oacuten",
                    align: 'center'
                }, {
                    field: 'photo',
                    title: 'Fotograf&iactutea',
                    align: 'center'
                }, {
                    field: 'label.name',
                    title: 'Categoria',
                    sortable: true,
                    editable: true,
                    footerFormatter: totalFormatter,
                    align: 'center'

                }, {
                    field: 'party.party',
                    title: "Partido pol&iacutetico",
                    sortable: true,
                    editable: true,
                    footerFormatter: totalFormatter,
                    align: 'center'
                }, {
                    field: 'media.media',
                    title: 'Medios de comunicaci&oacuten',
                    sortable: true,
                    editable: true,
                    footerFormatter: totalFormatter,
                    align: 'center'
                },
                    {
                        field: 'publish',
                        title: 'Estado',
                        sortable: true,
                        editable: true,
                        footerFormatter:totalFormatter,
                        align: 'center'
                    },{
                        field: 'operate',
                        align: 'center',
                        title: 'Guardar',
                        events: operateEvents,
                        formatter: operateFormatter
                    }]
            });
        }
    });


    $(function() {
        $(window).resize(function() {
            $('#table').bootstrapTable('resetView');
        });
    });

    $('#salir').on('click', function(){
        logOut();
    })
});

function totalFormatter(data) {
    return data.lenght;
}

function responseHandler(res) {
    $.each(res.rows, function(i, row) {
        row.state = $.inArray(row.id, selections) !== -1;
    });
    return res;
}

function detailFormatter(index, row) {
    var html = [];
    $.each(row, function(key, value) {
        html.push('<p><b>' + key + ':</b> ' + value + '</p>');
    });
    return html.join('');
}


function getHeight() {
    return $(window).height() - $('h1').outerHeight(true);
}

function getIdSelections() {
    return $.map($table.bootstrapTable('getSelections'), function(row) {
        return row.id
    });
}

function operateFormatter(value, row, index) {
    return [
        '<a class="save" href="javascript:void(0)" title="Guardar">',
        '<i class="glyphicon glyphicon-floppy-save"></i>',
        '</a>  '
    ].join('');
}


window.operateEvents = {
    'click .save': function(e, value, row, index) {
        console.log("save")
        setParty(row.id,row.party.id);
        setMedia(row.id,row.media.id);
        setLocation(row.id,row.location.id);
        setLabel(row.id,row.label.id);
    },
    'click .save': function(e, value, row, index) {
        console.log("publish")
        setParty(row.id,row.party.id);
        setMedia(row.id,row.media.id);
        setLocation(row.id,row.location.id);
        setLabel(row.id,row.label.id);
    }
};

function setParty(contribId, partyId) {
    $.ajax({
        type: "POST",
        url: "devcivicbot.herokuapp.com/Private/setParty",
        data: '{"contribId": "' + contribId + '", "partyId" : "' + partyId + '"}',
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function() {
            console.log('OK');
        }
    });
}

//TODO: Revisar parámetros en función de arquitectura api
function setMedia(contribId, mediaId) {
    $.ajax({
        type: "POST",
        url: "devcivicbot.herokuapp.com/Private/setMedia",
        data: '{"contribId": "' + contribId + '", "mediaId" : "' + mediaId + '"}',
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function() {
            console.log('OK');
        }
    });
}

function setLocation(contribId, locationId) {
    $.ajax({
        type: "POST",
        url: "devcivicbot.herokuapp.com/Private/setLocation",
        data: '{"contribId": "' + contribId + '", "locationId" : "' + locationId + '"}',
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function() {
            console.log('OK');
        }
    });
}

function setLabel(contribId, labelId) {
    $.ajax({
        type: "POST",
        url: "devcivicbot.herokuapp.com/Private/setLabel",
        data: '{"contribId": "' + contribId + '", "labelId" : "' + labelId + '"}',
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function() {
            console.log('OK');
        }
    });
}

//TODO: Comprobación de "si ya publicado, no publico"
function setToPublish(contribId, publish) {
    $.ajax({
        type: "POST",
        url: "devcivicbot.herokuapp.com/Private/setToPublish",
        data: '{"contribId": "' + contribId + '", "publish" : "' + publish + '"}',
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function() {
            console.log('OK');
        }
    });
}

function getPartyList() {
    $.ajax({
        type: "GET",
        url: "devcivicbot.herokuapp.com/Private/getPartyList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function(data) {
            console.log('OK');
            return data;
        }
    });
}

function getLocationList() {
    $.ajax({
        type: "GET",
        url: "devcivicbot.herokuapp.com/Private/getLocationList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function(data) {
            console.log('OK');
            return data;
        }
    });
}

function getMediaList() {
    $.ajax({
        type: "GET",
        url: "devcivicbot.herokuapp.com/Private/getMediaList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function(data) {
            console.log('OK');
            return data;
        }
    });
}

function getLabelList() {
    $.ajax({
        type: "GET",
        url: "devcivicbot.herokuapp.com/Private/getLabelList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function(data) {
            console.log('OK');
            return data;
        }
    });
}

function getContributionList() {
    $.ajax({
        type: "GET",
        url: "devcivicbot.herokuapp.com/Private/getContributionList",
        headers: {
            'Authorization': "Bearer " + localStorage.token
        },
        success: function(data) {
            console.log('OK');
            return data;
        }
    });
}

function logOut(){
    $.ajax({
        type: 'GET',
        url: api+"Private/logout",
        headers:{
            'Authorization': "Bearer " + localStorage.token
        },
        success: function(data) {
            console.log("LOGOUT OK");
            localStorage.removeItem('token');
            window.location.href='index.html'
        }
    })
}
