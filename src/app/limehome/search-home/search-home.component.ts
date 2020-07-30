import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {environment} from '../../../environments/environment';
import {GeoLocation, Home} from './home';
import {mockHomes} from './mock-homes';
import {HomeCardComponent} from './home-card/home-card.component';


@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit {
  @ViewChildren(HomeCardComponent)
  homeCards: QueryList<HomeCardComponent>;

  public hereMapApiKey: string = environment.hereMaps.apiKey;
  public hostElement: Element = this.element.nativeElement;
  public homes: Home[] = mockHomes;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
  }

  get geoLocations(): GeoLocation[] {
    return this.homes.map((h: Home) => h.geolocation);
  }

  markerSelected(marker: GeoLocation): void {
    const cardToFocus: HomeCardComponent = this.homeCards
      .find((hc: HomeCardComponent) => hc.home.geolocation.lat === marker.lat && hc.home.geolocation.lng === marker.lng);
    cardToFocus.scrollIntoView();
  }
}
