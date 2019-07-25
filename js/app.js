$(document).ready(function() {

  let odometer = new Odometer(state.userId, gm.info);
  let profile = new Profile(state.userId, state.jwt);
  let vehicle = new Vehicle(gm.comm, gm.info);


  // Watch the vehicle odometer and execute the logic below with the odometer reading data
  odometer.manageReading(function(data) {

    // Convert from kilometers to miles
    odometer.miles = Math.round(data.odometer*0.62137*100)/100;
    odometer.displayReading();

    if(vehicle.isConnectedToInternet()) {

      profile.isMonitoringOdometer().then(function(response) {

        if(response.jwtIsValid) {

          if (response.monitorIndicator == true) {
            profile.recordOdometerReading(odometer.miles);
          } // Else do nothing

        } else {
          // JWT could not be validated so log out
          window.location.pathname = "/login.html";
        }
      });
    } // Else do nothing
  });


  if(vehicle.isConnectedToInternet()) {

    // Get the averages from the drivers profile at the remote API
    profile.getAverages()
    .then(function(response) {

      if(response.jwtIsValid) {

        return profile.processAverages(response);
      } else {
        // JWT could not be validated so log out
        window.location.pathname = "/login.html";
      }
    })
    .then(function(processedData) {
      const {
        averageData,
        driverAveragePerDay,
        nationalAveragePerDay,
      } = processedData;

      profile.displayAverages(averageData);

      profile.displaySummary(driverAveragePerDay, nationalAveragePerDay);

      $("#estimate-details-btn").click(function() {
        profile.sendEstimateEmail();
      });
    });
  } // Else do nothing
});
