/* ### global variable ### */
const MAX_CURRENT_USERS = 100

/* ### path ### */ 
result_base_path = '/data/louis/font-compat-test-service/modifying/web/result/'

const express = require('express')
const bodyParser = require('body-parser');
const app = express()
// const app2 = express()

// app2.use(bodyParser.json());
// app2.use(bodyParser.urlencoded({extended: true}));

const port = process.env.PORT || 6667;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(express.static('result'));

// app.use(express.static('result1'));
// // app.use('/result1', express.static('./result'));
for(let i = 1; i<MAX_CURRENT_USERS+1; i++){
	app.use('/result'+i.toString(), express.static('./result' + i.toString()));
}


let {PythonShell} = require('python-shell');

/// time print 
var moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


/// 

const multer = require('multer');
var storage_ENG = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../data/font/ENG')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

var upload_ENG = multer({storage:storage_ENG})


var storage_KOR = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, '../data/font/KOR')
    },
    filename: function(req,file,cb){
        cb(null, file.originalname)
    }
})

var upload_KOR = multer({storage:storage_KOR})

///

app.post('/api/font-upload/ENG', upload_ENG.array('files'), (req,res)=>{
    // console.log(req.file)
    // res.send(req.file)
    // console.log(req.body.lang)
    res.send(req.files && req.body.lang)

})


app.post('/api/font-upload/KOR', upload_KOR.array('files'), (req,res)=>{
    // console.log(req.file)
    // res.send(req.file)
    // console.log(req.body.lang)
    res.send(req.files && req.body.lang)

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


var input_stmt_g;
// var flag = 0;
var input_lang_g;
var user_num_g = 0;
// var processing = 0;
var success_num;
app.post('/api/fonts', function(req, res){
    console.log("날짜 : " + moment().format('YYYY-MM-DD HH:mm:ss'));
		input_stmt_g = req.body.statement;
		input_lang_g = req.body.lang;
 		user_num_g = (user_num_g + 1) % (MAX_CURRENT_USERS+1);
    // flag = 1;
    console.log("실행됨")
    console.log(req.body.statement)
		console.log(req.body.lang)
    // console.log(req.body)
})

app.get('/api/fonts', (req, res)=> {
    // console.log(input_stmt)
		var input_stmt = input_stmt_g;
		var input_lang = input_lang_g;
    input_stmt = encodeURI(input_stmt)
    input_stmt = decodeURI(input_stmt)
    // if(flag == 1){ 
		var user_num = user_num_g
		console.log(user_num.toString())
		// processing = 1
		var fs = require('fs');
		try{
				var prior_files = fs.readdirSync('result' + user_num.toString() + '/')
				console.log(prior_files);
				prior_files.forEach(prior_result => fs.unlink(result_base_path.slice(0,-1) + user_num.toString() + "/" + prior_result, function(err){
							if( err ){
											// folder is not created yet.
											console.log(err);
										}
							console.log('file deleted');
						}))
				console.log(e);
		}catch(err){
				if(err.code == 'ENOENT'){
							// folder is not created yet.
						}
			console.log(err);
		}

		var options={
				mode:'text',
				pythonPath:'',
				pythonOptions:['-u'],
				scriptPath:'../wand/',
				args:[input_stmt, input_lang, user_num]
		}

		console.log(input_stmt)
		// console.log(success_num)


		PythonShell.run('wand_text_test_ver3_1_multiuser.py', options, function(err,result){
				if (err){
					console.log("python shell error : " + err);
				}
				else{
					var files;
					// var failed_files = [];
					var options = {} // 'options' indicates failed files.
					try{
							files = fs.readdirSync('result' + user_num.toString() + '/');
							
							console.log("통과")
							var result_list = new Array();
									
							for(let i = 0; i < files.length; i++){
										{
														var result = new Object();
														console.log(files[i])
														
														// var font_name = (files[i].slice(-15, -8) == "_failed" ? files[i].slice(0, -15) : files[i].slice(0, -8)); 
														var font_name = files[i].slice(0,-11)
														result.name = (font_name +"." + files[i].slice(-7, -4));

														result.statement = input_stmt

														result.renderimage =  "/result" + user_num.toString() + "/" + files[i];

														// result.success = files[i].slice(-15, -8) == "_failed" ? false : true;
														var success_bin = files[i].slice(-(8+input_stmt.length), -8)
														result.successbin = success_bin
														
														for(let j = 0; j< input_stmt.length; j++){
															if(success_bin[j] == 0){
																const each_option = (options[input_stmt[j]] == undefined ? [] : options[input_stmt[j]]);
																each_option.push(result.name)

																options[input_stmt[j]] = each_option
															}
														}
														
														/*
														if(!result.success){
															failed_files.push(result.name);
														}
														if(i == (files.length -1)){
															result.failed = failed_files;
														} */
														
														if(i == (files.length-1)){
															result.failed = options;
														}
														result_list.push(result);
										}
						}
						// console.log(result_list[files.length-1]["failed"])
					}catch(err){
							if(err.code == 'ENOENT'){
									// folder is not created yet.
										result_list = null
									}
					}
					console.log(result_list)

					var jsonResult = JSON.stringify(result_list);
		
					// setTimeout(function(){
					res.send(jsonResult);
				
					// result_list.forEach(result => fs.unlink("C:\\Users\\remake\\gdrive\\remake\\font-compat-test-service\\frontend\\font-compat-test-service\\result"+result.renderimage, function(err){
					//     if( err ) throw err;
					//     console.log('file deleted');
					// }))
				
					// flag = 0;
					// processing = 0
					// }, 5000)

				}
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
        
    //}
    
    //else{
    //    res.send(null)
    //}
});


app.get('/api/hello', (req, res)=> {
    res.send({message: 'Hello Express!'});
});

app.listen(port, () => console.log(`Listening on port ${port}`));
