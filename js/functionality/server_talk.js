function sendActualMessage(message) {
  if (YW.CURR_PARTNER === "" || YW.CURR_PARTNER === "0server") {
    return false;
  }
  $aJX_status = $.ajax({
      type: "GET",
      url: "./transactor.php?method=send&to=" + YW.CURR_PARTNER + "&message=" + message,
    })
    .success(function (response) {
      if (response === "sent") {
        return true;
      } else {
        return false;
      }
    })
    .fail(function (response) {
      return false;
    });

  return $aJX_status;
}

function checkMessage() {
  $aJX_status = $.ajax({
      type: "GET",
      url: "./transactor.php?method=listen",
    })
    .success(function (response) {
      response = (typeof response === 'string') ? response.trim() : response;
      if (response === "empty") {
        return false;
      }
      if (response === "nomessage") {
        return false;
      }
      if (response === "noauth") {
        showNotif("You are not logged in.");
        setTimeout(function () {
          hideNotif();
          window.location = 'logout.php';
        }, 3000);
        return false;
      }
      if (response === "noconnect") {
        showNotif("We can't connect to Whatsapp. Please send a feedback.");
        setTimeout(function () {
          hideNotif();
        }, 3000);
        checkForWPass();
        return false;
      }
      if (response === "emptyauth") {
        showNotif("It seems that you haven't verified yet. Checking...");
        setTimeout(function () {
          hideNotif();
        }, 3000);
        checkForWPass();
        return false;
      }
      processMessage(response);
      return true;
    })
    .fail(function (response) {
      return false;
    });

  return $aJX_status;
}

function getFriends() {
  $aJX_status = $.ajax({
      type: "GET",
      url: "./user.php?request=friends",
    })
    .success(function (response) {
      times = 0;
      if (response === "empty") {
        return false;
      } else {
        YW.DATA = JSON.parse(response);
        renderData();
        setLastChat();
        showServerMessages();
        return true;
      }
    })
    .fail(function (response) {
      times = 0;
      return false;
    });
}