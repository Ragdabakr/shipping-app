CREATE TABLE shipping.app_user (
	user_id serial NOT NULL,
	username varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	email varchar(355) NOT NULL,
	created_on timestamp NULL,
	created_by varchar(100) NULL,
	user_type_code varchar(10) NOT NULL,
	full_name varchar(500) NOT NULL,
	active int2 NULL DEFAULT 1,
    updated_on timestamp NULL,
	updated_by varchar(100) NULL,
	CONSTRAINT user_email_key UNIQUE (email),
	CONSTRAINT user_pkey PRIMARY KEY (user_id),
	CONSTRAINT user_username_key UNIQUE (username)
);

CREATE TABLE shipping.verification(
  verification_id serial NOT NULL,
	token varchar(355) NOT NULL,
	email varchar(355) NOT NULL,
	CONSTRAINT verification_pkey PRIMARY KEY (verification_id)
);

CREATE TABLE shipping.supplier (
	supplier_id serial NOT NULL,
	supplier_fullname varchar(500) NOT NULL,
	supplier_email varchar(355) NOT NULL,
	supplier_phone varchar(355) NOT NULL,
	created_on timestamp NULL,
	created_by varchar(100) NULL,
	active int2 NULL DEFAULT 1,
	api_key varchar(100) NULL DEFAULT NULL,
	uuid_key varchar(100) NULL DEFAULT NULL,
	city_id int4 NULL,
  country_id int4 NULL,
	CONSTRAINT supplier_pkey PRIMARY KEY (supplier_id)
);

CREATE TABLE shipping.app_group (
	group_id serial NOT NULL,
	group_name varchar(100) NOT NULL,
	CONSTRAINT group_group_name_key UNIQUE (group_name),
	CONSTRAINT group_pkey PRIMARY KEY (group_id)
);

CREATE TABLE shipping.app_role (
	role_id serial NOT NULL,
	role_name varchar(100) NOT NULL,
  created_on timestamp NULL,
	created_by varchar(100) NULL,
  updated_on timestamp NULL,
	updated_by varchar(100) NULL,
  active int2 NULL DEFAULT 1,
	CONSTRAINT role_pkey PRIMARY KEY (role_id),
	CONSTRAINT role_role_name_key UNIQUE (role_name)
);

CREATE TABLE shipping.user_group (
	user_group_id serial NOT NULL,
	user_id int4 NULL,
	group_id int4 NULL,
	CONSTRAINT user_group_pkey PRIMARY KEY (user_group_id)
);

CREATE TABLE shipping.group_role (
	group_role_id serial NOT NULL,
	group_id int4 NULL,
  role_id int4 NULL,
  created_on timestamp NULL,
	created_by varchar(100) NULL,
	CONSTRAINT group_role_pkey PRIMARY KEY (group_role_id)
);

CREATE TABLE shipping.user_type (
	user_type_id serial NOT NULL,
	user_type_name varchar(500) NOT NULL,
	user_type_code varchar(10) NOT NULL,
	CONSTRAINT user_type_pkey PRIMARY KEY (user_type_id)
);



CREATE TABLE shipping.app_city (
	city_id serial NOT NULL,
	city_name nvarchar(300) NOT NULL,
	zone_code varchar(5) NOT NULL,
	created_by varchar(50) NULL,
	created_on timestamp NULL,
  country_id serial NOT NULL,
	CONSTRAINT app_city_pkey PRIMARY KEY (city_id)
);

CREATE TABLE shipping.app_country (
	country_id serial NOT NULL,
	country_name varchar(300) NOT NULL,
	created_by varchar(50) NULL,
	created_on timestamp NULL,
	CONSTRAINT app_country_pkey PRIMARY KEY (country_id)
);


CREATE TABLE shipping.country_code (
	country_code_id serial NOT NULL,
	phonecode varchar(300) NOT NULL,
	flag varchar(1000) NOT NULL,
	arcountryname varchar(300) NOT NULL,
	CONSTRAINT app_country_code_pkey PRIMARY KEY (country_code_id)
);

-- shipping.customer definition

-- Drop table

-- DROP TABLE shipping.customer;

CREATE TABLE shipping.customer (
	customer_id serial NOT NULL,
	customer_fullname varchar(500) NOT NULL,
	customer_email varchar(50) NOT NULL,
	customer_phone_1 varchar(50) NOT NULL,
	customer_phone_2 varchar(50) NOT NULL,
	created_on timestamp NOT NULL,
	created_by varchar(50) NOT NULL,
	user_id int4 NULL,
	active int2 NULL DEFAULT 1,
	city_id int4 NULL,
  country_id int4 NOT NULL,
	CONSTRAINT customer_pkey PRIMARY KEY (customer_id)
);

CREATE TABLE shipping.app_zone (
	zone_id serial NOT NULL,
	zone_name varchar(200) NOT NULL,
	zone_code varchar(5) NOT NULL,
	created_by varchar(50) NULL,
	created_on timestamp NULL,
	CONSTRAINT app_zone_pkey PRIMARY KEY (zone_id)
);




CREATE TABLE shipping.zone_price (
	zone_price_id serial NOT NULL,
	zone_code varchar(5) NOT NULL,
	weight int4 NOT NULL,
	price float4 NOT NULL,
	created_by varchar(50) NULL,
	created_on timestamp NULL,
	CONSTRAINT zone_price_pkey PRIMARY KEY (zone_price_id)
);

-- shipping.app_order definition

-- Drop table

-- DROP TABLE shipping.app_order;

CREATE TABLE shipping.app_order (
	order_id bigserial NOT NULL,
	order_ref_key varchar(50) NOT NULL,
	order_type varchar(5) NOT NULL,
	order_weight int4 NOT NULL,
	order_price float4 NULL,
	status_code varchar(500) NULL,
	order_date timestamp NULL,
	sender_date timestamp NULL,
	delivery_date timestamp NULL,
	CONSTRAINT app_order_pkey PRIMARY KEY (order_id)
);

-- shipping.customer_order definition

-- Drop table

-- DROP TABLE shipping.customer_order;

CREATE TABLE shipping.customer_order (
	order_id bigserial NOT NULL,
	service_code varchar(20) NOT NULL,
	customer_id int4 NOT NULL,
	sender_name varchar(500) NOT NULL,
	sender_mobile varchar(50) NOT NULL,
	sender_lat_lng varchar(2000) NOT NULL,
	sender_city_id int4 NOT NULL,
  sender_country_id int4 NOT NULL,
	deliver_to_name varchar(50) NOT NULL,
	deliver_to_mobile varchar(50) NOT NULL,
	deliver_to_lat_lng varchar(2000) NOT NULL,
	deliver_to_city_id int4 NOT NULL,
  deliver_country_id int4 NOT NULL
);

CREATE TABLE shipping.supplier_order (
	order_id bigserial NOT NULL,
	service_code varchar(20) NOT NULL,
	supplier_id int4 NOT NULL,
	sender_name varchar(500) NOT NULL,
	sender_mobile varchar(50) NOT NULL,
	sender_lat_lng varchar(2000) NOT NULL,
	sender_city_id int4 NOT NULL,
  sender_country_id int4 NOT NULL,
	deliver_to_name varchar(50) NOT NULL,
	deliver_to_mobile varchar(50) NOT NULL,
	deliver_to_lat_lng varchar(2000) NOT NULL,
	deliver_to_city_id int4 NOT NULL,
  deliver_country_id int4 NOT NULL
);

CREATE TABLE shipping.order_status (
	order_status_id serial NOT NULL,
	order_status_name varchar(500) NOT NULL,
	order_status_code varchar(100) NOT NULL,
	CONSTRAINT order_status_pkey PRIMARY KEY (order_status_id)
);



CREATE TABLE shipping.order_type (
	order_type_id serial NOT NULL,
	order_type_name varchar(500) NOT NULL,
	order_type_code varchar(100) NOT NULL,
	CONSTRAINT order_type_pkey PRIMARY KEY (order_type_id)
);
