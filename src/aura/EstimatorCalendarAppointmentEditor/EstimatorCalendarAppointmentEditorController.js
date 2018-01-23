({
    doInit: function(component, event, helper) {
        //set edit mode
        var appointment = component.get("v.appointment");
        helper.setEditMode(component, appointment);
        helper.initMinutes(component, helper);
    },
	save : function(component, event, helper) {
        var hour = component.get("v.selectedHour");
        var minute = component.get("v.selectedMinute");
        var meridiem = component.get("v.selectedMeridiem");

        if(helper.validateTime(+hour, +minute, meridiem)) {
        	helper.save(component)
			helper.close(component)
        }
        
	},
    cancel : function(component, event, helper) {
        helper.discard(component);
  		helper.close(component);	
    },
    toggleRender : function(component, event, helper) {
        var shouldRender = event.getParam("value");        
        if(shouldRender) {
            helper.render(component);
        }
        else {
            helper.close(component);
        }
        component.set("v.renderModal", shouldRender);

    },
    updateAppointment : function(component, event, helper) {
        var appointment = event.getParam("value");
        component.set("v.appointmentLocal", appointment);
        
        helper.setEditMode(component, appointment);

    },
    updateLead : function(component, event, helper) {
        var lead = event.getParam("value");
        component.set("v.leadLocal", lead);
    },
    updateDatetime : function(component, event, helper) {
        helper.initSelectedTime(component);        
    }
})