<?php
header("Content-Type: text/html; charset=utf-8");
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$weight1 = htmlspecialchars($_POST["weight1"]);
$weight2 = htmlspecialchars($_POST["weight2"]);



$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "konkord_rekruting@mail.ru";

$tema = "Новая заявка";
$message_to_myemail = "
<br><br>
Имя: $name<br>
Телефон: $tel<br>
Вес, кг: $weight1<br>
Объем, м3: $weight2<br>

Источник (ссылка): $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: Army <admin@kateweb.ru> \r\n  \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );



?>
