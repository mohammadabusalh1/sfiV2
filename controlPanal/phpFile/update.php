<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sfi";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
$conn -> set_charset("utf8");
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = $_POST["sqlup"];


if ($conn->query($sql) === TRUE) {
    echo "New record update successfully";
  } else {
    echo $conn->error;
  }

?>
