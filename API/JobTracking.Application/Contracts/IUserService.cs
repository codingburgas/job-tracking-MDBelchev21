using JobTracking.DataAccess.Data.Models;
using JobTracking.Domain.DTOs.Response;

namespace JobTracking.Application.Contracts;

public interface IUserService
{
    public Task<List<User>> GetUsersAsync(int page, int pageCount);
    public Task<UserResponseDTO> GetUserByIdAsync(int userId);
}