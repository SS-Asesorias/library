-- Your SQL goes here
create table authors_books
(
    author_id integer not null
        constraint author_fk
            references authors,
    book_id   integer not null
        constraint books_fk
            references books,
    constraint authors_books_pk
        primary key (author_id, book_id)
);