$(document).ready(function() {

  $('#table').bootstrapTable({
    url: "http://jsonplaceholder.typicode.com/photos",
    columns: [{
      field: 'title',
      title: "Fecha de publicaci&oacuten",
      align: 'center'
    },{
      field: 'thumbnailUrl',
      title: 'Thumbmail',
      align: 'center'
    },{
      field: 'albumId',
      title: 'Etiqueta',
      sortable: true,
      editable: true,
      footerFormatter: totalFormatter,
      align: 'center'

    }, {
      field: 'url',
      title: "Partido pol&iacutetico",
      sortable: true,
      editable: true,
      footerFormatter: totalFormatter,
      align: 'center'
    }, {
      field: 'albumId',
      title: 'Medios de comunicaci&oacuten',
      sortable: true,
      editable: true,
      footerFormatter: totalFormatter,
      align: 'center'
    }, {
      field: 'operate',
      align: 'center',
      title: 'Guardar',
      events: operateEvents,
      formatter: operateFormatter
    }]
  });

  $(function() {
    $(window).resize(function() {
      $('#table').bootstrapTable('resetView');
    });
  });
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
    var url = 'http://jsonplaceholder.typicode.com/photos/' + index;
    $.ajax({
      url: url,
      type: 'PUT',
      data: JSON.stringify(row),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      async: false,
      success: function(msg) {
       alert('Vas a guardar la siguiente informaci&oacuten: ' + JSON.stringify(row) +index	);
      }
    });
  }
};
