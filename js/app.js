//lista inicial dos lugares de interesse
var lugaresIniciais = [
{
    nome: 'M10',
    posição: {lat: -23.532581, lng: -46.614906},
    id: 1,
    marcador: [],
    visivel: true,
    destacado: false
},
{
    nome: 'Gajang',
    posição: {lat: -23.535557, lng: -46.613252},
    id: 2,
    marcador: [],
    visivel: true,
    destacado: false
},
{
    nome: 'Nikimba',
    posição: {lat: -23.534199, lng: -46.612641},
    id: 3,
    marcador: [],
    visivel: true,
    destacado: false
},
{
    nome: 'Aishty',
    posição: {lat: -23.536217, lng: -46.612821},
    id: 4,
    marcador: [],
    visivel: true,
    destacado: false
},
{
    nome: 'Hotel Family',
    posição: {lat: -23.539749, lng: -46.619614},
    id: 5,
    marcador: [],
    visivel: true,
    destacado: false
}
];

var map;

var marcadorPadrao;

var marcadorDestacado;

var marcadorSelecionado;

var largeInfowindow;

//função para fazer o marcador de acordo com a cor e tamanho solicitados (crédito aula do google maps api)
function makeMarkerIcon(markerColor, markerWidth, markerHeight) {
        var markerImage = new google.maps.MarkerImage(
          'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
          '|40|_|%E2%80%A2',
          new google.maps.Size(markerWidth, markerHeight),
          new google.maps.Point(0, 0),
          new google.maps.Point(10, 34),
          new google.maps.Size(markerWidth, markerHeight));
        return markerImage;
      }

//função para fazer aparecer o info window (crédito aula do google maps api)      
function populateInfoWindow(marker, infowindow) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
          infowindow.marker = marker;
          infowindow.setContent('<div>' + marker.title + '</div>');
          infowindow.open(map, marker);
          // Make sure the marker property is cleared if the infowindow is closed.
          infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
          });
        }
      }


var initMap = function() {
	
	//inicia o mapa na tela inteira
	map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -23.538047, lng: -46.613912},
    	zoom: 15,
    	mapTypeControl: false
    });

	//criar 3 tipos de marcadores com cores e/ou tamanhos diferentes
	marcadorPadrao = makeMarkerIcon('F44336', 21, 34);
	marcadorDestacado = makeMarkerIcon('FFC107', 21, 34);
    marcadorSelecionado = makeMarkerIcon('4CAF50', 25, 41);

    largeInfowindow = new google.maps.InfoWindow();
    
    //coloca marcadores dos lugares iniciais no mapa
    for (var i = 0; i < lugaresIniciais.length; i++) {
    	var marcador = new google.maps.Marker({
          position: lugaresIniciais[i].posição,
          map: map,
          title: lugaresIniciais[i].nome,
          animation: google.maps.Animation.DROP,
          icon: marcadorPadrao
        });
        
        //olocaa infowindow em cada marcador ao ser clicado e destaca o icone
        marcador.addListener('click', function() {
            
            this.setIcon(marcadorSelecionado);
            populateInfoWindow(this, largeInfowindow);
             
        });
  
    	lugaresIniciais[i].marcador.push(marcador);

        /*
         marcador.addListener('mouseover', function() {
            this.setIcon(marcadorDestacado);
          });
          marcador.addListener('mouseout', function() {
            this.setIcon(marcadorPadrao);
          });
*/

    }
}

//construtor para lista de lugares
var Lugar = function(data){
    this.nome = ko.observable(data.nome);
    this.posição = ko.observable(data.posição);
    this.id = ko.observable(data.id);
    this.marcador = ko.observableArray(data.marcador);
    this.visivel = ko.observable(data.visivel);
    this.destacado = ko.observable(data.destacado);

}

//construtor para lista de restaurantes
var Restaurante = function(data){
    this.nome = ko.observable(data.name);
    this.lat = ko.observable(data.location.lat);
    this.lng = ko.observable(data.location.lng);
    this.endereço = ko.observable(data.location.formattedAddress[0]);
    this.telefone = ko.observable(data.contact.formattedPhone);
}

var ViewModel = function() {
    var self = this;

    //cria uma array observavel vazia para ser preenchida com os lugares iniciais
    this.lugarLista = ko.observableArray([]);
  	
  	//array para guardar a lista de restaurantes próximos
  	this.restaurantes = ko.observableArray([]);

    //coloca todos os dados iniciais na array osbservavel
    lugaresIniciais.forEach(function(lugarItem){
        self.lugarLista.push( new Lugar(lugarItem) );
    });
    
    //função para destacar o lugar selecionado
    this.selecionarLugar = function(lugar){
    	//deixa todos marcadores com aparencia padrão
        for (var i = 0; i < self.lugarLista().length; i++) {
           self.lugarLista()[i].marcador()[0].setIcon(marcadorPadrao);
           self.lugarLista()[i].destacado(false);
        }
        //destaca o marcador selecionado
        lugar.marcador()[0].setIcon(marcadorSelecionado);
        lugar.destacado(true);
       
       	//
       	var latitude = lugar.posição().lat;
	    var longitude = lugar.posição().lng;
	    var foursquareURL = 'https://api.foursquare.com/v2/venues/search?ll=' + latitude + ',' + longitude +
	        '&client_id=RCU1XOXGZMYWAK0NX2YN2BXWCFH1V2VZSM4VB2GFKNJ1CIJT&client_secret=0VLNN01DE2OSEUYPXLYFJLA4Y0GVQDTVGXUPZRPR2D1JFZZS&v=20160118&query=restaurante&limit=5'
	    
	    //limpa lista de restaurantees
	    self.restaurantes.removeAll() 
	    //solicitação da API do foursquare de pesquisa dos 5 restaurantes mais próximos do lugar apontado
	    $.getJSON(foursquareURL, function( data ) {
	        for (var i = 0; i < data.response.venues.length; i++) {
	        	var response = data.response.venues[i];
	        	self.restaurantes.push(new Restaurante(response));
	        }        

	    }).fail(function(){
	        alert("A API do Foursquare não foi carregada corretamente. Favor recarregar a página");
	    });

    }
    

    
    //cria um observavel para linkar com o evento da pesquisa    
    this.pesquisa = ko.observable(''); 

    //função filtra os lugares e marcadores de acordo com a pesquisa
    this.pesquisar = function(value) {
    	
    	//se a pesquisa estiver vazia mostra todos os lugares na lista e no mapa
        if (value == '') {
        	for (var i = 0; i < self.lugarLista().length; i++) {
        		self.lugarLista()[i].marcador()[0].setMap(map);
        		self.lugarLista()[i].visivel(true);
        	}
        }

        //se o item corresponde à pesquisa é mostrado, caso o contrário esconde o marcador no mapa e na lista 
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
    
    

    

    this.atualizarRestaurantes = function(lugar){
	    
	}



}

ko.applyBindings(new ViewModel());




