import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBookComponent } from './pages/add-book/add-book.component';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

// Angular Material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AddBookComponent, HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
})
export class HomeModule {}
