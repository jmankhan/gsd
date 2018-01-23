({
	doInit : function(component, event, helper) {
		var leadId  = component.get("v.lead").Id;
        helper.getLeadOwner(component, leadId);
	}
})