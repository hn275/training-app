use crate::firebase::Firebase;
use crate::https::error::ApiError;
use actix_web::{http, post, web};
use bcrypt;

use super::schemas::Credentials;

#[post("/auth/register")]
pub async fn controller(mut cred: web::Json<Credentials>) -> Result<String, ApiError> {
    serialize_user(&mut cred).map_err(|e| {
        ApiError::new(
            http::StatusCode::INTERNAL_SERVER_ERROR,
            format!("{}", e).as_ref(),
        )
    })?;

    let c = cred.clone();

    let mut fb = Firebase::new();
    let result = fb.collection("users").set(&c).await.unwrap();

    Ok(result.name)
}

fn serialize_user(user: &mut web::Json<Credentials>) -> Result<(), bcrypt::BcryptError> {
    let plain = &user.password;
    let hashed = bcrypt::hash(plain, 10)?;
    user.password = hashed;
    Ok(())
}
