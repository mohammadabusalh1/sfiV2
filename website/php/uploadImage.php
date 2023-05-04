<?php
$con = mysqli_connect("localhost", "root", "", "sfi");
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