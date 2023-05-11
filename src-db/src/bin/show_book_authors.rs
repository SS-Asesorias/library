use dotenvy::dotenv;
use src_db::{establish_connection, get_authors_by_book};
use std::env;

fn main() {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");

    let connection = &mut establish_connection(&database_url);

    let authors = get_authors_by_book(connection, 1);

    for author in authors {
        println!("{}", author.id);
        println!("{}", author.name);
        println!("{}", author.lname);
    }
}
