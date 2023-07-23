namespace IdsWithCustomIdentityManagement.Dto;

public class ApiResourceConfig
{
    public string Name { get; set; }
    public string DisplayName { get; set; }
    public string ApiSecret { get; set; }
    public List<string> Scopes { get; set; }
    public List<string> Claims { get; set; }
    // Other API resource configuration properties
}
