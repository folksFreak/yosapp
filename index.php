<?php
	require_once 'includes.php';
	require_once 'templates.php';

	sec_session_start();
	//remove from production environment
	exec("./tools/mergejs ./tools/merge_files/input.txt ./js/script.js");
	//tool to merge all code in one file
	$logged_in = login_check($mysqli);
?>

<html>
	<head>
		<link rel="stylesheet" type="text/css" href="css/reset.css">		
		<!--Assume that all the css files will be merged to one while running -->
		<link rel="stylesheet" type="text/css" media="all" href="css/homescreen.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/chatroom.css">
		<link rel="stylesheet" type="text/css" media="all" href="css/modal.css">
		<!-- Third Party APIs -->
		<link href='http://fonts.googleapis.com/css?family=Lustria' rel='stylesheet' type='text/css'>
		<script src="http://crypto-js.googlecode.com/svn/tags/3.1.2/build/rollups/md5.js"></script>
		<script language="javascript" type="text/javascript" src="js/library/jquery.min.js"></script>
		<!-- Our singleton and minified code -->
		<script language="javascript" type="text/javascript" src="js/script.js"></script>
		<script type="text/javascript">
		window.YW = {};
		(function(YW) {
		    YW.HOMESCREEN   = function() { return '<?php echo $homescreen; ?>'; };
		    YW.CHATSCREEN   = function() { return '<?php echo $chatscreen; ?>'; };
		    YW.CHATBUBBLE	= function() { return '<?php echo $chatbubble; ?>'; };
		    YW.VERIF		= function() { return '<?php echo $verif; ?>';};
		    YW.LOGGED_IN_H	= function() { return '<?php echo $header_logged_in; ?>' };
		    YW.LOGGED_OUT_H	= function() { return '<?php echo $header_logged_out; ?>' };
		    YW.MODAL		= function() { return '<?php echo $modal_window; ?>' };
		    YW.L_IN			= function() { return '<?php echo $left_in; ?>' };
		    YW.L_OUT		= function() { return '<?php echo $left_out; ?>' };
		    YW.R_IN			= function() { return '<?php echo $right_in; ?>' };
		    YW.R_OUT		= function() { return '<?php echo $right_out; ?>' };
		    YW.CONTACT		= function() { return '<?php echo $contact; ?>' };
		    YW.UA			= function() { return navigator.userAgent; };
		    YW.COUNTRIES 	= <?php echo $countries; ?>;
			
			//Game Params
			YW.logged_in	= function() { return '<?php echo ($logged_in)?"true":"false"; ?>'; };
			
			//Parameters
			YW.CURR_PARTNER	= {};
		    YW.LOADED_AT    = new Date();
		    YW.DATA			= {};
		})(YW);
		</script>
	</head>
	<body>
		<?php
			require_once("./template/header.php");
		?>
		<div id="bodybg">
		</div>
		<?php
			require_once("./template/footer.php");
		?>
		<div id="overlay" onclick='closeModal();'></div>
	</body>
</html>
