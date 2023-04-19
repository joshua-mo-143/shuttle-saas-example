use axum::{
    routing::{get, post},
    Router,
};

use crate::AppState;

use crate::customers::{
    create_customer, destroy_customer, edit_customer, get_all_customers, get_one_customer,
};
use crate::deals::{create_deal, destroy_deal, edit_deal, get_all_deals, get_one_deal};
use crate::payments::create_checkout;

pub fn create_api_router(state: AppState) -> Router {
    let payments_router = Router::new().route("/pay", get(create_checkout));

    let customers_router = Router::new()
        .route("/", post(get_all_customers))
        .route(
            "/:id",
            post(get_one_customer)
                .put(edit_customer)
                .delete(destroy_customer),
        )
        .route("/create", post(create_customer));

    let deals_router = Router::new()
        .route("/", post(get_all_deals))
        .route(
            "/:id",
            post(get_one_deal).put(edit_deal).delete(destroy_deal),
        )
        .route("/create", post(create_deal));

    Router::new()
        .nest("/customers", customers_router)
        .nest("/deals", deals_router)
        .nest("/payments", payments_router)
        .with_state(state)
}
