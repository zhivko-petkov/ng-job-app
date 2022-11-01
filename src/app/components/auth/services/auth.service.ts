import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    
    constructor(private http: HttpClient) {
    }

    login$(data: Login): Observable<User | null> {
        return this.http.get<User[]>(`http://localhost:3000/users`).pipe(
         map((response: User[]) => {
            const user = response.find(u => u.email === data.email 
                && u.password === data.password);

                if (user) {
                    return user;
                }

                return null; 
         })
         
        );
    }

    logout(): void {
        localStorage.removeItem('loggedUser');
    }

    storeUserData(user: User): void {
        delete user.password;
        localStorage.setItem('loggedUser', JSON.stringify(user));
    }

    getUserFromStorage(): User {
        let user = localStorage.getItem('loggedUser') === null
        ? undefined 
        : JSON.parse(localStorage.getItem('loggedUser') || '{}');
        return user;
    }

}