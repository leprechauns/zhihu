<?php
	sleep(1);
	require 'config.php';
	
	$query = "INSERT INTO comment (titleid, comment, name, date)
	VALUES ('{$_POST['titleid']}', '{$_POST['comment']}', '{$_POST['name']}', NOW())";
	
	mysql_query($query) or die('新增失败！'.mysql_error());
	
	echo mysql_affected_rows();
	
	mysql_close();
?>