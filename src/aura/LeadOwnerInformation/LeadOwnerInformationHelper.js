({
	getLeadOwner : function(cmp, leadId) {
		var action = cmp.get("c.getLeadOwnerById");
        action.setParams({
            leadId: leadId
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if( state === "SUCCESS" ) {
            	cmp.set("v.leadOwner", response.getReturnValue());
            }
            else {
                console.log("error: " + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
	}
})