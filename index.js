const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateHTML = require("./generateHTML");

  inquirer
    .prompt({
      message: "Enter your GitHub username",
      name: "username"
    },
    {
      type: "checkbox",
      message: "Pick your favorite color!",
      name: "color",
      choices: [
        "green", 
        "blue", 
        "red", 
        "pink"
      ]
    })
    .then(function(data) {
      let queryUrl = `https://api.github.com/users/${data.username}`;

  });
axios
    .get(queryUrl)
    .then(function(res){
      //console.log(res.data[0]);
      let response = res.data;
      const masterObject = Object.assign({"avatar_url":  response.avatar_url}, 
                                         {"name": response.location}, 
                                         {"html_url": response.blog},
                                         {"bio": response.public_repos}, 
                                         {"followers": response.following},
                                          ...data);
      console.log(masterObject);
       //generateHTML(data)
  })
 



// const questions = [
  
// ];

// function writeToFile(fileName, data) {
 
// }

// function init() {}

// init();

// for(const names of res.data){
      //   repoName.push(names.name);
        
        // fs
        //   .appendFile("repos.txt", names.name + '\n', function(err) {

        //     if (err) {
        //       return console.log(err);
        //     }
          
        //     console.log("Success!");
          
        //   });
      // }
      // console.log(repoName.join("\n"));
  
    