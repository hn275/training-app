use crate::https::error::ApiError;
use actix_web::http::StatusCode;
use reqwest;
use serde::{Deserialize, Deserialize, Serialize};
use std::env;

pub struct Firebase {
    uri: String,
    at: Vec<String>,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct FirebaseResult {
    pub name: String,
}

impl Firebase {
    pub fn new() -> Firebase {
        let uri = env::var("DATABASE_URL").unwrap();
        return Firebase { uri, at: vec![] };
    }

    pub fn at(&mut self, path: &str) -> &mut Firebase {
        self.at.push(path.to_owned());
        return self;
    }

    pub async fn get<T>(&self) -> Result<(), ApiError>
    where
        T: Sized + Deserialize,
    {
        let response = reqwest::Client::new()
            .get(self.build_path())
            .send()
            .await
            .map_err(|err| ApiError {
                code: StatusCode::INTERNAL_SERVER_ERROR,
                err: err.to_string(),
            })?
            .json::<T>()
            .await
            .map_err(|err| ApiError {
                err: err.to_string(),
                code: StatusCode::INTERNAL_SERVER_ERROR,
            })?;

        Ok(())
    }

    pub async fn set<T>(&self, data: &T) -> Result<FirebaseResult, ApiError>
    where
        T: Sized + Serialize,
    {
        let paths = self.build_path();
        let collection = self.uri.to_owned() + paths.as_ref() + ".json";
        println!("{}", collection);

        let response = reqwest::Client::new()
            .post(collection)
            .header("Content-Type", "application/json")
            .json::<T>(data)
            .send()
            .await
            .map_err(|err| ApiError {
                err: err.to_string(),
                code: StatusCode::INTERNAL_SERVER_ERROR,
            })?
            .json::<FirebaseResult>()
            .await
            .map_err(|err| ApiError {
                err: err.to_string(),
                code: StatusCode::INTERNAL_SERVER_ERROR,
            })?;

        return Ok(response);
    }

    fn build_path(&self) -> String {
        let paths = self.build_path();
        self.uri.to_owned() + paths.as_ref() + ".json"
    }
}
