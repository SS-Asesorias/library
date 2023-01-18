use crate::models::authors::{Author, _NewAuthor};
use crate::models::authors_books::AuthorsBooks;
use crate::models::books::{Book, NewBook, _NewBook};
use diesel::sqlite::SqliteConnection;
use diesel::{Connection, RunQueryDsl};
use dotenvy::dotenv;
use std::usize;

pub mod models;
pub mod schema;

pub fn establish_connection(db_url: &str) -> SqliteConnection {
    dotenv().ok();

    SqliteConnection::establish(db_url).unwrap_or_else(|_| panic!("Error connecting to {}", db_url))
}

pub fn register_book(conn: &mut SqliteConnection, book: &NewBook) {
    let insertable_book = _NewBook {
        title: match &book.title {
            None => None,
            Some(val) => Some(val.as_str()),
        },
        editorial: match &book.editorial {
            None => None,
            Some(val) => Some(val.as_str()),
        },
        edition: match &book.edition {
            None => None,
            Some(val) => Some(val.as_str()),
        },
        condition: book.condition,
        position: book.position.as_str(),
    };

    let inserted_book = create_book(conn, &insertable_book);

    for author in &book.authors {
        match author.id {
            None => {
                let insertable_author = _NewAuthor {
                    name: author.name.as_str(),
                    lname: match &author.lname {
                        None => None,
                        Some(val) => Some(val.as_str()),
                    },
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
