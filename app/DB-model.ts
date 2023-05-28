export interface dbModel {
    _id: string;
    title: string;
    description: string;
    favorite: string[];
    tags: string[];
    code: string;
    created_at: Date;
    updated_at: Date;
    author_id: string;
    
}