export type Pagination<T> = {
  pageNumber: number,
  pageSize: number,
  pageCount: number,
  totalItems: number,
  items: T[]
}