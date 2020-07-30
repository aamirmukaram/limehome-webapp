import {Component, ElementRef, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-search-home',
  templateUrl: './search-home.component.html',
  styleUrls: ['./search-home.component.scss']
})
export class SearchHomeComponent implements OnInit {
  public hereMapApiKey = environment.hereMaps.apiKey;
  public hostElement: Element = this.element.nativeElement;

  constructor(private element: ElementRef) {
  }

  ngOnInit(): void {
  }

}
