import { Injectable } from '@angular/core';
import { User } from '../models/user/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url = 'http://localhost:3000/users';
  userList: User[] = [];
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<User>(this.url);
  }

  postUser(user: User) {
    return this.http.post<User>(this.url, user);
  }

  updateUser(user: User, id: number) {
    return this.http.put<User>(`${this.url}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete<User>(`${this.url}/${id}`);
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }
}
