// import { getParsedCommandLineOfConfigFile } from "typescript";
import { getMaxListeners } from "process";

export default{
    userListQuery : `
      SELECT USER_ID , USERNAME , FULL_NAME , EMAIL , USER_TYPE_CODE, ACTIVE
      , CREATED_BY  , CREATED_ON
      FROM shipping.app_user
  `,
    checkEmailQuery : `
      SELECT  "email" FROM shipping.app_user WHERE lower(Email) = lower($1)`
    ,
    checkCustomerFullnameQuery : `
    SELECT  "customer_fullname" FROM shipping.customer WHERE lower(Customer_fullname)  = lower($1)`
  ,
  checkSupplierFullnameQuery: `
  SELECT  "supplier_fullname" FROM shipping.supplier WHERE lower(Supplier_fullname)  = lower($1)`
,
    checkUserIdQuery : `
    SELECT  user_id FROM shipping.app_user WHERE user_id = ($1)`
    ,
    createUserQuery :  `
      INSERT INTO shipping.app_user(username ,full_name , email ,password, user_type_code, created_on  , created_by) VALUES($1, $2, $3, $4, $5 ,$6, $7);
   `,
   verification :  `
   INSERT INTO shipping.verification( token ,email) VALUES($1, $2);
`,
   updateUserQuery:
     `UPDATE shipping.app_user SET USERNAME = $1, FULL_NAME =$2, EMAIL =$3 , USER_TYPE_CODE =$4 , updated_on =$5, updated_by =$6 where user_id = $7`
   ,
   updateUserPasswordQuery:
   `UPDATE shipping.app_user SET password = $1 where email = $2`
 ,
    enableDisableUserQuery:
      `UPDATE shipping.app_user SET active = $1, updated_on =$2, updated_by =$3 where user_id = $4`
    ,
    roleCheckQuery : `
       SELECT role_name FROM shipping.app_role where role_name = $1;
     `,
    roleCreateQuery : `
       INSERT INTO shipping.app_role (role_name,created_by,created_on) VALUES($1,$2,$3);
    `,
    roleListQuery : `
       SELECT role_id, role_name FROM shipping.app_role;
    `,
    updateRoleQuery:
      `UPDATE shipping.app_role SET role_name = $1, updated_by =$2, updated_On =$3  where role_id = $4`
   ,
    roleGroupCheckQuery:`
      SELECT role_id FROM shipping.group_role where role_id= $1 AND (group_id= $2);`
   ,
    roleGroupCreateQuery : `
      INSERT INTO shipping.group_role (role_id,group_id, created_by,created_on) VALUES($1,$2,$3,$4);
    `,
    listGroupWithRolesQuery : `
      SELECT shipping.app_group.group_name , shipping.app_role.role_name,shipping.app_group.group_id , shipping.app_role.role_id
      FROM shipping.group_role
      INNER JOIN  shipping.app_group ON  shipping.app_group.group_id=shipping.group_role.group_id
      INNER JOIN shipping.app_role ON shipping.app_role.role_id=shipping.group_role.role_id
      ;
    `,
     enableDisableRoleQuery:
     `UPDATE shipping.app_role SET active = $1, updated_on =$2, updated_by =$3 where role_id = $4`
     ,
     roleIdCheckQuery : `
       SELECT role_id FROM shipping.app_role where role_id = $1;
     `,

  findUserByIdQuery : `
      SELECT  user_id ,username ,email ,full_name , user_type_code,password,updated_on, active FROM shipping.app_user WHERE user_id =$1;
   `,
   findUserByEmailQuery : `
   SELECT  user_id ,username ,email ,full_name , user_type_code,password,updated_on, active FROM shipping.app_user WHERE email =$1;
`,
   findUserByTokenQuery : `
   SELECT verification_id ,email  FROM shipping.verification WHERE token =$1;
`,


  // MH - change password
  userPasswordQuery : `
      SELECT  "password"
      FROM shipping.app_user WHERE USER_ID = $1
  `,
  // MH - change password
  userPasswordUpdateQuery : `
  UPDATE shipping.app_user SET "password"=$1 WHERE  USER_ID = $2
`,
  // MH -  create group
  groupCreateQuery : `
  INSERT INTO shipping.app_group (group_name) VALUES($1);
`,
  // MH - update group
  groupUpdateQuery : `
  UPDATE shipping.app_group  SET group_name=$1  WHERE group_id=$2
`,
  // MH - get group
  groupListQuery : `
  SELECT group_id, group_name FROM shipping.app_group;
`,
  // MH - get group
  groupSearchQuery : `
  SELECT group_id, group_name FROM shipping.app_group where group_name = $1;
`,
deleteUser : `
    DELETE FROM shipping.app_user
    WHERE user_id= $1;
  `,

loginQuery : `SELECT user_id, username, password, email, user_type_code, full_name
              FROM shipping.app_user WHERE Lower(email) = lower($1) AND active = 1 ;
`,
customerListQuery : `
      SELECT customer_id , customer_fullname, customer_email, customer_phone_1, customer_phone_2, created_on, created_by,active,city_name,country_name ,city_id,country_id
      FROM shipping.customers
  `,
  createCustomerQuery :  `
  INSERT INTO shipping.customer
(customer_fullname, customer_email, customer_phone_1, customer_phone_2, created_on, created_by,city_id,country_id,user_id)
 VALUES($1, $2, $3, $4, $5 ,$6,$7,$8 ,$9);
`,

checkEmailCustomerQuery : `
      SELECT  "customer_email" FROM shipping.customer WHERE lower(customer_email) = lower($1)`
    ,
checkCustomerIdQuery : `
    SELECT  customer_id FROM shipping.customer WHERE customer_id = ($1)`
,
updateCustomerQuery:
     `UPDATE shipping.customer SET customer_fullname = $2, customer_email =$3,  customer_phone_1 =$4 , customer_phone_2 =$5 , created_on =$6, created_by =$7, city_id= $8 where customer_id = $1`
,

findUsersByMonth:
`SELECT extract(month from created_on) as month, count(*) from shipping.app_user
  group by extract(month from created_on)`
,

findCustomersByMonth:
`SELECT extract(month from created_on) as month, count(*) from shipping.customer
group by extract(month from created_on)`,

findOrdersByMonth:
   `SELECT EXTRACT(month FROM order_date) "Month", count(*)
   FROM shipping.app_order
   WHERE EXTRACT(YEAR FROM order_date) = $1
   GROUP BY EXTRACT(month FROM order_date)
   ORDER BY EXTRACT(month FROM order_date);`,

//orders
createOrderQuery :  `
INSERT INTO shipping.app_order(
order_ref_key, order_type ,order_weight, order_price, status_code  , order_date, sender_date, delivery_date
  ) VALUES($1, $2, $3, $4, $5 ,$6, $7 ,$8);
`,

updatOrderQuery:
`UPDATE shipping.app_order  SET status_code= $1 where order_id = $2`,
createCustomerOrderQuery :  `
INSERT INTO shipping.customer_order(
 order_id, service_code , customer_id ,sender_name, sender_mobile, sender_lat_lng  , sender_city_id, deliver_to_name, deliver_to_mobile, deliver_to_lat_lng,
  deliver_to_city_id,sender_country_id,deliver_country_id
  ) VALUES($1, $2, $3, $4, $5 ,$6, $7 ,$8,$9, $10 ,$11,$12,$13  );
`,

createSupplierOrderQuery :  `
INSERT INTO shipping.supplier_order(
 order_id, service_code , supplier_id ,sender_name, sender_mobile, sender_lat_lng  , sender_city_id, deliver_to_name, deliver_to_mobile, deliver_to_lat_lng,
  deliver_to_city_id,sender_country_id,deliver_country_id
  ) VALUES($1, $2, $3, $4, $5 ,$6, $7 ,$8,$9, $10 ,$11,$12,$13  );
`,

  customerOrdersListQuery:`
  SELECT   order_ref_key,order_id,  order_type,service_code , status_code, order_weight, order_price, order_date, sender_date, delivery_date, customer_fullname, customer_id, sender_name,
  sender_mobile, sender_lat_lng,sender_city_id,sender_city_name, deliver_to_name,deliver_to_mobile, deliver_to_lat_lng,deliver_to_city_id, deliver_to_city_name
        FROM shipping.customer_orders where customer_id = $1`,

  supplierOrdersListQuery:`
  SELECT   order_ref_key,order_id,  order_type,service_code , status_code, order_weight, order_price, order_date, sender_date, delivery_date, supplier_fullname, supplier_id, sender_name,
  sender_mobile, sender_lat_lng,sender_city_id,sender_city_name, deliver_to_name,deliver_to_mobile, deliver_to_lat_lng,deliver_to_city_id, deliver_to_city_name
        FROM shipping.supplier_orders where supplier_id = $1`,

  customersOrdersListQuery:`
  SELECT order_type,service_code , order_id , order_ref_key ,status_code, order_weight, order_price, order_date, sender_date, delivery_date, customer_fullname, customer_id, sender_name,
  sender_mobile, sender_lat_lng,sender_city_id,sender_city_name,  sender_country_name , deliver_country_name ,deliver_to_name,deliver_to_mobile, deliver_to_lat_lng,deliver_to_city_id, deliver_to_city_name
        FROM shipping.customer_orders `,

  supliersOrdersListQuery:`
  SELECT order_type,service_code , order_id , order_ref_key ,status_code, order_weight, order_price, order_date, sender_date, delivery_date, supplier_fullname, supplier_id, sender_name,
  sender_mobile, sender_lat_lng,sender_city_id,sender_city_name,  sender_country_name , deliver_country_name ,deliver_to_name,deliver_to_mobile, deliver_to_lat_lng,deliver_to_city_id, deliver_to_city_name
        FROM shipping.supplier_orders `,

  getCountriesCodeQuery:`
  SELECT phoneCode,flag , country_code_id ,arCountryName FROM shipping.country_code `,
  getCustomerIdByNameQuery:`
  SELECT customer_id  FROM shipping.customer where customer_fullname= $1`,
  getSupplierIdByNameQuery:`
  SELECT supplier_id  FROM shipping.supplier where supplier_fullname= $1`,
  cityQuery:`
  SELECT city_id, city_name  FROM shipping.app_city;
  `,
  countryQuery:`
  SELECT country_id, country_name  FROM shipping.app_country;
  `,
  getCitiesByCountry :`
  SELECT city_id, city_name  FROM shipping.app_city WHERE country_id= $1;
  `,
 orderStatusQuery:`
  SELECT order_status_name, order_status_code  FROM shipping.order_status;
  `,
   orderTypeQuery:`
  SELECT order_type_name, order_type_code  FROM shipping.order_type;
  `,


UserIdQuery:`
    SELECT "user_id" FROM shipping.app_user WHERE email = $1;
`,
enableDisableCustomerQuery:`
      UPDATE shipping.customer SET active = $1, created_on =$2, created_by =$3 where customer_id = $4`
,

checkUserIdQuery : `
    SELECT  customer_id FROM shipping.customer WHERE customer_id = ($1)`
,
SupplierListQuery : `
      SELECT supplier_id , supplier_fullname, supplier_email, supplier_phone,
      created_on, created_by, active, city_name,api_key, uuid_key ,country_name
      FROM shipping.suppliers
  `,
checkSupplierEmailQuery : `
  SELECT  "supplier_email" FROM shipping.supplier WHERE supplier_email = lower($1)`
,
createSupplierQuery :  `
INSERT INTO shipping.supplier(supplier_fullname,supplier_email,supplier_phone,created_on,created_by,city_id,country_id) VALUES($1, $2, $3, $4, $5,$6,$7);
`,
checkSupplierIdQuery : `
    SELECT  supplier_id FROM shipping.supplier WHERE supplier_id = ($1)`
,
updateSupplierQuery:
     `UPDATE shipping.supplier SET supplier_fullname = $2, supplier_email =$3,  supplier_phone =$4 , created_on =$5, created_by =$6, city_id= $7 , country_id= $8 where supplier_id = $1`
,
checkSupplierIdQuery : `
    SELECT  supplier_id FROM shipping.supplier WHERE supplier_id = ($1)`
,
enableDisableSupplierQuery:
      `UPDATE shipping.supplier SET active = $1, created_on =$2, created_by =$3 where supplier_id = $4`
,
generateApiKeySupplierQuery:
      `UPDATE shipping.supplier SET  uuid_key =$2, api_key =$3 where supplier_id = $1`
,
citiesListQuery:
  `SELECT city_id, city_name FROM shipping.app_city;` ,

orderIdQuery:`
    SELECT "order_id" FROM shipping.app_order WHERE order_ref_key = $1;
`,

cityIdQuery:`
    SELECT "city_id" FROM shipping.app_city WHERE city_name= $1;
`,
}

