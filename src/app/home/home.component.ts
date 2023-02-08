import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  pages = [
    { name: 'Add book', link: 'add-book' },
    { name: 'Inventory', link: 'inventory' },
  ];
}
