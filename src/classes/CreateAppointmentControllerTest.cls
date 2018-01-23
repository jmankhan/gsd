@isTest
private class CreateAppointmentControllerTest {
	private static final Datetime START_TIME = Datetime.newInstance(2000, 1, 1, 1, 0, 0);

    static testMethod void testGetLeadByIdSuccess() {
        User owner = getUser();
        Lead expected = getLead(owner.Id);
        
        Test.startTest();
        Lead actual = CreateAppointmentController.getLeadById(expected.Id);
        Test.stopTest();
        
        System.assertEquals(expected.Id, actual.Id);
        System.assertEquals(expected.FirstName, actual.FirstName);
        System.assertEquals(expected.LastName, actual.LastName);
        System.assertEquals(expected.Phone, actual.Phone);
        System.assertEquals(expected.Email, actual.Email);
        System.assertEquals(expected.OwnerId, actual.OwnerId);
    }
    
    static testMethod void testGetLeadByIdNull() {
        Test.startTest();
        Lead actual = CreateAppointmentController.getLeadById(null);
        Test.stopTest();
        System.assertEquals(null, actual);
    }
    
    static testMethod void testGetLeadOwnerByIdSuccess() {
        User expected = getUser();
        Lead testLead = getLead(expected.Id);
        
        Test.startTest();
        User actual = CreateAppointmentController.getLeadOwnerById(testLead.Id);
        Test.stopTest();
        
        System.assertEquals(expected.Id, actual.Id);
    }
    
    static testMethod void testGetLeadOwnerByIdNull() {
        Test.startTest();
        User actual = CreateAppointmentController.getLeadOwnerById(null);
        Test.stopTest();
        System.assertEquals(null, actual);
    }

    static testMethod void testGetAppointmentsInDateRange() {
		User owner = getUser();
        Lead testLead = getLead(owner.Id);
        List<Appointment__c> expected = createAppointments(testLead.Id, owner.Id);
        
        Datetime endTime = START_TIME.addDays(expected.size()).addHours(1);
        
        Test.startTest();
        List<Appointment__c> actual = CreateAppointmentController.getAppointmentsInDateRange(START_TIME, endTime);
        Test.stopTest();
        
        System.assertEquals(expected.size(), actual.size());
        for(Integer i=0; i<actual.size(); i++) {
        	System.assertEquals(expected[i].Name, actual[i].Name);
            System.assertEquals(expected[i].Start_Time__c, actual[i].Start_Time__c);
            System.assertEquals(expected[i].End_Time__c, actual[i].End_Time__c);
        }
    }
    
    static testMethod void testGetAppointmentsInDateRangeNull() {
        Test.startTest();
        List<Appointment__c> actual = CreateAppointmentController.getAppointmentsInDateRange(null, null);
        Test.stopTest();
        System.assertEquals(null, actual);
    }
    
    static testMethod void testGetAppointmentsInDateRangeInvalidStartEnd() {
		Datetime endTime = START_TIME.addDays(100);
        Test.startTest();
        List<Appointment__c> actual = CreateAppointmentController.getAppointmentsInDateRange(endTime, START_TIME);
        Test.stopTest();
        System.assertEquals(null, actual);
    }
    
    static testMethod void testGetTestData() {
    	//method should be removed for production use, but we'll keep it in for this toy example
    	
        Test.startTest();
        List<Appointment__c> actual = CreateAppointmentController.getTestData(getLead(getUser().Id).Id);
        Test.stopTest();
        
        System.assertNotEquals(null, actual);
        System.assert(!actual.isEmpty());
    }
    
    static testMethod void testSaveAppointments() {
        User owner = getUser();
        Lead testLead = getLead(owner.Id);
        
    	List<Appointment__c> apps = createAppointments(testLead.Id, owner.Id);
        Test.startTest();
        Boolean success = CreateAppointmentController.saveAppointments(apps);
        Test.stopTest();
        System.assert(success);
    }
    
    private static List<Appointment__c> createAppointments(Id leadId, Id ownerId) {
        List<Appointment__c> apps = new List<Appointment__c>();
        for(Integer i=0; i<10; i++) {
            Appointment__c app = new Appointment__c(
                Name='Appointment ' + i,
                Start_Time__c=START_TIME.addDays(i),
                End_Time__c=START_TIME.addDays(i).addHours(1),
                Lead__c=leadId,
                OwnerId=ownerId,
                Status__c='Busy',
                Subject__c='Appointment');
            apps.add(app);
        }
    	insert apps;
    	return apps;
    }
    
    private static Lead getLead(Id ownerId) {
    	Lead expected = new Lead(
            Company='Test Company',
        	FirstName='Test',
            LastName='Lead',
            Phone='1231231234',
            Email='test@test.com',
            Street='123 Test St',
            City='NYC',
            State='NY',
            PostalCode='12345',
            OwnerId=ownerId
        );
        upsert expected;    
        return expected;
    }
    
    private static User getUser() {
		Profile profileId = [SELECT Id FROM Profile WHERE Name = 'Standard User' LIMIT 1];
        List<User> users = [Select Id From User Where Username='test@test.com' Limit 1];
        if(users.isEmpty()) {
			users.add(new User(LastName = 'Test',
                     FirstName='Test',
                     Alias = 'test',
                     Email = 'test@gsd.com',
                     Username = 'test@gsd.com',
                     ProfileId = profileId.id,
                     TimeZoneSidKey = 'GMT',
                     LanguageLocaleKey = 'en_US',
                     EmailEncodingKey = 'UTF-8',
                     LocaleSidKey = 'en_US'
                     ));
        	insert users;
        }
        return users[0];
    }
}