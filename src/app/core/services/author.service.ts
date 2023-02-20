import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/tauri';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  constructor() {}

  async getAuthors(): Promise<Author[]> {
    let authors: Author[] = [];
    await invoke<Author[]>('get_all_authors_command').then(
      (_authors: Author[]) => {
        authors = _authors;
      }
    );
    return authors;
  }

  async getAuthorsByBook(id: number): Promise<Author[]> {
    let authors: Author[] = [];
    await invoke<Author[]>('get_authors_by_book_command', {
      id: id,
    }).then((_authors: Author[]) => {
      authors = _authors;
    });
    return authors;
  }

  /*
          async getAuthorsByBook(id: number): Promise<Author[]> {
            return await invoke<Author[]>('get_authors_by_book_command', { id: id });
          }
         */
}
