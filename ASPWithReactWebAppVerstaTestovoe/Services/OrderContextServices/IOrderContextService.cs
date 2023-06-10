using ASPWithReactWebAppVerstaTestovoe.DatabaseModels;
using ASPWithReactWebAppVerstaTestovoe.RequestModels;

namespace ASPWithReactWebAppVerstaTestovoe.Services.OrderContextServices;

public interface IOrderContextService
{
    public Task<Order?> GetOrder(long id);
    public Task<List<Order>> GetAllOrders(int start, int count);
    public Task<bool> CreateOrder(OrderRequest orderRequest);
}