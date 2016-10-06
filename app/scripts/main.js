var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 22.396428,
      lng: 114.109497
    },
    zoom: 8
  });
}
document.getElementById('data').addEventListener('click', getHarvardData);

function getHarvardData() {
  jQuery.ajax({
      url: "http://api.harvardartmuseums.org/object",
      type: "GET",
      data: {
          "place": "2035838",
          "apikey": "0c781bd0-8a9f-11e6-bcde-977dd71a47a9",
      },
  })
  .done(function(data, textStatus, jqXHR) {
      console.log("HTTP Request Succeeded: " + jqXHR.status);
      console.log(data);
      parseHarvardData(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
      console.log("HTTP Request Failed");
  })
  .always(function() {
      /* ... */
  });
}

function parseHarvardData(data) {
  var records = data.records;
  records.forEach(function(record) {
    console.log(record.title);
  });
}
