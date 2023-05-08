use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};

use crate::AppState;

#[derive(Deserialize, Serialize, sqlx::FromRow)]
pub struct Deal {
    pub id: i32,
    pub estimate_worth: i32,
    pub actual_worth: i32,
    pub status: String,
    pub closed: String,
    pub customer_name: String,
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
    pub estimatedworth: i32,
    pub cust_id: i32,
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
    let Ok(deals) = sqlx::query_as::<_, Deal>("SELECT d.id, d.estimate_worth, d.actual_worth, d.status, d.closed FROM deals d LEFT JOIN customers c ON d.customer_id = c.id WHERE owner_id = (SELECT user_id FROM users WHERE email = $1)")
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
    let Ok(_) = sqlx::query("INSERT INTO DEALS (status, closed, customer_id, owner_id, estimate_worth) VALUES ('open', 'closed', $1, (SELECT id FROM users WHERE email = $2), $3)")
						.bind(req.cust_id)
						.bind(req.useremail)
                        .bind(req.estimatedworth)
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
