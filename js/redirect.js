$(document).ready(function() {

  function redirect() {
    let user = new User(gm.info);

    if(user.isLoggedIn == false) {
      // The user is not logged in so redirect
      window.location.pathname = "/login.html";
    } // Else do nothing
  }
  
 redirect();
});
