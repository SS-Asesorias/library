import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { HomeComponent } from './home.component';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AddBookComponent, HomeComponent],
  imports: [CommonModule, RouterOutlet],
})
export class HomeModule {}
