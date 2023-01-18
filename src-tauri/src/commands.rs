use src_db::models::books::NewBook;
use src_db::{establish_connection, register_book};
use tauri::api::path::app_local_data_dir;

#[tauri::command]
pub async fn hello_world_command(_app: tauri::AppHandle) -> Result<String, String> {
    println!("I was invoked from JS!");
    Ok("Hello world from Tauri!".into())
}

#[tauri::command]
pub async fn register_book_command(handle: tauri::AppHandle, new_book: NewBook) {
    let app_datapath = app_local_data_dir(&handle.config()).unwrap();

    let mut conn =
        establish_connection(format!("{}/library.sqlite", app_datapath.to_str().unwrap()).as_str());

    register_book(&mut conn, &new_book);
}
