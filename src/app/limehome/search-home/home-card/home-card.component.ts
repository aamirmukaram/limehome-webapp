import {Component, ElementRef, Input} from '@angular/core';
import {Home} from '../home';
import {BehaviorSubject, timer} from 'rxjs';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent {
  ele: Element = this.eleRef.nativeElement;
  /**
   * Subject to add class on card container
   */
  private activeClassSubject$ = new BehaviorSubject<string>('');
  activeClass$ = this.activeClassSubject$.asObservable();

  @Input()
  home: Home;

  constructor(private eleRef: ElementRef) {
  }

  /**
   * Scroll the current card into view
   */
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
