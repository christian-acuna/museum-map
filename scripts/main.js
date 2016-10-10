function initMap(){function e(e){jQuery.ajax({url:"https://api.map.baidu.com/place/v2/search",type:"GET",dataType:"jsonp",data:{q:"旅游景点",scope:"2",filter:"sort_name:好评|sort_rule:0",region:e,output:"json",ak:"oXmLrK2EjxWxZm1qab51f1fmRLm4I4kF",page_size:"20",page_num:"0"}}).done(function(e,t,o){console.log("HTTP Request Succeeded: "+o.status),c=e.results,a(c)}).fail(function(e,t,a){console.log("HTTP Request Failed")})}function t(e){e.forEach(function(e){e.setMap(null)})}function a(e){t(markers),markers=[],tags=[];var a=[],r=$("#places");r.empty();var l=new google.maps.LatLngBounds;e.forEach(function(e,t){var o=e.name,i=e.location;e.detail_info&&(a=e.detail_info.tag.split(";"),a.forEach(function(e){tags.push(e)}));var c="ABCDEFGHIJKLMNOPQRSTUVWXYZ",p="N/A";e.detail_info&&(p=e.detail_info.overall_rating);var d=new google.maps.Marker({map:map,position:i,title:o,animation:google.maps.Animation.DROP,label:c[t]}),u=$('<li class="list">'+o+" <br> Rating: "+p+"</li> ");u.click(function(t){console.log(t),n(d,s,l,e)}),r.append(u),d.addListener("click",function(){n(this,s,l,e)}),markers.push(d),l.extend(markers[t].position)});var i=_.uniq(tags);o(i),map.fitBounds(l)}function o(e){var t=$("#js-filter");t.empty(),t.append("<label>Filter by Tag:</label>");var a='<select class="form-control">';e.forEach(function(e){r(e),a+='<option id="'+e+'" value="'+e+'">'+e+"</option>"}),a+="</select>",t.append(a)}function r(e){var t="No Word Found";jQuery.ajax({url:"https://www.googleapis.com/language/translate/v2",type:"GET",data:{key:"AIzaSyAzaEzWmHAh91ZM2kLFg0wE4oGsXujnDpc",q:e,source:"zh-CN",target:"en"}}).done(function(a,o,r){console.log("HTTP Request Succeeded: "+r.status),t=a.data.translations[0].translatedText,l(e,t),console.log(t)}).fail(function(e,t,a){console.log("HTTP Request Failed")}).always(function(){})}function l(e,t){var a=$("#"+e);a.append(" | "+t)}function n(e,t,a,o){var r=new google.maps.places.PlacesService(map);r.textSearch({query:e.title,bounds:a},function(a,r){if(r===google.maps.places.PlacesServiceStatus.OK){var l=new google.maps.places.PlacesService(map);l.getDetails({placeId:a[0].place_id},function(a,r){if(r===google.maps.places.PlacesServiceStatus.OK){console.log(a),console.log(o),i(a),t.marker=e;var l="<div>";a.name&&(l+="<strong>"+a.name+"</strong>"),a.formatted_address&&(l+="<br>"+a.formatted_address),a.formatted_phone_number&&(l+="<br>"+a.formatted_phone_number),o.detail_info&&(o.detail_info.overall_rating&&(l+="<br> Baidu Rating: "+o.detail_info.overall_rating),o.detail_info.price&&(l+="<br> Price: "+o.detail_info.price+" 元")),a.opening_hours&&(l+="<br><br><strong>Hours:</strong><br>"+a.opening_hours.weekday_text[0]+"<br>"+a.opening_hours.weekday_text[1]+"<br>"+a.opening_hours.weekday_text[2]+"<br>"+a.opening_hours.weekday_text[3]+"<br>"+a.opening_hours.weekday_text[4]+"<br>"+a.opening_hours.weekday_text[5]+"<br>"+a.opening_hours.weekday_text[6]),a.photos&&(l+='<br><br><img src="'+a.photos[0].getUrl({maxHeight:100,maxWidth:200})+'">'),l+="</div>",t.setContent(l),t.open(map,e),t.addListener("closeclick",function(){t.marker=null})}})}})}function i(e){function t(t,a){var o=$("#panorama");if(a==google.maps.StreetViewStatus.OK){o.show();var r=t.location.latLng,l=google.maps.geometry.spherical.computeHeading(r,e.geometry.location),n={position:r,pov:{heading:l,pitch:10}};new google.maps.StreetViewPanorama(document.getElementById("panorama"),n)}else o.css("display","none"),$("#noPano").fadeIn("slow").animate({opacity:1},2500).fadeOut("slow")}var a=new google.maps.StreetViewService,o=50;a.getPanoramaByLocation(e.geometry.location,o,t)}map=new google.maps.Map(document.getElementById("map"),{center:{lat:22.396428,lng:114.109497},zoom:12,styles:styles});var s=new google.maps.InfoWindow,c=[];e("香港"),$("#js-city").change(function(t){e(t.target.value)})}function getHarvardData(){var e="",t=document.getElementById("js-city").value;switch(t){case"香港":e="2028558";break;case"北京":e="2035839";break;case"上海":e="2040128";break;case"天津":e="2035836"}jQuery.ajax({url:"https://api.harvardartmuseums.org/object",type:"GET",data:{place:e,apikey:"0c781bd0-8a9f-11e6-bcde-977dd71a47a9"}}).done(function(e,t,a){console.log("HTTP Request Succeeded: "+a.status),0===e.records.length&&$("#noData").fadeIn("slow").animate({opacity:1},2500).fadeOut("slow");var o=$.map(e.records,function(e){var t=e.primaryimageurl+"?width=600";return new ArtObject(e.title,e.department,e.primaryimageurl,t,e.dated,e.period,e.culture,e.dimensions,e.creditline)});console.log(o),appViewModel.artObjects(o),addLightbox()}).fail(function(e,t,a){console.log("HTTP Request Failed")}).always(function(){})}function getGettyData(){var e=document.getElementById("js-city").value;$.ajax({url:"../json/"+e+".json",type:"GET",dataType:"json"}).done(function(e,t,a){console.log("HTTP Request Succeeded: "+a.status);var o=e.Response.doc.record,r=$.map(o,function(e){var t=e.imageThumbURI.replace("thumbnail","enlarge");return console.log(t),new ArtObject(e.PrimaryTitle,e.Department,t,e.imageThumbURI,e.Date,e.Place,e.Place,e.Dimensions,e.Source)});console.log(r),appViewModel.artObjects(r),addLightbox()}).fail(function(e,t,a){console.log("HTTP Request Failed")}).always(function(){})}function parseHarvardData(e){var t=e.records;t.forEach(function(e){console.log(e.title)})}function addLightbox(){var e=function(){$('<div id="imagelightbox-loading"><div></div></div>').appendTo("body")},t=function(){$("#imagelightbox-loading").remove()};$("a").imageLightbox({onLoadStart:function(){e()},onLoadEnd:function(){t()},onEnd:function(){t()}})}var map,styles=[{elementType:"geometry",stylers:[{color:"#ebe3cd"}]},{elementType:"labels.text.fill",stylers:[{color:"#523735"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#c9b2a6"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#dcd2be"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#ae9e90"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#93817c"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#a5b076"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#447530"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#fdfcf8"}]},{featureType:"road.arterial",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#f8c967"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#e9bc62"}]},{featureType:"road.highway",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#e98d58"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#db8555"}]},{featureType:"road.local",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#dfd2ae"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#b9d3c2"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#92998d"}]}],markers=[],tags=[];document.getElementById("data").addEventListener("click",getHarvardData),document.getElementById("data-getty").addEventListener("click",getGettyData);var AppViewModel=function(){var e=this;e.artObjects=ko.observableArray([])},appViewModel=new AppViewModel;ko.applyBindings(appViewModel);var ArtObject=function(e,t,a,o,r,l,n,i,s){var c=this;c.title=e,c.department=t,c.imageLarge=a,c.imageThumb=o,c.date=r,c.period=l,c.culture=n,c.dimensions=i,c.creditline=s};