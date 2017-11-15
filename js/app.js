function initMap() {
	
	//inicia o mapa na tela inteira
	var map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -23.538047, lng: -46.613912},
    	zoom: 15,
    	mapTypeControl: false
    });

    //lista de lugares de interesse
    var lugares = [
    {
    	nome: 'M10',
    	posição: {lat: -23.532581, lng: -46.614906}
    },
    {
    	nome: 'Gajang',
    	posição: {lat: -23.535557, lng: -46.613252}
    },
    {
    	nome: 'Nikimba',
    	posição: {lat: -23.534199, lng: -46.612641}
    },
    {
    	nome: 'Aishty',
    	posição: {lat: -23.536217, lng: -46.612821}
    },
    {
    	nome: 'Family',
    	posição: {lat: -23.539749, lng: -46.619614}
    }
    ];

    //criar array de marcadores
    var marcadores = [];
    //colocar marcadores
    for (var i = 0; i < lugares.length; i++) {
    	var marcador = new google.maps.Marker({
          position: lugares[i].posição,
          map: map,
          title: lugares[i].nome,
          animation: google.maps.Animation.DROP
        });

        marcadores.push(marcador);
    }
    

}