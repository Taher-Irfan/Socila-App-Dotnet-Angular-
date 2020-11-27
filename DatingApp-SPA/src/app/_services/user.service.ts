import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseurl = environment.apiUrl;
  // jwtHelper = new JwtHelperService();
  // decodedToken: any;
  constructor(private http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseurl + 'users');
  }
  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseurl + 'users/' + id);
  }
  updateUser(id: number, user: User) {
    return this.http.put(this.baseurl + 'users/' + id, user);
  }
  setMainPhoto(userId: number, id: number) {
    return this.http.post(
      this.baseurl + 'users/' + userId + '/photos/' + id + '/setMain',
      {}
    );
  }
  deletePhoto(userId: number, id:number)
  {
    return this.http.delete(
      this.baseurl + 'users/' + userId + '/photos/' + id );

  }
}
