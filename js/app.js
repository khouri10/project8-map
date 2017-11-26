//lista de lugares de interesse
var lugaresIniciais = [
{
    nome: 'M10',
    posição: {lat: -23.532581, lng: -46.614906},
    id: 1,
    marcador: ''
},
{
    nome: 'Gajang',
    posição: {lat: -23.535557, lng: -46.613252},
    id: 2,
    marcador: ''
},
{
    nome: 'Nikimba',
    posição: {lat: -23.534199, lng: -46.612641},
    id: 3,
    marcador: ''
},
{
    nome: 'Aishty',
    posição: {lat: -23.536217, lng: -46.612821},
    id: 4,
    marcador: ''
},
{
    nome: 'Hotel Family',
    posição: {lat: -23.539749, lng: -46.619614},
    id: 5,
    marcador: ''
}
];

var map;

var marcadorPadrao;

var marcadorDestacado;

function makeMarkerIcon(markerColor) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(21, 34),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(21,34));
        return markerImage;
      }

var initMap = function() {
	
	//inicia o mapa na tela inteira
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -23.538047, lng: -46.613912},
    	zoom: 15,
    	mapTypeControl: false
    });

	marcadorPadrao = makeMarkerIcon('F44336');

	marcadorDestacado = makeMarkerIcon('FFC107');
    //coloca marcadores no mapa
    for (var i = 0; i < lugaresIniciais.length; i++) {
    	var marcador = new google.maps.Marker({
          position: lugaresIniciais[i].posição,
          map: map,
          title: lugaresIniciais[i].nome,
          animation: google.maps.Animation.DROP,
          icon: marcadorPadrao
        });
        
    	lugaresIniciais[i].marcador = marcador;
        
         marcador.addListener('mouseover', function() {
            this.setIcon(marcadorDestacado);
          });
          marcador.addListener('mouseout', function() {
            this.setIcon(marcadorPadrao);
          });
    }

    // to change the colors back and forth.
         
        
}


var Lugar = function(data){
    this.nome = ko.observable(data.nome);
    this.posição = ko.observable(data.posição);
}

var esconderMarcadores = function (marcadores) {
    for (var i = 0; i < marcadores.length; i++) {
        marcadores[i].setMap(null);
        }
}

var mostrarMarcadores = function(marcadores) {
	for (var i = 0; i < marcadores.length; i++) {
	    marcadores[i].setMap(map);
	}
}

var ViewModel = function() {
    var self = this;

    this.lugarLista = ko.observableArray([]);

    this.listarTodos = function() {
        lugaresIniciais.forEach(function(lugarItem){
            self.lugarLista.push( new Lugar(lugarItem) );
        });
    }
    this.listarTodos();
    this.pesquisa = ko.observable(''); 
    this.pesquisar = function(value) {
        self.lugarLista.removeAll();
        
        for (var i = 0; i < lugaresIniciais.length; i++) {
        lugaresIniciais[i].marcador.setMap(null);
        }

        if (value == '') {
        	self.listarTodos;
        	for (var i = 0; i < lugaresIniciais.length; i++) {
        		lugaresIniciais[i].marcador.setMap(null);
        	}
        }

        lugaresIniciais.forEach(function(lugarItem){
            if (lugarItem.nome.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    self.lugarLista.push( new Lugar(lugarItem) );
                    lugarItem.marcador.setMap(map)
            } 
        });
      		
    };

    this.pesquisa.subscribe(self.pesquisar);
}

ko.applyBindings(new ViewModel());


