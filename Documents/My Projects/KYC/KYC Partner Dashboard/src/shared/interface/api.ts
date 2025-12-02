export interface ApiResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface IMeta {
  lastPage: number;
  total: number;
  from: number;
  to: number;
  perPage: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
}
