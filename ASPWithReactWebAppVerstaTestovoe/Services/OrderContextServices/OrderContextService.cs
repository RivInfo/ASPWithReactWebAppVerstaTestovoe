using ASPWithReactWebAppVerstaTestovoe.Contexts;
using ASPWithReactWebAppVerstaTestovoe.DatabaseModels;
using ASPWithReactWebAppVerstaTestovoe.RequestModels;
using Microsoft.EntityFrameworkCore;

namespace ASPWithReactWebAppVerstaTestovoe.Services.OrderContextServices;

public class OrderContextService : IOrderContextService
{
    private readonly OrdersContext _context;

    public OrderContextService(OrdersContext context)
    {
        _context = context;
    }

    public async Task<Order?> GetOrder(long id)
    {
        return await _context.Orders.FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<List<Order>> GetAllOrders(int start = -1, int count = 10)
    {
        IQueryable<Order> orders = _context.Orders;
        if (start >= 0 && count > 0)
            orders = orders.Skip(start).Take(count);

        return await orders.ToListAsync();
    }

    public async Task<bool> CreateOrder(OrderRequest orderRequest)
    {
        try
        {
            await _context.Orders.AddAsync(new Order
            {
                SenderCity = orderRequest.SenderCity,
                SenderAddress = orderRequest.SenderAddress,
                RecipientCity = orderRequest.RecipientCity,
                RecipientAddress = orderRequest.RecipientAddress,
                CargoWeight = orderRequest.CargoWeight,
                CargoPickupDate = orderRequest.CargoPickupDate.ToUniversalTime()
            });
            await _context.SaveChangesAsync();
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return false;
        }
    }
}