import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {LimehomeComponent} from './limehome.component';
import {DebugElement} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {RouterOutlet} from '@angular/router';

describe('LimehomeComponent', () => {
  let fixture: ComponentFixture<LimehomeComponent>;
  let component: LimehomeComponent;
  let debugElement: DebugElement;
  let nativeElement: HTMLDivElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        LimehomeComponent
      ],
    }).compileComponents();
  }));

  beforeEach((() => {
    fixture = TestBed.createComponent(LimehomeComponent);
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

  it('should have router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(routerOutlet).toBeDefined();
  });
});
