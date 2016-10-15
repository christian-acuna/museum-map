var map;
// Custom map styles
var styles = [
  {
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#ebe3cd'
      }
    ]
  },
  {
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#523735'
      }
    ]
  },
  {
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#f5f1e6'
      }
    ]
  },
  {
    'featureType': 'administrative',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#c9b2a6'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#dcd2be'
      }
    ]
  },
  {
    'featureType': 'administrative.land_parcel',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#ae9e90'
      }
    ]
  },
  {
    'featureType': 'landscape.natural',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dfd2ae'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dfd2ae'
      }
    ]
  },
  {
    'featureType': 'poi',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#93817c'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#a5b076'
      }
    ]
  },
  {
    'featureType': 'poi.park',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#447530'
      }
    ]
  },
  {
    'featureType': 'road',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f5f1e6'
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#fdfcf8'
      }
    ]
  },
  {
    'featureType': 'road.arterial',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#f8c967'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#e9bc62'
      }
    ]
  },
  {
    'featureType': 'road.highway',
    'elementType': 'labels',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road.highway.controlled_access',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#e98d58'
      }
    ]
  },
  {
    'featureType': 'road.highway.controlled_access',
    'elementType': 'geometry.stroke',
    'stylers': [
      {
        'color': '#db8555'
      }
    ]
  },
  {
    'featureType': 'road.local',
    'stylers': [
      {
        'visibility': 'off'
      }
    ]
  },
  {
    'featureType': 'road.local',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#806b63'
      }
    ]
  },
  {
    'featureType': 'transit.line',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dfd2ae'
      }
    ]
  },
  {
    'featureType': 'transit.line',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#8f7d77'
      }
    ]
  },
  {
    'featureType': 'transit.line',
    'elementType': 'labels.text.stroke',
    'stylers': [
      {
        'color': '#ebe3cd'
      }
    ]
  },
  {
    'featureType': 'transit.station',
    'elementType': 'geometry',
    'stylers': [
      {
        'color': '#dfd2ae'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'geometry.fill',
    'stylers': [
      {
        'color': '#b9d3c2'
      }
    ]
  },
  {
    'featureType': 'water',
    'elementType': 'labels.text.fill',
    'stylers': [
      {
        'color': '#92998d'
      }
    ]
  }
];

// Create a new blank array to store all the markers currently on display
var markers = [];
// Create a new blank array to store all tags in Chinese that are generated
// form the baidu request
var tags = [];
var locations = [];
function initMap() {
  // Constructor creates a new map centered on Hong Kong with custom styles
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 22.396428,
      lng: 114.109497
    },
    zoom: 12,
    styles: styles
  });
  var largeInfowindow = new google.maps.InfoWindow();

  // map initally starts out set to Hong Kong
  getBaiduData('香港');

  // dynamically make a request to Baidu based on location passed as a paramater
  // use jsonp to circumvent CROS errors
  function getBaiduData(location) {
    jQuery.ajax({
        url: 'https://api.map.baidu.com/place/v2/search',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            // query for only attractions
            'q': '旅游景点',
            'scope': '2',
            // sort by raiting
            'filter': 'sort_name:好评|sort_rule:0',
            'region': location,
            'output': 'json',
            // ak = acess key
            'ak': 'oXmLrK2EjxWxZm1qab51f1fmRLm4I4kF',
            // max page_size is 20
            'page_size': '20',
            'page_num': '0'
        }
    })
    .done(function(data, textStatus, jqXHR) {
        console.log('HTTP Request Succeeded: ' + jqXHR.status);
        //store results in locations array
        locations = data.results;
        //create markers for locations returned by Baidu
        createMarkers(locations);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('HTTP Request Failed');
    });
  }

  // This function will loop through the markers and set their map to null
  function hideMarkers(markers) {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
  }

  // add jquery event listener to listen for change on the location dropdown and
  // make a request to Baidu for locations at that city
  $('#js-city').change(function(event) {
    getBaiduData(event.target.value);
  });

  function createMarkers(locationsArray) {
    hideMarkers(markers);
    // reset markers and tags arrays
    markers = [];
    tags = [];

    // create tagArrays to store the tags for each location
    var tagArray = [];
    // grab a reference to places ordered list
    var placesList = $('#places');
    // clear out contents of #places
    placesList.empty();

    var bounds = new google.maps.LatLngBounds();

    locationsArray.forEach(function(loc, index) {
      var title = loc.name;
      var position = loc.location;
      var cursor = '';
      // check to see if the loc retuns detail_info property and assign
      // cursor to the string of tags
      // cursor is used as a property on marker to pass the tags associated with each location
      if (loc.detail_info) {
        // loc.detail_info.tag returns a string of tags seperated by a semicolon
        //For example, 旅游景点;游乐园
        //this string is split on the ; and stored in tagArray
        //all of these tags are then pushed onto the tags array
        // they are later filtered into an array that only contains unique values by
        // underscore method uniq
        cursor = loc.detail_info.tag;
        tagArray = loc.detail_info.tag.split(';');
        tagArray.forEach(function(singleTag) {
          tags.push(singleTag);
        });
      }

      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      // set default rating to N/A as some locations do not return a detail_info property
      var rating = 'N/A';
      // if location has detail_info, then it has an overall_rating property and rating is
      // assigned to that value
      if (loc.detail_info) {
        rating = loc.detail_info.overall_rating;
      }

      // create a new marker for each location.
      // Note that cursor is used to store the tag string
      // Could not find another property on the marker to store that string
      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        cursor: cursor,
        animation: google.maps.Animation.DROP,
        label: labels[index]
      });


      //create a new li dom node based on the title, rating, and tags of the Baidu loccation
      var listEl =  $('<li class="list">' + title + ' <br> Rating: ' + rating + ' | ' + cursor + '</li> ');
      // add a click event to each li that getPlacesDetails and opens an infowindow when the li is clicked on
      listEl.click(function(event) {
        getPlacesDetails(marker, largeInfowindow, bounds, loc);
        toggleBounce(marker);
      });
      placesList.append(listEl);

      // add a click event to each markre that getPlacesDetails and opens an infowindow when the marker is clicked on
      marker.addListener('click', function() {
        getPlacesDetails(this, largeInfowindow, bounds, loc);
        toggleBounce(this);
      });
      markers.push(marker);
      // extend the boundaries of the map for each marker
      bounds.extend(markers[index].position);
    });

    // create a new array with only tags that are unique and pass it to addFilterForTags
    var uniqueTags = _.uniq(tags);
    addFilterForTags(uniqueTags);
    map.fitBounds(bounds);
  }

  function addFilterForTags(uniqueTags) {

    var filterDiv = $('#js-filter');
    filterDiv.empty();
    filterDiv.append('<label>Filter by Tag:</label>');

    var formText = $('<select id="selectTag"class="form-control"></select>');
    filterDiv.append(formText);
    formText.change(function(event) {
      filterMarkers(event.target.value);
    });

    uniqueTags.forEach(function(tag) {
      googleTranslateBaidu(tag);
      var optionEl = $('<option id="' + tag + '" value="' + tag + '">' + tag + '</option>');
      formText.append(optionEl);
    });
  }

  function filterMarkers(tag) {
    var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var counter = 0;

    markers.forEach(function(marker, index) {
      markerTag = marker.cursor;
      if (markerTag.indexOf(tag) >= 0) {
        marker.setMap(map);
        marker.setLabel(labels[counter]);
        counter++;
      } else {
        marker.setMap(null);
      }
    });
    $('.list').hide();
    var placesList = $('.list:contains(' + tag + ')');
    placesList.show();
    console.log(placesList);
  }

  function googleTranslateBaidu(word) {
    // (GET https://www.googleapis.com/language/translate/v2)
    var translatedWord = 'No Word Found';
  jQuery.ajax({
      url: 'https://www.googleapis.com/language/translate/v2',
      type: 'GET',
      data: {
          'key': 'AIzaSyAzaEzWmHAh91ZM2kLFg0wE4oGsXujnDpc',
          'q': word,
          'source': 'zh-CN',
          'target': 'en',
      },
  })
  .done(function(data, textStatus, jqXHR) {
      console.log('HTTP Request Succeeded: ' + jqXHR.status);
      translatedWord = data.data.translations[0].translatedText;
      addTranslation(word, translatedWord);
      console.log(translatedWord);
  })
  .fail(function(jqXHR, textStatus, errorThrown) {
      console.log('HTTP Request Failed');
  });
}
  function addTranslation(word, translatedWord) {
    var filterOption = $('#' + word);
    filterOption.append(' | ' + translatedWord);
  }

  function populateInfoWindow(marker, infowindow) {
    if (infowindow.marker != marker) {
            googlePlaceSearch(marker);
            infowindow.marker = marker;
            infowindow.setContent('<div>' + marker.title + '</div>');
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick',function(){
              infowindow.setMarker(null);
            });
          }
  }

  function getPlacesDetails(marker, infowindow, bounds, loc) {
    var placesService = new google.maps.places.PlacesService(map);
        placesService.textSearch({
          query: marker.title,
          bounds: bounds
        }, function(results, status) {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            var service = new google.maps.places.PlacesService(map);
              service.getDetails({
                placeId: results[0].place_id
              }, function(place, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                  loadGooglePanorama(place);
                  // Set the marker property on this infowindow so it isn't created again.
                  infowindow.marker = marker;
                  var innerHTML = '<div>';
                  if (place.name) {
                    innerHTML += '<strong>' + place.name + '</strong>';
                  }
                  if (place.formatted_address) {
                    innerHTML += '<br>' + place.formatted_address;
                  }
                  if (place.formatted_phone_number) {
                    innerHTML += '<br>' + place.formatted_phone_number;
                  }

                  if (loc.detail_info) {
                    // Baidu rating
                    if (loc.detail_info.overall_rating) {
                      innerHTML += '<br> Baidu Rating: ' + loc.detail_info.overall_rating;
                    }
                    // Baidu price
                    if (loc.detail_info.price) {
                      innerHTML += '<br> Price: ' + loc.detail_info.price + ' 元';
                    }
                  }

                  if (place.opening_hours) {
                    innerHTML += '<br><br><strong>Hours:</strong><br>' +
                        place.opening_hours.weekday_text[0] + '<br>' +
                        place.opening_hours.weekday_text[1] + '<br>' +
                        place.opening_hours.weekday_text[2] + '<br>' +
                        place.opening_hours.weekday_text[3] + '<br>' +
                        place.opening_hours.weekday_text[4] + '<br>' +
                        place.opening_hours.weekday_text[5] + '<br>' +
                        place.opening_hours.weekday_text[6];
                  }
                  if (place.photos) {
                    innerHTML += '<br><br><img src="' + place.photos[0].getUrl(
                        {maxHeight: 100, maxWidth: 200}) + '">';
                  }
                  innerHTML += '</div>';
                  infowindow.setContent(innerHTML);
                  infowindow.open(map, marker);
                  // Make sure the marker property is cleared if the infowindow is closed.
                  infowindow.addListener('closeclick', function() {
                    infowindow.marker = null;
                  });
                }
              });
          }
        });
  }

  /**
   * loads the Google Street View for a given place
   * @param  {place} place Place object returned by Google
   */
  function loadGooglePanorama(place){
    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;

    /**
     * When the status is OK, compute the position of the streetview image, then calculate
     * the heading and get a panorama from that and set the options
     * @param  {object} data   data returned from google
     * @param  {string} status status of response
     */
    function getStreetView(data, status) {
      console.log(typeof status);
              var pano = $('#panorama');
              if (status == google.maps.StreetViewStatus.OK) {
                pano.show();
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(
                  nearStreetViewLocation, place.geometry.location);
                  var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                      heading: heading,
                      pitch: 10
                    }
                  };
                var panorama = new google.maps.StreetViewPanorama(
                  document.getElementById('panorama'), panoramaOptions);
              } else {
                pano.css('display','none');
                $('#noPano').fadeIn('slow').animate({opacity: 1.0}, 2500).fadeOut('slow');
              }
            }
            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(place.geometry.location, radius, getStreetView);
  }
  function toggleBounce(marker) {
        if (marker.getAnimation() !== null) {
          marker.setLabel(marker.saveLabel);
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
          marker.saveLabel = marker.getLabel();
          marker.setLabel(null);
          console.log(marker.saveLabel);
        }
      }
}
