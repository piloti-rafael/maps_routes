http://code.jquery.com/jquery-2.0.0.min.js
http://maps.google.com/maps/api/js?sensor=false&amp;language=pt
mapsRoute.js

$(document).ready(function(){
	$("#rota").mapsRota({
		address: "Av Rainha Elizabeth",
		number : "440",
		city: "Rio de Janeiro",
		region: 'BR',
		rota: {
			valor : "Avenida Venezuela, 131, Rio de Janeiro",
			onComplete: function(data){
				console.log(data);
			}
		}
	});
});


<div id="rota"></div>
