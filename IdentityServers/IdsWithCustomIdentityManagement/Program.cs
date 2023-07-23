using IdentityServer4.Services;
using IdentityServer4.Validation;
using IdsWithCustomIdentityManagement.Configurations;
using IdsWithCustomIdentityManagement.Services;
using TeamIdentityProvider.Dto;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile(
        $"appsettings.{builder.Environment.EnvironmentName}.json",
        optional: true,
        reloadOnChange: true
    )
    .AddJsonFile("identityProviderSettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile(
        $"identityProviderSettings.{builder.Environment.EnvironmentName}.json",
        optional: true,
        reloadOnChange: true
    )
    .AddEnvironmentVariables();

builder.Services.Configure<IdentityProviderSettings>(
    builder.Configuration.GetSection("identityProviderSettings")
);
builder.Services.AddControllersWithViews();
builder.Services.AddLogging(builder =>
{
    builder.AddConsole();
    builder.AddDebug();
});

builder.Services.AddScoped<IContextParameter, ContextParams>();

//----------------------------------------------------------------------

builder.Services.AddTransient<
    IResourceOwnerPasswordValidator,
    CustomResourceOwnerPasswordValidator
>();
builder.Services.AddTransient<IProfileService, CustomProfileService>();
builder.Services.AddSingleton<IIdentityServerConfiguration, IdentityServerConfiguration>();

//----------------------------------------------------------------------
builder.Services.AddCors(x =>
{
    x.AddDefaultPolicy(y =>
    {
        var allowedCorsOrigin = builder.Configuration
            .GetSection("allowedCorsOrigin")
            .Get<List<string>>();
        if (allowedCorsOrigin == null || allowedCorsOrigin.Count == 0)
        {
            y.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
        }
        else
        {
            y.WithOrigins(allowedCorsOrigin.ToArray()).AllowAnyMethod().AllowAnyHeader();
        }
    });
});

using (var scope = builder.Services.BuildServiceProvider().CreateScope())
{
    var identityServerConfig =
        scope.ServiceProvider.GetRequiredService<IIdentityServerConfiguration>();
    builder.Services
        .AddIdentityServer()
        .AddInMemoryApiScopes(identityServerConfig.GetApiScopes())
        .AddInMemoryApiResources(identityServerConfig.GetApiResources())
        .AddInMemoryClients(identityServerConfig.GetClients())
        .AddInMemoryIdentityResources(identityServerConfig.GetIdentityResources())
        .AddDeveloperSigningCredential();
}

//----------------------------------------------------------------------
var app = builder.Build();

//----------------------------------------------------------------------
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
app.UseStaticFiles();
app.UseCors();
app.UseHttpsRedirection();

app.UseRouting();
app.UseIdentityServer();
app.MapControllers();

//----------------------------------------------------------------------
app.Run();
//----------------------------------------------------------------------
