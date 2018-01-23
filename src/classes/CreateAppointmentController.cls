public class CreateAppointmentController {

    /*
     * Returns a lead that matches the given id
     */
    @AuraEnabled
    public static Lead getLeadById(Id leadId) {
        if(leadId == null) {
            return null;
        }
        
        List<Lead> leadInfo = [
            Select 
				Address,
            	FirstName,
            	LastName,
            	Owner.Name,
            	Email,
            	Phone
            From Lead
            Where Id=:leadId
            Limit 1];
        
        return leadInfo[0];
    }
    
    /*
     * Returns a User that is the owner of the given lead Id.
     * Since a Lead can only have one OwnerId, we can use "In" safely
     * to return a single result in the subquery
     */ 
    @AuraEnabled
    public static User getLeadOwnerById(Id leadId) {
        if(leadId == null) {
            return null;
        }
        
        User leadOwner = [
            Select  Id,
            		FirstName,
            		LastName,
            		Phone,
            		Email
            From User
            Where Id In (Select OwnerId From Lead Where Id=:leadId)];
        
        return leadOwner;
    }
    
    /*
     * Returns all appointments that occur after the start datetime and before the end datetime 
     */
    @AuraEnabled
    public static List<Appointment__c> getAppointmentsInDateRange(Datetime start, Datetime finish) {
        if(start == null || finish == null || finish < start) {
            return null;
        }
        
        List<Appointment__c> appointments = [
            Select Id,
            		Start_Time__c,
            		End_Time__c,
            		Name,
            		Subject__c,
            		Status__c,
            		Lead__c,
            		OwnerId	
            From Appointment__c
            Where Start_Time__c >= :start
            And End_Time__c <= :finish
        ];
        
        return appointments;
    }
    
    @AuraEnabled
    public static Boolean saveAppointments(List<Appointment__c> appointments) {
        System.debug('received appointments: ' + appointments);
        List<Appointment__c> updateList = new List<Appointment__c>();
        List<Appointment__c> insertList = new List<Appointment__c>();
        for(Appointment__c app : appointments) {
            if(app.Id != null) {
                updateList.add(app);
            }
            else {
                insertList.add(app);
            }
        }
        update updateList;
        insert insertList;
        Id leadId = appointments.get(0).Lead__c;
        
        Database.LeadConvert converter = new Database.LeadConvert();
        converter.setLeadId(leadId);
        
        LeadStatus status = [Select Id, MasterLabel From LeadStatus Where IsConverted=true Limit 1];
        converter.setConvertedStatus(status.MasterLabel);
        
        Database.LeadConvertResult result = Database.convertLead(converter);
        System.debug('***conversion was successful');
        Id whatId = result.opportunityid;
        Id whoId = result.contactid;
        return true;
    }
    
    /*
     * Test data
     */
    @AuraEnabled
    public static List<Appointment__c> getTestData(Id leadId) {
        Appointment__c singleAppointment = new Appointment__c(
        	Name='Test Appointment',
        	Subject__c='Appointment',
        	Start_Time__c=Datetime.now(),
        	End_Time__c=Datetime.now().addHours(1),
            Lead__c=leadId,
        	OwnerId=UserInfo.getUserId(),
        	Status__c='Busy');

        upsert singleAppointment;
        
        return [
            Select Id,
            		Name,
            		Subject__c,
            		Start_Time__c,
            		End_Time__c,
            		Status__c,
            		Owner.Name,
            		Lead__r.Name,		
            		Lead__r.Address,
            		Lead__r.Email,
            		Lead__r.Phone
        	From Appointment__c
        	Where Id=:singleAppointment.Id];
    }
}