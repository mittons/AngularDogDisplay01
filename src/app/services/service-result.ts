export interface ServiceResult<T> {
    data: T | null;
    success: boolean;
}