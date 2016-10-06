document.getElementById('data').addEventListener('click', getHarvardData);

var AppViewModel = function() {
  var self = this;

  self.artObjects = ko.observableArray([]);
};

var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

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
      var mappedObjects = $.map(data.records, function(item) {
        console.log(item);
        // console.log(item.department);
        var image =  item.primaryimageurl + '?width=600';
        return new ArtObject(
          item.title,
          item.department,
          image, item.dated,
          item.period,
          item.culture,
          item.dimensions,
          item.creditline
        );
      });
      console.log(mappedObjects);
      appViewModel.artObjects(mappedObjects);
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
