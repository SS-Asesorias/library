import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.scss'],
})
export class EditBookComponent implements OnInit {
  bookId: Number | undefined = undefined;

  constructor(private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.bookId = Number(routeParams.get('bookId'));
  }

  ngOnInit() {}
}
