using JobTracking.Application.Contracts.Base;
using JobTracking.DataAccess.Data.Models;
using JobTracking.Domain.DTOs.Response;
using JobTracking.Domain.Filters;
using JobTracking.Domain.Filters.Base;
using Microsoft.Extensions.Logging;

namespace JobTracking.Application.Implementation;

public class JobService
{
    DependencyProvider Provider { get; }
    public JobService(DependencyProvider provider)
    {
        Provider = provider;
    }

    public async Task<IQueryable<JobResponseDTO>> GetJobsAsync(BaseFilter<JobFilter> filter)
    {
        IQueryable<JobPosting> query = Provider.Db.JobPostings.AsQueryable();
        return query;
    }
}