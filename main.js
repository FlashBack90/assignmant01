const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const Users = require('./Users');
const Groups = require('./Groups');
let users = new Users();
let groups = new Groups();
let userChoice = 1;

openMenu();

function openMenu() {
    rl.question('0) exit \n1) Create a new user name\n2) Delete user\n 3) Show all users\n 4) Create a new group\n 5) Delete group\n 6) Show all groups\n 7) Add user to a group\n'+
        '8) Delete user from a group\n 9) Show all users in the group', start);
    function start(userInput) {
        userChoice = parseInt(userInput);
        switch (userChoice) {
            case 0:
                process.exit(1);
                break;
            case 1:
                createNewUser();
                break;
            case 2:
                deleteUser();
                break;
            case 3:
                getAllDefinedUsers();
                break;
            case 4:
                createNewGroup();
                break;
            case 5:
                deleteGroup();
                break;
            case 6:
                getAllGroupsMain();
                break;
            case 7:
                addUserToGroup();
                break;
            case 8:
                deleteUserFromGroup();
                break;
            case 9:
                getAllUsersInGroup();
                break;
            default:
                console.log("Your choice is not valid.");
                openMenu();
                break;
        }
    }
}

function createNewUser() {
    let username, age, password;
    rl.question('Choose user name:', askForPassword);

    function askForPassword(input) {
    username = input;
    rl.question('Password: ', askForAge);
    }
    
    function askForAge(input) {
        password = input;
        rl.question('Age: ', addThisUser);
    }
    function addThisUser(input) {
        age = input;
        users.createNewUser(username, age, password);
        openMenu();
    }
}

function deleteUser() {
    let name;
    rl.question('Choose user name to delete: ', removeUser);

    function removeUser(input) {
        name = input;
        users.deleteUser(name);
        groups.removerUserFromGroup(name, 'any');
        openMenu();
    }
}

function getAllDefinedUsers() {
    users.getAllUsers();
    openMenu();
}

function createNewGroup() {
    let groupname;
    rl.question("Choose a name for the group: ", create);
    function create(input) {
        groupname = input;
        groups.addGroup(groupname);
        openMenu();
    }
}

function deleteGroup() {
    let groupname;
    rl.question("Choose a group to delete: ", deleteThisGroup);
    function deleteThisGroup(input){
        groupname = input;
        groups.removeGroup(groupname);
        openMenu();
    }
}

function getAllGroupsMain() {
    //console.log("Got here");
    groups.getAllGroups();
    openMenu();
}

function addUserToGroup() {
    let username;
    let groupname;
    let age;
    let checkUser = 0;
    rl.question("Choose user to add: ", defineUser);
    function defineUser(input) {
        username = input;
        for (let i = 0; i < users.users.length; i++) {
            if (users.users[i].getUsername() === username) {
                checkUser = 1;
                age = users.users[i].getAge();
            }
        }
        if (checkUser === 0) {
            console.log("This user doesn't exist!");
            openMenu();
        }
        else {
            rl.question("Choose group to add the user to: ", defineGroup);
        }

        function defineGroup(input) {
            groupname = input;
            groups.addUserToGroup(username, groupname, age);
            openMenu();
        }
    }
}

function deleteUserFromGroup() {
    let username;
    let groupname;
    let checkUser = 0;
    rl.question("Choose user to delete: ", defineUser);
    function defineUser(input) {
        username = input;
        for (let i = 0; i < users.users.length; i++) {
            if (users.users[i].getUsername() === username) checkUser = 1;
        }
        if (checkUser === 0) {
            console.log("This user doesn't exist!");
            openMenu();
        }
        else {
            rl.question("Choose group to delete this user from: ", defineGroup);
        }

        function defineGroup(input) {
            groupname = input;
            groups.removerUserFromGroup(username, groupname);
            openMenu();
        }
    }
}

function getAllUsersInGroup() {
    if(groups.groups.length===0){
        console.log("No groups found!");
        openMenu();
    }
    else{
        groups.showAllGroupsAndUsers();
        openMenu();
    }
}