var customerDB = new Array();
var itemDB = new Array();
var orderDB = new Array();
var orderDetailsDB = new Array();

let newCustomer1 = Object.assign({}, customer);

newCustomer1.id = "C00-0001";
newCustomer1.name = "Yasas";
newCustomer1.address = "customerAddress";
newCustomer1.salary = "1000";
customerDB.push(newCustomer1);

// Second customer
let newCustomer2 = Object.assign({}, customer);
newCustomer2.id = "C00-0002";
newCustomer2.name = "Another Name";
newCustomer2.address = "Another Address";
newCustomer2.salary = "1000";
customerDB.push(newCustomer2);

let newItem1 = Object.assign({}, item);
newItem1.id = "I00-0001";
newItem1.name = "Butter";
newItem1.qty = "100";
newItem1.price = "1000";
itemDB.push(newItem1);

// Second customer
let newItem2 = Object.assign({}, item);
newItem2.id = "I00-0002";
newItem2.name = "Banana";
newItem2.qty = "100";
newItem2.price = "1000";
itemDB.push(newItem2);



