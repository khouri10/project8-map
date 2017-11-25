//lista de lugares de interesse
var lugaresIniciais = [
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
    nome: 'Hotel Family',
    posição: {lat: -23.539749, lng: -46.619614}
}
];

function initMap() {
	
	//inicia o mapa na tela inteira
	var map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -23.538047, lng: -46.613912},
    	zoom: 15,
    	mapTypeControl: false
    });

    //cria array de marcadores
    var marcadores = [];

    //coloca marcadores no mapa
    for (var i = 0; i < lugaresIniciais.length; i++) {
    	var marcador = new google.maps.Marker({
          position: lugaresIniciais[i].posição,
          map: map,
          title: lugaresIniciais[i].nome,
          animation: google.maps.Animation.DROP
        });

        marcadores.push(marcador);
    }
}

var Lugar = function(data){
    this.nome = ko.observable(data.nome);
    this.posição = ko.observable(data.posição);
}

var ViewModel = function() {
    var self = this;

    this.lugarLista = ko.observableArray([]);

    lugaresIniciais.forEach(function(lugarItem){
        self.lugarLista.push( new Lugar(lugarItem) );
    });




}

ko.applyBindings(new ViewModel());


