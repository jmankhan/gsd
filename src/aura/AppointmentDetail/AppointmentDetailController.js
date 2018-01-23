({
    doInit : function(component, event, helper) {
      	var appointment = component.get("v.appointment");
        if(appointment != null)
			helper.updateAppointment(component, appointment);
    },
	updateAppointment : function(component, event, helper) {
        var appointment = event.getParam("value").value;
       	helper.updateAppointment(component, appointment);
	}
})