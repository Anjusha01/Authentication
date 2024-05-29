import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './schema/user.js'
import bcrypt from 'bcrypt'

const app=express()

mongoose.connect('mongodb://localhost:27017/Registeration')
.then(()=>console.log("Database connection established!"))

const db=mongoose.connection

app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.json({name:'Anju'})
})

app.post('/register',async (req,res)=>{
    try{
        const {name, email, password}= req.body
        if (!name || !email || !password) {
            return res.status(400).json('All fields are required');
        }

        const existingUser = await User.findOne({ email:email});
        if (existingUser) {
            return res.status(400).json('User already exists');
        }



        console.log(req.body);
        let hashedPassword=await bcrypt.hash(req.body.password,10)
        req.body={...req.body,password:hashedPassword}
        let newdata=new User(req.body)
        let response=await newdata.save()
        res.json(response)
    }
    catch(e){
        res.status(500).json(e.message)
    }
    })

    app.post('/login',async(req,res)=>{
        try{

            console.log(req.body,'req.body');
            const {email, password }=req.body

            if (!email || !password) {
                return res.status(400).json('Email and password are required');
            }

            let response=await User.findOne({email:email})
            if(!response){
                return res.status(500).json('user not found')
            }
            let matchPassword=await bcrypt.compare(password,response.password)
            console.log(matchPassword,'matched');
        
            console.log(response);
            if(!matchPassword){
                return res.status(401).json('invalid email or password')
            }
            res.json(response)
        }
        catch(e){
            res.status(500).json(e.message)
        }
    })
    app.listen(4000,()=>{
        console.log('Running on 4000')
})