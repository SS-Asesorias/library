pub extern crate diesel;

use std::usize;

use diesel::{Connection, RunQueryDsl};
use diesel::sqlite::SqliteConnection;
use diesel::{Connection, ExpressionMethods, QueryDsl, RunQueryDsl};
use dotenvy::dotenv;

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

    for author in &book.authors {
        match author.id {
            None => {
                let insertable_author = _NewAuthor {
                    name: author.name.as_str(),
                    lname: author.lname.as_str(),
                };

                let inserted_author = create_author(conn, &insertable_author);

                create_author_book(conn, inserted_author.id, inserted_book.id);
            }
            Some(id) => {
                create_author_book(conn, id, inserted_book.id);
            }
        }
    }
}

pub fn get_books(conn: &mut SqliteConnection) -> Vec<Book> {
    use self::schema::books::dsl::*;

    books.load::<Book>(conn).expect("Error loading books")
}

pub fn get_authors(conn: &mut SqliteConnection) -> Vec<Author> {
    use self::schema::authors::dsl::*;

    authors.load::<Author>(conn).expect("Error loading authors")
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
