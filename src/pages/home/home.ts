import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Geolocation} from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  traffic: any;
  marker: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadTraffic();
  }




  loadTraffic() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };


      this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

      this.traffic = new google.maps.TrafficLayer();
      this.marker = new google.maps.Marker({
        map: this.map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: latLng
      });
      this.marker.addListener('click', this.toggleBounce);
      this.traffic.setMap(this.map);

    }, (err) => {
      console.log(err);
    });

  }

  toggleBounce() {
    if (this.marker.getAnimation() !== null) {
      this.marker.setAnimation(null);
    } else {
      this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }
  }

  centerMarker() {
    this.geolocation.getCurrentPosition().then((position) => {
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      this.map.setCenter(latLng);

    }, (err) => {
console.log(err)
    });

  }


}
