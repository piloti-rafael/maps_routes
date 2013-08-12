<script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&amp;language=pt"></script>
<script src="mapsRoute.js"></script>

	$(document).ready(function(){
		$("#rota").mapsRota({
			address: "Av Rainha Elizabeth",
			number : "440",
			city: "Rio de Janeiro",
			region: 'BR',
			rota: {
				valor : "Rua Belford Roxo, 285, Rio de Janeiro",
				onComplete: function(data){
					console.log(data);
				}
			}
		});
	});

	
<body>

	<div id="rota"></div>

</body>
