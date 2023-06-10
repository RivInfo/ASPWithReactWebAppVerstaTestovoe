using ASPWithReactWebAppVerstaTestovoe.Contexts;
using ASPWithReactWebAppVerstaTestovoe.DatabaseSettings;
using ASPWithReactWebAppVerstaTestovoe.Services.OrderContextServices;

var builder = WebApplication.CreateBuilder(args);   

builder.Services.AddControllersWithViews();
builder.Services.AddControllers();

builder.Services.Configure<DatabaseSettings>
    (builder.Configuration.GetSection(nameof(DatabaseSettings)));

builder.Services.AddDbContext<OrdersContext>();

builder.Services.AddScoped<IOrderContextService, OrderContextService>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapControllers();

app.MapFallbackToFile("index.html");

app.Run();