using IdentityServer4.Models;

namespace IdsWithCustomIdentityManagement.Configurations;

public interface IIdentityServerConfiguration
{
    IEnumerable<Client> GetClients();
    IEnumerable<ApiResource> GetApiResources();
    IEnumerable<IdentityResource> GetIdentityResources();
    IEnumerable<ApiScope> GetApiScopes();
}
