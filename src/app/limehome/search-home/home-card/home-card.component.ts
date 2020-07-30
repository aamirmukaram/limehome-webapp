import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Home} from '../home';
import {BehaviorSubject, timer} from 'rxjs';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {
  ele: Element = this.eleRef.nativeElement;
  private activeClassSubject$ = new BehaviorSubject<string>('');
  activeClass$ = this.activeClassSubject$.asObservable();

  @Input()
  home: Home;

  constructor(private eleRef: ElementRef) {
  }

  ngOnInit(): void {
  }

  scrollIntoView(): void {
    this.ele.scrollIntoView({
      behavior: 'smooth'
    });
    this.activeClassSubject$.next('home-card--active');
    timer(3000).subscribe(() => {
      this.activeClassSubject$.next('');
    });
  }

}
