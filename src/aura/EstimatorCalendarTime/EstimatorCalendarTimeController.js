({
	doInit : function(component, event, helper) {
		var time = component.get("v.time");
        if(time > 12)
        	time = time - 12 + ":00 PM";
        else {
            time = time + ":00 AM";
        }
        component.set("v.formatted", time);
	}
})