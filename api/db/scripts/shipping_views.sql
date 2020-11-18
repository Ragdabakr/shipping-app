CREATE OR REPLACE VIEW shipping.users
AS SELECT u.user_id,
    u.username,
    u.password,
    u.email,
    u.full_name,
    u.active,
    u.user_type_code,
    ut.user_type_name,
    u.created_by,
    u.created_on
   FROM shipping.app_user u
     JOIN shipping.user_type ut ON ut.user_type_code::text = u.user_type_code::text;

CREATE OR REPLACE VIEW shipping.app_zone_prices
AS SELECT zp.zone_price_id,
    zp.zone_code,
    zp.weight,
    zp.price,
    zp.created_by,
    zp.created_on,
    ac.city_name,
    ac.city_id
   FROM shipping.zone_price zp
     JOIN shipping.app_city ac ON ac.zone_code::text = zp.zone_code::text;

CREATE OR REPLACE VIEW shipping.customer_order_details
AS SELECT co.order_id,
	co.service_code,
	co.customer_id,
	co.sender_name,
	co.sender_mobile,
	co.sender_lat_lng,
	co.sender_city_id,
	co.deliver_to_name,
	co.deliver_to_mobile,
	co.deliver_to_lat_lng,
	co.deliver_to_city_id,
  ao.order_ref_key,
	ao.order_type,
	ao.order_weight,
	ao.order_price,
	ao.status_code,
  ao.order_date,
	ao.sender_date,
	ao.delivery_date
   FROM shipping.customer_order  co
     JOIN shipping.app_order ao ON ao.order_id::text = co.order_id::text




CREATE OR REPLACE VIEW shipping.customer_orders
AS SELECT ao.order_id,
    ao.order_ref_key,
    ao.order_type,
    ao.order_weight,
    ao.status_code,
    ao.order_price,
    ao.order_date,
    ao.sender_date,
    ao.delivery_date,
    c.customer_fullname,
    co.customer_id,
    co.sender_name,
    co.sender_mobile,
    co.sender_country_id,
    co.service_code,
    co.sender_lat_lng,
    co.sender_city_id,
    ( SELECT app_city.city_name  FROM shipping.app_city  WHERE app_city.city_id = co.sender_city_id) AS sender_city_name,
     ( SELECT app_country.country_name  FROM shipping.app_country  WHERE app_country.country_id = co.sender_country_id) AS sender_country_name,
    co.deliver_to_name,
    co.deliver_to_mobile,
    co.deliver_to_lat_lng,
    co.deliver_to_city_id,
    co.deliver_country_id,
    ( SELECT app_city.city_name  FROM shipping.app_city   WHERE app_city.city_id = co.deliver_to_city_id) AS deliver_to_city_name,
   ( SELECT app_country.country_name  FROM shipping.app_country  WHERE app_country.country_id = co.deliver_country_id) AS deliver_country_name
   FROM shipping.app_order ao
     JOIN shipping.customer_order co ON ao.order_id = co.order_id
     JOIN shipping.customer  c ON co.customer_id = c.customer_id
     JOIN shipping.app_city ac ON c.city_id = ac.city_id;


CREATE OR REPLACE VIEW shipping.suppliers
AS SELECT s.supplier_id,
    s.supplier_email ,
    s.supplier_fullname ,
    s.supplier_phone ,
    s.created_on,
    s.created_by,
    s.active,
    s.api_key ,
    s.uuid_key,
    ct.city_name,
    ac.country_name,
    s.city_id,
    s.country_id
   FROM shipping.supplier s
     JOIN shipping.app_city ct ON ct.city_id = s.city_id
     JOIN shipping.app_country ac ON ac.country_id = s.country_id;






CREATE OR REPLACE VIEW shipping.suppliers
AS SELECT s.supplier_id,
    s.supplier_email ,
    s.supplier_fullname ,
    s.supplier_phone ,
    s.created_on,
    s.created_by,
    s.active,
    s.api_key ,
    s.uuid_key,
    s.city_id,
    s.country_id,
    ( SELECT app_city.city_name  FROM shipping.app_city  WHERE app_city.city_id = s.city_id) AS city_name,
     ( SELECT app_country.country_name  FROM shipping.app_country  WHERE app_country.country_id = s.ountry_id) AS country_name
   FROM shipping.suppliers s
     JOIN shipping.app_country co ON s.country_id = co.country_id
     JOIN shipping.app_city ac ON s.city_id = ac.city_id;

-- shipping.customers source

CREATE OR REPLACE VIEW shipping.customers
AS SELECT c.customer_id,
    c.customer_email,
    c.customer_fullname,
    c.customer_phone_1,
    c.customer_phone_2,
    c.created_on,
    c.created_by,
    c.active,
    ct.city_name
   FROM shipping.customer c
     JOIN shipping.app_city ct ON ct.city_id = c.city_id;


CREATE OR REPLACE VIEW shipping.customers
AS SELECT cc.customer_id,
	cc.customer_fullname ,
	cc.customer_email ,
	cc.customer_phone_1 ,
	cc.customer_phone_2,
	cc.created_on,
	cc.created_by,
	cc.user_id,
  cc.active,
  cc.city_id,
  cc.country_id,
    ( SELECT app_city.city_name  FROM shipping.app_city  WHERE app_city.city_id = cc.city_id) AS city_name,
     ( SELECT app_country.country_name  FROM shipping.app_country  WHERE app_country.country_id = cc.country_id) AS country_name
   FROM shipping.customer cc
   JOIN shipping.app_city ac ON cc.city_id = ac.city_id;



   CREATE OR REPLACE VIEW shipping.supplier_orders
AS SELECT ao.order_id,
    ao.order_ref_key,
    ao.order_type,
    ao.order_weight,
    ao.status_code,
    ao.order_price,
    ao.order_date,
    ao.sender_date,
    ao.delivery_date,
    s.supplier_fullname,
    so.supplier_id,
    so.sender_name,
    so.sender_mobile,
    so.sender_country_id,
    so.service_code,
    so.sender_lat_lng,
    so.sender_city_id,
    ( SELECT app_city.city_name  FROM shipping.app_city  WHERE app_city.city_id = so.sender_city_id) AS sender_city_name,
     ( SELECT app_country.country_name  FROM shipping.app_country  WHERE app_country.country_id = so.sender_country_id) AS sender_country_name,
    so.deliver_to_name,
    so.deliver_to_mobile,
    so.deliver_to_lat_lng,
    so.deliver_to_city_id,
    so.deliver_country_id,
    ( SELECT app_city.city_name  FROM shipping.app_city   WHERE app_city.city_id = so.deliver_to_city_id) AS deliver_to_city_name,
   ( SELECT app_country.country_name  FROM shipping.app_country  WHERE app_country.country_id = so.deliver_country_id) AS deliver_country_name
   FROM shipping.app_order ao
     JOIN shipping.supplier_order so ON ao.order_id = so.order_id
     JOIN shipping.supplier  s ON so.supplier_id = s.supplier_id
     JOIN shipping.app_city ac ON s.city_id = ac.city_id;

