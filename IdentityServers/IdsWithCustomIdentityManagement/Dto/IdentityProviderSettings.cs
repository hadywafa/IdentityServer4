using IdsWithCustomIdentityManagement.Dto;

namespace TeamIdentityProvider.Dto
{
    public class IdentityProviderSettings
    {
        public List<ClientConfig> Clients { get; set; }
        public List<ApiResourceConfig> ApiResources { get; set; }
        public List<string> ApiScopes { get; set; }
    }
}
