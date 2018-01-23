({
	initAppointments : function(cmp) {
		//loads a single appointment for testing purposes
		var self = this;
		var action = cmp.get("c.getTestData");
        action.setParams({
            leadId: cmp.get("v.leadId") 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS") {
                self.handleAppointments(cmp, response.getReturnValue());
            }
            else {
                console.log("error retrieving test data: " + JSON.stringify(response.getError()));
            }
        });
        
        $A.enqueueAction(action);
	},
    handleAppointments : function(cmp, appointments) {
        cmp.set("v.appointments", appointments);
        var evt = $A.get("e.c:UpdateCalendar");
        evt.setParams({"appointments": appointments});
        evt.fire();   
    },
    getLead : function(cmp, leadId) {
        var action = cmp.get("c.getLeadById");
        action.setParams({
            leadId: leadId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if( state === "SUCCESS" ) {
            	cmp.set("v.lead", response.getReturnValue());
            }
            else {
                console.log("error: " + response.getError());
            }
        });
        $A.enqueueAction(action);
    },
    goToOpp : function () {
        window.location.replace('../../sObject/Opportunity/list');
    }
})