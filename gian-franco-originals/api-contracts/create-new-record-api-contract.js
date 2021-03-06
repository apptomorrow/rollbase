var arr = new Array();

var ActualDate = new Date(rbv_api.getCurrentDate());

//var customerName = "{!R124988.name#value}";
var contractName = "{!Contract_Name#value}";

//Se selecciona el campo name atraves de la relacion Customer-Contract, pasando el id del contrato
var customerName = rbv_api.getRelatedFields("R124988","{!id}", "name");

//Se selecciona el id en el objeto API_CUSTOMER para agregarla al campo R6894611(RELACION API_Contract - API_Customer), ya que este no puede ir nulo
var apiCustomerId = rbv_api.selectQuery("SELECT id FROM API_Customer1 WHERE name#value='" + customerName[0] + "'", 1);

//si el registro del cliente existe en el objeto API_CUSTOMER
if (apiCustomerId.length > 0) {

    arr["name"] = "{!name#value}";
    arr["Contract_Detail"] = "{!Description}";
    arr["Contract_Name"] = "{!Contract_Name}";
    arr["R6894611"] = [apiCustomerId[0][0]]; //API Customer - APi Contract relationship
    arr["Valid_From"] =new Date("{!Starting_Date}");
    arr["Valid_To"] = new Date("{!Expiration_Date}");
    arr["Date_Transfer"] = ActualDate;
    arr["Sent"] = "True";

    // if updates record
    if (rbv_api.isUpdate()) {

        arr["Operation"] = "U";
        rbv_api.println("update contract");
        var contractId = rbv_api.selectQuery("SELECT id FROM API_Contract1 WHERE Contract_Name= '" + contractName + "'", 1);


        if (contractId.length > 0) {
            rbv_api.updateRecord("API_Contract1", contractId[0][0], arr);
        }

      // if creates record
    } else if (rbv_api.isCreate()){

          arr["Operation"] = "I";
          rbv_api.println("create contract");
          rbv_api.createRecord("API_Contract1", arr);
    }
}