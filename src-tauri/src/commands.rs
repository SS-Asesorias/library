use src_db::models::books::NewBook;
use src_db::{establish_connection, register_book};

#[tauri::command]
pub async fn hello_world_command(_app: tauri::AppHandle) -> Result<String, String> {
    println!("I was invoked from JS!");
    Ok("Hello world from Tauri!".into())
}

#[tauri::command]
pub async fn register_book_command(new_book: NewBook) {
    let mut conn = establish_connection();

    register_book(&mut conn, &new_book);
}
