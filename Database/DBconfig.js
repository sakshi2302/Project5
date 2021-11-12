const mysql=require('mysql');
require('dotenv').config();

const DB=process.env.DB;

const connection = mysql.createConnection({
    host: process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:DB
    
});

connection.connect((err)=>{
    if(err) throw err;
    console.log("Connected successfully to MySql server")
});

const dbquery=`CREATE DATABASE IF NOT EXISTS ${DB}`;

connection.query(dbquery,(err,result)=>{
    if(err) throw err;
    console.log("Database created successfully",result)
});

const tblCoursequery=`CREATE TABLE IF NOT EXISTS tblCourse(
    courseID varchar(10) NOT NULL,
    courseName varchar(50) NOT NULL,
    departmentName varchar(50) NOT NULL,
    instituteName varchar(50) NOT NULL,
    universityName varchar(50) NOT NULL,
    PRIMARY KEY (courseID)
    )`


    connection.query(tblCoursequery,(err,result)=>{
            if(err) throw err;
            console.log("Course Table created successfully",result)
    });

    const tblUniversityquery=`CREATE TABLE IF NOT EXISTS tblUniversity(
        universityID varchar(10) NOT NULL,
        universityName varchar(50) NOT NULL,
        PRIMARY KEY (universityID)
        )`

 
connection.query(tblUniversityquery,(err,result)=>{
                if(err) throw err;
                console.log("University Table created successfully",result)
        });

       const tblDepartmentquery=`CREATE TABLE IF NOT EXISTS tblDepartment(
            departmentID varchar(10) NOT NULL,
            universityID varchar(10) NOT NULL,
            departmentName varchar(50) NOT NULL,
            PRIMARY KEY (departmentID),
            FOREIGN KEY (universityID) REFERENCES tblUniversity(universityID)
            )`
    
     
    connection.query(tblDepartmentquery,(err,result)=>{
                    if(err) throw err;
                    console.log("Department Table created successfully",result)
            });

    const query=`CREATE TABLE IF NOT EXISTS tblInstitute(
                instituteID varchar(10) NOT NULL,
                universityID varchar(10) NOT NULL,
                instituteName varchar(50) NOT NULL,
                PRIMARY KEY (instituteID),
                FOREIGN KEY (universityID) REFERENCES tblUniversity(universityID)
                )`
        
         
    connection.query(query,(err,result)=>{
                        if(err) throw err;
                        console.log("Institute Table created successfully",result)
                });
    

module.exports=connection;