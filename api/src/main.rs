use axum::extract::FromRef;
use axum_extra::extract::cookie::Key;
use sqlx::PgPool;

mod auth;
mod customers;
mod deals;
mod mail;
mod payments;
mod router;

use router::create_api_router;

#[derive(Clone)]
pub struct AppState {
    pub postgres: PgPool,
    pub stripe_key: String,
    pub mailgun_key: String,
    pub mailgun_url: String,
    pub domain: String,
    pub key: Key,
}

impl FromRef<AppState> for Key {
    fn from_ref(state: &AppState) -> Self {
        state.key.clone()
    }
}

#[shuttle_runtime::main]
async fn axum(
    #[shuttle_shared_db::Postgres] postgres: PgPool,
    #[shuttle_secrets::Secrets] secrets: shuttle_secrets::SecretStore,
) -> shuttle_axum::ShuttleAxum {
    let (stripe_key, mailgun_key, mailgun_url, domain) = grab_secrets(secrets);

    let state = AppState {
        postgres,
        stripe_key,
        mailgun_key,
        mailgun_url,
        domain,
        key: Key::generate(),
    };

    let router = create_api_router(state);

    Ok(router.into())
}

fn grab_secrets(secrets: shuttle_secrets::SecretStore) -> (String, String, String, String) {
    let stripe_key = secrets
        .get("STRIPE_KEY")
        .expect("Couldn't get STRIPE_KEY, did you remember to set it in Secrets.toml?");

    let mailgun_key = secrets
        .get("MAILGUN_KEY")
        .expect("Couldn't get MAILGUN_KEY, did you remember to set it in Secrets.toml?");

    let mailgun_url = secrets
        .get("MAILGUN_URL")
        .expect("Couldn't get MAILGUN_URL, did you remember to set it in Secrets.toml?");

    let domain = secrets
        .get("DOMAIN_URL")
        .expect("Couldn't get DOMAIN_URL, did you remember to set it in Secrets.toml?");

    (stripe_key, mailgun_key, mailgun_url, domain)
}
