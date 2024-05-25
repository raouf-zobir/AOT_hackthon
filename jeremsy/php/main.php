<?php 
    $host = 'localhost';
    $name = 'doctor_appointment';
    $username = 'root';
    $password = '';

try{
    $db= new PDO("mysql:host=$host;dbname=$name;charset=utf8",$username, $password);
}
catch(PDOException $ex){
    echo "problem connexion mysql".$ex->getMessage();
}

//PRINT THE DOCTOR INFORMATION
foreach($db->query('Select * from doctor where id=1') as $row){
    echo 'Dr.'.$row['name'];
}

echo '<br>'.'<br>';
$DailySchedule = array();
foreach($db->query('SELECT * FROM appointment') as $row) {
    $DailySchedule[] = $row;
}
$DailySchedule_json = json_encode($DailySchedule);
file_put_contents('../json/DailySchedule.json', $DailySchedule_json);


echo '<br>'.'<br>';
$free_slot = array();
foreach($db->query('SELECT * FROM free_slot') as $row) {
    $free_slot[] = $row;
}
$free_slot_json = json_encode($free_slot);
file_put_contents('../json/free_slot.json', $free_slot_json);


echo '<br>'.'<br>';
$days = array();
foreach($db->query('SELECT * FROM schedule') as $row) {
    $days[] = $row;
}
$days_json = json_encode($days);
file_put_contents('../json/days.json', $days_json);

?>