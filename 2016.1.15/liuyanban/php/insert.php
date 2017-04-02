<?php
    include "mysql.php";
    $name=$_GET["name"];
    $sex=$_GET["sex"];
    $info=$_GET["info"];
    $sql="insert into ajax(name,sex,info) values('{$name}','{$sex}','{$info}')";
    mysql_query($sql);
    if(mysql_affected_rows()==1){  //从数据库中取到一行
   	    echo "插入成功"; 
    }
?>