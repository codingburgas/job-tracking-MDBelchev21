namespace JobTracking.Application.Contracts.Base;

public class DependencyProvider
{
    public DependencyProvider(ApplicationDbContext dbContext)
    {
        Db = dbContext;
    }

    public ApplicationDbContext Db { get; set; }
}