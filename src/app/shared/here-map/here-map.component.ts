import {AfterViewInit, Component, ElementRef, Input, Renderer2, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

declare var H: any;

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
    this.initMap();
    this.addMarker();
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
        zoom: 4,
        center: {lng: 13.4, lat: 52.51},
        pixelRatio: window.devicePixelRatio || 1
      });
    this.mapRef.addObject(this.globalGroup);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.mapRef));
    const ui = H.ui.UI.createDefault(this.mapRef, defaultLayers);
  }

  private createMarkerElement(): HTMLDivElement {
    const el = document.createElement('div');
    el.style.width = '32px';
    el.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.04 512.04">
    <path d="M496.47 353.37L298.69 155.6V67.9a96.8 96.8 0 00-9.13-40.82l-4.5-8.53C279.74 7.1 268.63 0 256.02 0s-23.72 7.1-28.8 18.07l-4.97 9.5a96.37 96.37 0 00-8.9 40.33v87.7L15.64 353.32a52.94 52.94 0 00-15.62 37.7v25c0 3.9 2.13 7.49 5.55 9.35a10.6 10.6 0 0010.88-.39l201.04-128.83c1.99 32.28 4.67 59.22 7.96 92.01l3.4 33.6-74.7 49.34c-3 2.01-4.8 5.34-4.8 8.92v21.33a10.7 10.7 0 0012.97 10.44l93.7-20.85 93.7 20.85a10.57 10.57 0 008.98-2.1 10.78 10.78 0 003.99-8.34v-21.33c0-3.58-1.8-6.93-4.8-8.9l-74.7-49.27 3.4-33.71c3.29-32.75 5.97-59.67 7.96-91.95L495.59 425a10.61 10.61 0 0010.86.37 10.61 10.61 0 005.57-9.34v-25a52.88 52.88 0 00-15.55-37.65z"/>
  </svg>
  `;
    return el;
  }

  private addMarker(): void {
    const el = this.createMarkerElement();
    const icon = new H.map.DomIcon(el);
    const marker = new H.map.DomMarker({lng: 13.4, lat: 52.51}, {icon});
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

}
