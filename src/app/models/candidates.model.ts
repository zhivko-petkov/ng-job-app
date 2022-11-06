import { ApplicationStatus } from "./jobAd.model";


export class CandidateModel {
    userId : number;
    applicationStatus : ApplicationStatus
    constructor(userId: number, applicationStatus: ApplicationStatus){
        this.userId = userId;
        this.applicationStatus = applicationStatus; 
    }
}