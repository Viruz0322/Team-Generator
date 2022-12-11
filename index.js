
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');
const Employee = require('./lib/Employee');

//Placeing it in a function allows users to keep creating new employees
function newEmployee() {
    //ask user for employee data
    inquirer.prompt ([
        {
            type: 'list',
            name: 'position',
            message: 'What position is this emplyee?',
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
            type: 'list',
            name: 'id',
            message: 'What is the employee ID?'
        },
    
        //take data and the chosen role and create a new employee object with that role and data
    ]).then((position, email, id , name) => {
        switch(position) {
    
            case 'Manager':
                //ask for officeNumber
                inquirer.prompt ([
                    {
                        type:   'input',
                        name: 'officeNumber',
                        message: 'What is the office number?'
                    }
                ]).then(({officeNumber}) => {
                    employees.push(new Manager(
                        name,
                        id,
                        email,
                        officeNumber
                    ))
                    })
            break;
    
            case 'Intern':
                //ask for school
            break;
    
            case 'Engineer':
                //ask for github
            break;
    
            default:
                //uh oh
        }

        //ask user if they want to add more employees
        inquirer.prompt([
            {
                type: 'confirm',
                name: 'more',
                message: 'Do you want to create a new employee?'
            }
            //if answer is yes(true) then create a new employee if false then create HTML file with the new employees
        ]).then(({ more }) => {
            if(more) newEmployee()
            else console.log(employees)
        })
    })
}

newEmployee()