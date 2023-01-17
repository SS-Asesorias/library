use crate::models::{authors::Author, books::Book};
use crate::schema::authors_books;
use diesel::prelude::*;
use diesel::Insertable;

#[derive(Insertable, Associations)]
#[diesel(table_name = authors_books)]
#[diesel(belongs_to(Author, foreign_key = author_id))]
#[diesel(belongs_to(Book, foreign_key = book_id))]
pub struct AuthorsBooks {
    pub author_id: i32,
    pub book_id: i32,
}
