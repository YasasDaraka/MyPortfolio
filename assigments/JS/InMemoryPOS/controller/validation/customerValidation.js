const CUS_ID_REGEX = /^(C00-)[0-9]{4}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{7,}$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let c_vArray = new Array();
c_vArray.push({field: $("#cusID"), regEx: CUS_ID_REGEX ,error: $("#cusIDError")});
c_vArray.push({field: $("#cusName"), regEx: CUS_NAME_REGEX ,error: $("#cusNameError")});
c_vArray.push({field: $("#cusAddress"), regEx: CUS_ADDRESS_REGEX ,error: $("#cusAddressError")});
c_vArray.push({field: $("#cusSalary"), regEx: CUS_SALARY_REGEX ,error: $("#cusSalaryError")});

function clearCustomerInputFields() {
    $("#cusID,#cusName,#cusAddress,#cusSalary").val("");
    $("#cusID,#cusName,#cusAddress,#cusSalary").css("border", "1px solid #ced4da");
    $("#cusID").focus();
    setBtn();
}

setBtn();
function setClBtn(){
    if ($("#cusID,#cusName,#cusAddress,#cusSalary").val()==""){
        $("#cusClear").prop("disabled", true);
    }else{
        $("#cusClear").prop("disabled", false);
    }
}
$("#cusID,#cusName,#cusAddress,#cusSalary").on("keydown keyup", function (e) {

    setClBtn();
    let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab") {
        e.preventDefault();
    }

    checkValidations(c_vArray[indexNo]);

    setBtn();

    if (e.key == "Enter") {

        if (e.target.id != c_vArray[c_vArray.length - 1].field.attr("id")) {
            if (checkValidations(c_vArray[indexNo])) {
                c_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(c_vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
});


function checkValidations(object) {
    if (object.regEx.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
            let check = ob.field.attr('id');
            switch (check) {
                case "cusID" : ob.error.text("cus-Id is a required field: C00-000"); break
                case "cusName" : ob.error.text("cus-Name is a required field: Minimum 5,Max 20,Spaces Allowed"); break
                case "cusAddress" : ob.error.text("cus-Address is a required field: Minimum 7"); break
                case "cusSalary" : ob.error.text("cus-Salary is a required field: Pattern 100.00 or 100"); break
            }
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
            ob.error.text("");
        } else {
            ob.field.css("border", "1px solid #ced4da");
            ob.error.text("");
        }
    }

}

function checkAll() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkValidations(c_vArray[i])) return false;
    }
    return true;
}

function setBtn() {
    setClBtn();
    $("#cusDelete").prop("disabled", true);
    $("#cusUpdate").prop("disabled", true);
    let id = $("#cusID").val();

    if (searchCustomer(id) == undefined) {
        $("#cusDelete").prop("disabled", true);
        $("#cusUpdate").prop("disabled", true);
        if (checkAll()) {
            $("#cusSave").prop("disabled", false);
        } else {
            $("#cusSave").prop("disabled", true);
        }
    }else{
        $("#cusDelete").prop("disabled", false);
        if (checkAll()) {
            $("#cusUpdate").prop("disabled", false);
        } else {
            $("#cusUpdate").prop("disabled", true);
        }
    }

}