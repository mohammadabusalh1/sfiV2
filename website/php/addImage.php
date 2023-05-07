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

    if ($fileError === 0) {
        if ($fileSize < 9999999999) {
            $fileNameNew = uniqid('', true) . "." . $fileActualExt;
            $fileDestination = '../img/images/' . $fileNameNew;
            move_uploaded_file($fileTmpName, $fileDestination);
            echo $fileNameNew;
        } else {
            echo "الملف حجمه كبير";
        }
    } else {
        echo "يوجد مشكلة في تحميل الملف";
    }
}

?>