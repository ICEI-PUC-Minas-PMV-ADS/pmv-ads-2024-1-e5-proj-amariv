namespace AmarivAPI.Data.Dtos.PaginationDto
{
    public class PaginationDto <T>
    {
        public int PageNumber { get; set; } = 0;
        public int PageSize { get; set; } = 0;
        public int PageCount { get; set; } = 0;
        public int TotalItems { get; set; } = 0;
        public List<T> Items { get; set; }

    }
}
