use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};
use serde::{Deserialize, Serialize};

use crate::AppState;

#[derive(Deserialize, sqlx::FromRow, Serialize)]
pub struct Customer {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone: String,
    pub priority: i32,
}

#[derive(Deserialize)]
pub struct UserRequest {
    pub email: String,
}

#[derive(Deserialize)]
pub struct ChangeRequest {
    pub columnname: String,
    pub new_value: String,
    pub email: String,
}

#[derive(Serialize, Deserialize)]
pub struct NewCustomer {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone: String,
    pub priority: i32,
    pub user_email: String,
}

pub async fn get_all_customers(
    State(state): State<AppState>,
    Json(req): Json<UserRequest>,
) -> Result<Json<Vec<Customer>>, StatusCode> {
    let Ok(customers) = sqlx::query_as::<_, Customer>("SELECT first_name, last_name, email, phone, priority FROM customers WHERE user_id = (SELECT user_id FROM users WHERE email = $1)")
					.bind(req.email)
					.fetch_all(&state.postgres)
					.await else {
						return Err(StatusCode::INTERNAL_SERVER_ERROR)
					};

    Ok(Json(customers))
}

pub async fn get_one_customer(
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(req): Json<UserRequest>,
) -> Result<Json<Customer>, StatusCode> {
    let Ok(customer) = sqlx::query_as::<_, Customer>("SELECT first_name, last_name, email, phone, priority FROM customers WHERE owner_id = (SELECT user_id FROM users WHERE email = $1) AND id = $2")
					.bind(req.email)
					.bind(id)
					.fetch_one(&state.postgres)
					.await else {
						return Err(StatusCode::INTERNAL_SERVER_ERROR)
					};

    Ok(Json(customer))
}

pub async fn create_customer(
    State(state): State<AppState>,
    Json(req): Json<NewCustomer>,
) -> Result<StatusCode, StatusCode> {
    let Ok(_) = sqlx::query("INSERT INTO CUSTOMERS (first_name, last_name, email, phone, priority, owner_id) VALUES ($1, $2, $3, $4, $5, (SELECT id FROM users WHERE email = $6))")
						.bind(req.first_name)
						.bind(req.last_name)
						.bind(req.email)
						.bind(req.phone)
						.bind(req.priority)
						.bind(req.user_email)
						.execute(&state.postgres)
						.await else {
		return Err(StatusCode::INTERNAL_SERVER_ERROR)
	};

    Ok(StatusCode::INTERNAL_SERVER_ERROR)
}

pub async fn edit_customer(
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(req): Json<ChangeRequest>,
) -> Result<StatusCode, StatusCode> {
    let Ok(_) = sqlx::query("UPDATE customers SET $1 = $2 WHERE owner_id = (SELECT user_id FROM users WHERE email = $3) AND id = $4")
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

pub async fn destroy_customer(
    State(state): State<AppState>,
    Path(id): Path<i32>,
    Json(req): Json<UserRequest>,
) -> Result<StatusCode, StatusCode> {
    let Ok(_) = sqlx::query("DELETE FROM customers WHERE owner_id = (SELECT user_id FROM users WHERE email = $1) AND id = $2")
					.bind(req.email)
					.bind(id)
					.execute(&state.postgres)
					.await else {
							return Err(StatusCode::INTERNAL_SERVER_ERROR)
					};

    Ok(StatusCode::OK)
}
