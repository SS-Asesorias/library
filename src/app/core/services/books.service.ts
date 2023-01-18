import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { Book } from '../models/Book';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  async registerBook(book: Book, authors: Author[]) {
    const newBook = {
      title: book.title,
      editorial: book.editorial,
      edition: book.edition,
      condition: book.condition,
      position: book.position,
      authors: authors,
    };

    await invoke('register_book_command', { newBook: newBook });
  }
}
