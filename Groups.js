const Group = require('./Group');

function Groups() {
    this.groups = [];
}

Groups.prototype.getGroupName = function(groupId){
    return this.groups[groupId].getGroupName();
};

Groups.prototype.addGroup = function (groupName) {
    let newGroup = new Group(groupName);
    let check = 0;
    for (let i = 0; i<this.groups.length; i++) {
        if (this.groups[i].getGroupName() === newGroup.getGroupName()) {
            check = 1;
            console.log("This name already exist!");
            break;
        }
    }
    if (check === 0){
        this.groups.push(newGroup);
        console.log("Group has been added successfully!");
    }
};

Groups.prototype.removeGroup = function (groupName) {
  let check = 0;
  for (let i = 0;i<this.groups.length;i++) {
      if(groupName===this.groups[i].getGroupName()) {
          check = 1;
          this.groups.splice(i, 1);
          console.log("Group has been deleted successfully!");
          break;
      }
  }
  if (check===0){
      console.log("Couldn't find group name!");
  }
};

Groups.prototype.getAllGroups = function () {
    if (this.groups.length===0) console.log("There are no groups!");
    else {
        for (let i = 0; i < this.groups.length; i++) {
            console.log(this.groups[i].getGroupName());
        }
    }
};

Groups.prototype.addUserToGroup = function (username,groupname, age){
    let check = 0;
    for (let i =0; i<this.groups.length; i++){
        if(this.groups[i].getGroupName()===groupname){
            check = 1;
            this.groups[i].addUser(username, age);
        }
    }
    if (check===0) console.log("Group doesn't exist!");
};

Groups.prototype.removerUserFromGroup = function(username, groupname){
    if (groupname!=='any') {
        for (let i = 0; i < this.groups.length; i++) {
            if (this.groups[i].getGroupName() === groupname) {;
                for (let j = 0; j < this.groups[i].groupUsers.length; j++) {
                    let subs = this.groups[i].groupUsers[j].toString();
                    let name = subs.substring(0, subs.indexOf(","));
                    console.log(name);
                    if (name === username) {
                        this.groups[i].removeUser(username);
                        break;
                    }
                    else {
                        console.log("User does not exist in this group!");
                    }

                }
            }
        }
    }
    else{
        for (let i = 0; i<this.groups.length; i++){
            if(this.groups[i].removeUser(username)) console.log("User has been deleted from the group ", this.groups[i].getGroupName(), "!");
        }
    }
};

Groups.prototype.showAllGroupsAndUsers = function(){
    if(this.groups.length===0) console.log("There are no groups at all!");
    else {
        for (let i = 0; i < this.groups.length; i++) {
            console.log(this.groups[i].getGroupName());
            this.groups[i].getAllUsers();
        }
    }
};

module.exports = Groups;