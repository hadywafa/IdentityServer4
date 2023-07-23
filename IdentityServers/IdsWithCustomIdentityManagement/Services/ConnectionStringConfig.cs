namespace IdsWithCustomIdentityManagement.Services;

public class ConnectionStringConfig
{
    public const string QUERY_STRING_CONNECTION_CORE = "Core";
    public const string QUERY_STRING_CONNECTION_EVENT = "Event";
    public const string QUERY_STRING_CONNECTION_SM_CORE = "SmCore";
    public const string QUERY_STRING_CONNECTION_SM_CLIENT = "SmClient";
    private readonly IConfiguration configuration;
    private readonly IContextParameter contextParams;
    private readonly HttpContext? httpContext;

    public ConnectionStringConfig(
        IConfiguration configuration,
        IHttpContextAccessor httpContextAccessor,
        IContextParameter contextParams
    )
    {
        this.configuration = configuration;
        this.contextParams = contextParams;
        httpContext = httpContextAccessor.HttpContext;
    }

    public static string ReplaceConnectionStringPlaceHolder(
        string connectionStringPlaceHolder,
        string coreDbName
    ) => string.Format(connectionStringPlaceHolder, coreDbName);

    public string GetCoreConnectionString()
    {
        if (httpContext != null)
        {
            contextParams.CoreDB = httpContext.Request.Query[
                QUERY_STRING_CONNECTION_CORE
            ].FirstOrDefault();
        }
        return string.Format(
            configuration.GetConnectionString(QUERY_STRING_CONNECTION_CORE),
            contextParams.CoreDB
        );
    }

    public string GetEventConnectionString()
    {
        if (httpContext != null)
        {
            contextParams.EventDB = httpContext.Request.Query[
                QUERY_STRING_CONNECTION_EVENT
            ].FirstOrDefault();
        }
        return string.Format(
            configuration.GetConnectionString(QUERY_STRING_CONNECTION_EVENT),
            contextParams.EventDB
        );
    }

    public string GetSmCoreConnectionString()
    {
        return string.Format(configuration.GetConnectionString(QUERY_STRING_CONNECTION_SM_CORE));
    }

    public string GetSmClientConnectionString()
    {
        return string.Format(configuration.GetConnectionString(QUERY_STRING_CONNECTION_SM_CLIENT));
    }
}
