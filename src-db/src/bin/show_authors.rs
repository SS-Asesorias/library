use std::env;

use diesel::prelude::*;
use dotenvy::dotenv;
use src_db::*;
use src_db::models::authors::Author;

fn main() {
    use self::schema::authors::dsl::*;
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url));

    let connection = &mut establish_connection(&database_url);
    let results = authors
        .load::<Author>(connection)
        .expect("Error loading authors");

    for author in results {
        println!("{}", author.id);
        println!("{}", author.name);
        println!("{}", author.lname);
    }
}
