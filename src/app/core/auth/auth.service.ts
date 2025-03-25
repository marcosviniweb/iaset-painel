import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { ApiUrl } from '../env/apiUrl';
import {AuthResponse} from '../models/auth.model'
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private router = inject(Router)
  private httpClient = inject(HttpClient)
  private apiUrl = ApiUrl

  auth(body:{email:string, password:string}) {
    return firstValueFrom(this.httpClient.post<AuthResponse>(this.apiUrl.admin+"/login", body))
    .then((resp)=>{
      localStorage.setItem('token', resp.access_token)
      this.router.navigate(['/'])
    })
    .catch((error)=>{
      throw error
    })
  }

  logOff(){
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
