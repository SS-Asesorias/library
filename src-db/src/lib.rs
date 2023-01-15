use crate::models::authors::{_NewAuthor, NewAuthor};
use crate::models::books::{NewBook, _NewBook};
use crate::schema::authors::dsl::authors;
use diesel::sqlite::SqliteConnection;
use diesel::{Connection, RunQueryDsl};
use dotenvy::dotenv;
use std::{env, usize};

pub mod models;
pub mod schema;

pub fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

pub fn register_book(conn: &mut SqliteConnection, book: &NewBook) {
    let insertable_book = _NewBook {
        title: match &book.title {
            None => None,
            Some(val) => Some(val.as_str())
        },
        editorial: match &book.editorial {
            None => None,
            Some(val) => Some(val.as_str())
        },
        edition: match &book.edition {
            None => None,
            Some(val) => Some(val.as_str())
        },
        condition: book.condition,
        position: book.position.as_str(),
    };

    create_book(conn, &insertable_book);

    for author in &book.authors {
        match author.id {
            None => {
                let insertable_author = _NewAuthor {
                    name: author.name.as_str(),
                    lname: match &author.lname {
                        None => None,
                        Some(val) => Some(val.as_str())
                    }
                };

                create_author(conn, &insertable_author);
            }
            _ => {}
        }

        // TODO: insert relationships between book and authors
    }
}

// == FOR INTERNAL ==
fn create_book(conn: &mut SqliteConnection, new_book: &_NewBook) -> usize {
    use crate::schema::books;

    return diesel::insert_into(books::table)
        .values(new_book)
        .execute(conn)
        .expect("Error saving new book");
}

fn create_author(conn: &mut SqliteConnection, new_author: &_NewAuthor) -> usize {
    use crate::schema::authors;

    return diesel::insert_into(authors::table)
        .values(new_author)
        .execute(conn)
        .expect("Error saving author");
}
