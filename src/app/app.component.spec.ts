import {TestBed, async, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {LayoutModule} from './layout/layout.module';
import {HeaderComponent} from './layout/header/header.component';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {RouterOutlet} from '@angular/router';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let debugElement: DebugElement;
  let nativeElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(AppComponent);
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

  it(`should have 'app header'`, () => {
    const appHeader = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(appHeader).toBeDefined();
  });

  it('should have router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeDefined();
  });
});
