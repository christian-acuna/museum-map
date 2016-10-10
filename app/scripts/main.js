document.getElementById('data').addEventListener('click', getHarvardData);
document.getElementById('data-getty').addEventListener('click', getGettyData);

var AppViewModel = function() {
  var self = this;

  self.artObjects = ko.observableArray([]);
};

var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

function getHarvardData() {
  var location = '';
  var cityValue = document.getElementById('js-city').value;
  switch (cityValue) {
    case '香港':
      location = '2028558';
      break;
    case '北京':
      location = '2035839';
      break;
    case '上海':
      location = '2040128';
      break;
    case '天津':
      location = '2035836';
      break;
  }
  jQuery.ajax({
    url: 'http://api.harvardartmuseums.org/object',
    type: 'GET',
    data: {
      'place': location,
      'apikey': '0c781bd0-8a9f-11e6-bcde-977dd71a47a9'
      // "keyword": "photographs"
    }
  }).done(function(data, textStatus, jqXHR) {
    console.log('HTTP Request Succeeded: ' + jqXHR.status);
    console.log(data);
    var mappedObjects = $.map(data.records, function(item) {
      console.log(item);
      // console.log(item.department);
      var imageThumb = item.primaryimageurl + '?width=600';
      return new ArtObject(item.title, item.department, item.primaryimageurl, imageThumb, item.dated, item.period, item.culture, item.dimensions, item.creditline);
    });
    console.log(mappedObjects);
    appViewModel.artObjects(mappedObjects);
    addLightbox();
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('HTTP Request Failed');
  }).always(function() {
    /* ... */
  });
}

function getGettyData() {
  var location = '';
  var cityValue = document.getElementById('js-city').value;
  $.ajax({
    url: '../json/' + cityValue + '.json',
    type: 'GET',
    dataType: 'json'
  }).done(function(data, textStatus, jqXHR) {
    console.log('HTTP Request Succeeded: ' + jqXHR.status);
    console.log(data.Response.doc.record);
    var recordArray = data.Response.doc.record;
    var mappedObjects = $.map(recordArray, function(item) {
      console.log(item);
      // console.log(item.department);
      var image = item.imageThumbURI.replace('thumbnail', 'enlarge');
      console.log(image);
      return new ArtObject(item.PrimaryTitle, item.Department, image, item.imageThumbURI, item.Date, item.Place, item.Place, item.Dimensions, item.Source);
    });
    console.log(mappedObjects);
    appViewModel.artObjects(mappedObjects);
    addLightbox();
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('HTTP Request Failed');
  }).always(function() {
    /* ... */
  });
}

function parseHarvardData(data) {
  var records = data.records;
  records.forEach(function(record) {
    console.log(record.title);
  });
}

function addLightbox() {
  var activityIndicatorOn = function() {
    $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
  };
  var activityIndicatorOff = function() {
    $('#imagelightbox-loading').remove();
  };
  $('a').imageLightbox({
    onLoadStart: function() {
      activityIndicatorOn();
    },
    onLoadEnd: function() {
      activityIndicatorOff();
    },
    onEnd: function() {
      activityIndicatorOff();
    }
  });
}
