//If new of a worker's competence occurs, the change in API Personnel Competency
// is notified.

var arr = [];
var ActualDate = new Date(rbv_api.getCurrentDate());
// When making a change in the competence of a worker you have the identification of the worker through
// the relationship between Personnel and Personnel Competency

var CompetencyID =  "{!R148251#value}"; 

var employeeNo = rbv_api.getRelatedFields("R6739733","{!id}", "Employee_Number");

rbv_api.println ("employeeNo " + employeeNo[0]);
// Seleccionar el ID del API Personnel para asignarle el valor a la relación R6739733 y asi establecer
// la relación entre API Personnel y API Personnel Competency
var employeeID = rbv_api.selectQuery("SELECT id FROM API_Personnel_Competency WHERE name#value='" + employeeNo + "'", 1);

rbv_api.println ("longitud " + employeeID.length);

if (employeeID.length > 0){
    arr.Competency_Code     = CompetencyID; 
    arr.name        = "{!name#value}";
    arr.Date_Transfer       = ActualDate;
    arr.Expiration_Date     = "{!Expiration_Date_Expression}";
    arr.Operation           = "I";
    arr.Sent                = "1"; 

    rbv_api.println ("arr.Competency_Code " + arr.Competency_Code);
    rbv_api.println ("arr.name " + arr.name);
    rbv_api.println ("arr.Date_Transfer " + arr.Date_Transfer);
    rbv_api.println ("arr.Expiration_Date " + arr.Expiration_Date); 
    rbv_api.println ("arr.Operation " + arr.Operation);
    rbv_api.println ("arr.Sent " + arr.Sent);

    rbv_api.updateRecord("API_Personnel_Competency", employeeID, arr);
    
    rbv_api.println ("update personnel competency ");
  }