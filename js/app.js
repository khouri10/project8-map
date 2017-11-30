//lista de lugares de interesse
var lugaresIniciais = [
{
    nome: 'M10',
    posição: {lat: -23.532581, lng: -46.614906},
    id: 1,
    marcador: [],
    visivel: true
},
{
    nome: 'Gajang',
    posição: {lat: -23.535557, lng: -46.613252},
    id: 2,
    marcador: [],
    visivel: true
},
{
    nome: 'Nikimba',
    posição: {lat: -23.534199, lng: -46.612641},
    id: 3,
    marcador: [],
    visivel: true
},
{
    nome: 'Aishty',
    posição: {lat: -23.536217, lng: -46.612821},
    id: 4,
    marcador: [],
    visivel: true
},
{
    nome: 'Hotel Family',
    posição: {lat: -23.539749, lng: -46.619614},
    id: 5,
    marcador: [],
    visivel: true
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
        
    	lugaresIniciais[i].marcador.push(marcador);
        
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
    this.id = ko.observable(data.id);
    this.marcador = ko.observableArray(data.marcador);
    this.visivel = ko.observable(data.visivel);
}

var ViewModel = function() {
    var self = this;

    //cria uma array observavel vazia
    this.lugarLista = ko.observableArray([]);

    //coloca todos os dados iniciais na array osbservavel
    lugaresIniciais.forEach(function(lugarItem){
        self.lugarLista.push( new Lugar(lugarItem) );
    });
    
    //cria um observavel para linkar com o evento da pesquisa    
    this.pesquisa = ko.observable(''); 

    //função que esconde os itens que não correspondem a pesquisa
    // e mostra todos quando estiver vazia
    this.pesquisar = function(value) {
    	
        if (value == '') {
        	for (var i = 0; i < self.lugarLista().length; i++) {
        		self.lugarLista()[i].marcador()[0].setMap(map);
        		self.lugarLista()[i].visivel(true);
        	}
        }

        self.lugarLista().forEach(function(lugarItem){
            if (lugarItem.nome().toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    lugarItem.marcador()[0].setMap(map);
                    lugarItem.visivel(true);
            } else {
            	lugarItem.marcador()[0].setMap(null);
            	lugarItem.visivel(false);
            }
        });
      		
    };

    this.pesquisa.subscribe(self.pesquisar);
}

ko.applyBindings(new ViewModel());


