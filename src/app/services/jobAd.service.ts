import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { elementAt, Observable } from "rxjs";
import { User } from "../components/auth/models/user.model";
import { AuthService, Roles } from "../components/auth/services/auth.service";
import { CandidateModel } from "../models/candidates.model";
import { ApplicationStatus, JobAdModel } from "../models/jobAd.model";

@Injectable({
    providedIn: 'root'
})

export class JobAdService {
    urlJobAds = 'http://localhost:3000/jobAds';


    isApply !: Boolean; 
    
    candidateModel !: CandidateModel;
    constructor(private http: HttpClient, private authService: AuthService) {

    }

    getJobsByAddedOrganization$(organizationId:number) : Observable<JobAdModel[]> {
        return this.http.get<JobAdModel[]>(`${this.urlJobAds}?organizationId=${organizationId}`)
    }

    getAll$(): Observable<JobAdModel[]> {
        return this.http.get<JobAdModel[]>(this.urlJobAds);
    }

    getById$(id: number): Observable<JobAdModel> {
        return this.http.get<JobAdModel>(`${this.urlJobAds}/${id}`); 
    }

    post$(body: JobAdModel): Observable<JobAdModel> {
        body.candidates = [];
        body.likes = [];
        return this.http.post<JobAdModel>(this.urlJobAds, body); 
    }

    put$(body: JobAdModel): Observable<JobAdModel> {
        return this.http.put<JobAdModel>(`${this.urlJobAds}/${body.id}`, body);
    }

    delete$(id: number): Observable<undefined> {
        return this.http.delete<undefined>(`${this.urlJobAds}/${id}`)
    }

    like(jobAd: JobAdModel) {

        const currentLoggedUser = this.authService.getUserFromStorage();
        if(jobAd.likes === undefined) {
            jobAd.likes = []; 
        }
        if(!jobAd.likes.includes(currentLoggedUser.id)){
            jobAd.likes.push(currentLoggedUser.id);
            this.http
            .put(this.urlJobAds + `/${jobAd.id}`, jobAd)
            .subscribe();
        } else {
            jobAd.likes = jobAd.likes.filter(a => a !== currentLoggedUser.id);
        }
        
    }

    apply(currentJobAd: JobAdModel) {
        const currentLoggedUser = this.authService.getUserFromStorage();
        this.isApply = false; 

        if(currentLoggedUser.role !== Roles.USER) {
            return; 
        }

        if (Object.keys(currentJobAd.candidates).includes(currentLoggedUser.id.toString())) {
            return; 
        }

        if(currentJobAd.candidates.length == 0) {
            currentJobAd.candidates = [];
        }
        this.candidateModel = new CandidateModel(currentLoggedUser.id, ApplicationStatus.IN_PROCESS); 

         

        currentJobAd.candidates.forEach(element => {
            if(element.userId == currentLoggedUser.id) {
                this.isApply = true;
            }
        });

        if(!this.isApply){
            currentJobAd.candidates.push(this.candidateModel);
            this.http.put(this.urlJobAds+`/${currentJobAd.id}`, currentJobAd).subscribe();
        }
        
    }

    approveUserJobAd(ca: CandidateModel, jobAd: JobAdModel) {
        jobAd.candidates.forEach(c => {
            if(c.userId == ca.userId) {
                c.applicationStatus = ApplicationStatus.APPROVED;
            }
        })

        this.http
        .put(this.urlJobAds + `/${jobAd.id}`, jobAd)
        .subscribe();
    }

    cancelUserJobAd(ca: CandidateModel, jobAd: JobAdModel) {
        jobAd.candidates.forEach(c => {
            if(c.userId == ca.userId) {
                c.applicationStatus = ApplicationStatus.UNAPPROVED;
            }
        })

        this.http
        .put(this.urlJobAds + `/${jobAd.id}`, jobAd)
        .subscribe();
    }

    /*jobAdUserIsApplied(userId: number, organizationId: number, jobAdId: number): boolean {
        this.getById$()
        this.getAll$().forEach(el => el.candidates.forEach(element => {
            if(element.userId == authService.getUserFromStorage().id) {
                this.isApplied = true;
            }
        });

       
        return false;
    }*/
}