# Welcome to surfing paradise front end react web app 

Here i will demonstrate coding skills i learn in my fullstack MERN course.

enjoy! and always welcome to give feedback...

## Admin: 

user name: levberger

password: 1234

## All users:

user name: user(1-10)

password: 1234

# known bugs:

## 1.Logout:
when user logging out:
TypeError: Cannot read property 'disconnect' of undefined


  36 | 
  37 |
  38 |     public disconnect() : void {
> 39 |         this.socket.disconnect();
  40 |     }
  41 | 
  42 | }
  ### proposed solution: NoNE 
 
when admin logging out:
when logging out and entering vacations



TypeError: Cannot read property 'isAdmin' of null
  36 |  }, []);
  37 | 
  38 |  return (
> 39 |    <div className="VacationsList">
     | ^  40 | 
  41 | {user.isAdmin && (<h2><NavLink to={"/vacations/add-vacation/"}>Add vacation</NavLink></h2>)}  
  42 |      {vacations.sort(function(x:any,y:any){return y.isFollowed-x.isFollowed}).map((v:VacationModel) => {

### proposed solution: initializing isAdmin property value


## 2.user following a vacation:
user: local redux state is set to update Follow me button Default rendering state called "defaultChecked"
yet it is not updating when entering the component only after re-entering the component it again
### proposed solution: play with UseEffect or other hooks

## 3. when admin is adding a vacation:
Initially it is rendering 2 added cards while in reality(data base) only one vacation was added
### proposed solution: NoNE 


## 4. when admin is deleting a vacation:
some problem with rendering, sometimes it's looks like admin is deleting more than one vacation, in reality(data base) admin is deleting only one vacation
 ### proposed solution: NoNE 



 # TODO:
 ## 1. STYLE EVERYTHING!!!! its sooooo 90's
 ## 2. add vacation reports
 ## 3. add about and contact ME component