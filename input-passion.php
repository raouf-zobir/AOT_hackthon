<?php
$host = 'localhost';
$name = 'doctor_appointment';
$username = 'root';
$password = '';

try {
    $db = new PDO("mysql:host=$host;dbname=$name;charset=utf8", $username, $password);
} catch (PDOException $ex) {
    echo "Problem connecting to MySQL: " . $ex->getMessage();
    exit();
}

$error = "";
$success = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = $_POST['first-name'];
    $lastName = $_POST['last-name'];
    $age = $_POST['age'];
    $email = $_POST['email'];
    $address = $_POST['address'];
    $gender = $_POST['gender'];
    $number = $_POST['number'];
    $password = $_POST['password'];

    // Check if email already exists
    $checkEmail = $db->prepare("SELECT * FROM patient WHERE email = :email");
    $checkEmail->bindParam(':email', $email);
    $checkEmail->execute();

    if ($checkEmail->rowCount() > 0) {
        $error = "The email address is already registered.";
    } else {
        $sql = "INSERT INTO patient (name_patient, fname_patient, age, email, address, gender, password_patient, phone) VALUES (:first_name, :last_name, :age, :email, :address, :gender, :password, :number)";
        $stmt = $db->prepare($sql);

        $stmt->bindParam(':first_name', $firstName);
        $stmt->bindParam(':last_name', $lastName);
        $stmt->bindParam(':age', $age);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':password', $password);
        $stmt->bindParam(':number', $number);

        if ($stmt->execute()) {
            $success = "New record created successfully";
        } else {
            $error = "Error: " . $stmt->errorInfo()[2];
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <title>Input as a Passion</title>
    <style>
        .button {
            background-color: #0369a1;
            color: white;
            padding: 14px 20px;
            cursor: pointer;
            border-radius: 10px;
            margin: 10px 20px;
            width: calc(100% - 40px);
            font-size: 16px;
            border: none;
            width: 300px;
            margin: 20px;
            height: 20%;
        }
        form {
            display: flex;
            align-items: center;
            flex-direction: column;
        }
        #buttona {
            position: absolute;
            right: 20px;
            padding: 8px;
            height: 10%;
            width: 100px;
            height: 40px;
        }
        #buttona a {
            color: white;
            text-decoration: none;
        }
        .error {
            color: red;
            margin-bottom: 20px;
        }
        .success {
            color: green;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
<section>
    
        <?php if ($error): ?>
            <p class="error"><?= $error ?></p>
        <?php endif; ?>
        <?php if ($success): ?>
            <p class="success"><i class="fas fa-check"></i> <?= $success ?></p>
        <?php endif; ?>
        
</section>
</body>
</html>
