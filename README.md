# Estimator Calendar - Manages appointments using Lightning

### Features

  - View all current appointments to a calendar
  - Add new appointments
  - Update and edit appointments

### Incomplete
  - Paging by week

### Component Overview
  - **EstimatorCalendar**: Contains the main logic for the calendar
  - **LeadOwnerInformation**: Read only header
  - **CustomerInformation**: Read only header
  - **EstimatorCalendarSlot**: Handles data for each time slot. Handles editing and displaying appointments.
  - **EstimatorCalendarAppointmentEditor**: Modal contained in EstimatorCalendarSlot to help manage editing or creating appointments. Contains a form.

### Apex Overview
  - **CreateAppointmentController**: Handles creating and getting Appointment__c objects, getting Leads, and getting the Owner (User) information
  - **EstimatorCalendarController**: Manages getting correct bounds of the calendar on the client side. Adjustable to 5 days, and different time range.