use std::fs;

fn main() {
  fs::copy("../src-db/library.sqlite", "../src-tauri/library.sqlite").expect("Failed to copy database to bundle");

  tauri_build::build()
}
