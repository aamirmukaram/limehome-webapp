import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements AfterViewInit {
  @ViewChild('map')
  public mapElement: ElementRef;

  @Input()
  public apikey: any;

  @Input()
  public lat: any;

  @Input()
  public lng: any;

  @Input()
  public width: any;

  @Input()
  public height: any;

  constructor() {
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const platform = new H.service.Platform({
      apikey: this.apikey
    });
    const maptypes = platform.createDefaultLayers();
    const map = new H.Map(
      this.mapElement.nativeElement,
      maptypes.vector.normal.map,
      {
        zoom: 10,
        center: {lng: 13.4, lat: 52.51}
      }
    );
  }

}
