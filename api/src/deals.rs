use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};

use crate::AppState;

#[derive(Deserialize, Serialize, sqlx::FromRow)]
pub struct Deal {
    pub estimate_worth: i32,
    pub actual_worth: i32,
    pub status: String,
    pub closed: String,
    pub customer_id: String,
}

#[derive(Deserialize, Serialize, sqlx::FromRow)]
pub struct DealDetailed {
    pub id: i32,
    pub estimate_worth: i32,
    pub actual_worth: i32,
    pub status: String,
    pub closed: String,
    pub customer_id: String,
}

#[derive(Deserialize)]
pub struct UserRequest {
    pub email: String,
}

#[derive(Deserialize)]
pub struct NewDeal {
    pub estimate_worth: i32,
    pub actual_worth: i32,
    pub customeremail: String,
    pub useremail: String,
}

#[derive(Deserialize)]
pub struct ChangeRequest {
    pub columnname: String,
    pub new_value: String,
    pub email: String,
}

pub async fn get_all_deals(
    State(state): State<AppState>,
    Json(req): Json<UserRequest>,
) -> Result<Json<Vec<Deal>>, StatusCode> {
    let Ok(deals) = sqlx::query_as::<_, Deal>("SELECT estimate_worth, actual_worth, status, closed, customer_id FROM deals WHERE owner_id = (SELECT user_id FROM users WHERE email = $1)")
					.bind(req.email)
					.fetch_all(&state.postgres)
					.await else {
						return Err(StatusCode::INTERNAL_SERVER_ERROR)
					};

    Ok(Json(deals))
}

pub async fn get_one_deal(
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(req): Json<UserRequest>,
) -> Result<Json<DealDetailed>, StatusCode> {
    let Ok(deal) = sqlx::query_as::<_, DealDetailed>("SELECT id, estimate_worth, actual_worth, status, closed, customer_id FROM deals WHERE owner_id = (SELECT user_id FROM users WHERE email = $1) AND id = $2")
					.bind(req.email)
					.bind(id)
					.fetch_one(&state.postgres)
					.await else {
						return Err(StatusCode::INTERNAL_SERVER_ERROR)
					};

    Ok(Json(deal))
}

pub async fn create_deal(
    State(state): State<AppState>,
    Json(req): Json<NewDeal>,
) -> Result<StatusCode, StatusCode> {
    let Ok(_) = sqlx::query("INSERT INTO DEALS (status, closed, customer_id, owner_id) VALUES ('open', 'closed', (SELECT id FROM customers WHERE customer name = $1) (SELECT id FROM users WHERE email = $2))")
						.bind(req.customeremail)
						.bind(req.useremail)
						.execute(&state.postgres)
						.await else {
		return Err(StatusCode::INTERNAL_SERVER_ERROR)
	};

    Ok(StatusCode::INTERNAL_SERVER_ERROR)
}

pub async fn edit_deal(
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(req): Json<ChangeRequest>,
) -> Result<StatusCode, StatusCode> {
    let Ok(_) = sqlx::query("UPDATE deals SET $1 = $2 WHERE owner_id = (SELECT user_id FROM users WHERE email = $3) AND id = $4")
					.bind(req.columnname)
					.bind(req.new_value)
					.bind(req.email)
					.bind(id)
					.fetch_one(&state.postgres)
					.await else {
						return Err(StatusCode::INTERNAL_SERVER_ERROR)
					};

    Ok(StatusCode::OK)
}

pub async fn destroy_deal(
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(req): Json<UserRequest>,
) -> Result<StatusCode, StatusCode> {
    let Ok(_) = sqlx::query("DELETE FROM deals WHERE owner_id = (SELECT user_id FROM users WHERE email = $1) AND id = $2")
					.bind(req.email)
					.bind(id)
					.execute(&state.postgres)
					.await else {
							return Err(StatusCode::INTERNAL_SERVER_ERROR)
					};

    Ok(StatusCode::OK)
}
