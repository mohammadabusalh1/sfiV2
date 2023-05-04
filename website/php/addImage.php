<?php
if (isset($_FILES['file'])) {
    $file = $_FILES['file'];
    $activityName = $_POST['activityName'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];
    $fileType = $file['type'];

    if ($fileError === 0) {
        if ($fileSize < 9999999999) {
            $fileDestination = '../img/images/' . $fileName;
            move_uploaded_file($fileTmpName, $fileDestination);
        } else {
            echo "الملف حجمه كبير";
        }
    } else {
        echo "يوجد مشكلة في تحميل الملف";
    }
}

?>