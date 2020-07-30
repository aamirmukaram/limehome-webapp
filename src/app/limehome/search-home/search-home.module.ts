import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchHomeComponent} from './search-home.component';
import {SearchHomeRoutingModule} from './search-home-routing.module';
import {HereMapModule} from '../../shared/here-map/here-map.module';
import { HomeCardComponent } from './home-card/home-card.component';


@NgModule({
  declarations: [SearchHomeComponent, HomeCardComponent],
  imports: [
    CommonModule,
    SearchHomeRoutingModule,
    HereMapModule
  ]
})
export class SearchHomeModule {
}
