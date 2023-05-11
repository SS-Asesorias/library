pub extern crate diesel;

use std::usize;

use diesel::sqlite::SqliteConnection;
use diesel::{Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use dotenvy::dotenv;

use crate::models::authors::NewAuthor;
use crate::models::{
    authors::{Author, _NewAuthor},
    authors_books::AuthorsBooks,
    books::{Book, NewBook, _NewBook},
};

pub mod models;
pub mod schema;

pub fn establish_connection(db_url: &str) -> SqliteConnection {
    dotenv().ok();

    SqliteConnection::establish(db_url).unwrap_or_else(|_| panic!("Error connecting to {}", db_url))
}

pub fn register_book(conn: &mut SqliteConnection, book: &NewBook) {
    let insertable_book = _NewBook {
        title: book.title.as_str(),
        editorial: book.editorial.as_str(),
        edition: book.edition.as_str(),
        condition: book.condition,
        notes: book.notes.as_str(),
        position: book.position.as_str(),
    };

    let inserted_book = create_book(conn, &insertable_book);

    save_all_authors(conn, inserted_book.id, &book.authors);
}

pub fn get_books(conn: &mut SqliteConnection) -> Vec<Book> {
    use self::schema::books::dsl::*;

    books.load::<Book>(conn).expect("Error loading books")
}

pub fn get_book_by_id(conn: &mut SqliteConnection, book_id: i32) -> Book {
    use self::schema::books::dsl::*;

    books
        .filter(id.eq(book_id))
        .first::<Book>(conn)
        .expect("Error loading books")
}

pub fn get_authors(conn: &mut SqliteConnection) -> Vec<Author> {
    use self::schema::authors::dsl::*;

    authors.load::<Author>(conn).expect("Error loading authors")
}

pub fn get_authors_by_book(conn: &mut SqliteConnection, book: i32) -> Vec<Author> {
    use self::schema::authors::dsl::*;
    use self::schema::authors_books::dsl::*;

    let authors_id = authors_books.select(author_id).filter(book_id.eq(book));

    authors
        .filter(id.eq_any(authors_id))
        .load::<Author>(conn)
        .expect(format!("Error loading authors of book: {}", book).as_str())
}

pub fn update_book(conn: &mut SqliteConnection, book_id: i32, modified_book: NewBook) {
    use self::schema::books::dsl::*;

    let book = Book {
        id: book_id,
        title: modified_book.title,
        editorial: modified_book.editorial,
        edition: modified_book.edition,
        condition: modified_book.condition,
        notes: modified_book.notes,
        position: modified_book.position,
    };

    diesel::update(books.filter(id.eq(book_id)))
        .set(book)
        .execute(conn)
        .expect(format!("Error updating book: {}", book_id).as_str());

    delete_authors_from_book(conn, book_id);

    let authors: Vec<NewAuthor> = modified_book.authors;
    save_all_authors(conn, book_id, &authors);
}

fn save_all_authors(conn: &mut SqliteConnection, book_id: i32, authors: &Vec<NewAuthor>) {
    for author in authors {
        match author.id {
            None => {
                let insertable_author = _NewAuthor {
                    name: author.name.as_str(),
                    lname: author.lname.as_str(),
                };

                let inserted_author = create_author(conn, &insertable_author);

                create_author_book(conn, inserted_author.id, book_id);
            }
            Some(value) => {
                create_author_book(conn, value, book_id);
            }
        }
    }
}

fn delete_authors_from_book(conn: &mut SqliteConnection, from_book: i32) {
    use self::schema::authors_books::dsl::*;

    diesel::delete(authors_books.filter(book_id.eq(from_book)))
        .execute(conn)
        .expect(format!("Error clearing authors for book: {}", from_book).as_str());
}

fn create_book(conn: &mut SqliteConnection, new_book: &_NewBook) -> Book {
    use crate::schema::books;

    return diesel::insert_into(books::table)
        .values(new_book)
        .get_result::<Book>(conn)
        .expect("Error saving new book");
}

fn create_author(conn: &mut SqliteConnection, new_author: &_NewAuthor) -> Author {
    use crate::schema::authors;

    return diesel::insert_into(authors::table)
        .values(new_author)
        .get_result::<Author>(conn)
        .expect("Error saving author");
}

fn create_author_book(conn: &mut SqliteConnection, author: i32, book: i32) -> usize {
    use crate::schema::authors_books;

    let new_relation = AuthorsBooks {
        author_id: author,
        book_id: book,
    };

    return diesel::insert_into(authors_books::table)
        .values(new_relation)
        .execute(conn)
        .expect("Error saving relationship");
}
