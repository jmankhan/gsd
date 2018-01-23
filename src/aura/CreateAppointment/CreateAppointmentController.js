({
	doInit : function(component, event, helper) {
		helper.initAppointments(component);
        helper.getLead(component, component.get("v.leadId"));
	},
    handleNewAppointment : function(component, event, helper) {
        var appointment = event.getParam("appointment");
        var appointments = component.get("v.appointments");
        appointments.push(appointment);
        component.set("v.appointments", appointments);
    },
    save : function(component, event, helper) {
        var appointments = event.getParam("appointments");
        var action = component.get("c.saveAppointments");
        
        action.setParams({
            appointments: appointments
        });
        action.setCallback(this, function(response) {
        	var state = response.getState();
            if(state === "SUCCESS") {
                helper.goToOpp();
            } else {
                console.log("failed to save appointments. " + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    }
})