export interface JobAdModel {
    id?: number; 
    title: string; 
    description: string; 
    likes: number[]; 
    categoryId?: number;
    //organizationId: number; 
}