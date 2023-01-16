use std::collections::LinkedList;
use diesel::prelude::*;
use src_db::models::books::{Book, NewBook};
use src_db::*;
use src_db::models::authors::{NewAuthor};

fn main() {
    use self::schema::books::dsl::*;

    let connection = &mut establish_connection();

    register_book(connection, &NewBook {
        condition: Some(2),
        position: String::from("ds"),
        authors: vec![
            NewAuthor {
                name: String::from("John"),
                lname: Some(String::from("Doe")),
                ..NewAuthor::default()
            },
            NewAuthor {
                name: String::from("Mary"),
                lname: Some(String::from("Sue")),
                ..NewAuthor::default()
            },
        ],
        ..NewBook::default()
    });

    let results: Vec<Book> = books
        .load::<Book>(connection)
        .expect("Error");

    for book in results {
        println!("{}", book.id);
        println!("{}", book.title.unwrap_or(String::from("Nothing")));
    }
}
