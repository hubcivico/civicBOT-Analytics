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
          editable: {
            type: 'text',
            mode: 'inline'
          },
          footerFormatter: totalFormatter,
          align: 'center'

        }, {
          field: 'party.party',
          title: "Partido pol&iacutetico",
          editable: {
            type: 'text',
            mode: 'inline'
          },
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'location.name',
          title: "Municipio",
          editable: {
            type: 'text',
            mode: 'inline'
          },
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'media.media',
          title: 'Medios de comunicaci&oacuten',
          editable: {
            type: 'text',
            mode: 'inline'
          },
          footerFormatter: totalFormatter,
          align: 'center'
        }, {
          field: 'published',
          title: 'Publicado?',
          formatter: publishedFormatter,
          align: 'center'
        }, {
          field: 'edited',
          title: 'Editado?',
          formatter: editedFormatter,
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
    },
    error: function(request, status, error) {
      alert("Error al cargar la tabla.");
      window.location.href = 'index.html';
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
  return '<img src="' + value + '" width="100" height="50"/>';
}

function publishedFormatter(value, row) {
  if (row.published == true) {
    return '<span class="glyphicon glyphicon-ok" style="color: blue"/>';
  } else {
    return '<span class="glyphicon glyphicon-remove" style="color: blue"/>';
  }
}

function editedFormatter(value, row) {
  if (row.edited == true) {
    return '<span class="glyphicon glyphicon-ok" style="color: blue"/>';
  } else {
    return '<span class="glyphicon glyphicon-remove" style="color: blue"/>';
  }
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

function operateFormatter(value, row, index) {
  if (row.published == false) {
    return [
      '<div class="btn-toolbar" role="group" align="center">',
      ' <button type="button" class="btn btn-success save"><span class="glyphicon glyphicon-save"/></button>',
      '<button type="button" class="btn btn-danger unpublish"><span class="glyphicon glyphicon-remove"/></button>',
      '</div>'
    ].join('');
  } else {
    return [
      '<div class="btn-toolbar" role="group" align="center">',
      ' <button type="button" class="btn btn-success save"><span class="glyphicon glyphicon-save"/></button>',
      '<button type="button" class="btn btn-info publish"><span class="glyphicon glyphicon-ok"/></button>',
      '</div>'
    ].join('');
  }

}


window.operateEvents = {
  'click .save': function(e, value, row, index) {
    console.log("save");
    console.log("row: " + row.id +
      " label/" + row.label.id + " party/" + row.party.id + " location/" + row.location.id + "//" + row.location.name + " media/" + row.media.id + "/");
    setParty(row.id, row.party.id);
    setLocation(row.id, row.location.id);
    setLabel(row.id, row.label.id);
    setMedia(row.id, row.media.name, row.media.id);

  },
  'click .publish': function(e, value, row, index) {
    console.log("publish")
    if (row.published == false) {
      setToPublish(row.id, 1);
    }
  },
  'click .unpublish': function(e, value, row, index) {
    console.log("unpublish");
    console.log(row.label.name);
    if (row.published == true) {
      setToPublish(row.id, 0);
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
function setMedia(contribId, mediaName, mediaId) {
  $.ajax({
    type: "POST",
    url: api + "Private/setMedia",
    data: '{"contribId": "' + contribId + '","mediaName": "' + mediaName + '" || "mediaId" : "' + mediaId + '"}',
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
