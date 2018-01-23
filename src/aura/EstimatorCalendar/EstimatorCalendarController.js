({
	doInit : function(component, event, helper) {
        helper.initDateData(component);
	},
    updateAppointments : function(component, event, helper) {
        var appointments = event.getParam("appointments");
        var appointmentsMap = helper.transformAppointments(component, appointments);
		component.set("v.appointmentsMap", appointmentsMap);
    },
    submit : function(component, event, helper) {
    	var appointments = component.get("v.appointments");
    	var evt = component.getEvent("saveAppointments");
        evt.setParams({
        	appointments: appointments
        });
		evt.fire();
	}
})