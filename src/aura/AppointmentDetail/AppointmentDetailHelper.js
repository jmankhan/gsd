({
	formatAppointment : function(appointment) {
        var startTime = $A.localizationService.formatDate(appointment.Start_Time__c, "hh:mm a");
        var startDate = $A.localizationService.formatDate(appointment.Start_Time__c, "MM/DD");
        var address = appointment.Lead__r.Address.street + " " + 
            appointment.Lead__r.Address.city + ", " + 
            appointment.Lead__r.Address.state + " " + 
            appointment.Lead__r.Address.postalCode + " " + 
            appointment.Lead__r.Address.country;
        
        return {startTime: startTime, startDate: startDate, leadAddress: address};
	},
    updateAppointment : function(component, appointment) {
        if(appointment) {
            var formatted = this.formatAppointment(appointment);
            component.set("v.startTime", formatted.startTime);
            component.set("v.startDate", formatted.startDate);
			component.set("v.leadAddress", formatted.leadAddress);
        }
	}
})