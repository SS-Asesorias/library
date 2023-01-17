// @generated automatically by Diesel CLI.

diesel::table! {
    authors (id) {
        name -> Text,
        lname -> Nullable<Text>,
        id -> Integer,
    }
}

diesel::table! {
    authors_books (author_id, book_id) {
        author_id -> Integer,
        book_id -> Integer,
    }
}

diesel::table! {
    books (id) {
        id -> Integer,
        title -> Nullable<Text>,
        editorial -> Nullable<Text>,
        edition -> Nullable<Text>,
        condition -> Nullable<Integer>,
        position -> Text,
    }
}

diesel::joinable!(authors_books -> authors (author_id));
diesel::joinable!(authors_books -> books (book_id));

diesel::allow_tables_to_appear_in_same_query!(
    authors,
    authors_books,
    books,
);
