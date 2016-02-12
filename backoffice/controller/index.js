$(document).ready(function() {

  $('#table').bootstrapTable({
    url: "http://jsonplaceholder.typicode.com/photos",
    columns: [{
      field: 'id',
      title: 'Seleccionar',
      checkbox: 'true'
    }, {
      field: 'albumId',
      title: 'Etiqueta',
      sortable: true,
      editable: true,
      footerFormatter: totalFormatter,
      align: 'center'

    }, {
      field: 'title',
      title: "Fecha de publicaci&oacuten",
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
      field: 'thumbnailUrl',
      title: 'Thumbmail',
      align: 'center'
    }, {
      field: 'operate',
      align: 'center',
      title: 'Guardar',
      events: operateEvents,
      formatter: operateFormatter
    }]
  });

  $(window).resize(function () {
           $table.bootstrapTable('resetView', {
               height: getHeight()
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
    '<a class="like" href="javascript:void(0)" title="Like">',
    '<i class="glyphicon glyphicon-heart"></i>',
    '</a>  '
  ].join('');
}


window.operateEvents = {
  'click .like': function(e, value, row, index) {
    alert('Vas a guardar la siguiente informaci&oacuten: ' + JSON.stringify(row));
  }
};
