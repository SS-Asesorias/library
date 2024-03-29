import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { AddBookComponent } from './pages/add-book/add-book.component';
import { HomeComponent } from './home.component';
import { InventoryComponent } from './pages/inventory/inventory.component';
import { BookFormComponent } from '../shared/components/book-form/book-form.component';

// Angular Material components
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditBookComponent } from './pages/edit-book/edit-book.component';
import { MatExpansionModule } from '@angular/material/expansion';
import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    AddBookComponent,
    HomeComponent,
    InventoryComponent,
    BookFormComponent,
    EditBookComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatButtonToggleModule,
    MatIconModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatExpansionModule,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
    ScrollingModule,
  ],
  providers: [MatSnackBar],
})
export class HomeModule {}
