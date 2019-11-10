const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = 'cc5d3d9f11753f645e4a18c85172897a';
port = 3000;

app.use(express.static('css'));
app.use(bodyParser.urlencoded({extended:false}));
app.set('view engine', 'pug')

app.get('/',(req,res)=>{
    res.render('index',{weather:null, error: null});
})

app.post('/', (req,res) =>{
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, (err,response,body) =>{
        if(err){
            res.render('index',{weather: null, error: 'Error, please try again!'});
        }
        else{
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index',{weather: null, error: 'Error, please try again!'} );
                }
                else{
                    let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}! `;
                    res.render('index',{weather: weatherText, error: null});

                }
            }
        })
    });
   


app.listen(port, ()=>{
    console.log(`server is up and running on ${port}`);
});