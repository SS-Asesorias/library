-- Your SQL goes here
create table authors
(
    name  TEXT    not null,
    lname TEXT,
    id    integer not null
        constraint authors_pk
            primary key autoincrement
);
