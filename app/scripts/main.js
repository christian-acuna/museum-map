// add event listners on buttons
document.getElementById('data').addEventListener('click', getHarvardData);
document.getElementById('data-getty').addEventListener('click', getGettyData);

// knockout appViewModel
var AppViewModel = function() {
  var self = this;

  self.artObjects = ko.observableArray([]);
};

var appViewModel = new AppViewModel();
ko.applyBindings(appViewModel);

// ajax request to Harvard Art Museum
function getHarvardData() {
  var location = '';
  // grab the value of dropdown
  var cityValue = document.getElementById('js-city').value;
  // change value of location to place id of Harvard Art Museum
  switch (cityValue) {
    // Hong Kong
    case '香港':
      location = '2028558';
      break;
    // Beijing
    case '北京':
      location = '2035839';
      break;
    // Shanghai
    case '上海':
      location = '2040128';
      break;
    // Tianjin
    case '天津':
      location = '2035836';
      break;
  }
  // Request (GET http://api.harvardartmuseums.org/object)
  jQuery.ajax({
    url: 'https://api.harvardartmuseums.org/object',
    type: 'GET',
    data: {
      'place': location,
      'apikey': '0c781bd0-8a9f-11e6-bcde-977dd71a47a9',
      'size': '50'
    }
  }).done(function(data, textStatus, jqXHR) {
    console.log('HTTP Request Succeeded: ' + jqXHR.status);
    // if the records array returns zero display notification to user
    if (data.records.length === 0) {
      $('#noData').fadeIn('slow').animate({opacity: 1.0}, 2500).fadeOut('slow');
    }
    // create a new ArtObject for each record
    var mappedObjects = $.map(data.records, function(item) {
      // create an image thumbnail by adding a width paramater
      var imageThumb = item.primaryimageurl + '?width=600';
      return new ArtObject(item.title, item.department, item.primaryimageurl, imageThumb, item.dated, item.period, item.culture, item.dimensions, item.creditline);
    });
    appViewModel.artObjects(mappedObjects);
    // call the addLightbox() function to add a lightbox to every image
    addLightbox();
  }).fail(function(jqXHR, textStatus, errorThrown) {
    // if the request fails run getStoredHarvardData() which performs a request on json stored in json/
    console.log('HTTP Request Failed');
    getStoredHarvardData();
  });
}

// currently the Harvard Art Museum's HTTPS certificate is not vaild and
// fails when the site is hosted on an https server cross-server origin error.
function getStoredHarvardData() {
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
  // a json file with the same name as the place id is stored in the json/ folder
  $.ajax({
    url: './json/' + location + '.json',
    type: 'GET',
    dataType: 'json'
  }).done(function(data, textStatus, jqXHR) {
    console.log('HTTP Request Succeeded: ' + jqXHR.status);
    if (data.records.length === 0) {
      $('#noData').fadeIn('slow').animate({opacity: 1.0}, 2500).fadeOut('slow');
    }
    var mappedObjects = $.map(data.records, function(item) {
      var imageThumb = item.primaryimageurl + '?width=600';
      return new ArtObject(item.title, item.department, item.primaryimageurl, imageThumb, item.dated, item.period, item.culture, item.dimensions, item.creditline);
    });
    console.log(mappedObjects);
    appViewModel.artObjects(mappedObjects);
    addLightbox();
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('HTTP Request Failed');
  });
}

function getGettyData() {
  // var location = '';
  // city value will return a name in Chinese of a city that corresponds to a
  // JSON file with the same name.
  var cityValue = document.getElementById('js-city').value;
  $.ajax({
    url: './json/' + cityValue + '.json',
    type: 'GET',
    dataType: 'json'
  }).done(function(data, textStatus, jqXHR) {
    console.log('HTTP Request Succeeded: ' + jqXHR.status);
    var recordArray = data.Response.doc.record;
    var mappedObjects = $.map(recordArray, function(item) {
      //create a new URL based on the imageThumbURI to an enlarged version
      // hosted on the Getty's servers for the lightbox
      var image = item.imageThumbURI.replace('thumbnail', 'enlarge');
      return new ArtObject(item.PrimaryTitle, item.Department, image, item.imageThumbURI, item.Date, item.Place, item.Place, item.Dimensions, item.Source);
    });
    appViewModel.artObjects(mappedObjects);
    addLightbox();
  }).fail(function(jqXHR, textStatus, errorThrown) {
    console.log('HTTP Request Failed');
  }).always(function() {
    /* ... */
  });
}

// DELETE
// function parseHarvardData(data) {
//   var records = data.records;
//   records.forEach(function(record) {
//     console.log(record.title);
//   });
// }

function addLightbox() {
  // refactor out to new functions
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
