import {Component, ElementRef, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {GeoLocation} from '../../limehome/search-home/home';

@Component({
  selector: 'app-here-map',
  template: '',
})
export class HereMapMockComponent {
  @Output()
  markerSelected = new EventEmitter<GeoLocation>();

  @Input()
  markers: GeoLocation[] = [];

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
}
