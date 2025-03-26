import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiUrl } from '../env/apiUrl';
import { UserData } from '../models/userData.model';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Dependent } from '../models/dependents.model';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  private http = inject(HttpClient);
  private apiUrl = ApiUrl;
  user$!: Observable<UserData[]>;
  dependent$!: Observable<Dependent[]>;
  awaitList$!: Observable<UserData[] | Dependent[]>;
  private userData$ = new BehaviorSubject<boolean>(false);

  
  setUser(body: FormData) {
    return this.http.post(this.apiUrl.users, body);
  }

  setDependent(userId:number,body: FormData) {
    return this.http.post(this.apiUrl.users+`/${userId}/dependents`, body);
  }

  getWaitingList(type: 'waitingList' | 'userList', newRequest?: boolean) {
    if (!this.user$ || newRequest) {
      if (type === 'userList') {
        return (this.awaitList$ = this.http
          .get<UserData[]>(this.apiUrl.users + `?status=false`)
          .pipe(shareReplay(1)));
      }
      return (this.awaitList$ = this.http
        .get<Dependent[]>(this.apiUrl.dependent + `?status=false`)
        .pipe(shareReplay(1)));
    }
    return this.awaitList$;
  }

  getAllUser(newRequest?:boolean) {
    if (!this.user$ || newRequest) {
      return this.http
        .get<UserData[]>(this.apiUrl.users + `?status=true`)
        .pipe(shareReplay(1));
    }
    return this.user$;
  }

  getDependents(newRequest?:boolean) {
    if (!this.dependent$ || newRequest) {
      return this.http
        .get<Dependent[]>(this.apiUrl.dependent + `?status=true`)
        .pipe(shareReplay(1));
    }
    return this.dependent$;
  }

  getUserDependents(userId:number, newRequest?:'newRequest'){
    if(!this.dependent$ || newRequest){
      this.dependent$ = this.http.get<Dependent[]>(this.apiUrl.users+`/${userId}/dependents`)
      .pipe(shareReplay(1))
    }
    return this.dependent$
  }

  getUser(id: number) {
    return this.http
      .get<UserData>(this.apiUrl.users + `/${id}`)
      .pipe(shareReplay(1));
  }

  updateUserData(userId: number, body: FormData) {
    return this.http.put(this.apiUrl.users + `/${userId}`, body);
  }

  updateDependent(userId:number, depId:number, body:any){
    return this.http.put(this.apiUrl.dependent+`/${depId}`, body)
  }

  deleteUsers(userId: number) {
    return this.http.delete(this.apiUrl.users + `/${userId}`);
  }

  deleteDependent(userId: number, dependentId:number) {
    
    return this.http.delete(this.apiUrl.users + `/${userId}/dependents/${dependentId}`);
  }

  approveDependent(dependentId:number){
    return this.http.put(this.apiUrl.dependent+`/${dependentId}/status?value=true`, null)
  }

   
  
}
