import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SearchHomeComponent} from './search-home.component';
import {SearchHomeRoutingModule} from './search-home-routing.module';


@NgModule({
  declarations: [SearchHomeComponent],
  imports: [
    CommonModule,
    SearchHomeRoutingModule
  ]
})
export class SearchHomeModule {
}
