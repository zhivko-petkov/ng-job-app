import { CandidateModel } from "./candidates.model";

export interface JobAdModel {
    id?: number; 
    title: string; 
    description: string; 
    likes: number[]; 
    candidates: CandidateModel[];
    categoryId?: number;
    organizationId: number; 
}

export enum ApplicationStatus {
    IN_PROCESS = 'IN PROCESS', 
    APPROVED = 'APPROVED', 
    UNAPPROVED = 'TRY AGAIN'
}