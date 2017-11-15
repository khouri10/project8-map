var map;
      function initMap() {
        // Constructor creates a new map - only center and zoom are required.
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -23.538047, lng: -46.613912},
          zoom: 15
        });
      }