import { Injectable } from '@angular/core';
import { User } from '../types/user'
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<User[]>{
    const url = environment.apiUrl + 'users';
    return this.httpClient.get<User[]>(url);

  }

}
