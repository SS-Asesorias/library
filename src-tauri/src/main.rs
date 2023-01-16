#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use crate::commands::{hello_world_command, register_book_command};

pub mod commands;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            hello_world_command,
            register_book_command
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
