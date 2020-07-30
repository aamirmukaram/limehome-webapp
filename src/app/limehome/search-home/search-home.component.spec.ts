import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchHomeComponent} from './search-home.component';
import {DebugElement} from '@angular/core';
import {HereMapMockComponent} from '../../shared/here-map/here-map-mock.component';

import {Home} from './home';
import {HomeCardComponent} from './home-card/home-card.component';
import createSpyObj = jasmine.createSpyObj;

export const mockHomes: Home[] = [
  {
    id: 1,
    name: 'Berlin Tauentzienstrasse',
    location: '2.4 KM from the city center',
    price: 98,
    currency: 'GBP',
    imageUrl: 'https://limehome.imgix.net/properties/121/82d6c04b-3b03-4e56-8f25-3ae79bbee765.jpg',
    geolocation: {lat: 1, lng: 2}
  }
];


describe('SearchHomeComponent', () => {
  let fixture: ComponentFixture<SearchHomeComponent>;
  let component: SearchHomeComponent;
  let debugElement: DebugElement;
  let nativeElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SearchHomeComponent,
        HereMapMockComponent,
        HomeCardComponent
      ],
    }).compileComponents();
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(SearchHomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    nativeElement = debugElement.nativeElement;
    fixture.detectChanges();
  }));

  afterEach(() => {
    fixture = null;
    component = null;
    debugElement = null;
    nativeElement = null;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('geoLocations', () => {
    it('should map homes to geoLocations', () => {
      component.homes = mockHomes;

      expect(component.geoLocations[0].lat).toBe(1);
      expect(component.geoLocations[0].lng).toBe(2);
    });
  });

  describe('markerSelected', () => {
    it('should should call scrollIntoView of the respective component', () => {
      component.homes = mockHomes;
      const cardToFocus = createSpyObj('cardToFocus', ['scrollIntoView']);
      spyOn(component.homeCards, 'find').and.returnValue(cardToFocus);

      component.markerSelected({lat: 1, lng: 2});

      expect(cardToFocus.scrollIntoView).toHaveBeenCalled();
    });
  });
});
