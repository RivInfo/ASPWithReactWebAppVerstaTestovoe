using ASPWithReactWebAppVerstaTestovoe.DatabaseModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;


namespace ASPWithReactWebAppVerstaTestovoe.Contexts;

public class OrdersContext : DbContext
{
    public DbSet<Order> Orders { get; set; } = null!;

    private readonly string _connection;

    public OrdersContext(IOptions<DatabaseSettings.DatabaseSettings> settings)
    {
        _connection = settings.Value.DatabaseConnection;
        //Database.EnsureDeleted();
        Database.EnsureCreated();
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_connection);
    }
}