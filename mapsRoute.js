(function( $ ) {
 
	$.fn.mapsRota = function( settings ) {
		console.log(this);
		var container;
		var seletor = this;
		// console.log(settings);
		if (seletor[0].nodeName === "SELECT"){

			var params = (typeof settings != "undefined") ? settings.container : "naoDefinido";

			if (params == "naoDefinido" || params == undefined){
				console.log("Por Favor defina o container");
				return;
			}else{
				container = settings.container;
			}
		}else{
			container = seletor;
		} 		
		var config = {
			icon: null,
			shadow: null,
			container: container,
			containerSize: {
				height: "400px",
				width: "600px",
				display: "block"
			},
			address: "Avenida Venezuela",
			number : "131",
			city: "Rio de Janeiro",
			region: 'BR',
			contentString: null,
			elementoNodeName: seletor[0].nodeName,
			elementoDOM: seletor[0],
			style : null,
			rota : null
		};

		$.extend(true, config, settings);

		$(config.container).css(config.containerSize);

		var styledMap = new google.maps.StyledMapType(config.style,{name: "Styled Map"});
		var geocoder;
		var map;
		var marker;
		var data;
		var latlng = new google.maps.LatLng(-23.013745, -43.305662);
		var options = {
			zoom: 5,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true,
			scrollwheel: false
		};
		map = new google.maps.Map($(config.container)[0], options);
		geocoder = new google.maps.Geocoder();
		
		if(config.contentString === null){
			data = {};
		}else{
			data = {content: config.contentString};
		}

		function popup(data){
			var infowindow = new google.maps.InfoWindow(data);
			infowindow.open(map,marker);
		}

		marker = new google.maps.Marker({
			map: map,
			draggable: false,
			icon : config.icon,
			shadow : config.shadow
		});

		map.mapTypes.set('map_style', styledMap);
		map.setMapTypeId('map_style');
//		map.disableScrollWheelZoom();
		marker.setPosition(latlng);


		if (config.elementoNodeName == "SELECT"){

			config.elementoDOM.addEventListener("change", function(){
				var endereco = $(this).val();
				var description = {content: $('option:selected', this).attr('data-description')};
					endereco = endereco.split(",");
				if (description.content == undefined){
					description = {};
				}
				popup(description);
				montaGeocoder(endereco[0], endereco[1], endereco[2], endereco[3]);
			});
		}else{
			popup(data);
			montaGeocoder(config.address, config.number, config.city, config.region)
		}

		function montaGeocoder(address, number, city, region){
			geocoder.geocode({ 'address': address + ", "+ number+", " + city , 'region': region }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					if (results[0]) {
						var latitude = results[0].geometry.location.lat();
						var longitude = results[0].geometry.location.lng();
						var location = new google.maps.LatLng(latitude, longitude);
						marker.setPosition(location);


						if (config.rota != null){
							var directionsService = new google.maps.DirectionsService();
							var directionsDisplay = new google.maps.DirectionsRenderer();
							var request = {
									origin: config.rota.valor,
									destination: location,
									travelMode: google.maps.DirectionsTravelMode.WALKING
							};
							
							directionsService.route(request, function(response, status) {
									if (status == google.maps.DirectionsStatus.OK) {
										directionsDisplay.setDirections(response);
										directionsDisplay.setMap(map);
										if (config.rota.onComplete != undefined){
											config.rota.onComplete(response);

										}
									}
							});

						}


						map.setCenter(location);
						map.setZoom(16);
					}
				}
			});
		}




 		console.log(config);
 		return this;
	};
 
}( jQuery ));