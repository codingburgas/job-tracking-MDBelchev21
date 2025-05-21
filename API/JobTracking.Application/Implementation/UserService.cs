using JobTracking.Application.Contracts;
using JobTracking.Application.Contracts.Base;
using JobTracking.DataAccess.Data.Models;
using JobTracking.Domain.DTOs.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace JobTracking.Application.Implementation;

public class UserService : IUserService
{
    protected DependencyProvider Provider { get; set; }
    public async Task<List<User>> GetUsersAsync(int page, int pageCount)
    {
        return await Provider.Db.Users.Skip((page - 1) * pageCount).Take(pageCount).ToListAsync();
    }

    public async Task<UserResponseDTO> GetUserByIdAsync(int userId)
    {
        var resultDTO = await Provider.Db.Users
            .Where(u => u.Id == userId) // IQueryable<User>
            .Select(x => new UserResponseDTO
            {
                Id = x.Id,
                FirstName = x.FirstName,
                LastName = x.LastName,
                MiddleName = x.MiddleName,
                Address = x.Address,
            })
            .FirstOrDefaultAsync();

        return resultDTO;
    }
}