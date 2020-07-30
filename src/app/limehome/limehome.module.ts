import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LimehomeComponent} from './limehome.component';
import {SearchHomeModule} from './search-home/search-home.module';
import {LimehomeRoutingModule} from './limehome-routing.module';


@NgModule({
  declarations: [LimehomeComponent],
  imports: [
    CommonModule,
    LimehomeRoutingModule,
    SearchHomeModule
  ]
})
export class LimehomeModule {
}
