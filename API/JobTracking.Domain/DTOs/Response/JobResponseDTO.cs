namespace JobTracking.Domain.DTOs.Response;

public enum JobStatus
{
    Active,
    Inactive
}

public class JobResponseDTO
{
    public int Id { get; set; }

    public string Title { get; set; }
    
    public string CompanyName { get; set; }
    
    public string Description { get; set; }

    public DateTime DatePosted { get; set; }

    public JobStatus Status { get; set; }
}