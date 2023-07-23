namespace IdsWithCustomIdentityManagement.Services;

public class ContextParams : IContextParameter
{
    private readonly HttpContext? httpContext;

    public string? Lang { get; set; }
    public string? CoreDB { get; set; }
    public string? EventDB { get; set; }
    public string? AssociationCode { get; set; }

    public ContextParams(IHttpContextAccessor httpContextAccessor)
    {
        httpContext = httpContextAccessor.HttpContext;
        if (httpContext is not null)
        {
            CoreDB = httpContext.Request.Query[
                ConnectionStringConfig.QUERY_STRING_CONNECTION_CORE
            ].FirstOrDefault();
            EventDB = httpContext.Request.Query[
                ConnectionStringConfig.QUERY_STRING_CONNECTION_EVENT
            ].FirstOrDefault();
            AssociationCode = httpContext.Request.Query["associationCode"].FirstOrDefault();

            var userLang = httpContext.Request.Query["lang"].FirstOrDefault();
            Lang = string.IsNullOrWhiteSpace(userLang) ? "en" : userLang;
        }
    }
}
