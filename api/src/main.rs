use actix_web::{get, App, HttpResponse, HttpServer, Responder};

mod features;
mod https;
use features::auth;

#[actix_web::main]
async fn main() -> Result<(), std::io::Error> {
    let addr = "127.0.0.1";
    let port = 8080;

    println!("[ok] serving {}:{}", addr, port);
    return HttpServer::new(|| {
        App::new()
            .service(auth::register::controller)
            .service(index)
    })
    .bind((addr, port))?
    .run()
    .await;
}

#[get("/ping")]
async fn index() -> impl Responder {
    HttpResponse::Ok()
}
