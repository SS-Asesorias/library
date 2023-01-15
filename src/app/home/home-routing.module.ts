import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './pages/add-book/add-book.component';

const routes: Routes = [
  { path: '', redirectTo: 'add-book', pathMatch: 'full' },
  {
    path: 'add-book',
    component: AddBookComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
