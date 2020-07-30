import {AfterViewInit, Component, ElementRef, Input, Output, Renderer2, ViewChild, EventEmitter} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {GeoLocation} from '../../limehome/search-home/home';

const WINDOW_RESIZE_DEBOUNCE = 500;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.scss']
})
export class HereMapComponent implements AfterViewInit {
  /**
   * Map object create by Here Map.
   */
  private mapRef: any;
  /**
   * Group having all the markers.
   */
  private globalGroup = new H.map.Group();
  /**
   * Subject to emit an emit when there is in window resize.
   */
  private resizeEventSubject$ = new Subject();
  private resizeEvent$ = this.resizeEventSubject$.asObservable().pipe(debounceTime(WINDOW_RESIZE_DEBOUNCE));
  /**
   * Saves the lasted selected marker.
   */
  private lastSelectedMarker;
  /**
   * Emits the lat/lng of selected marker.
   */
  @Output()
  markerSelected = new EventEmitter<GeoLocation>();
  /**
   * Markers provided as input to this component.
   */
  @Input()
  markers: GeoLocation[] = [];
  /**
   * Active marker image element reference.
   */
  @ViewChild('activeMarker', {read: ElementRef}) activeMarker: ElementRef;
  /**
   * Active marker image element.
   */
  private activeMarkerImg: HTMLImageElement;
  /**
   * Default marker image element reference.
   */
  @ViewChild('defaultMarker', {read: ElementRef}) defaultMarker: ElementRef;
  /**
   * Default marker image element.
   */
  private defaultMarkerImg: HTMLImageElement;
  /**
   * Reference to element where map will be rendered.
   */
  @ViewChild('map')
  public mapElement: ElementRef;
  /**
   * Api key of the Here Map Service.
   */
  @Input()
  public apikey: string;
  /**
   * Width for the map.
   */
  @Input()
  public width: string;
  /**
   * Height for the map.
   */
  @Input()
  public height: string;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.activeMarkerImg = (this.activeMarker.nativeElement as HTMLImageElement);
    this.defaultMarkerImg = (this.defaultMarker.nativeElement as HTMLImageElement);

    this.initMap();
    /**
     * Adding the markers in the map
     */
    this.markers.forEach((m: GeoLocation) => this.addMarker(m.lng, m.lat));
    /**
     * Listening to windows resize, to re render the map.
     */
    this.listenResize();

    this.resizeEvent$.subscribe(() => {
      this.updateMap();
    });
  }

  private initMap(): void {
    const platform = new H.service.Platform({apikey: this.apikey});

    const defaultLayers = platform.createDefaultLayers();
    /**
     * Hero map initialization
     */
    this.mapRef = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map, {
        zoom: 12,
        center: {lng: this.markers[0].lng, lat: this.markers[0].lat},
        pixelRatio: window.devicePixelRatio || 1
      });
    /**
     * Adding global group for the map where all markers will be added.
     */
    this.mapRef.addObject(this.globalGroup);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.mapRef));
    const ui = H.ui.UI.createDefault(this.mapRef, defaultLayers);
  }

  /**
   * Adds a new marker in map.
   * @param lng The latitude of the marker.
   * @param lat The longitude of the marker.
   */
  private addMarker(lng: number, lat: number): void {
    const icon = new H.map.DomIcon(this.defaultMarkerImg);
    const marker = new H.map.DomMarker({lng, lat}, {icon});
    /**
     * Adding event listener to the marker.
     */
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

  /**
   * Callback function once the marker is clicked.
   * @param evt Event object provided by Here map.
   */
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
