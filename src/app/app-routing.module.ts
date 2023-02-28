import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddBookComponent } from './home/pages/add-book/add-book.component';
import { EditBookComponent } from './home/pages/edit-book/edit-book.component';
import { InventoryComponent } from './home/pages/inventory/inventory.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'add-book', pathMatch: 'full' },
      {
        path: 'add-book',
        component: AddBookComponent,
      },
      {
        path: 'edit-book/:bookId',
        component: EditBookComponent,
      },
      {
        path: 'inventory',
        component: InventoryComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
