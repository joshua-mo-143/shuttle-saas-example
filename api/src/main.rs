use sqlx::PgPool;

mod customers;
mod deals;
mod payments;
mod router;

use router::create_api_router;

#[derive(Clone)]
pub struct AppState {
    pub postgres: PgPool,
    pub stripe_key: String,
    pub domain: String,
}

#[shuttle_runtime::main]
async fn axum(
    #[shuttle_shared_db::Postgres] postgres: PgPool,
    #[shuttle_secrets::Secrets] secrets: shuttle_secrets::SecretStore,
) -> shuttle_axum::ShuttleAxum {
    let (stripe_key, domain) = grab_secrets(secrets);

    let state = AppState {
        postgres,
        stripe_key,
        domain,
    };

    let router = create_api_router(state);

    Ok(router.into())
}

fn grab_secrets(secrets: shuttle_secrets::SecretStore) -> (String, String) {
    let stripe_key = secrets
        .get("STRIPE_KEY")
        .expect("Couldn't get STRIPE_KEY, did you remember to set it in Secrets.toml?");

    let domain = secrets
        .get("DOMAIN_URL")
        .expect("Couldn't get DOMAIN_URL, did you remember to set it in Secrets.toml?");

    (stripe_key, domain)
}
