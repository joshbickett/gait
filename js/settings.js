$(document).ready(function() {

  let profile = new Profile(state.userId, state.jwt);
  let user = new User(gm.info);
  let vehicle = new Vehicle(gm.comm, gm.info);


  if(vehicle.isConnectedToInternet()) {

    // Update the UI switch to reflect the current profile settings
    profile.isMonitoringOdometer().then(function(response) {
      $("#monitor-indicator").prop("checked", response.monitorIndicator);
    });

    // Update the user profile by sending the change to the remote API
    $("#monitor-indicator").on("click", function() {
      profile.updateMonitorIndicator();
    });

  } else {
    $("#alert").addClass("alert alert-warning");
    $("#alert").html("It looks like the App can't handle the settings because there is no internet connection");
  }

  $("#sign-out").on("click", function() {
    user.signOut();
  });
});
