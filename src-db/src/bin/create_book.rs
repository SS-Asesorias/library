use std::env;

use diesel::prelude::*;
use dotenvy::dotenv;
use src_db::models::authors::NewAuthor;
use src_db::models::books::{Book, NewBook};
use src_db::*;

fn main() {
    use self::schema::books::dsl::*;
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let connection = &mut establish_connection(&database_url);

    register_book(
        connection,
        &NewBook {
            condition: 2,
            position: String::from("ds"),
            authors: vec![
                NewAuthor {
                    name: String::from("John"),
                    lname: String::from("Doe"),
                    ..NewAuthor::default()
                },
                NewAuthor {
                    name: String::from("Mary"),
                    lname: String::from("Sue"),
                    ..NewAuthor::default()
                },
            ],
            ..NewBook::default()
        },
    );

    let results: Vec<Book> = books.load::<Book>(connection).expect("Error");

    for book in results {
        println!("{}", book.id);
        println!("{}", book.title);
    }
}
