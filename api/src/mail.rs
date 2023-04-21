use axum::{extract::State, http::StatusCode, Json};
use reqwest::Client;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;

use crate::AppState;

#[derive(Deserialize, Serialize)]
pub struct EmailRequest {
    email: String,
}

pub async fn subscribe(
    State(state): State<AppState>,
    Json(req): Json<EmailRequest>,
) -> Result<StatusCode, StatusCode> {
    let ctx = Client::new();

    let api_endpoint = format!(
        "https://api.mailgun.net/v3/lists/mail@{}/members",
        &state.mailgun_url
    );

    let params = sub_params(req.email);
    let post = ctx
        .post(api_endpoint)
        .basic_auth("api", Some(&state.mailgun_key))
        .form(&params);

    match post.send().await {
        Ok(_) => Ok(StatusCode::OK),
        Err(_) => Err(StatusCode::INTERNAL_SERVER_ERROR),
    }
}

fn email_params(domain: &str, recipient: String) -> HashMap<&'static str, String> {
    let mut params = HashMap::new();

    let sender = format!("Mailgun Sandbox <postmaster@{}>", domain);
    let recipient = format!("New User <{}>", recipient);

    params.insert("from", sender);
    params.insert("to", recipient);
    params.insert("subject", "Hello world!".to_string());
    params.insert("template", "welcome".to_string());

    params
}

fn sub_params(recipient: String) -> HashMap<&'static str, String> {
    let mut params = HashMap::new();

    params.insert("address", recipient);
    params.insert("subscribed", "True".to_string());

    params
}
