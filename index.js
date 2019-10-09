const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

  inquirer
    .prompt({
      message: "Enter your GitHub username",
      name: "username"
    })
    .then(function({ username }) {
      let queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
     
  axios
    .get(queryUrl)
    .then(function(res){
      console.log(res.data[0]);
      let repoName = [];
      for(const names of res.data){
        repoName.push(names.name);
        
        fs
          .appendFile("repos.txt", names.name + '\n', function(err) {

            if (err) {
              return console.log(err);
            }
          
            console.log("Success!");
          
          });
      }
      console.log(repoName.join("\n"));
  
    
  })

  });




// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init();
