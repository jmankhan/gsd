public class EstimatorCalendarController {
	private static final Integer START_TIME = 6; //6am
    private static final Integer END_TIME = 20; //8pm
    private static final Integer DATE_RANGE = 7; //7 days to display in week. May wish to change to 5 in the future
    
    /*
     * Initializes a list of date times that ranges from the start of the week to the end of the week (depends on locale)
     * with additional datetimes for each valid hour from START_TIME to END_TIME
     */
    @AuraEnabled
    public static List<DateTime> getDefaultData() {
        Date currentDay = Date.today().toStartOfWeek(); //may be Monday depending on locale, will ignore for now
   		List<Datetime> data = new List<Datetime>();
        for(Integer day=0; day<DATE_RANGE; day++) {		
            for(Integer hour=START_TIME; hour<=END_TIME; hour++) {
                data.add(Datetime.newInstanceGMT(currentDay.year(), currentDay.month(), currentDay.day(), hour, 0, 0));
            }
            currentDay = currentDay.addDays(1);
        }
        return data;
    }
}