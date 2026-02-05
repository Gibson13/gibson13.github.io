<<<<<<< HEAD
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $act = htmlspecialchars($_POST["act"]);

    $to = "aeddy01@rio.edu"; // Replace with your email
    $subject = "Talent Show Registration";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nAct: $act";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Registration successful! We will contact you soon.";
    } else {
        echo "Error sending email. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
=======
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST["name"]);
    $email = htmlspecialchars($_POST["email"]);
    $phone = htmlspecialchars($_POST["phone"]);
    $act = htmlspecialchars($_POST["act"]);

    $to = "aeddy01@rio.edu"; // Replace with your email
    $subject = "Talent Show Registration";
    $message = "Name: $name\nEmail: $email\nPhone: $phone\nAct: $act";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo "Registration successful! We will contact you soon.";
    } else {
        echo "Error sending email. Please try again later.";
    }
} else {
    echo "Invalid request.";
}
?>
>>>>>>> 746ca995f3eda8c3fd89fb23f33fa0cf112a2b06
