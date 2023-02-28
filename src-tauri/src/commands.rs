use src_db::{establish_connection, get_authors, get_authors_by_book, get_book_by_id, get_books, register_book};
use src_db::diesel::SqliteConnection;
use src_db::models::authors::Author;
use src_db::models::books::{Book, NewBook};
use tauri::{AppHandle, Wry};
use tauri::api::path::app_local_data_dir;

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
pub async fn get_authors_by_book_command(handle: AppHandle<Wry>, id: i32) -> Vec<Author> {
    let mut conn = get_database_connection(&handle);
    get_authors_by_book(&mut conn, id)
}

#[tauri::command]
pub async fn get_books_command(handle: AppHandle<Wry>) -> Vec<Book> {
    let mut conn = get_database_connection(&handle);
    get_books(&mut conn)
}

#[tauri::command]
pub async fn get_book_command(handle: AppHandle<Wry>, id: i32) -> Book {
    let mut conn = get_database_connection(&handle);
    get_book_by_id(&mut conn, id)
}

fn get_database_connection(handle: &AppHandle<Wry>) -> SqliteConnection {
    let app_datapath = app_local_data_dir(&handle.config()).unwrap();

    establish_connection(format!("{}/library.sqlite", app_datapath.to_str().unwrap()).as_str())
}
