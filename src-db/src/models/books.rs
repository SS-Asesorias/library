use std::collections::LinkedList;
use diesel::prelude::*;
use crate::models::authors::NewAuthor;
use crate::schema::books;

#[derive(Queryable)]
pub struct Book {
    pub id: i32,
    pub title: Option<String>,
    pub editorial: Option<String>,
    pub edition: Option<String>,
    pub condition: Option<i32>,
    pub position: String,
}

pub struct NewBook {
    pub title: Option<String>,
    pub editorial: Option<String>,
    pub edition: Option<String>,
    pub condition: Option<i32>,
    pub position: String,
    pub authors: Vec<NewAuthor>,
}

impl Default for NewBook {
    fn default() -> Self {
        NewBook {
            title: None,
            editorial: None,
            edition: None,
            condition: None,
            position: String::new(),
            authors: vec![]
        }
    }
}

#[derive(Insertable)]
#[diesel(table_name = books)]
pub struct _NewBook<'a> {
    pub title: Option<&'a str>,
    pub editorial: Option<&'a str>,
    pub edition: Option<&'a str>,
    pub condition: Option<i32>,
    pub position: &'a str,
}
