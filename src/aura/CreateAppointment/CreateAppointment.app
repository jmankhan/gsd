<aura:application extends="force:slds" controller="CreateAppointmentController">
    <aura:attribute name="leadId" type="String" /> 
    <aura:attribute name="appointments" type="Object[]" access="private" />
    <aura:attribute name="lead" type="Lead" access="private" />
    
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    <aura:handler name="newAppointment" event="c:EstimatorCalendarNewAppointment" action="{!c.handleNewAppointment}" />
    <aura:handler name="saveAppointments" event="c:EstimatorCalendarSave" action="{!c.save}" />
    
    <aura:registerEvent name="appointmentsReceived" type="c:UpdateCalendar" />
    
    <h1>Create an Appointment</h1>
    <c:CustomerInformation lead="{!v.lead}" />
    <c:LeadOwnerInformation lead="{!v.lead}" />
    <c:EstimatorCalendar appointments="{!v.appointments}" lead="{!v.lead}" />
</aura:application>