use reqwest;
use serde::{Deserialize, Serialize};
use std::env;

pub struct Firebase {
    uri: String,
    at: String,
}

#[derive(Serialize, Deserialize, Debug)]
pub struct WriteResponse {
    pub name: String,
}

impl Firebase {
    pub fn new() -> Firebase {
        let uri = env::var("DATABASE_URL").unwrap();
        return Firebase {
            uri,
            at: "".to_owned(),
        };
    }

    pub fn collection(&mut self, path: &str) -> &mut Firebase {
        self.at = format!("{}.json", path);
        return self;
    }

    pub async fn set<T>(&self, data: &T) -> Result<WriteResponse, reqwest::Error>
    where
        T: Sized + Serialize,
    {
        if self.at == "" {
            panic!("`self.at` not set");
        }

        let collection = self.uri.clone() + self.at.clone().as_ref();

        let cx = reqwest::Client::new()
            .post(collection)
            .header("Content-Type", "application/json")
            .json::<T>(data)
            .send()
            .await
            .unwrap()
            .json::<WriteResponse>()
            .await
            .unwrap();

        Ok(cx)
    }
}
