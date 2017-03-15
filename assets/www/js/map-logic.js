$(document).ready(function() {
try{
	////map js

	var geocoder;
	var map;
	var infowindow = new google.maps.InfoWindow();
	var marker;
	var myLocation = null;
	var latlng = new google.maps.LatLng(28.6959120, 77.1522600);
	var directionsDisplay;
	// google.maps.visualRefresh = true;	
	
	
	// locateMe();
	//google.maps.event.addDomListener(window, 'load', initialize);
	//locateMe();
	
	function initialize() {
		directionsDisplay = new google.maps.DirectionsRenderer();
		geocoder = new google.maps.Geocoder();
		
		var mapOptions = {
			zoom : 8,
			center : latlng,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		};

		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		directionsDisplay.setMap(map);		

		// Create the DIV to hold the control and
		// call the HomeControl() constructor passing
		// in this DIV.

		var homeControlDiv = document.createElement('div');
		var homeControl = new HomeControl(homeControlDiv, map);

		homeControlDiv.index = 1000;
		map.controls[google.maps.ControlPosition.CENTER].push(homeControlDiv);

		google.maps.event.addListener(map, 'dragend', function() {
			google.maps.event.trigger(map, 'resize');
			codeLatLng();
		});
		
		 google.maps.event.addListenerOnce(map, 'idle', function() {
   			 google.maps.event.trigger(map, 'resize');
		 });
		


	}

	function HomeControl(controlDiv, map) {

		// Set CSS styles for the DIV containing the control
		// Setting padding to 5 px will offset the control
		// from the edge of the map
		controlDiv.style.padding = '5px';

		// Set CSS for the control border
		var controlUI = document.createElement('div');
		controlUI.style.backgroundColor = '#CB2C32';
		controlUI.className += ' center-route';
		controlUI.style.borderRadius = '50%';
		controlUI.style.borderStyle = 'solid';
		controlUI.style.borderWidth = '0px';
		controlUI.style.cursor = 'pointer';
		controlUI.style.textAlign = 'center';
		controlUI.title = 'Click to set the map to Home';
		controlDiv.appendChild(controlUI);

		// Set CSS for the control interior
		var controlText = document.createElement('div');
		controlText.style.padding = '2px 1px 2px 0px';
		controlText.innerHTML = '<div class="flaticon-position3"></div>';
		controlUI.appendChild(controlText);
		codeLatLng();

		// Setup the click event listeners: simply set the map to
		// Chicago
		google.maps.event.addDomListener(controlUI, 'click', function() {
			codeLatLng();
		});
	}

	function codeLatLng() {
		google.maps.event.trigger(map, "resize");
		var NewMapCenter = map.getCenter();
		var latitude = NewMapCenter.lat();
		var longitude = NewMapCenter.lng();
		var latlng = new google.maps.LatLng(latitude, longitude);
		geocoder.geocode({
			'latLng' : latlng
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {
					document.getElementById("selectedAddress").innerHTML = results[0].formatted_address;
					// console.log(results);
				} else {
					//alert('No results found');
				}
			} else {
				// alert('Geocoder failed due to: ' + status);
			}
		});
	}


	google.maps.event.addDomListener(window, 'load', initialize);
	//locateMe();

	/// end map js
	
	function locateMe() {
		// alert("Location Function");
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(success, fail);
		} else {
			new $.Zebra_Dialog("Location Not Supported", {
			    'custom_class':  'myclass',
			    'title': ''
				});			
		}
	}

	function success(position) {
		myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		map.setCenter(myLocation);
		console.log(myLocation);
		map.setZoom(17);
		codeLatLng();
		
	
		// geocode(myLocation);
	
		// codeLatLng(myLocation.k, myLocation.B);
	
		/*
		 alert("Latitude: "+position.coords.latitude+
		 "<br />Longitude: "+position.coords.longitude+
		 "<br />Accuracy: "+position.coords.accuracy);
		 */
	}
	
	function fail(error) {
		var errorType = {
			0 : "Unknown Error",
			1 : "Permission denied by the user",
			2 : "Position of the user not available",
			3 : "Request timed out"
		};
	
		var errMsg = errorType[error.code];
	
		if (error.code == 0 || error.code == 2) {
			errMsg = errMsg + " - " + error.message;
		}
	
		alert(errMsg);
		dummyCord(latlng);
	}
	
	function dummyCord(cords){
		success(cords);
	}
	
	$("#route2").on('pageshow', function(){
		google.maps.event.trigger(map, 'resize');
	});
}catch(err){
	
}

});