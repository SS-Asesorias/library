import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { BooksService } from 'src/app/core/services/books.service';
import { AuthorService } from '../../../core/services/author.service';
import { Book } from '../../../core/models/Book';
import { Author } from '../../../core/models/Author';
import { MatTableDataSource } from '@angular/material/table';
import { SelectedAuthor } from '../../../shared/models/selectedAuthor';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit, AfterViewInit {
  @Input() bookId: number | undefined = undefined;
  @Input() pageName: string = '';

  addBookForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    editorial: new FormControl(''),
    edition: new FormControl(''),
    condition: new FormControl('1', [Validators.required]),
    position: new FormControl('', this.permittedValueValidator()),
    notes: new FormControl(''),
    author: new FormGroup({
      authorName: new FormControl(''),
      lastName: new FormControl(''),
    }),
    authorOptions: new FormControl<SelectedAuthor[]>(
      [],
      this.authorValidator()
    ),
  });

  columnsToDisplay = ['name', 'lname', 'checked'];
  dataSource = new MatTableDataSource<SelectedAuthor>();
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private bookService: BooksService,
    private authorService: AuthorService,
    private _snackBar: MatSnackBar
  ) {
    console.log(`Passed book id: ${this.bookId}`);
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      if (
        data.name?.toLowerCase().includes(filter) ||
        data.lname?.toLowerCase().includes(filter) ||
        data.checked
      ) {
        return true;
      }
      return false;
    };
  }

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.loadAuthors();
    // todo: use bookId (if not undefined) to retrieve the book data.
  }

  loadAuthors() {
    // query database for existing authors and return them in array form
    this.authorService.getAuthors().then((_authors: Author[]) => {
      this.addBookForm.patchValue({
        authorOptions: _authors.map(
          (x) => new SelectedAuthor(x.id, x.name, x.lname, false)
        ),
      });
      this.dataSource.data = this.addBookForm.value.authorOptions || [];
    });
  }

  rowClicked(author: SelectedAuthor) {
    author.checked = !author.checked;
    this.addBookForm.controls.authorOptions.updateValueAndValidity();
  }

  saveBook() {
    const { title, editorial, edition, condition, position, notes } =
      this.addBookForm.value;

    const book = new Book(
      undefined,
      title || '',
      editorial || '',
      edition || '',
      parseInt(<string>condition),
      position || '',
      notes || ''
    );

    const authors = this.addBookForm.value.authorOptions
      ?.filter((e) => e.checked)
      .map((e) => new Author(e.id, e.name, e.lname));

    this.bookService.registerBook(book, authors || []).then(
      () => {
        this.loadAuthors();
        this.openSnackBar('Book saved successfully' + title);
      },
      (error) => {
        this.openSnackBar('Error when saving the book');
        console.error(error);
      }
    );
  }

  saveAuthor() {
    const authorName = this.addBookForm.value.author?.authorName;
    const lastName = this.addBookForm.value.author?.lastName;

    let author: SelectedAuthor = new SelectedAuthor(
      undefined,
      authorName || '',
      lastName || '',
      true
    );
    this.addBookForm.value.authorOptions?.push(author);
    this.dataSource.data = this.addBookForm.value.authorOptions || [];
    this.addBookForm.controls.authorOptions.updateValueAndValidity();
  }

  applyFilter(event: any) {
    let filterValue = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Dismiss');
  }

  parseInt(value: string | null | undefined) {
    return parseInt(<string>value);
  }

  authorValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      console.log(control.value);
      const permitted = control.value.some(
        (element: SelectedAuthor) => element.checked
      );
      console.log(permitted);
      return permitted ? null : { error: true };
    };
  }

  permittedValueValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nameRe: RegExp = /^([1-5][a-eA-E])?$/i;
      const permitted = nameRe.test(control.value);
      return permitted ? null : { forbiddenName: { value: control.value } };
    };
  }

  clearForm() {
    this.addBookForm.reset({
      title: '',
      editorial: '',
      edition: '',
      condition: '1',
      position: '',
      notes: '',
      author: {
        authorName: '',
        lastName: '',
      },
      authorOptions: this.addBookForm.value.authorOptions?.map((value) => {
        value.checked = false;
        return value;
      }),
    });
  }
}
