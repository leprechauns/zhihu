<?php
	sleep(3);
	require 'config.php';
	
	$query = "INSERT INTO user (name, tel, pass)
			VALUES ('{$_POST['name']}', '{$_POST['tel']}', sha1('{$_POST['pass']}'))";
	
	mysql_query($query) or die('新增失败！'.mysql_error());
	
	echo mysql_affected_rows();
	
	mysql_close();
?>