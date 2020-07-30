import {AfterViewInit, Component, ElementRef, Input, Output, Renderer2, ViewChild, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {GeoLocation} from '../../limehome/search-home/home';

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements AfterViewInit {
  private mapRef: any;
  private globalGroup = new H.map.Group();
  private resizeEventSubject$ = new Subject();
  private resizeEvent$ = this.resizeEventSubject$.asObservable().pipe(debounceTime(500));
  private lastSelectedMarker;

  @Output()
  markerSelected = new EventEmitter<GeoLocation>();

  @Input()
  markers: GeoLocation[] = [];

  @ViewChild('activeMarker', {read: ElementRef}) activeMarker: ElementRef;
  private activeMarkerImg: HTMLImageElement;

  @ViewChild('defaultMarker', {read: ElementRef}) defaultMarker: ElementRef;
  private defaultMarkerImg: HTMLImageElement;

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

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.activeMarkerImg = (this.activeMarker.nativeElement as Element).querySelector('img');
    this.defaultMarkerImg = (this.defaultMarker.nativeElement as Element).querySelector('img');

    this.initMap();
    this.markers.forEach((m: GeoLocation) => this.addMarker(m.lng, m.lat));
    this.listenResize();

    this.resizeEvent$.subscribe(() => {
      this.updateMap();
    });
  }

  private initMap(): void {
    const platform = new H.service.Platform({apikey: this.apikey});

    const defaultLayers = platform.createDefaultLayers();

    this.mapRef = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map, {
        zoom: 12,
        center: {lng: this.markers[0].lng, lat: this.markers[0].lat},
        pixelRatio: window.devicePixelRatio || 1
      });
    this.mapRef.addObject(this.globalGroup);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.mapRef));
    const ui = H.ui.UI.createDefault(this.mapRef, defaultLayers);
  }

  private addMarker(lng: number, lat: number): void {
    const icon = new H.map.DomIcon(this.defaultMarkerImg);
    const marker = new H.map.DomMarker({lng, lat}, {icon});
    marker.addEventListener('tap', (evt) => {
      this.onClickMarker(evt);
    });
    this.globalGroup.addObject(marker);
  }

  private listenResize(): void {
    this.renderer.listen('window', 'resize', () => {
      this.resizeEventSubject$.next();
    });
  }

  private updateMap(): void {
    this.mapRef.getViewPort().resize();
  }

  private onClickMarker(evt: any): void {
    const marker = evt.target;
    this.markerSelected.emit(marker.getGeometry());

    const activeIcon = new H.map.DomIcon(this.activeMarkerImg);
    const defaultIcon = new H.map.DomIcon(this.defaultMarkerImg);
    if (this.lastSelectedMarker) {
      this.lastSelectedMarker.setIcon(defaultIcon);
    }
    marker.setIcon(activeIcon);
    this.lastSelectedMarker = marker;
  }
}
