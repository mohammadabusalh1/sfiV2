<?php

if (isset($_POST["activityName"])) {
    $activityName = $_POST["activityName"];
    $conn = mysqli_connect("localhost", "root", "", "sfi");
    $conn->set_charset("utf8");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $sql = "SELECT * FROM `attachments` WHERE `activity_name`='" . $activityName . "'";
    $result = mysqli_query($conn, $sql);
    $ht = '
    <table id="imageTable">  
     <tr>
      <th width="70%">صور</th>
      <th width="10%">حذف</th>
     </tr>
   ';
    if (mysqli_num_rows($result) > 0) {
        while($row = mysqli_fetch_assoc($result)){
            $img = $row["attachment"];
            $attachment_id  = $row["attachment_id"];
            $ht .= "<tr> <td><img style=\"width: 150px;height: 150px;\" src=\"img/images/$img\" alt=\"\"></td> <td><button class=\"img_remove\" data-id=\"$attachment_id,$img\">حذف</button></td> </tr>";
        }
        echo $ht;
    } else {
        echo $ht;
    }
    mysqli_close($conn);
}
