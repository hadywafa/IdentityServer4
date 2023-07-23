using Dapper;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using IdsWithCustomIdentityManagement.Dto;
using Microsoft.Data.SqlClient;
using System.Security.Claims;
using System.Text.Json;

namespace IdsWithCustomIdentityManagement.Configurations;

public class CustomProfileService : IProfileService
{
    private readonly string? appConnectionStr;

    private readonly JsonSerializerOptions _jsonSerializerOptions;

    public CustomProfileService(IConfiguration configuration)
    {
        appConnectionStr = configuration.GetConnectionString("CustomIdentityServerDB");
        _jsonSerializerOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
        var userId = int.Parse(context.Subject.GetSubjectId());
        var userClaim = await GetContactClaims(userId);

        if (userClaim != null)
        {
            context.IssuedClaims.Add(userClaim);
        }
    }

    public async Task<Claim?> GetContactClaims(int userId)
    {
        await using var appDbConnection = new SqlConnection(appConnectionStr);
        var contactInfo = await appDbConnection.QueryFirstOrDefaultAsync<ContactInfo>(
            @"SELECT 
            Id AS Id,
            u.FirstName AS FirstName,
            u.LastName AS LastName,
            u.Email AS Email
                FROM [User] u
                WHERE 
                     u.Id = @userId ",
            new { userId }
        );
        return contactInfo != null
            ? new Claim(
                "contact_data",
                JsonSerializer.Serialize(contactInfo, _jsonSerializerOptions)
            )
            : null;
    }

    public Task IsActiveAsync(IsActiveContext context)
    {
        var sub = context.Subject.GetSubjectId();

        return Task.CompletedTask;
    }
}
