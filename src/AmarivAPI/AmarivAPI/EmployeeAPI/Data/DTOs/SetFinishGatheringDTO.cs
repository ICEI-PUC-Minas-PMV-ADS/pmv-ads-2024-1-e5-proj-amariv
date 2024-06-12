namespace AmarivAPI.EmployeeAPI.Data.DTOs
{
    public class SetFinishGatheringDTO
    {
        public int gatheringItineraryId {  get; set; }
        public int gatheringId { get; set; }
        public bool isSuccess { get; set; }
        public bool isCanceled { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

    }
}
