<?php
@ob_start();
session_start();
$regno = $_POST["regno"];
$password =SHA1($_POST["password"]);
include($_SERVER['DOCUMENT_ROOT']."/DBConnection.php"); 
if(! $database)
{
    die('Connection Failed'.mysql_error());
    echo 'error db';
}
// Select the database to use
$query = "SELECT * FROM users WHERE id = '$regno' and password='$password'";
$result = mysqli_query($database,$query);
$row = mysqli_fetch_array($result);
if(mysqli_num_rows($result)==1)
	{
	    $_SESSION['login']="login";
        $_SESSION['name']=$row['name'];
        $_SESSION['type']=$row['type'];
	    header('location: /lab/');
        exit;
	 }
else
	$_SESSION['emsg']=" Incorrect PRN or Password";
    header('location: /');
    exit;
?> 