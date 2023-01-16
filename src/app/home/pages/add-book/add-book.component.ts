import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss'],
})
export class AddBookComponent {
  @Input() title: string = '';
  @Input() editorial: string = '';
  @Input() edition: string = '';

  @Input() condition: number = 0;
  @Input() position: string = '';

  logValue(value: string) {
    console.log(value);
  }

  addAuthor() {
    throw Error('Not implemented');
  }
}
