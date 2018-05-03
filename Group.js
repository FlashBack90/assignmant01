function Group(groupName) {
    this.groupName = groupName;
    this.groupUsers = [];
}

Group.prototype.getGroupName = function(){
    return this.groupName;
};

Group.prototype.setGroupName = function (groupname) {
    this.groupName = groupname;
};

Group.prototype.getGroupUsers = function () {
    return this.groupUsers;
};

Group.prototype.getUser = function (userId) {
    return this.groupUsers[userId].username();
};

Group.prototype.addUser = function (username, age) {
    let check = 0;
    let subs;
    for (let i = 0; i<this.groupUsers.length; i++){
        subs = this.groupUsers[i].toString();
        let name = subs.substring(0, subs.indexOf(","));
        if (username===name){
            check = 1;
            console.log("User is already exist!")
        }
    }
    if (check===0){
        this.groupUsers.push([username, age]);
        console.log("User added to group successfully!");
    }
};

Group.prototype.getAllUsers = function () {
    let age;
    let name;
    for (let i=0; i<this.groupUsers.length; i++){
        let subs = this.groupUsers[i].toString();
        name = subs.substring(0, subs.indexOf(","));
        age = subs.split(",").pop();
        console.log("--- ", name,"(", age, ")");
    }
};

Group.prototype.removeUser = function (username) {
    let check = 0;
    for (let i = 0; i < this.groupUsers.length; i++){
        let subs = this.groupUsers[i].toString();
        let name = subs.substring(0, subs.indexOf(","));
        if (name===username){
            check = 1;
            this.groupUsers.splice(i , 1);
            console.log("User has been deleted successfully!");
            break;
        }
    }
    if (check===0){
        console.log("User doesn't exist in this group!");
    }
};

module.exports = Group;