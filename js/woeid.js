/* woeid.js
	Version:     0.1
 * Author:      Valentin Luque
 * Contact:     valenti.luque@gmail.com
 * Website:     http://www.artinfinity.net/
*/
(function($){

	
//-----------------
$.fn.localizaxml=function(ciudad,resultado)
		{	
			$(resultado).html("");	
			consulta="select * from geo.places where text='"+ciudad+"'";
			console.log(consulta);
			var data2=$.ajax({
				type:'GET',
				url:'http://query.yahooapis.com/v1/public/yql',
				data:{q:consulta},
				dataType:'xml',
				async:false,
				success:function(data){
					$("#cargando").hide();
					console.log("La url es:"+consulta);	
					console.log(data);
					espanyol=$(data).find("country").attr("code");
					if (typeof(espanyol)=='undefined') $(resultado).html("No se han encontrado resultados")
					else {
						(espanyol!='ES') ? $(resultado).html("La ciudad NO es española") :console.log("Española") ;
					}
				
				},
				error:function(ts)
				{	
					console.log(ts.responseText);
					$("#fallo").show();
					//ts.responseText.appendTo($('#fallo'));
				}
				
				}).responseText; //fin ajax
		
						//console.log("data2:"+data2);			
						woeid=$(data2).find("locality1").attr("woeid");
						pais=$(data2).find("country:first").text();
						comunidad=$(data2).find("admin1:first").text();
						provincia=$(data2).find("admin2:first").text();
						destino=$(data2).find("name:first").text();
						latitud=$(data2).find("latitude:first").text();
						longitud=$(data2).find("longitude:first").text();
						cpostal=$(data2).find("postal:first").text();
					  	console.log("destino: "+destino+" pais es: "+pais+" Comunidad autonoma: "+comunidad+" Provincia es :"+provincia+" Woeid es: "+woeid+" Codigo postal: "+cpostal+" latitud: "+latitud+" longitud: "+longitud);
						$.param(direccion={'Codigo ':woeid,'Destino':destino,'Provincia':provincia,'Comunidad Autónoma':comunidad,'Pais':pais,'Código Postal':cpostal,'Latitud':latitud,'Longitud':longitud});
						console.log("direccion es: "+direccion);
						if  ($(resultado).html()!="No se han encontrado resultados") dibuja_div(direccion,resultado);
			return(direccion);
		} //fin fncion localizarxml
//-----------------------
function dibuja_div(array,destino)
{
	$.each(array,function(i,v){
		$('<div>',{id:i}).html(i+": "+v).appendTo($(destino));
		console.log(v);
	}); //fin array
}//fin funcion dibuja_div

//-----------------------
})(jQuery);	

		
