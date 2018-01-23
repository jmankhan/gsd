({
	initDateData : function(cmp) {
        var self = this;
		var action = cmp.get("c.getDefaultData");
        action.setCallback(this, function(response) {
           var state = response.getState();
            if(state === "SUCCESS") {
                self.handleData(cmp, response.getReturnValue());
            }
            else {
                console.log("error retrieving datetime data: " + JSON.stringify(response.getError()));
            }
        });
        
        $A.enqueueAction(action);
	},
    handleData : function(cmp, data) {
        //normalize data. since json objects are not guarenteed to be ordered, add an index property
        //it is best to index by day since they are currently rendered in that format
        var obj = {};

        var timeRange = [];
        var dateRange = [];
        var dayIndex = 0;
        data.forEach(function(d, i) {
            var prettyTime = $A.localizationService.formatDateTimeUTC(d, "hh:mm a"); //12 hour formatted time
            var prettyTime24 = $A.localizationService.formatDateTimeUTC(d, "HH"); //24 hour            
            var prettyDate = $A.localizationService.formatDateTimeUTC(d, "DD"); //calendar day
            var prettyYTD = $A.localizationService.formatDateTimeUTC(d, "MM-DD-YYYY"); //calendar date
			var prettyWeek = $A.localizationService.formatDateTimeUTC(d, "MM/DD"); //useful for week view
            
            obj[d] = {};
            obj[d]['prettyTime'] = prettyTime;
            obj[d]['prettyTime24'] = prettyTime24;
            obj[d]['prettyDate'] = prettyDate;
            obj[d]['prettyYTD'] = prettyYTD;
            obj[d]['prettyWeek'] = prettyWeek;
            obj[d]['index'] = i*7%data.length + Math.floor(i/15) ; //not a hack! simply an interesting formula to transform the 1D list to a 7x15 matrix 
            
            if(i < 14) {
                timeRange.push(obj[d].prettyTime);
            }
            if(i % 15 == 0) {
                dateRange.push(obj[d].prettyWeek);
            }
        });
		
        cmp.set("v.dateRange", dateRange);
        cmp.set("v.timeRange", timeRange);
        cmp.set("v.dateData", obj);
    },
    transformAppointments : function(cmp, appointments) {
        //transform a list of appointments to a map keyed by time slots, 
        //so they can be accessed by which time slot they are available in 
        if(!appointments) {
            return null;
        }
        var self = this;
        var appointmentsByTimeslot = {};
        appointments.forEach(function(app) {
            //make sure to use 24 hour clock
            var start = $A.localizationService.formatDateTime(app.Start_Time__c, "DD HH").split(" ");
            var finish = $A.localizationService.formatDateTime(app.End_Time__c, "DD HH").split(" ");

            if(start[0] != finish[0]) {
                console.log("appointment not made on single day. invalid");
            }
			
			var day = +start[0];            
            for(var hour=+start[1]; hour<+finish[1]; hour++) {
                //create a key for the day if it doesn't exist
                appointmentsByTimeslot[day] = appointmentsByTimeslot[day] || {}; 
                
                //list this appointment under the hour. Handle conflicts if they occur
                if(appointmentsByTimeslot[day][hour]) {
                    self.handleConflict(cmp, appointmentsByTimeslot, day, hour);
                } else {
                   appointmentsByTimeslot[day][hour] = app; 
                }
            }
        });
        
        return appointmentsByTimeslot;
    }
})