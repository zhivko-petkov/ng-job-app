import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { JobAdModel } from "../models/jobAd.model";

@Injectable({
    providedIn: 'root'
})

export class JobAdService {
    url = 'http://localhost:3000/jobAds';

    constructor(private http: HttpClient) {

    }

    getAll$(): Observable<JobAdModel[]> {
        return this.http.get<JobAdModel[]>(this.url);
    }

    getById$(id: number): Observable<JobAdModel> {
        return this.http.get<JobAdModel>(`${this.url}/${id}`); 
    }

    post$(body: JobAdModel): Observable<JobAdModel> {
        return this.http.post<JobAdModel>(this.url, body); 
    }

    put$(body: JobAdModel): Observable<JobAdModel> {
        return this.http.put<JobAdModel>(`${this.url}/${body.id}`, body);
    }

    delete$(id: number): Observable<undefined> {
        return this.http.delete<undefined>(`${this.url}/${id}`)
    }
}