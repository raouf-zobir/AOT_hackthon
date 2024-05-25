CREATE DATABASE doctor_appointment;
USE doctor_appointment;

-- Create the patient table
CREATE TABLE patient (
    id_patient INT AUTO_INCREMENT PRIMARY KEY,
    name_patient VARCHAR(255) NOT NULL,
    fname_patient VARCHAR(255) NOT NULL,
    age INT CHECK (age > 0),
    email VARCHAR(255),
    CONSTRAINT check_Email1 CHECK (email LIKE '%_@_%._%'),
    password_patient VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(255)
);

-- Create the doctor table
CREATE TABLE doctor (
    id_doctor INT AUTO_INCREMENT PRIMARY KEY,    
    name_doctor VARCHAR(255) NOT NULL,
    fname_doctor VARCHAR(255) NOT NULL,
    age INT CHECK (age > 0),
    email VARCHAR(255),
    CONSTRAINT check_Email2 CHECK (email LIKE '%_@_%._%'),
    password_doctor VARCHAR(255),
    phone VARCHAR(20),
    address VARCHAR(255),
    speciality VARCHAR(255),
    description_doctor VARCHAR(255),
    rank_of_doctor DECIMAL(4,2)
);

-- Create the schedule table
CREATE TABLE schedule (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_doctor INT,
    day VARCHAR(50) NOT NULL,
    FOREIGN KEY (id_doctor) REFERENCES doctor(id_doctor)
);

-- Create the appointment table
CREATE TABLE appointment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT,
    time TIME NOT NULL,
    patient VARCHAR(255) NOT NULL,
    reason VARCHAR(255) NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

-- Create the free_slot table
CREATE TABLE free_slot (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_id INT,
    time TIME NOT NULL,
    available BOOLEAN NOT NULL,
    FOREIGN KEY (schedule_id) REFERENCES schedule(id)
);

-- Insert into doctor table
INSERT INTO doctor (name_doctor, fname_doctor, age, email, password_doctor, phone, address, speciality, description_doctor, rank_of_doctor)
VALUES ('John', 'Smith', 45, 'dr.smith@example.com', 'password123', '1234567890', '1234 Elm St', 'Cardiology', 'Experienced cardiologist', 4.5);

-- Insert into patient table
INSERT INTO patient (name_patient, fname_patient, age, email, password_patient, phone, address)
VALUES ('John', 'Smith', 45, 'dr.smith@example.com', 'p123', '1234567890', '1234 Elm St');

-- Insert into schedule table
INSERT INTO schedule (id_doctor, day) VALUES (1, 'Sunday');
INSERT INTO schedule (id_doctor, day) VALUES (1, 'Monday');
INSERT INTO schedule (id_doctor, day) VALUES (1, 'Tuesday');
INSERT INTO schedule (id_doctor, day) VALUES (1, 'Wednesday');
INSERT INTO schedule (id_doctor, day) VALUES (1, 'Thursday');

-- Insert into appointment table
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '08:00:00', 'Patient 1', 'N');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '09:00:00', 'Patient 2', '');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '10:00:00', 'Patient 3', 'N');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '11:00:00', 'Patient 4', '');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '12:00:00', 'No Patient', 'Break');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '13:00:00', 'Patient 5', '');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '14:00:00', 'Patient 6', 'N');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '15:00:00', 'Patient 7', 'N');
INSERT INTO appointment (schedule_id, time, patient, reason) VALUES (1, '16:00:00', 'Patient 8', 'N');

-- Insert into free_slot table
INSERT INTO free_slot (schedule_id, time, available) VALUES (1, '09:00:00', TRUE);
INSERT INTO free_slot (schedule_id, time, available) VALUES (1, '11:00:00', TRUE);
INSERT INTO free_slot (schedule_id, time, available) VALUES (1, '13:00:00', TRUE);
INSERT INTO free_slot (schedule_id, time, available) VALUES (1, '14:00:00', TRUE);