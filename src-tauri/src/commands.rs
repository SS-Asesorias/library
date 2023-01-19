use src_db::models::authors::Author;
use src_db::models::books::NewBook;
use src_db::{establish_connection, get_authors, register_book};
use src_db::diesel::SqliteConnection;
use tauri::api::path::app_local_data_dir;
use tauri::AppHandle;

#[tauri::command]
pub async fn register_book_command(handle: tauri::AppHandle, new_book: NewBook) {
    let conn = get_database_connection(&handle);

    register_book(&mut conn, &new_book);
}

#[tauri::command]
pub async fn get_all_authors(handle: tauri::AppHandle) -> Vec<Author> {
    let conn = get_database_connection(&handle);

    get_authors(conn)
}

fn get_database_connection(handle: &AppHandle) -> SqliteConnection {
    let app_datapath = app_local_data_dir(&handle.config()).unwrap();

    establish_connection(format!("{}/library.sqlite", app_datapath.to_str().unwrap()).as_str())
}
