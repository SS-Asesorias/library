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
      notes: book.notes,
      authors: authors,
    };

    await invoke('register_book_command', { newBook: newBook });
  }

  async getBooks(): Promise<Book[]> {
    return await invoke<Book[]>('get_books_command');
  }

  async getBook(id: number): Promise<Book> {
    return await invoke<Book>('get_book_command', { id: id });
  }

  async updateBook(book: Book, authors: Author[]): Promise<unknown> {
    return await invoke('update_book_command', {
      bookId: book.id,
      modifiedBook: { ...book, authors },
    });
  }
}
