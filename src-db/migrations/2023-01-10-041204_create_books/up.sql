-- Your SQL goes here
create table books
(
    id        integer not null
        constraint book_id
            primary key autoincrement,
    title     TEXT,
    editorial TEXT,
    edition   TEXT,
    condition integer,
    position  TEXT    not null,
    check (condition >= 1 and condition <= 5)
);
