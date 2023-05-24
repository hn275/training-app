use reqwest;
use serde::{de::DeserializeOwned, Deserialize, Serialize};
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

    pub async fn get(&self) -> Result<reqwest::Response, reqwest::Error> {
        return reqwest::Client::new().get(self.build_path()).send().await;
    }

    pub async fn set<T>(&self, data: &T) -> Result<String, reqwest::Error>
    where
        T: Sized + Serialize,
    {
        let paths = self.build_path();
        println!("{}", paths);

        let r = reqwest::Client::new()
            .post(paths)
            .header("Content-Type", "application/json")
            .json::<T>(data)
            .send()
            .await?
            .json::<FirebaseResult>()
            .await?;

        return Ok(r.name);
    }

    fn build_path(&self) -> String {
        let paths = self.at.join("/");
        return self.uri.to_owned() + paths.as_ref() + ".json";
    }
}
