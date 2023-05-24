use crate::firebase::Firebase;
use crate::https::error::ApiError;
use actix_web::{http::StatusCode, post, web};
use bcrypt;

use super::schemas::Credentials;

#[post("/auth/register")]
pub async fn controller(mut cred: web::Json<Credentials>) -> Result<String, ApiError> {
    serialize_user(&mut cred)
        .map_err(|e| ApiError::new(StatusCode::INTERNAL_SERVER_ERROR, format!("{}", e)))?;

    let user = cred.into_inner();
    let mut fb = Firebase::new();

    let user_db = fb.at("users").at(user.username.as_ref());
    let result = user_db
        .get()
        .await
        .map_err(|err| ApiError::new(StatusCode::BAD_GATEWAY, err.to_string()))?;
    if result.status() == StatusCode::OK {
        return Err(ApiError::new(
            StatusCode::BAD_REQUEST,
            String::from("username exists."),
        ));
    }
    /*
    let r = user_db.get().await.unwrap();
    */

    let result = user_db
        .at("credentials")
        .set(&user)
        .await
        .map_err(|err| ApiError::new(StatusCode::BAD_GATEWAY, err.to_string()))?;

    return Ok(result);
}

fn serialize_user(user: &mut web::Json<Credentials>) -> Result<(), bcrypt::BcryptError> {
    let plain = &user.password;
    let hashed = bcrypt::hash(plain, 10)?;
    user.password = hashed;
    Ok(())
}
