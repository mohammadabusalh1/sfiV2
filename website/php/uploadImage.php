<?php
$servername = "localhost";
$username = "anascosf_sfi";
$password = "SfiA!cxpw2Y";
$dbname = "anascosf_sfi";

// Create connection
$con = new mysqli($servername, $username, $password, $dbname);
$con->set_charset("utf8");
if (!$con) {
    die("Error connecting to database: " . mysqli_connect_error());
}
$sql = "INSERT INTO `attachments` (`attachment`, `activity_name`) VALUES ('$fileName', '$activityName')";
$result = mysqli_query($con, $sql);
if ($result) {
    echo "Image added successfully";
} else {
    echo "Error adding image: " . mysqli_error($con);
}
mysqli_close($con);