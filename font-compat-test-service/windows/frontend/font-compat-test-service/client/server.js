const express = require('express')
const bodyParser = require('body-parser');
const app = express()
// const app2 = express()

// app2.use(bodyParser.json());
// app2.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('result'));

let {PythonShell} = require('python-shell');


const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../../data/')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

var upload = multer({storage:storage})

app.post('/api/font-upload', upload.single('file'), (req,res)=>{
    // console.log(req.file)
    // res.send(req.file)
    console.log(req.body.lang)
    res.send(req.body.lang)

})

// var multer = require('multer');
// var upload = multer({dest:'uploads/'})
// app2.post('/api/font-upload', upload.single('file'), function(req, rest){
//     console.log(req.file);
// })

// const font_upload = require('./fileupload');
// const multer = require('multer');
// const router = express.Router();

// router.post("api/font-upload", (req, res, next)=>{
//     console.log("실행?")
//     font_upload(req, res, function(err){
//         if(err instanceof multer.MulterError){
//             return next(err);
//         }else if(err){
//             return next(err);
//         }
//         console.log('원본파일명 : '+ req.file.originalname)
//         console.log('저장파일명 : ' + req.file.filename)
//         console.log('크기 : ' + req.file.size)

//         return res.json({success:1});
//     });
// });

// const multer = require('multer')
// const font_upload = multer({dest: './font'})


// var Q = require('q'); // Q module 


var input_stmt;
var flag = 0;
// var processing = 0;
var success_num;
app.post('/api/fonts', function(req, res){
    input_stmt = req.body.statement;
    flag = 1;
    console.log("실행됨")
    console.log(req.body.statement)
    // console.log(req.body)
})

app.get('/api/fonts', (req, res)=> {
    // console.log(input_stmt)
    input_stmt = encodeURI(input_stmt)
    input_stmt = decodeURI(input_stmt)
    if(flag == 1){
        // processing = 1
        var fs = require('fs');
        var prior_files = fs.readdirSync('result/')
        console.log(prior_files);
        prior_files.forEach(prior_result => fs.unlink("C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\frontend\\font-compat-test-service\\result\\"+prior_result, function(err){
            if( err ) throw err;
            // console.log('file deleted');
        }))

        var options={
            mode:'text',
            pythonPath:'',
            pythonOptions:['-u'],
            scriptPath:'../../wand/',
            args:[input_stmt]
        }
 
        console.log(input_stmt)
        console.log(success_num)


        PythonShell.run('wand_text_test_ver3.py', options, function(err,result){
            if (err) throw err;
            success_num = parseInt(result[1]);
            console.log(success_num);
            
            console.log("실행 : " + toString(success_num) + "\n");
            var files;
            files = fs.readdirSync('result/');
            // console.log('results: %j', result);
            
            console.log("통과")
            var result_list = new Array();
            
            for(var i = 0; i < files.length; i++){
                {   
                    var result = new Object();
                    console.log(files[i])
                    result.name = files[i].slice(0, -4);
                    result.statement = input_stmt
                    result.renderimage = "\\"+files[i];
        
                    result_list.push(result);
                }
            }
        
            var jsonResult = JSON.stringify(result_list);
            
            // setTimeout(function(){
            res.send(jsonResult);
            
            // result_list.forEach(result => fs.unlink("C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\frontend\\font-compat-test-service\\result"+result.renderimage, function(err){
            //     if( err ) throw err;
            //     console.log('file deleted');
            // }))
            
            flag = 0;
            // processing = 0
            // }, 5000)
        });
        
        // do{
        // // while(success_num == 29)
        //     files = fs.readdirSync('result/');
        //     console.log(files.length);
        //     // console.log("실행 : " + toString(success_num) + "\n");
        //     // console.log(toString(files.length) + "\n")
        // }while((success_num == undefined) || (files.length < success_num))
        // while(success_num != 29){

        // }

        // console.log(files);
        // console.log(files[0].slice(0, -4));
        // console.log(typeof(files[0]));
        
    }
    
    else{
        res.send(null)
    }
});


app.get('/api/hello', (req, res)=> {
    res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));