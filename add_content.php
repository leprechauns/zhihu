
<?php
sleep(1);

require 'config.php';

$query = "INSERT INTO question (title, point, myEditor, name, date) VALUES ('{$_POST['title']}', '{$_POST['point']}','{$_POST['myEditor']}', '{$_POST[
'name']}', NOW())";

mysql_query($query) or die('新增失败！'.mysql_error());

echo mysql_affected_rows();

mysql_close();
?>