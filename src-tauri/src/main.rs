#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::commands::{get_all_authors_command, get_books_command, register_book_command};
use std::fs;
use std::path::Path;
use tauri::api::path::app_local_data_dir;

pub mod commands;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let database_path = app
                .path_resolver()
                .resolve_resource("../src-db/library.sqlite")
                .expect("Failed to resolve resource: library.sqlite");

            let app_datapath = app_local_data_dir(&app.config()).unwrap();
            let library_path = format!("{}/library.sqlite", app_datapath.to_str().unwrap());

            let library_file = Path::new(&library_path);

            if !library_file.exists() {
                fs::copy(database_path.to_str().unwrap(), library_path)
                    .expect("Failed to create library database");
                println!("Database initialized");
            }

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            register_book_command,
            get_all_authors_command,
            get_books_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
