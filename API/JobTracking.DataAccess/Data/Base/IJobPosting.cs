using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JobTracking.DataAccess.Data.Base
{
    public enum JobStatus
    {
        Active,
        Inactive
    }
    public interface IJobPosting
    {
        int Id { get; set; }

        string Title { get; set; }
        string CompanyName { get; set; }
        string Description { get; set; }
        DateTime DatePosted { get; set; }
        JobStatus Status { get; set; }
    }

}
