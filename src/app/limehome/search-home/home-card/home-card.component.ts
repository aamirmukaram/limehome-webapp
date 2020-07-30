import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {Home} from '../home';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.scss']
})
export class HomeCardComponent implements OnInit {
  ele: Element = this.eleRef.nativeElement;

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
  }

}
