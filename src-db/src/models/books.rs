use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::models::authors::NewAuthor;
use crate::schema::books;

#[derive(Queryable, Identifiable, AsChangeset, Serialize, Deserialize)]
pub struct Book {
    pub id: i32,
    pub title: String,
    pub editorial: String,
    pub edition: String,
    pub condition: i32,
    pub position: String,
    pub notes: String,
}

#[derive(Serialize, Deserialize)]
pub struct NewBook {
    pub title: String,
    pub editorial: String,
    pub edition: String,
    pub condition: i32,
    pub position: String,
    pub notes: String,
    pub authors: Vec<NewAuthor>,
}

impl Default for NewBook {
    fn default() -> Self {
        NewBook {
            title: String::new(),
            editorial: String::new(),
            edition: String::new(),
            condition: -1,
            position: String::new(),
            notes: String::new(),
            authors: vec![],
        }
    }
}

#[derive(Insertable)]
#[diesel(table_name = books)]
pub(crate) struct _NewBook<'a> {
    pub title: &'a str,
    pub editorial: &'a str,
    pub edition: &'a str,
    pub condition: i32,
    pub notes: &'a str,
    pub position: &'a str,
}
