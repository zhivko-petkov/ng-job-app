import { ApplicationStatus } from "./jobAd.model";

export class UserCandidateModel {
    userId : number;
    email: string; 
    applicationStatus : ApplicationStatus
    jobAdId: number; 
    constructor(userId: number, applicationStatus: ApplicationStatus, email:string, jobAdId:number){
        this.userId = userId;
        this.applicationStatus = applicationStatus; 
        this.email = email; 
        this.jobAdId = jobAdId; 
    }
}