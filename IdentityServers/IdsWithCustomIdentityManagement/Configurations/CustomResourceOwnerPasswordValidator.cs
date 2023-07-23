using CSharpFunctionalExtensions;
using Dapper;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.Data.SqlClient;

namespace IdsWithCustomIdentityManagement.Configurations;

public class CustomResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
{
    private readonly string? appConnectionStr;

    public CustomResourceOwnerPasswordValidator(IConfiguration configuration)
    {
        appConnectionStr = configuration.GetConnectionString("CustomIdentityServerDB");
    }

    public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
    {
        var authenticateResult = await IsAuthenticated(context.UserName, context.Password);
        if (authenticateResult.IsFailure)
        {
            context.Result = new GrantValidationResult(
                TokenRequestErrors.InvalidRequest,
                authenticateResult.Error
            );
            return;
        }
        var userId = authenticateResult.Value;
        context.Result = new GrantValidationResult(
            subject: userId.ToString(),
            authenticationMethod: "custom"
        );
    }

    public async Task<Result<int>> IsAuthenticated(string username, string password)
    {
        const string ERROR_MESSAGE =
            "You have entered an incorrect individual login ID or password.";

        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
            return Result.Failure<int>(ERROR_MESSAGE);
        await using var appDbConnection = new SqlConnection(appConnectionStr);

        var userId = await appDbConnection.QueryFirstOrDefaultAsync<int>(
            @"SELECT 
            u.Id AS Id
                FROM [User] u
                WHERE 
                    (u.Email = @username)
                    AND 
                    ( u.Password = @password COLLATE Latin1_General_CS_AS)",
            new { username, password }
        );
        if (userId == 0)
            return Result.Failure<int>(ERROR_MESSAGE);
        return Result.Success(userId);
    }
}
