import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

import { HomeModule } from './home/home.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HomeModule,
    MatButtonToggleModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  providers: [],
})
export class AppModule {}
