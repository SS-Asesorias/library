-- Your SQL goes here
create table authors
(
    name  TEXT not null default '',
    lname TEXT not null default '',
    id    integer not null
        constraint authors_pk
            primary key autoincrement
);
