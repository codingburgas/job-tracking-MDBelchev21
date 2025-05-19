﻿using JobTracking.Application.Contracts;
using JobTracking.Application.Implementation;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace JobTracking.API.Controllers;

[ApiController]
[Route("api/[controller]/[action]")]
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }
    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        return Ok(await _userService.GetUserByIdAsync(id));
    }
}