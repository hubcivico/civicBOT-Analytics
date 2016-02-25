var api = 'https://devcivicbot.herokuapp.com/';
$(document).ready(function() {
  $.ajax({
    type: "GET",
    url: "https://devcivicbot.herokuapp.com/Private/getContributionList",
    headers: {
      'Authorization': "Bearer " + localStorage.token
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
          field: 'label.name',
          title: 'Categoria',
          editable: true,
          footerFormatter: totalFormatter,
          align: 'center'

        }, {
          field: 'party.party',
          title: "Partido pol&iacutetico",
          editable: true,
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'location.name',
          title: "Municipio",
          editable: true,
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'media.media',
          title: 'Medios de comunicaci&oacuten',
          editable: true,
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'published',
          title: 'Publicado?',
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'edited',
          title: 'Editado?',
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'photo',
          title: 'Fotografia',
          align: 'center',
          	formatter: imageFormatter
        }, {
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

  $('#salir').on('click', function() {
    logOut();
  })
});

function totalFormatter(data) {
  return data.lenght;
}

function imageFormatter(value, row) {
    return '<img src="'+value+'" width="100" height="50"/>';
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
    console.log("key: " + key);
    console.log("value: " + value);

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
    '<div class="btn-toolbar" role="group">',
    ' <button type="button" class="btn btn-success"><span class="glyphicon glyphicon-save"/></button>',
    '<button type="button" class="btn btn-info publish"><span class="glyphicon glyphicon-ok"/></button>',
    '</div>'
  ].join('');
}


window.operateEvents = {
  'click .btn-success': function(e, value, row, index) {
    console.log("save");
    console.log("row: " + row.id);
    setParty(row.id, row.party.id);
    setLocation(row.id, row.location.id);
    setLabel(row.id,row.label.id);

  },
  'click .btn-info': function(e, value, row, index) {
    console.log("publish")
    if (row.published.equals('false')) {
      setToPublish(row.id,1);
    }
  }
};

function setParty(contribId, partyId) {
  $.ajax({
    type: "POST",
    url: api + "Private/setParty",
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
    url: api + "Private/setMedia",
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
    url: api + "Private/setLocation",
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
    url: api + "Private/setLabel",
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
    url: api + "Private/setToPublish",
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
    url: api + "Private/getPartyList",
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
    url: api + "Private/getLocationList",
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
    url: api + "Private/getMediaList",
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
    url: api + "Private/getLabelList",
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
    url: api + "Private/getContributionList",
    headers: {
      'Authorization': "Bearer " + localStorage.token
    },
    success: function(data) {
      console.log('OK');
      return data;
    }
  });
}

function logOut() {
  $.ajax({
    type: 'GET',
    url: api + "Private/logout",
    headers: {
      'Authorization': "Bearer " + localStorage.token
    },
    success: function(data) {
      console.log("LOGOUT OK");
      localStorage.removeItem('token');
      window.location.href = 'index.html'
    }
  })
}
