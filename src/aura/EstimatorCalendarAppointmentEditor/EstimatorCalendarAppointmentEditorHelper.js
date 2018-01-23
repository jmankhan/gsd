({
    initSelectedTime : function(component) {
        var datetime = component.get("v.initialDatetime");
        
        if(!datetime) return;
        
        var formatted = $A.localizationService.formatDateTimeUTC(datetime, "hh A");
        var hour = formatted.split(" ")[0];
        var meridiem = formatted.split(" ")[1];
        
        component.set("v.selectedHour", +hour);
        component.set("v.selectedMeridiem", meridiem);
    },
    initMinutes : function(component) {
        var minutes = [];
        for(var i=0; i<60; i++) {
            if(i < 10)
            	minutes.push("0" + i);
            else {
                minutes.push("" + i);
            }
        }
        component.set("v.minutes", minutes);
    },
    save : function(component) {
		var local = component.get("v.appointmentLocal");
        //if we are creating a new appointment, need to construct it as a json object
        if(local == null) {
            var start = new Date(component.get("v.initialDatetime"));
            start.setHours(component.get("v.selectedHour"));
            start.setMinutes(component.get("v.selectedMinute"));
            if(component.get("v.selectedMeridiem") === "PM") {
                start.setHours(start.getHours() + 12);
            }
            
            var sobjectType = 'Appointment__c';
            var Lead__c = component.get("v.lead").Id;
            var Lead__r = component.get("v.lead");
            var Start_Time__c = start;
            var End_Time__c = start;
            End_Time__c.setHours(start.getHours() + 1);
            var Subject__c = component.get("v.selectedSubject");
            var Status__c = component.get("v.selectedStatus");
            
            local = {
                'sobjectType': sobjectType,
                'Lead__c': Lead__c,
                'Lead__r': Lead__r,
                'Start_Time__c': Start_Time__c,
                'End_Time__c': End_Time__c,
                'Subject__c': Subject__c,
                'Status__c': Status__c
            };
        }
        
        var evt = component.getEvent("newAppointment");
        evt.setParams({
            appointment: local
        });
        evt.fire();
    },
    discard : function(component) {
        component.set("v.appointmentLocal", null);
    },
	close : function(component) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.removeClass(cmpBack,'slds-backdrop--open');
        $A.util.removeClass(cmpTarget, 'slds-fade-in-open'); 
	},
    render : function(component) {
        var cmpTarget = component.find('Modalbox');
        var cmpBack = component.find('Modalbackdrop');
        $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    },
    validateTime : function(hour, minute, meridiem) {
        if(!hour || minute == null || !meridiem) {
            alert("Invalid time entered");
            console.log("received invalid time: " + hour +":" + minute + " " + meridiem);
            return false;
        }
        return hour >= 6 && hour < 12 && meridiem === "AM" || (hour <= 8 || hour == 12) && meridiem === "PM";
    },
    setEditMode : function(component, appointment) {
	    var editMode = appointment != null;
        component.set("v.editMode", editMode);  
    }
})