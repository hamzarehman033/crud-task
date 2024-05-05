import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'list', pathMatch: 'full'},
  { path: 'list', loadChildren: () => import('./pages/items/items.module').then(m => m.ItemsModule) },
  { path: 'list/:id', loadChildren: () => import('./pages/items/items.module').then(m => m.ItemsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
