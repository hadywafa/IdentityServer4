using IdentityServer4;
using IdentityServer4.Models;
using Microsoft.Extensions.Options;
using TeamIdentityProvider.Dto;

namespace IdsWithCustomIdentityManagement.Configurations;

public class IdentityServerConfiguration : IIdentityServerConfiguration
{
    private readonly IdentityProviderSettings _identityProviderSettings;

    public IdentityServerConfiguration(
        IOptions<IdentityProviderSettings> identityProviderSettingsOption
    )
    {
        _identityProviderSettings = identityProviderSettingsOption.Value;
    }

    public IEnumerable<Client> GetClients()
    {
        var clients = _identityProviderSettings.Clients.Select(c =>
        {
            var client = new Client
            {
                ClientName = "Angular-Client",
                ClientId = c.ClientId,
                ClientSecrets = { new Secret(c.ClientSecret.Sha256()) },
                AllowedScopes = c.AllowedScopes,
                AllowedGrantTypes = c.AllowedGrantTypes,
                //------------------------- Access Token Settings ------------------
                AccessTokenLifetime = c.AccessTokenLifetime,
                UpdateAccessTokenClaimsOnRefresh = true,
                AllowAccessTokensViaBrowser = true,
                //------------------------- Refresh  Token Settings ------------------
                AllowOfflineAccess = true,
                AbsoluteRefreshTokenLifetime = c.RefreshTokenLifetime,
                RefreshTokenExpiration = TokenExpiration.Absolute,
                RefreshTokenUsage = TokenUsage.OneTimeOnly, //why ?,
                AllowedCorsOrigins = c.AllowedCorsOrigins,
            };

            if (client.AllowedGrantTypes.Any(x => x == "authorization_code"))
            {
                client.RedirectUris = c.RedirectUris;
                client.FrontChannelLogoutUri = c.FrontChannelLogoutUri;
                client.PostLogoutRedirectUris = c.PostLogoutRedirectUris;
                client.RequirePkce = true;
                client.RequireClientSecret = false;
                client.RequireConsent = false;
            }
            return client;
        });

        return clients;
    }

    public IEnumerable<ApiResource> GetApiResources()
    {
        var apiResources = _identityProviderSettings.ApiResources.Select(
            a =>
                new ApiResource
                {
                    Name = a.Name,
                    DisplayName = a.ApiSecret,
                    ApiSecrets = { new Secret(a.ApiSecret.Sha256()) },
                    Scopes = a.Scopes,
                    UserClaims = a.Claims,
                }
        );

        return apiResources;
    }

    public IEnumerable<IdentityResource> GetIdentityResources()
    {
        return new List<IdentityResource>
        {
            new IdentityResources.OpenId(),
            new IdentityResources.Profile(),
        };
    }

    public IEnumerable<ApiScope> GetApiScopes()
    {
        var apiScopes = _identityProviderSettings.ApiScopes.Select(name => new ApiScope(name));
        return apiScopes;
    }
}
