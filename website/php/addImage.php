<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sfi";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get file data
$file = $_FILES['file']['tmp_name'];
$file_name = $_FILES['file']['name'];
$activity = $_POST['activityName'];

// Read file contents
$handle = fopen($file, "r");
$contents = fread($handle, filesize($file));
fclose($handle);

// Escape special characters
$contents = mysqli_real_escape_string($conn, $contents);

// Insert file data into database
$sql = "INSERT INTO `attachments`(`file_name`, `file_contents`, `activity_name`) VALUES ('$file_name', '$contents', '$activity')";
if ($conn->query($sql) === TRUE) {
    echo "File uploaded successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>