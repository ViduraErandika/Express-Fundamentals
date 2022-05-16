import  express, { response }  from "express";
import data from './data/mock.json' assert {type: "json"};
const app = express();

const PORT = 3000;
//using the pubic folder at the root of the project 
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

app.post('/data',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

//using the images folder at the route /images
app.use('/images',express.static('images'));

app.get('/', (req, res) => {
    // res.send('This is the GET req at /')
    res.json(data)
})

//GET - redirect method
app.get('/redirect', (req, res) => {
    // res.send('This is the GET req at /')
    res.redirect('http://www.google.com')
})

//GET - download method
app.get('/download', (req, res,next) => {
    res.download('images/bus.png')
    next();
},(req,res)=>{
        // res.send('file get downloaded');
})

//get with next
app.get('/next', (req, res,next) => {
    console.log("response will be sent by the next function");
    next();
},(req,res)=>{
    res.send("Just send it through a callback");
}
)

//get with routing parameters
app.get("/class/:id",(req, res)=>{
    console.log(req.params);
    const studentId = Number(req.params.id);
    const student = data.filter((student) => student.id === studentId);

    res.send(student);
})

app.post('/create', (req, res) => {
    res.send('This is the POST req at /create')
})

app.put('/edit', (req, res) => {
    res.send('This is the PUT req at /edit')
})

app.delete('/delete', (req, res) => {
    res.send('This is the DELETE req at /delete')
})


//Route Chaining
app
.route("/class")
.get((req,res)=>{
    // res.send("Retrieve class info")
    throw new Error();
})
.post((req,res)=>{
    res.send("Create class info")
})
.put((req,res)=>{
    res.send("update class info")
})
.delete((req,res)=>{
    res.send("delete class info")
})

app.use((err,req,res,next)=>{
    console.error(err.stack);
    res.status(500).send("Something is broken!");
})
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}!`);
    // console.log(data);
})

