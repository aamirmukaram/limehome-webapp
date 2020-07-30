import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LimehomeComponent} from './limehome.component';


const routes: Routes = [
  {
    path: '', component: LimehomeComponent, children: [
      {path: '', pathMatch: 'full', redirectTo: '/search'},
      {path: 'search', loadChildren: () => import('./search-home/search-home.module').then(mod => mod.SearchHomeModule)},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LimehomeRoutingModule {
}
