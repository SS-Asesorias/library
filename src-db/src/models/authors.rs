use diesel::prelude::*;
use serde::{Serialize, Deserialize};
use crate::schema::authors;

#[derive(Queryable)]
pub struct Author {
    pub name: String,
    pub lname: Option<String>,
    pub id: i32,
}

#[derive(Serialize, Deserialize)]
pub struct NewAuthor {
    pub name: String,
    pub lname: Option<String>,
    pub id: Option<i32>,
}

impl Default for NewAuthor {
    fn default() -> Self {
        NewAuthor {
            name: String::new(),
            lname: None,
            id: None
        }
    }
}

#[derive(Insertable)]
#[diesel(table_name = authors)]
pub(crate) struct _NewAuthor<'a> {
    pub name: &'a str,
    pub lname: Option<&'a str>,
}
