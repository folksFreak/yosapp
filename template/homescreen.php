<div class="logintooltips" ><div id="loginbutton"></div><span>Click To Login</span></div>

<form class="form" id="loginform" name="input">
	<div id="loginheadertext">
		LOGIN
		<span></span>
	</div>
	<div class="loginFormElementWrapper"><div class="loginGuideText">Phone</div><div class="loginInputFieldWrapper"><input id="userfield" class="inputfields" type="text" name=""/><span class="inputFieldTip">Ex: 9876543210</span></div></div>
	<div class="loginFormElementWrapper"><div class="loginGuideText">Password</div><div class="loginInputFieldWrapper"><input id="passfield" class="inputfields" tip="1234" type="password" name=""  onkeyup='hideTip();'/><span class="inputFieldTip">Ex: 9876543210</span></div></div>
	<div class="loginFormElementWrapper"><div class="loginGuideText">Country</div><div class="loginInputFieldWrapper" id="loginInputFieldWrapperCountry">
																																							<input id="countryField" class="inputfields showTipInputFields" tip="Ex: India" type="text" name="" onfocus='hideInputTipsOnclick("#countryField");' onblur='showInputTipsOnblur("#countryField");'/>
																																							<div id="loginCC" class="regCountryInfo">(+91)</div>
																																							<div id="loginFlag" class="regCountryInfo"></div>
																				   </div></div>

	<!--<div><input id=rememberme type="checkbox" name="isrememberme" value="remember me">Keep me loggend in<br></div> -->
	<div>
		<input id="loginsubmit" type="button" value="Login" 
				onclick="formhash(document.getElementById('userfield').value,
								  document.getElementById('passfield').value,
								  document.getElementById('countryField').value,
								  document.getElementById('loginform'))" />
	</div>
	<div class="squaredTwo">
		<input type="checkbox" value="None" id="squaredTwo" name="check" />
		<label for="squaredTwo"></label><p>Remember Me</p>
	</div>
	<p id="forgotpassword">
		Forgot Password?
	</p>
</form>

<form class="form" id="regform" name="input" >
	<div id="regheadertext">
		SIGNUP
		<span></span>
	</div>
	<div class="regFormElementWrapper"><div class="regGuideText">Phone</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPhoneNumber"><input id="regInputPhone" class="inputfields showTipInputFields" tip="Ex: 9876543210" type="text" name="username" onclick='hideInputTipsOnclick("#regInputPhone");' onblur='showInputTipsOnblur("#regInputPhone");'/></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Password</div><div class="regInputFieldWrapper" id="regInputFieldWrapperPass"><input id="regpass" class="inputfields showTipInputFields" tip="1234" type="password" name="password" onfocus='hideInputTipsOnclick("#regpass");' onblur='showInputTipsOnblur("#regpass");'/></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Name</div><div class="regInputFieldWrapper" id="regInputFieldWrapperName"><input id="name_reg" class="inputfields showTipInputFields" tip="Ex: John Smith" type="text" name="name" onfocus='hideInputTipsOnclick("#name_reg");' onblur='showInputTipsOnblur("#name_reg");'/></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Email</div><div class="regInputFieldWrapper" id="regInputFieldWrapperEmail"><input id="email" class="inputfields showTipInputFields" tip="Ex: john@domain.com" type="text" name="email" onfocus='hideInputTipsOnclick("#email");' onblur='showInputTipsOnblur("#email");' /></div></div>
	<div class="regFormElementWrapper"><div class="regGuideText">Country</div><div class="regInputFieldWrapper" id="regInputFieldWrapperCountry">
																					<input id="regInputCountry" class="inputfields showTipInputFields" tip="Ex: India" type="text" name="regInputCountry" onfocus='hideInputTipsOnclick("#regInputCountry");' onblur='showInputTipsOnblur("#regInputCountry");'/>
																					<div id="regCC" class="regCountryInfo">(+91)</div>
																					<div id="regFlag" class="regCountryInfo"></div>
																				</div></div>
	<div>
		<input id="regsubmitbutton"  type="button" value="Signup" 
		onclick="
			regformhash(document.getElementById('regform'),
						document.getElementById('regInputPhone'),
					 	document.getElementById('email'),
					 	document.getElementById('regpass'),
					 	document.getElementById('regInputCountry'),
					 	document.getElementById('name_reg')
					 	)
		"/>
	</div>
</form>

<div id="errorMsgBox">
	<span id="errMsg"></span>
	<span id="closeErrMsgBox" onclick="javascript:closeErrorMgsBox();"></span>
</div>