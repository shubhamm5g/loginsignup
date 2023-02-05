const express = require('express')
const app = express()
const path = require('path')
const ejs=require("ejs")
const { join } = require('path')

const collection=require('./mongodb')

const tempeletePath=path.join(__dirname,'../tempelates')


app.use(express.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'../public')))
app.use(express.json())
app.set("view engine","ejs")
app.set('views',tempeletePath)

app.get('/',(req,res)=>{
    res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',async (req,res)=>{
    const data={
        username:req.body.name,
        password:req.body.password,
        contactno:req.body.contact,
        flatno:req.body.flatno,
        wingname:req.body.wingname,
        fullname:req.body.fullname
    }

    await collection.insertMany([data])

    res.render('login')
})

app.post('/login',async (req,res)=>{

    try{
        const check=await collection.findOne({username:req.body.name,password:req.body.password})

        if(check.password===req.body.password && check.username==req.body.name){
            res.render("home")
        }
        else{
            res.alert("worng password")
        }
    }
    catch{
        res.send("wrong detailes")

    }

})


app.listen(process.env.PORT || 2000)