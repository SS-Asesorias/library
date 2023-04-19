import { Component, Input, OnInit } from '@angular/core';
import { BooksService } from 'src/app/core/services/books.service';
import { AuthorService } from '../../../core/services/author.service';
import { Book } from '../../../core/models/Book';
import { Author } from '../../../core/models/Author';
import { MatTableDataSource } from '@angular/material/table';
import { SelectedAuthor } from '../../models/selectedAuthor';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss'],
})
export class BookFormComponent implements OnInit {
  @Input() bookId: number | undefined = undefined;
  @Input() pageName: string = '';

  bookForm = new FormGroup({
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

  constructor(
    private bookService: BooksService,
    private authorService: AuthorService,
    private _snackBar: MatSnackBar
  ) {
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

  ngOnInit() {
    this.loadAuthors();
    if (this.bookId !== undefined) {
      console.log(`Passed book id: ${this.bookId}`);
      this.bookService.getBook(this.bookId).then(
        (result: Book) => {
          this.bookForm.patchValue({
            title: result.title,
            condition: result.condition.toString(),
            position: result.position,
            edition: result.edition,
            editorial: result.editorial,
            notes: result.notes,
          });
        },
        (error: any) => {
          console.error(error);
        }
      );
      // query database for authors of this book and set "selected" to true
      this.authorService
        .getAuthorsByBook(this.bookId)
        .then((_authors: Author[]) => {
          this.bookForm.patchValue({
            authorOptions: this.bookForm.value.authorOptions?.map(
              (x) =>
                new SelectedAuthor(
                  x.id,
                  x.name,
                  x.lname,
                  _authors.findIndex((value) => value.id === x.id) !== -1
                )
            ),
          });
          this.dataSource.data = this.bookForm.value.authorOptions || [];
        });
    }
  }

  loadAuthors() {
    // query database for existing authors and return them in array form
    this.authorService.getAuthors().then((_authors: Author[]) => {
      this.bookForm.patchValue({
        authorOptions: _authors.map(
          (x) => new SelectedAuthor(x.id, x.name, x.lname, false)
        ),
      });
      this.dataSource.data = this.bookForm.value.authorOptions || [];
    });
  }

  rowClicked(author: SelectedAuthor) {
    author.checked = !author.checked;
    this.bookForm.controls.authorOptions.updateValueAndValidity();
  }

  saveBook() {
    if (this.bookId !== undefined) {
      this.saveChanges();
    } else {
      this.saveNewBook();
    }
  }

  saveChanges() {
    const {
      title,
      editorial,
      edition,
      condition,
      position,
      notes
    } = this.bookForm.value;

    const book = new Book(
        this.bookId,
        title || '',
        editorial || '',
        edition || '',
        parseInt(<string>condition),
        position || '',
        notes || '',
    );

    const authors = this.bookForm.value.authorOptions
        ?.filter((e) => e.checked)
        .map((e) => new Author(e.id, e.name, e.lname));

    this.bookService.updateBook(book, authors || []).then(
        () => {
          this.loadAuthors();
          this.openSnackBar('Book saved successfully: ' + title);
        },
        (error) => {
          this.openSnackBar('Error when saving the book');
          console.error(error);
        }
    );
  }

  saveNewBook() {
    const {
      title,
      editorial,
      edition,
      condition,
      position,
      notes
    } = this.bookForm.value;

    const book = new Book(
      undefined,
      title || '',
      editorial || '',
      edition || '',
      parseInt(<string>condition),
      position || '',
      notes || ''
    );

    const authors = this.bookForm.value.authorOptions
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
    const authorName = this.bookForm.value.author?.authorName;
    const lastName = this.bookForm.value.author?.lastName;

    let author: SelectedAuthor = new SelectedAuthor(
      undefined,
      authorName || '',
      lastName || '',
      true
    );
    this.bookForm.value.authorOptions?.push(author);
    this.dataSource.data = this.bookForm.value.authorOptions || [];
    this.bookForm.controls.authorOptions.updateValueAndValidity();
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
      const permitted = control.value.some(
        (element: SelectedAuthor) => element.checked
      );
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
    this.bookForm.reset({
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
      authorOptions: this.bookForm.value.authorOptions?.map((value) => {
        value.checked = false;
        return value;
      }),
    });
  }
}
