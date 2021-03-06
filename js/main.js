'use strict';
//Global Variables
var isloginclicked = false,
  issignupclicked = false;


window.onerror = function (msg, url, linenumber) {
  $aJX_status = $.ajax({
    type: 'GET',
    url: 'error.php?ua=' + encodeURIComponent(YW.UA()) + '&msg=' + encodeURIComponent(msg) + '&linenumber=' + encodeURIComponent(linenumber)
  });
};

function toggleLogin() {
  if (isloginclicked) {
    $('.logintooltips').css('visibility', 'visible');
    $('#loginform').animate({
      'opacity': '0'
    }, 800, function () {
      $('#loginform').css('visibility', 'hidden').find('#countryField').val(''); // clear  country value
      hideTip('#countryField');
    });
    isloginclicked = false;
  } else {
    if (YW.PORTRAIT) {
      $('.logintooltips').css('visibility', 'hidden');
    }
    $('#loginform').css('visibility', 'visible');
    $('#loginform').animate({
      'opacity': '1'
    }, 800);
    //focus username field
    if (!YW.PORTRAIT) {
      $('#userfield').focus();
    }
    isloginclicked = true;
    //virtually unclick the signup button also
    $('#regform').animate({
      'opacity': '0'
    }, 800, function () {
      $('#regform').css('visibility', 'hidden').find('#regInputCountry').val(''); // clear country value
      hideTip('#regInputCountry');
    });
    issignupclicked = false;
  }
}

function toggleSignup() {
  if (issignupclicked) {
    $('.logintooltips').css('visibility', 'visible');
    $('#regform').animate({
      'opacity': '0'
    }, 800, function () {
      $('#regform').css('visibility', 'hidden').find('#regInputCountry').val('');
      hideTip('#regInputCountry');
    });
    issignupclicked = false;
  } else {
    if (YW.PORTRAIT) {
      $('.logintooltips').css('visibility', 'hidden');
    }
    $('#regform').css('visibility', 'visible');
    $('#regform').animate({
      'opacity': '1'
    }, 800);
    //focus first field
    if (!YW.PORTRAIT) {
      $('#regInputPhone').focus();
    }
    issignupclicked = true;
    //disapear login form
    $('#loginform').animate({
      'opacity': '0'
    }, 800, function () {
      $('#loginform').css('visibility', 'hidden').find('#countryField').val('');
      hideTip('#countryField');
    });
    isloginclicked = false;
  }
}

window.onload = function () {
  //Load content based on State of user
  if (YW.logged_in() === 'true') {
    logged_in_start();
  } else {
    logged_out_start();
  }

  //show login tooltip when hover over loginbutton
  $('#loginbutton').hover(
    function () {
      $('.logintooltips').find('span').animate({
        opacity: '1'
      }, 600);
    },
    function () {
      $('.logintooltips').find('span').animate({
        opacity: '0'
      }, 600);
    }
  );
  //show signup tooltip when hover over signup
  $('#signup').hover(
    function () {
      $('.signuptooltip').find('span').css('z-index', '999').animate({
        opacity: '1'
      }, 600);
    },
    function () {
      $('.signuptooltip').find('span').css('z-index', '0').animate({
        opacity: '0'
      }, 600);
    }
  );


  $('#loginbutton').click(toggleLogin);
  $('#signup').click(toggleSignup);

  $('#regform').keyup(function (e) {
  	closeFormOnEsc(e, '#regform');
   });

  $('#loginform').keyup(function (e) {
  	closeFormOnEsc(e, '#loginform');
  });

  $('#regsubmitbutton').click(function () {
    $('#regsubmitbutton').css('-webkit-transform', '1');
  })

  // append modal content into dom
  $('#footer').html($('#footer').html() + YW.MODAL());
  $('#footer').html($('#footer').html() + YW.PROMPT());
};

function closeFormOnEsc(e, tag) {
	if (e.keyCode == '27') {
    //first check if error msg is visible, and if yes then close that first on 'Esc' press
    if ($('#errorMsgBox').css('visibility') == 'visible') {
      closeErrorMgsBox();
    }
    // otherwise disappear login form straight away
    else {
      $(tag).animate({
        'opacity': '0'
      }, 500);
      setTimeout(function () {
        $(tag).css('visibility', 'hidden')
      }, 800);
      isloginclicked = false;
    }
  }
}

function logged_in_start() {
  log_in_user();
}

function logged_out_start() {
  $('#bodybg').html(YW.HOMESCREEN());
  $('#icons').html(YW.LOGGED_OUT_H());
  //flash once the login tool tip 
  showLoginTipOnLoad();
  if (YW.PORTRAIT) {
    portraitLoad();
  }
}

function portraitLoad () {
	toggleLogin();
}

function showLoginTipOnLoad() {
  if (YW.PORTRAIT) {
    return;
  }
  $('.logintooltips').find('span').animate({
    opacity: '1'
  }, 1600, 'linear', function () {
    $('.logintooltips').find('span').animate({
      opacity: '0'
    }, 1600, 'linear');
  });
}


// hide input field tip on keyup
function hideTip(ele) {
  var element = $(ele);
  var ipText = element.val();
  var tip = element.next();
  if (ipText != '') {
    if (tip.css('display') != 'none') {
      tip.css('display', 'none');
      return;
    }
    return;
  } else {
    tip.css('display', 'inline-block');
  }
}


// function that pops up error msg
function dispErrMsg(msg, callingForm) {
  var dialogueBox = $('#errorMsgBox');

  // adjust arrow direction and close button position based on calling Form
  if (callingForm == 'login') {
    $('#errorMsgBoxArrow').css({
      'border-right': '20px solid rgba(255, 255, 255, 0.19)',
      'border-left': '0px',
      left: '-20px'
    });
    $('#closeErrMsgBox').css('left', '235px');
  } else if (callingForm == 'reg') {
    $('#errorMsgBoxArrow').css({
      'border-right': '',
      'border-left': '',
      left: ''
    });
    $('#closeErrMsgBox').css('left', '');
  }

  // check and see if the Dialogue box is on 
  if (dialogueBox.css('visibility') == 'hidden') {
    dialogueBox.css('opacity', '0');
    dialogueBox.css('visibility', 'visible');
    dialogueBox.animate({
      opacity: '1'
    }, 600, 'swing');
  }
  //put the msg in the Dialogue Box
  $('#errMsg').html(msg);
}

function closeErrorMgsBox() {
  $('#errorMsgBox').animate({
    opacity: '0'
  }, 700, 'swing', function () {
    $('#errorMsgBox').css('visibility', 'hidden');
  });
}

//dialouge box loading animation
function DlBoxLoading(msg, stepNumber) {
  // elements to be manipulated
  var leftCol = '';
  var rightCol = '';
  var nextArrow = '';
  var animatingObj = '';

  if (stepNumber == 1) {
    leftCol = '#verStp1Left';
    rightCol = '#verStp1Right';
    nextArrow = '#nextArrow1';
    animatingObj = '#verLoadingIcon1';
  } else if (stepNumber == 2) {
    leftCol = '#verStp2Left';
    rightCol = '#verStp2Right';
    nextArrow = '#nextArrow2';
    animatingObj = '#verLoadingIcon2';
  }

  $(leftCol + ',' + rightCol + ',' + nextArrow).animate({
    opacity: '0'
  }, 300, function () {
    $(this).css('display', 'none');
    $(animatingObj).css({
      opacity: '0',
      display: 'block'
    });
    $(animatingObj).find('p').html(msg);
    $(animatingObj).animate({
      opacity: '.6'
    }, 300);


  });
}



function DlBoxFinalMsg(msg, stepNumber) {
  var prevObj = '';
  var newObjIcon = '';
  var newText = '';

  if (stepNumber == 1) {
    prevObj = '#verLoadingIcon1';
    newObjIcon = '#verFaildMsg1Ref';
    newText = '#verFaildMsg1Text';
  } else if (stepNumber == 2) {
    prevObj = '#verLoadingIcon2';
    newObjIcon = '#verFaildMsg2Ref';
    newText = '#verFaildMsg2Text';
  }

  $(prevObj).animate({
    opacity: '0'
  }, 300, function () {
    $(this).css('display', 'none')
    $(newText).html(msg);
    $(newObjIcon + ',' + newText).css({
      opacity: '0',
      display: 'block'
    });
    $(newObjIcon + ',' + newText).animate({
      opacity: '1'
    }, 300);
  });

}

function showVersionWindow(callback) {
  $('#varifyWindow').css({
    opacity: '0',
    display: 'block'
  });
  $('#varifyWindow').animate({
    opacity: '1'
  }, 100, function () { //the window appears
    $('#varifyWindow').html(YW.RELEASECON());
    if (callback) {
      callback();
    }
  });
}

function showPointerOnHover(elem) {
  $(elem).css('cursor', 'pointer');
}

function showNotif(msg) {
  var notif = $('#notify');
  var notifMsg = notif.find('p');
  notif.css({
    display: 'block',
    height: '0px'
  });
  notifMsg.html(msg).css('opacity', '0');
  notif.animate({
    height: '50px'
  }, 500, function () {
    notifMsg.animate({
      opacity: '1'
    }, 400);
  });
}

function hideNotif() {
  var notif = $('#notify');
  var notifMsg = notif.find('p');
  notifMsg.animate({
    opacity: '0'
  }, 400, function () {
    notif.animate({
      height: '0px'
    }, 500, function () {
      notif.css('display', 'none');
    });
  });
}

function showPrompt(message, yesCB, noCB) {
  showOverlay();
  var prompt = $('#prompt');
  var msgBox = $('#prompMsg').find('p');
  $('#promptYes').click(function (event) {
    event.preventDefault();
    if (typeof yesCB === 'function')
      yesCB();
  });
  $('#promptNo').click(function (event) {
    event.preventDefault();
    if (typeof noCB === 'function')
      noCB();
  });
  msgBox.html(message);
  prompt.css({
    opacity: '0',
    display: 'block'
  });
  prompt.animate({
    opacity: '1'
  }, 400, function () {

  });
}

function closePrompt() {
  var prompt = $('#prompt');
  prompt.animate({
    opacity: '0'
  }, 400, function () {
    prompt.css('display', 'none');
    closeOverlay();
  });
}

function suggestCountries(elem, e) {
  // position cret to the right of last letter always
  //setCaretToPos ( $(elem), $(elem).val().length );
  var unicode = e.keyCode ? e.keyCode : e.charCode
    // (up=38), (right=39), (down=40), (enter=10,13), (pgup=33), (pgdn=34), (end=35), (home=36)
  if ((unicode > 37 && unicode < 41) || unicode == 13 || unicode == 10 || (unicode > 32 && unicode < 37)) { //if navigation buttons are pressed 
    if (unicode == 33) { //if page up
      for (var indx = 0; indx < 4; indx++) {
        navigateSuggested(38); // simulate 4 time 'up arrrow' keystroke
      }
      return;
    }
    if (unicode == 34) { //if page down
      for (var indx = 0; indx < 4; indx++) {
        navigateSuggested(40); // simulate 4 time 'sown arrrow' keystroke
      }
      return;
    }
    navigateSuggested(unicode); // take action for up, down, right, home, end and enters
    return;
  }

  var ipFiled = $(elem);
  var suggestBox = ipFiled.parent().children().eq(ipFiled.parent().children().length - 1); // select last child of ipFields parent
  var searchString = ipFiled.val();
  if (searchString == ipFiled.attr('preval')) { // this will ignore all those keystroke that's not ([A-Za-z0-9]+)
    return;
  }
  var result = countrySuggest(searchString);
  suggestBox.html('');
  if (searchString == '') {
    suggestBox.css('display', 'none');
    $('#addConCCTip').prev().val('');
    $('#addConCCTip').html('CC');
    ipFiled.attr('preval', searchString).attr('ready', 'no');
    ipFiled.siblings().eq(2).removeClass('countryReady').removeClass('countryNotReady');
    return;
  } else {
    suggestBox.css('display', 'block');
  }

  if (result.length == 0) { // means no countries found
    //check further if input text has only one possible outcome
    result1 = searchString.match(/([a-zA-Z\s-_]+) /);
    if (result1 != null) {
      countryname = countrySuggest(result1[1].trim())[0][0];
      suggestBox.append('<div class="suggestedElem" id="selectedCountry" onclick=\'selectCountry(' + '"' + countryname + '","' + countryToCC(countryname) + '", this);\' onmouseover=\'hoverSuggest(this);\'><p>' + countryname + ' ' + '(+' + countryToCC(countryname) + ')</p></div>');
      ipFiled.attr('preval', searchString).attr('ready', 'no');
      ipFiled.siblings().eq(2).removeClass('countryReady').addClass('countryNotReady');
      return;
    }
    suggestBox.append('<div class="suggestedElem"><p>No such country</p></div>');
    $('#addConCCTip').prev().val('');
    $('#addConCCTip').html('CC');
    //ipFiled.attr('preval',searchString).attr('ready','no');
    return;
  }
  for (var i = 0; i < result.length; i++) {

    suggestBox.append('<div class="suggestedElem" id="" pos="' + i + '"onclick=\'selectCountry(' + '"' + result[i][0] + '","' + countryToCC(result[i][0]) + '", this);\' onmouseover=\'hoverSuggest(this);\'><p>' + result[i][0] + ' ' + '(+' + countryToCC(result[i][0]) + ')</p></div>');
  }
  // highlight the first element
  $('.suggestedElem').first().attr('id', 'selectedCountry')
  ipFiled.attr('preval', searchString);
  suggestBox.focus();
}
//regex		var matches = str.match(/([a-zA-Z]+) \(+/); to get country name
//regex     var matches = str.match(/\+([0-9]+)\)/);  to get country code

function selectCountry(country, cc, thisElem) {
  var suggestBox = $(thisElem).parent();
  var countryField = suggestBox.parent().children().eq(0); // select first sibling
  suggestBox.css('display', 'none');
  if (countryField.attr('name') == 'AddConCountryName') { // if from add contact
    countryField.val(country);
    var ccIpField = countryField.parent().next().children().eq(0);
    ccIpField.val('+' + cc);
    $('#addConCCTip').html('');
    countryField.attr('ready', 'yes');
    return;
  }
  countryField.val(country + ' (+' + cc + ')');
  countryField.attr('ready', 'yes');
  countryField.siblings().eq(2).removeClass('countryNotReady').addClass('countryReady');
}

function hoverSuggest(thisElem) {
  $('#selectedCountry').attr('id', ''); // clear any previously highlighted country suggestion
  $(thisElem).attr('id', 'selectedCountry'); // highlight the one on which mouse is being hovered
}

function navigateSuggested(unicode) {
  var lastPos = $('.countrySuggBox').children().length; // get position of last element 

  if (unicode == 38 && $('#selectedCountry').attr('pos') != "0") { // if 'up' is pressed and if first item not selected
    $('#selectedCountry').attr('id', '').prev().attr('id', 'selectedCountry');
    if (parseInt($('#selectedCountry').attr('pos')) < (lastPos - 5)) {
      var grtr = (parseInt($('#selectedCountry').attr('pos') - 2));
      $('.countrySuggBox').scrollTop(grtr * 20);
    }
    return;
  }
  if (unicode == 40 && parseInt($('#selectedCountry').attr('pos')) != lastPos - 1) { // if 'down' is pressed and last item is not selected
    $('#selectedCountry').attr('id', '').next().attr('id', 'selectedCountry')
    if (parseInt($('#selectedCountry').attr('pos')) > 4) {
      var grtr = parseInt($('#selectedCountry').attr('pos')) - 4;
      $('.countrySuggBox').scrollTop(grtr * 20);
    }
    return;
  }
  if (unicode == 35) { // if 'end' is pressed 
    $('#selectedCountry').attr('id', '');
    $("[pos=" + (lastPos - 1) + "]").attr('id', 'selectedCountry');
    $('.countrySuggBox').scrollTop(lastPos * 20);
    return;
  }
  if (unicode == 36) { // if home is pressed
    $('#selectedCountry').attr('id', '');
    $("[pos=0]").attr('id', 'selectedCountry');
    $('.countrySuggBox').scrollTop(0);
    return;
  }

  if (unicode == 13 || unicode == 10) { // if enter is pressed 

    var ipFiled = $('#selectedCountry').parent().parent().children().eq(0);
    if (ipFiled.attr('ready') == 'yes' && ipFiled.attr('id') != 'countryName') { // if country field is ready for login
      //login user here
      if (ipFiled.attr('id') == 'countryField') { // if login form
        formhash(document.getElementById('userfield').value,
          document.getElementById('passfield').value,
          extractCC(document.getElementById('countryField').value),
          document.getElementById('loginform')
        );
        return;
      }
      if (ipFiled.attr('id') == 'regInputCountry') { // if signup form

        regformhash(document.getElementById('regform'),
          document.getElementById('regInputPhone'),
          document.getElementById('email'),
          document.getElementById('regpass'),
          document.getElementById('regInputCountry'),
          document.getElementById('name_reg')
        );
      }

      return;
    }

    if (ipFiled.attr('id') == 'countryName' && $('#countryCode').val() != '') { // if its about add contact form cc field is filled then add contact
      addContact();
    }

    // if first time enter is pressed select the highlighted list item and not login
    if ($('#selectedCountry').length == 1) { // if any list item is highlighted 
      var htmlval = $('#selectedCountry').html();
      var countryName = htmlval.match(/([a-zA-Z\s-_]+) \(+/)[1];
      var cc = htmlval.match(/\+([0-9]+)\)/)[1];
      selectCountry(countryName, cc, '#selectedCountry'); // selected the highlighted list item
      $('#selectedCountry')
      return;
    }

  };

}
