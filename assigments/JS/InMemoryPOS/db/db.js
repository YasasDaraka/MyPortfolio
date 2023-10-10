var customerDB = new Array();
var itemDB = new Array();
var orderDB = new Array();
var orderDetailsDB = new Array();

let newCustomer1 = Object.assign({}, customer);

newCustomer1.id = "C00-0001";
newCustomer1.name = "Yasas";
newCustomer1.address = "Hikkaduwa";
newCustomer1.salary = "100000";
customerDB.push(newCustomer1);

let newCustomer2 = Object.assign({}, customer);
newCustomer2.id = "C00-0002";
newCustomer2.name = "Daraka";
newCustomer2.address = "Hikkaduwa";
newCustomer2.salary = "100000";
customerDB.push(newCustomer2);

let newItem1 = Object.assign({}, item);
newItem1.id = "I00-0001";
newItem1.name = "Watermelon";
newItem1.qty = "50";
newItem1.price = "100";
itemDB.push(newItem1);

let newItem2 = Object.assign({}, item);
newItem2.id = "I00-0002";
newItem2.name = "Banana";
newItem2.qty = "1000";
newItem2.price = "100";
itemDB.push(newItem2);



