$(document).ready(function() {
  let vehicle = new Vehicle(gm.comm, gm.info);

  try {

    // Show or hide a view for the user based on if they are driving or parked
    vehicle.handleStationarySignals();
  } catch (error) {
    alert("It looks like there was an error. Click OK to close the app.");
    gm.system.closeApp();
  }
});
