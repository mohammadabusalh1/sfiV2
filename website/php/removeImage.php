<?php
$fileName = $_GET["name"];
unlink('../img/images/' . $fileName);
