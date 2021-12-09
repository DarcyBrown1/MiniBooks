export interface Review {
    id?: string;
    rating: number;
    username?: string;
    bookId?: number;
    bookTitle?: string;
    comments: string;
    created?: Date;
    altered?: Date;
}
