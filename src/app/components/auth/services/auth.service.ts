import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Login } from "../models/login.model";
import { User } from "../models/user.model";
import { Organization } from "../models/organization.model";

export enum Roles {
    USER = 'user',
    ORGANIZATION = 'organization',
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    users !: User[]; 
    
    constructor(private http: HttpClient) {
        this.http.get<User[]>(`http://localhost:3000/users`).subscribe((users) => {
            this.users = users;

        });
    }

    login$(data: Login): Observable<User | Organization | null> {
        if(data.loginRole === Roles.USER) {
                return this.http.get<User[]>(`http://localhost:3000/users`).pipe(
         map((response: User[]) => {
            const user = response.find(u => u.email === data.email 
                && u.password === data.password);

                if (user) {
                    return user;
                }

                return null; 
         }));
        } else {
                return this.http.get<Organization[]>(`http://localhost:3000/organizations`).pipe(
         map((response: Organization[]) => {
            const organization = response.find(u => u.email === data.email 
                && u.password === data.password);

                if (organization) {
                    return organization;
                }

                return null; 
         }));
        }

         
        
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

    jobAdIsOnOrganization(organizationId: number): boolean {
        const loggedUser = this.getUserFromStorage(); 
        if(this.getUserFromStorage().id === organizationId){
            return true; 
        }
        return false; 
    }

    getAllUsers(): Observable<User[]> {
        return this.http.get<User[]>(`http://localhost:3000/users`);

    }

   

}