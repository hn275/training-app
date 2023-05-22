use actix_web::{http, HttpResponseBuilder, ResponseError};
use serde::Serialize;

#[derive(Serialize, Debug)]
pub struct ApiError {
    #[serde(skip_serializing)]
    pub code: http::StatusCode,
    pub err: String,
}

impl ApiError {
    pub fn new(code: http::StatusCode, message: &str) -> ApiError {
        ApiError {
            code,
            err: message.to_owned(),
        }
    }
}

impl std::fmt::Display for ApiError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.err)
    }
}

impl ResponseError for ApiError {
    fn status_code(&self) -> http::StatusCode {
        self.code
    }

    fn error_response(&self) -> actix_web::HttpResponse<actix_web::body::BoxBody> {
        HttpResponseBuilder::new(self.code)
            .insert_header(http::header::ContentType::json())
            .json(self)
    }
}
