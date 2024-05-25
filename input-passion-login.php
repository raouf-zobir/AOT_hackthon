<?php 
$host = 'localhost';
$name = 'doctor_appointment';
$username = 'root';
$password = '';

try {
    $db = new PDO("mysql:host=$host;dbname=$name;charset=utf8", $username, $password);
} catch (PDOException $ex) {
    echo "Problem connecting to MySQL: " . $ex->getMessage();
}

// Initialize an error message variable
$error_message = '';

// Check if form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $query = $db->prepare("SELECT * FROM patient WHERE email = :email AND password_patient = :password");
    $query->execute(['email' => $email, 'password' => $password]);

    if ($query->rowCount() > 0) {
        // Redirect to another page on successful login
        header("Location: passion.html");
        exit(); // Terminate script execution after redirection
    } else {
        // Set the error message to be displayed
        $error_message = 'Invalid email or password, please try again.';
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Main template CSS file -->
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="test.css">
    <title>input as a passion</title>
</head>
<body>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #f0f0f0; /* Change to your desired background color */
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        section {
            height: 100vh; /* Full viewport height */
            width: 100%; /* Full width */
            background-color: #f0f0f0; /* Ensure this matches the body's background color */
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .container {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .info {
            width: 300px;
            max-width: 100%;
        }

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
        .error-message {
        color: red;
    }
    </style>
<section>
    <div class="container">
        <h2>Log-In</h2>

        <form action="input-passion-login.php" method="POST">
            <div class="form">
                    <div class="info">
                        <label for="email">Email</label>
                        <input type="text" name="email"  required>
                        <label for="password">Password</label>
                        <input type="password" name="password"  required>
                    </div>
                    <?php if ($error_message): ?>
                        <p class="error-message"><?php echo $error_message; ?></p>
                    <?php endif; ?>
            </div>
            <input type="submit"  class="custom-btn btn-13" value="Log-in"><br>

        </form>
    </div>
</section>



</body>
</html>
