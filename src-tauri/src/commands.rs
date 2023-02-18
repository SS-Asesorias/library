use src_db::diesel::SqliteConnection;
use src_db::models::authors::Author;
use src_db::models::books::{Book, NewBook};
use src_db::{establish_connection, get_authors, get_books, register_book};
use tauri::api::path::app_local_data_dir;
use tauri::{AppHandle, Wry};

#[tauri::command]
pub async fn register_book_command(handle: AppHandle<Wry>, new_book: NewBook) {
    let mut conn = get_database_connection(&handle);

    register_book(&mut conn, &new_book);
}

#[tauri::command]
pub async fn get_all_authors_command(handle: AppHandle<Wry>) -> Vec<Author> {
    let mut conn = get_database_connection(&handle);

    get_authors(&mut conn)
}

#[tauri::command]
pub async fn get_books_command(handle: AppHandle<Wry>) -> Vec<Book> {
    let mut conn = get_database_connection(&handle);

    get_books(&mut conn)
}

fn get_database_connection(handle: &AppHandle<Wry>) -> SqliteConnection {
    let app_datapath = app_local_data_dir(&handle.config()).unwrap();

    establish_connection(format!("{}/library.sqlite", app_datapath.to_str().unwrap()).as_str())
}
