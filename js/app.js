//lista de lugares de interesse
var lugaresIniciais = [
{
    nome: 'M10',
    posição: {lat: -23.532581, lng: -46.614906},
    id: ''
},
{
    nome: 'Gajang',
    posição: {lat: -23.535557, lng: -46.613252},
    id: ''
},
{
    nome: 'Nikimba',
    posição: {lat: -23.534199, lng: -46.612641},
    id: ''
},
{
    nome: 'Aishty',
    posição: {lat: -23.536217, lng: -46.612821},
    id: ''
},
{
    nome: 'Hotel Family',
    posição: {lat: -23.539749, lng: -46.619614},
    id: ''
}
];

var map;

var marcadores = [];

var initMap = function() {
	
	//inicia o mapa na tela inteira
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -23.538047, lng: -46.613912},
    	zoom: 15,
    	mapTypeControl: false
    });

    //coloca marcadores no mapa
    for (var i = 0; i < lugaresIniciais.length; i++) {
    	var marcador = new google.maps.Marker({
          position: lugaresIniciais[i].posição,
          map: map,
          title: lugaresIniciais[i].nome,
          animation: google.maps.Animation.DROP
        });
        lugaresIniciais[i].id = i

        marcadores.push(marcador);
    }
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
        esconderMarcadores(marcadores);

        if (value == '') {
        	self.listarTodos;
        	mostrarMarcadores(marcadores);
        }

        lugaresIniciais.forEach(function(lugarItem){
            if (lugarItem.nome.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                    self.lugarLista.push( new Lugar(lugarItem) );
                    marcadores[lugarItem.id].setMap(map)
            } 
        });
      		
    };

    this.pesquisa.subscribe(self.pesquisar);
}

ko.applyBindings(new ViewModel());


