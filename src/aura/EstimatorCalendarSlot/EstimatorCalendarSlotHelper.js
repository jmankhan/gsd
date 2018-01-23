({
	getAppointment : function(map, data, index) {
        var timestamp = this.getTimestamp(map,data,index);
        var day = +$A.localizationService.formatDateTimeUTC(timestamp, "DD");
        var hour = +$A.localizationService.formatDateTimeUTC(timestamp, "HH");
        
        return map[day] ? map[day][hour] : null;
	},
    renderDetail : function(component) {
		$A.util.removeClass(component.find("popoverContainer"), "slds-hide");
    },
    hideDetail : function(component) {
        $A.util.addClass(component.find("popoverContainer"), "slds-hide");
    },
    getTimestamp : function(map, data, index) {
        var timestamp = Object.keys(data).filter(function(key) {
            return data[key]['index'] === index;
        });
        return timestamp[0];
    }
})