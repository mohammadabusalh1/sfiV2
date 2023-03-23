<?php
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $activityName = $_POST['activityName'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    $fileType = $file['type'];

    $fileExt = explode('.', $fileName);
    $fileActualExt = strtolower(end($fileExt));

    $allowed = array('jpg', 'jpeg', 'png', 'pdf');

    if (in_array($fileActualExt, $allowed)) {
        if ($fileError === 0) {
            if ($fileSize < 9999999999) {
                $fileNameNew = uniqid('', true) . "." . $fileActualExt;
                $fileDestination = '../img/images/' . $fileNameNew;
                move_uploaded_file($fileTmpName, $fileDestination);
                $con = mysqli_connect("localhost", "root", "", "sfi");
                $con->set_charset("utf8");
                if (!$con) {
                    die("Error connecting to database: " . mysqli_connect_error());
                }
                $sql = "INSERT INTO `attachments` (`attachment`, `activity_name`) VALUES ('$fileNameNew', '$activityName')";
                $result = mysqli_query($con, $sql);
                if ($result) {
                    echo "Image added successfully";
                } else {
                    echo "Error adding image: " . mysqli_error($con);
                }
                mysqli_close($con);
            } else {
                echo "الملف حجمه كبير";
            }
        } else {
            echo "يوجد مشكلة في تحميل الملف";
        }
    } else {
        echo "لا يمكن تحميل هذا النوع من الملفات";
    }
}

?>