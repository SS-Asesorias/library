# Sistema de Administración de Librerías


## Instalar dependencias

1. Instalar [rustup]([url](https://www.rust-lang.org/tools/install))
2. En Windows: Instalar VisualStudio con las herramientas de desarrollo de C++
   En Linux (Fedora): `sudo dnf install gcc atk pango-devel cairo-gobject-devel gtk3-devel webkit2gtk4.0-devel librsvg2-devel file`
3. Instalar las siguientes dependencias
   Tauri: `cargo install tauri-cli`
   Diesel: `cargo install diesel_cli --no-default-features --features sqlite-bundled`
   Trunk: `cargo install --locked trunk`
   Compilador WebAssembly: `rustup target add wasm32-unknown-unknown`
4. Instalar `angular-cli` y `node` 
5. Hacer `npm install`

## Desarrollo y build

Iniciar servidor en modo de desarrollo: `npm start`
Hacer build: `npm run build`
Hacer build en modo de debug: `npm run build --debug`

## Deployment

Este comando se debe ejecutar desde Windows para generar el archivo MSI: `npm run build`


Un mensaje de Salvador, Vicente y Diego (con ayuda de ChatGPT):

> In the realm I've roamed,\
> A project's mantle I pass on,\
> The baton now yours,\
> May you conquer challenges,\
> As I bid farewell,\
> Leaving the problem to you.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.5.

## Development server



Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
