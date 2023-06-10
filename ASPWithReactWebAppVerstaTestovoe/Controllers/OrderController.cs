using ASPWithReactWebAppVerstaTestovoe.DatabaseModels;
using ASPWithReactWebAppVerstaTestovoe.RequestModels;
using ASPWithReactWebAppVerstaTestovoe.Services.OrderContextServices;
using Microsoft.AspNetCore.Mvc;

namespace ASPWithReactWebAppVerstaTestovoe.Controllers;

[ApiController]
[Route("[controller]")]
public class OrderController : ControllerBase
{
    private readonly ILogger<OrderController> _logger;
    private readonly IOrderContextService _contextService;

    public OrderController(ILogger<OrderController> logger, IOrderContextService contextService)
    {
        _logger = logger;
        _contextService = contextService;
    }

    [HttpPost]
    public async Task<ActionResult<bool>> Create(OrderRequest orderRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(false);
        }

        bool result = await _contextService.CreateOrder(orderRequest);

        return Ok(result);
    }

    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetAll(int start = -1, int count = 10)
    {
        return await _contextService.GetAllOrders(start, count);
    }

    [HttpGet]
    public async Task<ActionResult<Order>> GetCurrent(long id)
    {
        Order? order = await _contextService.GetOrder(id);

        if (order != null)
            return Ok(order);
        else
            return NotFound();
    }
}