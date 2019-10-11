const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");
const convertFactory = require('electron-html-to');
let conversion = convertFactory({
  converterPath: convertFactory.converters.PDF
});
let totalStars = 0;
getUserInfo();
  async function getUserInfo(){
    try{
    const {username,color} = await inquirer.prompt([
    {
      message: "Enter your GitHub username",
      name: "username"
    },
    {
      type: "list",
      message: "Pick your favorite color!",
      name: "color",
      choices: [
        "green", 
        "blue", 
        "red", 
        "pink"
      ]}
    ])
     
    res = await axios.get(
      `https://api.github.com/users/${username}/repos`
    );
    let repos = res.data;
    for(const repo of repos){
      totalStars += repo.watchers_count; 
    }
    //console.log(repos);

    const { data } = await axios.get(
      `https://api.github.com/users/${username}`
    );

    data["color"] = color;
    data["totalStars"] = totalStars;
      
    const html = generateHTML(data);
    console.log(data);

    conversion({ html: html }, function(err, result) {
      if (err) {
        return console.error(err);
      }
     
      result.stream.pipe(fs.createWriteStream('./ETRezaei.pdf'));
      conversion.kill(); 
    });


    } catch (err){
      console.log(err)
    }
  }

  