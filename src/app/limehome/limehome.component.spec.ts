import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LimehomeComponent } from './limehome.component';

describe('LimehomeComponent', () => {
  let component: LimehomeComponent;
  let fixture: ComponentFixture<LimehomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LimehomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LimehomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
