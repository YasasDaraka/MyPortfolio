$(document).ready(function() {
    $("#order-add-item").prop("disabled", true);
    $("#btnSubmitOrder").prop("disabled", true);
    $("#order-clear").prop("disabled", true);
    generateOrderId();
    $('#order-thead').css({
        'width': '100%',
        'display': 'flex'
    });
    $('#order-thead>th').css({
        'flex': '1',
        'max-width': 'calc(100%/5*1)'
    })
});
$("#btn-order,.order-nav").click(function (){
    setCusIds();
    setItemIds()
});
$("#order-clear,.order-nav").click(function (){
    clearAll();
});

function generateOrderId() {

    if (orderDB.length == 0) {
        $("#order-id").val("OID-0001");
    } else if (orderDB.length > 0) {
        var id = orderDB[orderDB.length - 1].oid.split("-")[1];
        var tempId = parseInt(id);
        tempId = tempId + 1;
        if (tempId <= 9) {
            $("#order-id").val("OID-000" + tempId);
        } else if (tempId <= 99) {
            $("#order-id").val("OID-00" + tempId);
        } else if (tempId <= 999) {
            $("#order-id").val("OID-0" + tempId);
        } else if (tempId <= 9999) {
            $("#order-id").val("OID-" + tempId);
        }
    }
}
function searchOrder(id) {
    return orderDB.find(function (order) {

        return order.oid == id;
    });
}
function setCusIds() {
    $("#cId").empty();
    customerDB.forEach(function (e) {
        let id = e.id;
        let select = `<option selected>${id}</option>`;
        $("#cId").append(select);
    });
}
$("#cId").change(function () {
    $(this).val($(this).val());
    var customer = searchCustomer($(this).val());
    $("#cName").val(customer.name);
    $("#cAddress").val(customer.address);
    $("#cSalary").val(customer.salary);

    setAndTriggerValue($("#cName"), customer.name);
    setAndTriggerValue($("#cAddress"), customer.address);
    setAndTriggerValue($("#cSalary"), customer.salary);
    dateCheck();
});
function setItemIds() {
    $("#icode").empty();
    itemDB.forEach(function (e) {
        let id = e.id;
        let select = `<option selected>${id}</option>`;
        $("#icode").append(select);
    });
}
$("#icode").change(function () {
    $(this).val($(this).val());
    var item = searchItem($(this).val());
    $("#itemName").val(item.name);
    $("#price").val(item.price);
    $("#qtyOnHand").val(item.qty);

    setAndTriggerValue($("#itemName"), item.name);
    setAndTriggerValue($("#price"), item.price);
    setAndTriggerValue($("#qtyOnHand"), item.qty);
    dateCheck();
});
function placeOrder() {
    let order = {
        oid: "",
        date: "",
        customerID: "",
        orderDetails: []
    };

    let cusId = $("#cId").val();
    let date = $("#order-date").val();
    let OId = $("#order-id").val();

    $('#order-table>tr').each(function () {
        let code = $(this).children().eq(0).text();
        let qty = $(this).children().eq(3).text();
        let price = $(this).children().eq(2).text();
        let orderDetails = {
            oid: OId,
            code: code,
            qty: parseInt(qty),
            unitPrice: parseFloat(price)
        };

        order.orderDetails.push(orderDetails);
        orderDetailsDB.push(orderDetails);
    });

    order.oid = OId;
    order.date = date;
    order.customerID = cusId;
    orderDB.push(order);
}

$("#order-add-item").click(function () {
    let id = $("#icode").val();
    let name = $("#itemName").val();
    let price = $("#price").val();
    let qty = $("#orderQty").val();
    let total = parseFloat(price) * parseFloat(qty);
    let allTotal = 0;
    let itemExists = false;

    $('#order-table>tr').each(function (e) {
       let check =$(this).children().eq(0).text();
        if (id === check){
           let liQty = $(this).children().eq(3).text();
           let upQty = parseInt(liQty)+parseInt(qty);
            $(this).children().eq(1).text(name);
            $(this).children().eq(2).text(price);
            $(this).children().eq(3).text(upQty);
            $(this).children().eq(4).text(upQty * parseFloat(price));
            itemExists = true;
            return false;
        }
    });

    if (!itemExists){
        let row = `<tr>
                     <td>${id}</td>
                     <td>${name}</td>
                     <td>${price}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;

        $("#order-table").append(row);
        $('#order-table').css({
            'width ': '101.8%',
            'max-height': '80px',
            'overflow-y': 'auto',
            'display': 'table-caption'
        });
        $('#order-table>tr>td').css({
            'flex': '1',
            'max-width': 'calc(100%/5*1)'
        });
        if ($("#order-table>tr").length > 1) {
            $('#order-table>tr').css({
                'width': '100%',
                'display': 'flex'
            });
        } else {
            $('#order-table>tr').css({
                'width': '925px',
                'display': 'flex'
            });
        }

    }
    $('#order-table>tr').each(function (e) {
            let full = $(this).children().eq(4).text();
            allTotal += parseFloat(full);
    });
    $("#total").text(allTotal);
    $("#subtotal").text(allTotal);
});
$("#txtDiscount").on("keydown keyup input", function (e){
    let total = parseFloat($("#total").text());
    if(total>0){
        let discount = $(this).val();
        let fullAm = (total/100*discount);
        total -= fullAm;
        $("#subtotal").text(total);
        setAndTriggerValue($("#subtotal"),total );
    }

});
$("#txtCash").on("keydown keyup input", function () {
    cashValidate();
    setBalance();
});
$("#subtotal").on("input", function () {
    cashValidate();
});
function setBalance() {
    let subtotalText = $("#subtotal").text();
    let cashText = $("#txtCash").val();
    let subtotal = parseFloat(subtotalText);
    let cash = parseFloat(cashText);
    if (!isNaN(subtotal) && !isNaN(cash)) {
        let balance = cash - subtotal;
        $("#txtBalance").val(balance.toFixed(2));
    } else {
        $("#txtBalance").val("0");
    }
}
$("#order-date").on("input", function () {
    dateCheck();
});
function dateCheck() {
    let val = $("#order-date").val();
    if (val==""){
        $("#order-date").css("border", "2px solid red");
        return false
    }else {
        $("#order-date").css("border", "2px solid green");
        return true;
    }
}
$("#btnSubmitOrder").click(function () {
    let oId = $("#order-id").val();
    if (itemValidate()) {
        if (!searchOrder(oId)) {
            if (cashValidate()) {
                if (dateCheck()) {
                    placeOrder();
                    alert("Order Place Successfully");
                    clearAll();
                    generateOrderId();
                } else {
                    alert("Insert Date!");
                }
            } else {
                alert("Insuficent Credit : Check Cash!");
            }
        } else {
            alert("Order Already Registered");
        }
    }else {
        alert("Pleace Add Items to Place Order");
    }
});
$("#order-id").on("keydown", function (e) {
    $("#order-table").empty();
    if (e.keyCode === 13) {
       let id =$("#order-id").val();
           orderDB.find(function (order) {
               if (order.oid == id) {
                   $("#order-table").empty();
                   let date = order.date;
                   let cusId = order.customerID;
                   let orderDetails = order.orderDetails;
                   let cusName ;
                   let address;
                   let salary;
                   customerDB.find(function (customer) {
                       if (customer.id == cusId) {
                          cusName=customer.name;
                          address=customer.address;
                          salary=customer.salary;
                       }
                   });

                   $("#cId").val(cusId);
                   $("#cName").val(cusName);
                   $("#cAddress").val(address);
                   $("#cSalary").val(salary);
                   $("#order-date").val(date);

                   let code;
                   let qty;
                   let unitPrice;
                   let itemName;
                   orderDetails.forEach(function (detail) {
                       console.log(detail.oid, detail.code, detail.qty, detail.unitPrice);
                       code=detail.code;
                       qty=detail.qty;
                       unitPrice=detail.unitPrice;
                       itemDB.find(function (item) {
                           if (item.id == code) {
                               itemName=item.name;
                           }
                       });
                       let total = parseFloat(unitPrice) * parseFloat(qty);
                       let row = `<tr>
                     <td>${code}</td>
                     <td>${itemName}</td>
                     <td>${unitPrice}</td>
                     <td>${qty}</td>
                     <td>${total}</td>
                    </tr>`;
                       $("#order-table").append(row);
                       $('#order-table').css({
                           'width ': '101.8%',
                           'max-height': '80px',
                           'overflow-y': 'auto',
                           'display': 'table-caption'
                       });
                       $('#order-table>tr>td').css({
                           'flex': '1',
                           'max-width': 'calc(100%/5*1)'
                       });
                       if ($("#order-table>tr").length > 1) {
                           $('#order-table>tr').css({
                               'width': '100%',
                               'display': 'flex'
                           });
                       } else {
                           $('#order-table>tr').css({
                               'width': '925px',
                               'display': 'flex'
                           });
                       }
                   });
               }
               else {
                   alert("Order not Registered");
               }
           });
    }
});