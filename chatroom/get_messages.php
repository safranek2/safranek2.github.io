<?php
$chat_history = file_get_contents("messages.txt");
echo nl2br($chat_history);
?>
