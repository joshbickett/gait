$(document).ready(function() {

  let user = new User(gm.info);
  let vehicle = new Vehicle(gm.comm, gm.info);

  // Get VIN to add to the form
  $("#vin").val("VIN: "+ vehicle.getVin());

  if(vehicle.isConnectedToInternet) {

    // If on the login page then listen to the button
    if(window.location.pathname=="/login.html") {
      $("#login").submit(function(event) {
        user.tryLogin();
      });
    }

    // If on the sign up page then listen to the button
    if(window.location.pathname=="/signup.html") {
      $("#signup").submit(function(event) {
        user.trySignup();
      });
    }

  } else {
    $("#alert").addClass("alert alert-warning");
    $("#alert").html("It looks like you will not be able to login or sign up because the App has no internet connection");
  }
});
