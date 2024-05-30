import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import User from './schema/user.js'
import bcrypt from 'bcrypt'
import Book from './schema/books.js'
import jwt from 'jsonwebtoken'

const app=express()

mongoose.connect('mongodb://localhost:27017/Registeration')
.then(()=>console.log("Database connection established!"))

const db=mongoose.connection

app.use(express.json())
app.use(cors())

let verifyToken=(req,res,next)=>{
    try{
        console.log(req.headers.authorization)
        let response=jwt.verify(req.headers.authorization,'abc')
        console.log(response)
        next()
    }
    catch(e){
        res.status(401).json(e.message)
        console.log(e.message,'error');
    }
}

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
            let token = jwt.sign({id:response._id,email:response.email},'abc')
            console.log(token,'token generated');
            res.json({response,token})
        }
        catch(e){
            res.status(500).json(e.message)
        }
    })

    //CRED operations for book collection

    app.post('/add',async(req,res)=>{
        console.log(req.body)
        let newBook=new Book(req.body)
        let response= await newBook.save()
        res.json(response)
    })
    app.get('/view',verifyToken,async(req,res)=>{
        let books= await Book.find()
        console.log(books)
        res.json(books)

    })

    app.delete('/delete/:id',async(req,res)=>{
        let id=req.params.id
        let response=await Book.findByIdAndDelete(id)
        res.json(response)
    })

    app.listen(4000,()=>{
        console.log('Running on 4000')
})