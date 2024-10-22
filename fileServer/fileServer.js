const express = require('express');
const fs = require('fs');
const PORT = process.env.PORT || 4000
const app = express();

app.get('/files', (req , res)=>{

  fs.readdir('./files' , (err , files)=> {
    if(err){
      res.status(500).send(`unable to read file ${err}`)
    }else{
      res.status(200).json({
        files
      })
    }
  })
})

function checkFilePresent(nameOfFile){
  let fileArray = fs.readdirSync('./files')
  // console.log(fileArray);
  let isAvailable = false
  for(let i = 0 ; i < fileArray.length; i++){
    if(fileArray[i] == nameOfFile){
      isAvailable = true
    }
  }
  return isAvailable
}

app.get('/files/:fileName' , (req , res)=>{
  const fileName = req.params.fileName
  const fileAvailable = checkFilePresent(fileName)

  if(fileAvailable){
    fs.readFile(`./files/${fileName}` , 'utf-8' , function(err , data){
      if(err){
        res.status(500).send(`something went wrong while reading file ${fileName}`)
      }else{
        res.status(200).json({
          data
        })
      }
    })
  }else{
    res.status(404).send(`File not found`)
  }
})

app.use((req, res, next) => {
  res.status(404).send('404 Not Found');
});

app.listen(PORT , () =>{
  console.log(`server is running on port ${PORT}`);
})
