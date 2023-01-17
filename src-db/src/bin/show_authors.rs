use diesel::prelude::*;
use src_db::models::authors::Author;
use src_db::*;

fn main() {
    use self::schema::authors::dsl::*;

    let connection = &mut establish_connection();
    let results = authors
        .load::<Author>(connection)
        .expect("Error loading authors");

    for author in results {
        println!("{}", author.id);
        println!("{}", author.name);
        println!("{}", author.lname.unwrap_or(String::from("Empty")));
    }
}
