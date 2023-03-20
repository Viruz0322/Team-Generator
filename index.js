
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');
const employees = []
//Placeing it in a function allows users to keep creating new employees
function newEmployee() {
    //ask user for employee data
    inquirer.prompt ([
        {
            type: 'list',
            name: 'position',
            message: 'What position is this employee?',
            choices: [
                'Manager',
                'Intern',
                'Engineer',
            ]
        },
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the employee email?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the employee ID?',
        }
    
        //take data and the chosen role and create a new employee object with that role and data
    ]).then(({position, email, id , name}) => {
        switch(position) {
    
            case 'Manager':
                //ask for officeNumber
                inquirer.prompt ([
                    {
                        type:   'input',
                        name: 'officeNumber',
                        message: 'What is the office number?',
                    }
                ]).then(({ officeNumber }) => {
                    employees.push(new Manager(
                        name,
                        email,
                        id,
                        officeNumber
                    ));
                    addEmployee();
                    })
            break;
    
            case 'Intern':
                //ask for school
                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'school',
                        message: 'What is the school you attend?',
                    }
                ]).then(({ school }) => {
                    employees.push(new Intern(
                        name,
                        id,
                        email,
                        school
                    ))
                    addEmployee()
                })
            break;
    
            case 'Engineer':
                //ask for github
                inquirer.prompt ([
                    {
                        type: 'input',
                        name: 'github',
                        message: 'What is the employees github account?',
                    },
                ]).then(({ github }) => {
                    employees.push(new Engineer(
                        name,
                        id,
                        email,
                        github
                    ))
                    addEmployee()
                })
            break;
    
            default:
                //uh oh
        }
        });
    }

function addEmployee() {
    return inquirer.prompt ([
    {
        type: 'confirm',
        name: 'addEmployee', 
        message: 'Would you like to add another employee?'
    },
    ]).then(({ addEmployee }) => {
        if (addEmployee) newEmployee()
        else renderHTMLFile();
    })
}

function renderHTMLFile() {
    //render html file
    fs.writeFileSync('./index.html', /*html*/`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Profile Generator</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    </head>
    <div class="jumbotron" style="text-align: center; border-bottom: 5px solid black; opacity : .9; color:black; text-align:center; background:red" id="jumbotron">
    <h1 class="display-4" style="font-weight:bolder;">This is our team!</h1>
    </div>
    <div class="container">
    <div class="row">
    ${employees.map(employees => `
        <div class = "col-md-3 text-dark" style = "margin : 5px; padding : 0; text-align : center; background-color: rgb(216, 214, 214); border-radius: 5px; border-color: black; border-style: solid;">
        <header style="background : beige">
        <h1>${employees.getName()}</h1>
        ${uniqueIcon(employees)}
        </header>
        <p class = 'fa-solid fa-id-card'> ID NUMBER : ${employees.getId()}</p><br>
        <p class= "fa-solid fa-envelope"><a href="mailto:${employees.getEmail()}"> Email</a></p><br>
        ${uniqueInfo(employees)}
        </div>
        `)}
        </div>
        </div>
    `)
    }
    
    function uniqueInfo (employees) {
        switch (employees.getRole())  {
            // gets office number
            case "Manager": 
            return  `<p class= "fa-solid fa-door-open"> Office Number: ${employees.getOfficeNumber()}</p>` 
            break;
            // gets github account
            case 'Engineer' : 
            return ` <p class="fa-brands fa-github"><a href ="https://www.github.com/${employees.getGithub()}"> GitHub</a></p>`
            break;
            // get the school of intern
            case 'Intern' : 
            return `<p class="fa-solid fa-school-flag"> School : ${employees.getSchool()}</p>`
            break;
        }
    }
    
    function uniqueIcon(employees){
        switch(employees.getRole()) {
        case "Manager" : 
        return `<h3 class= "fa-solid fa-business-time"> ${employees.getRole()}</h3><br>`
        break;
        case 'Engineer' :
            return `<h3 class= "fa-solid fa-laptop-code"> ${employees.getRole()}</h3><br>`
        break;
        case "Intern" :
            return `<h3 class= "fa-solid fa-user"> ${employees.getRole()}</h3><br>`
    }
    }
    
    
    newEmployee()