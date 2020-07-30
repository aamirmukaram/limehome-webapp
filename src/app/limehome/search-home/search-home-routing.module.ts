import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchHomeComponent} from './search-home.component';


const routes: Routes = [
  {path: '', component: SearchHomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchHomeRoutingModule {
}
