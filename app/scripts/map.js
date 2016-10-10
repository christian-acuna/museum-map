var map;
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

var markers = [];
var tags = [];
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 22.396428,
      lng: 114.109497
    },
    zoom: 12,
    styles: styles
  });
  var largeInfowindow = new google.maps.InfoWindow();

  var locations = [];
  getBaiduData('香港');

  function getBaiduData(location) {
    jQuery.ajax({
        url: 'https://api.map.baidu.com/place/v2/search',
        type: 'GET',
        dataType: 'jsonp',
        data: {
            'q': '旅游景点',
            'scope': '2',
            'filter': 'sort_name:好评|sort_rule:0',
            'region': location,
            'output': 'json',
            'ak': 'oXmLrK2EjxWxZm1qab51f1fmRLm4I4kF',
            'page_size': '20',
            'page_num': '0'
        }
    })
    .done(function(data, textStatus, jqXHR) {
        console.log('HTTP Request Succeeded: ' + jqXHR.status);
        locations = data.results;
        createMarkers(locations);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.log('HTTP Request Failed');
    });
  }

  function hideMarkers(markers) {
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
  }

  $('#js-city').change(function(event) {
    getBaiduData(event.target.value);
  });

  function createMarkers(locationsArray) {
    hideMarkers(markers);
    markers = [];
    tags = [];
    var tagArray = [];
    var placesList = $('#places');
    placesList.empty();
    var bounds = new google.maps.LatLngBounds();
    locationsArray.forEach(function(loc, index) {
      var title = loc.name;
      var position = loc.location;
      var cursor = '';

      if (loc.detail_info) {
        cursor = loc.detail_info.tag;
        tagArray = loc.detail_info.tag.split(';');
        tagArray.forEach(function(singleTag) {
          tags.push(singleTag);
        });
      }

      var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      var rating = 'N/A';
      if (loc.detail_info) {
        rating = loc.detail_info.overall_rating;
      }


      var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        cursor: cursor,
        animation: google.maps.Animation.DROP,
        label: labels[index]
      });

      var listEl =  $('<li class="list">' + title + ' <br> Rating: ' + rating + '</li> ');

      listEl.click(function(event) {
        console.log(event);
        getPlacesDetails(marker, largeInfowindow, bounds, loc);
      });
      placesList.append(listEl);

      marker.addListener('click', function() {
        getPlacesDetails(this, largeInfowindow, bounds, loc);
      });
      markers.push(marker);

      bounds.extend(markers[index].position);
    });

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
    console.log(tag);

    markers.forEach(function(marker) {
      markerTag = marker.cursor;
      if (markerTag.indexOf(tag) >= 0) {
        marker.setMap(map);
      } else {
        marker.setMap(null);
      }
    });
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
  })
  .always(function() {
      /* ... */
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
                  console.log(place);
                  console.log(loc);
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

  //全景图展示
  //Baidu Pano

  // var panorama = new BMap.Panorama('baidupano');
  // panorama.setOptions({
  //     indoorSceneSwitchControl: true //配置全景室内景切换控件显示
  //   });
  //
  // function loadbaiduPanorama(){
  //   panorama.setPosition(new BMap.Point(120.320032, 31.589666));	//3
  //   // panorama.setId('0100010000130501122416015Z1');
  //   panorama.setPov({heading: -40, pitch: 6});	//4
  // }

  // function baiduChangePanoView(loc) {
  //   // console.log();
  //   // console.log(point);
  //   // panorama.setPosition(new BMap.Point(loc.location.lng, loc.location.lat));
  //   panorama.setId(loc.uid);
  //   panorama.setPov({heading: -40, pitch: 6});
  // }
  //
  // loadbaiduPanorama();


  function loadGooglePanorama(place){
    var streetViewService = new google.maps.StreetViewService();
    var radius = 50;

    function getStreetView(data, status) {
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

  // function baiduChangePanoView(loc) {
  //   // console.log();
  //   // console.log(point);
  //   // panorama.setPosition(new BMap.Point(loc.location.lng, loc.location.lat));
  //   panorama.setId(loc.uid);
  //   panorama.setPov({heading: -40, pitch: 6});
  // }

}
