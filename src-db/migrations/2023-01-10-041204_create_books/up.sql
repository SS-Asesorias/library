-- Your SQL goes here
create table books
(
    id        integer not null
        constraint book_id
            primary key autoincrement,
    title     TEXT not null default '',
    editorial TEXT not null default '',
    edition   TEXT not null default '',
    condition integer not null default -1,
    position  TEXT not null default '',
    notes   TEXT not null default '',
    check (condition >= 1 and condition <= 5)
);
