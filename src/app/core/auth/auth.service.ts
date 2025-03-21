import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiUrl } from '../env/apiUrl';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private router = inject(Router)
  private httpClient = inject(HttpClient)
  private apiUrl = ApiUrl

  // auth(body:{email:string, password:string}) {
  //   return firstValueFrom(this.httpClient.post(this.apiUrl.auth, body))
  //   .then((response)=>{
  //     localStorage.setItem('token', response.access_token)
  //     localStorage.setItem('userData', JSON.stringify(response.user))
  //     this.router.navigate(['/'])
  //   })
  //   .catch((error)=>{
  //     throw error
  //   })
  // }

  logOff(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
