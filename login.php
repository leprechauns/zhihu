<?php
	require 'config.php';
	
	$_pass = sha1($_POST['pass_log']);
	
	$query = mysql_query("SELECT tel,pass FROM user WHERE tel='{$_POST['tel_log']}' AND pass='{$_pass}'") or die('SQL 错误！');
	
	if (mysql_fetch_array($query, MYSQL_ASSOC)) {
		echo 'true';
	} else {
		echo 'false';
	}
	
	mysql_close();
?>