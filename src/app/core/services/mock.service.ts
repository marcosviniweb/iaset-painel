import { BehaviorSubject } from 'rxjs';
import { UserData } from './../models/userData.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MockService {

  private MockUsersAway:UserData[] = []
  private MockUsersList:UserData[] = []

  private UsersAway = new BehaviorSubject<UserData[]>([])
  private UsersList = new BehaviorSubject<UserData[]>([])
  
  initMock(){
    const usersAway = JSON.parse(localStorage.getItem('usersAway') as string)
    usersAway? this.UsersAway.next(usersAway) : false;

    const usersList = JSON.parse(localStorage.getItem('usersList') as string)
    usersList? this.UsersList.next(usersList) : false;
  }

  getUsersAway(){
    return this.UsersAway.asObservable()
  }

  getUsersLit(){
    return this.UsersList.asObservable()
  }

  setUserAway(userData:UserData){
    console.log(userData)
    this.MockUsersAway.push(userData)
    localStorage.setItem('usersAway', JSON.stringify(this.MockUsersAway))
    this.UsersAway.next(this.MockUsersAway)
  }

  setUserList(userData:UserData){
    this.MockUsersList.push(userData)
    localStorage.setItem('usersList', JSON.stringify(this.MockUsersList))
    this.UsersAway.next(this.MockUsersAway)
  }

  
  updateUserList(userData:UserData){
    this.MockUsersList.push(userData)
    localStorage.setItem('usersList', JSON.stringify(this.MockUsersList))
    this.UsersAway.next(this.MockUsersAway)
  }

  deleteUserAway(userId:number){
    this.MockUsersAway.find((user)=>{return user.id === userId})
    localStorage.setItem('usersAway', JSON.stringify(this.MockUsersAway))
    this.UsersAway.next(this.MockUsersAway)
  }

  deleteUserList(userData:UserData){
    this.MockUsersList.push(userData)
    localStorage.setItem('usersList', JSON.stringify(this.MockUsersList))
    this.UsersAway.next(this.MockUsersAway)
  }

 
  

  
  
  


}
