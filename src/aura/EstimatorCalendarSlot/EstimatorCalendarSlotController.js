({
    doInit : function(component, event, helper) {
      	var appMap = component.get("v.appMap");
		var data = component.get("v.data");
        var index = +component.get("v.index");

        if(appMap && data && index !== null) {
            var appointment = helper.getAppointment(appMap, data, index);   
			if(appointment) component.set("v.appointment", appointment);   //weird recursion error due to change handler if there is no null check
            component.set("v.datetime", helper.getTimestamp(appMap, data, index));
        }

        helper.hideDetail(component);
    },
    updateAppointment : function(component, event, helper) {
        var appMap = event.getParam("value");
		var data = component.get("v.data");
        var index = +component.get("v.index");

        if(appMap && data && index) {
            var appointment = helper.getAppointment(appMap, data, index);   
			if(appointment) component.set("v.appointment", appointment);   //weird recursion error due to change handler if there is no null check
        }

        helper.hideDetail(component);
    },
    handleNewAppointment : function(component, event, helper) {
        var appointment = event.getParam("appointment");
		component.set("v.appointment", appointment);
    },
    hideDetail : function(component, event, helper) {
        helper.hideDetail(component);
    },
    renderDetail : function(component, event, helper) {
        helper.renderDetail(component);
    },
    openModal : function(component, event, helper) {       
        component.set("v.renderModal", true);
    }
})