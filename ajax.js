$(function(){
	/*$.ajax();
	$.get('logos_footer.html', function(codiguito){
		$('footer').append(codiguito);
	});
	*/
	$.get('usuario.json', function(info){
		var avatar = new Image();
		avatar.src = info.avatar;
		avatar.title = info.nombre+' '+info.apellido;
		
		$('#avatar').append(avatar);
	});
	//Manera mas simple de hacer todo esto
	$('footer .logos').load('logos_footer.html #maestrosdelweb');	
});

var base_url = "http://query.yahooapis.com/v1/public/yql?";

function obtenerGeoInformacion(lat, lon)
{
	var query = 'SELECT * FROM geo.placefinder WHERE text="'+lat+', '+lon+'" AND gflags="R"';
	//Codificar para que pueda viajar en la URL
	query = encodeURIComponent(query);
		
	$.ajax({
		url: base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarGeoInfo',
		data: {
			format : 'json'
		} 		
	});
}

function procesarGeoInfo(datos){
	//console.log(datos);
	var res = datos.query.results.Result;
	var barrio = res.neighborhood;
	var ciudad = res.city;
	var pais = res.country;
	var woeid = res.woeid;
	
	$('#geo').prepend('<p><strong>'+barrio+'<strong><br>'+','+ciudad+','+pais+'</p>')
	
	obtenerClima(woeid);
}

function obtenerClima(woeid)
{
	var query = 'SELECT * FROM weather.forecast WHERE woeid="'+woeid+'" and u="c"';
	//Codificar para que pueda viajar en la URL
	query = encodeURIComponent(query);
		
	$.ajax({
		url: base_url+"q="+query,
		dataType: 'jsonp',
		jsonpCallback: 'procesarClima',
		data: {
			format : 'json'
		} 		
	});
}

function procesarClima(datos){
	//console.log(datos);
	var clima = datos.query.results.channel;
	var temp = clima.item.condition.temp;
	var unit = clima.units.temperature;
	var code = clima.item.condition.code;
	var img = new Image();
	img.src = 'http://l.yimg.com/a/i/us/we/52/'+code+'.gif';
	
	$('#clima').append(img).append(temp+' '+unit+'º');

}
