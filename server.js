const express=require("express");
const app=express();
require('dotenv').config();
const PORT=process.env.PORT || 3000;
const ejs=require("ejs");
const connection=require("./Database/DBconfig.js");

//Middlewares and set template engine
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));

//Routes
    //Home Route
    app.get('/',(req,res)=>{
        res.render("index");
    });

    //Table of university and department and institute
    app.get('/db-tables-insert',(req,res)=>{
        const db1=`INSERT INTO tblUniversity (universityID, universityName)
                    VALUES ('101','CHARUSAT'),('102','NIRMA'),('103','SVMIT')`;
        
        const db2=`INSERT INTO tblDepartment (departmentID,universityID, departmentName)
                    VALUES ('201','101','CE'),('202','101','IT'),('203','101','CSE'),('204','101','CL'),('205','101','ME'),
                    ('211','102','CE'),('212','102','IT'),('213','102','CSE'),('214','102','CL'),('215','102','ME'),
                    ('221','103','CE'),('222','103','IT'),('223','103','CSE'),('224','103','CL'),('225','103','ME')`;

        const db3=`INSERT INTO tblInstitute (instituteID,universityID, instituteName)
                    VALUES ('201','101','CSPIT'),('202','101','DEPSTAR'),('203','101','RPCP'),
                    ('211','102','NTPC'),('212','102','MTCN'),('213','102','PTN'),
                    ('221','103','STTT'),('222','103','STPU'),('223','103','STNL')`;

                connection.query(db1,(err,result)=>{
                    if(err) throw err;
                    
                    console.log(result);
                }) 

                connection.query(db2,(err,result)=>{
                    if(err) throw err;
                    
                    console.log(result);
                }) 

                connection.query(db3,(err,result)=>{
                    if(err) throw err;
                    
                    console.log(result);
                }) 

                res.send("<h1>DATA INSERTED!!</h1>")
    })

    //Add course Route
    app.get('/course-add',(req,res)=>{

        res.render("course",{
            title: "Add New Course"  
        })

    
    });
    app.post('/course-add',(req,res)=>{
        console.log(req.body);
        let sql="INSERT INTO tblCourse (courseID,courseName,universityName,departmentName,instituteName) VALUES ('"+req.body.scode+"', '"+req.body.sname+"','"+req.body.uname+"','"+req.body.dname+"','"+req.body.iname+"')"
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            
            console.log(result);
        })   
        res.redirect("/course");
    })

    //Coursedisplay route
    app.get('/course',(req,res)=>{
        let sql="SELECT * FROM tblCourse";
        let query=connection.query(sql,(err,rows)=>{
            if(err) throw err;
            console.log(rows);
            res.render("courseView",{
                title: "All Courses Details",
                courses: rows
            })
        })
    });

    //api for data
    app.get("/db-data", (req,res)=>{
        let sql="SELECT * FROM tblUniversity";

                connection.query(sql,(err,result)=>{
                    if(err) throw err;
                    
                    res.send(JSON.stringify(result) );
                })  
        
    });

    //route for course edit
    app.get("/course-edit/:id",(req,res)=>{
        let course=req.params.id
        let sql="SELECT * FROM tblCourse WHERE tblCourse.courseID="+course+"";

        let query=connection.query(sql,(err,rows)=>{
            if(err) throw err;
            console.log(rows);
            console.log(course);
            res.render("courseEdit",{
                title: "All Courses Details",
                courses: rows
            })
        })
    })
    app.post("/course-edit/:id",(req,res)=>{
        let course=req.params.id
        let sql=`UPDATE tblCourse SET courseID="${req.body.scode}",courseName="${req.body.sname}",universityName="${req.body.uname}",departmentName="${req.body.dname}",instituteName="${req.body.iname}" WHERE courseID="${course}"`;

        let query=connection.query(sql,(err,rows)=>{
            if(err) throw err;
            console.log(rows);
            console.log(course);
        })

        res.redirect("/course")

    })

    //Route for course delete
    app.get("/course-delete/:id",(req,res)=>{
        let course=req.params.id
        let sql="DELETE FROM tblCourse WHERE tblCourse.courseID="+course+"";

                connection.query(sql,(err,result)=>{
                    if(err) throw err;
                })  
                res.redirect("/course")
    })

    //api for department
    app.get("/db-data/department/:id",(req,res)=>{
        let university=req.params.id
        let sql=`SELECT * FROM tblDepartment WHERE tblDepartment.universityID="${university}"`
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            
            res.send(JSON.stringify(result));
        }) 
    })

    //api for institute
    app.get("/db-data/institute/:id",(req,res)=>{
        let university=req.params.id
        let sql=`SELECT * FROM tblInstitute WHERE tblinstitute.universityID="${university}"`
        connection.query(sql,(err,result)=>{
            if(err) throw err;
            
            res.send(JSON.stringify(result));
        }) 
    })

    //404 for other route
    app.use((req,res,next)=>{
        res.render("404");
    })

app.listen(PORT,()=>{
    console.log(`Server is listening on PORT ${PORT}`);
});