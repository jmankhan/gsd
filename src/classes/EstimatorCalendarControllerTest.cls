@isTest
private class EstimatorCalendarControllerTest {

    static testMethod void testGetDefaultData() {
        Test.startTest();
        List<Datetime> data = EstimatorCalendarController.getDefaultData();
        Test.stopTest();
        
        //data should basically be all times available from 6am to 8pm for every day for the current week
        //we'll just check if the first and last times are accurate
        Datetime first = Datetime.newInstanceGmt(Date.today().toStartOfWeek(), Time.newInstance(6, 0, 0, 0));
        Datetime last = Datetime.newInstanceGmt(Date.today().toStartOfWeek().addDays(6), Time.newInstance(20, 0, 0, 0));
        
        System.assertEquals(first, data[0]);
        System.assertEquals(last, data[data.size()-1]);
    }
}