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
export class SearchHomeComponent {
  /**
   * QueryList of all HomeCardComponents in view
   */
  @ViewChildren(HomeCardComponent)
  homeCards: QueryList<HomeCardComponent>;
  /**
   * Api key for here maps
   */
  public hereMapApiKey: string = environment.hereMaps.apiKey;
  public hostElement: Element = this.element.nativeElement;
  /**
   * Mocked home list
   */
  public homes: Home[] = mockHomes;

  constructor(private element: ElementRef) {
  }

  /**
   * Maps the homes object list to geolocation list
   */
  get geoLocations(): GeoLocation[] {
    return this.homes.map((h: Home) => h.geolocation);
  }

  /**
   * Finds and move active card into view
   * @param marker marker that is active.
   */
  markerSelected(marker: GeoLocation): void {
    const cardToFocus: HomeCardComponent = this.homeCards
      .find((hc: HomeCardComponent) => hc.home.geolocation.lat === marker.lat && hc.home.geolocation.lng === marker.lng);
    cardToFocus.scrollIntoView();
  }
}
