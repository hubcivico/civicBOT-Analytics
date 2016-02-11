$(document).ready(function() {

  var url = "http://jsonplaceholder.typicode.com/users";

  $.ajax({
    url: url,
    type: 'GET',
    success: function(response) {
      var trHTML = '';
      $.each(response, function(i, item) {
        trHTML +=
          '<tr><td>' + item.id +
          '</td><td>' + item.name +
          '</td><td>' + item.username +
          '</td><td>' + item.phone +
          '</td><td>' + item.username +
          '</td><td>' + item.phone +
          '</td></tr>';
      });
      $('#table').append(trHTML);
    }
  });
});
