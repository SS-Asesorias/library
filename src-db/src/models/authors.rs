use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::authors;

#[derive(Queryable, Serialize, Deserialize)]
pub struct Author {
    pub name: String,
    pub lname: String,
    pub id: i32,
}

#[derive(Serialize, Deserialize)]
pub struct NewAuthor {
    pub name: String,
    pub lname: String,
    pub id: Option<i32>,
}

impl Default for NewAuthor {
    fn default() -> Self {
        NewAuthor {
            name: String::new(),
            lname: String::new(),
            id: None,
        }
    }
}

#[derive(Insertable)]
#[diesel(table_name = authors)]
pub(crate) struct _NewAuthor<'a> {
    pub name: &'a str,
    pub lname: &'a str,
}
