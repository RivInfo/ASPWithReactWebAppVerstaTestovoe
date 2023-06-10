using System.ComponentModel.DataAnnotations;

namespace ASPWithReactWebAppVerstaTestovoe.RequestModels;

public class OrderRequest
{
    [Required]
    public string SenderCity { get; set; }
    [Required]
    public string SenderAddress { get; set; }
    [Required]
    public string RecipientCity { get; set; }
    [Required]
    public string RecipientAddress { get; set; }
    [Required]
    public double CargoWeight { get; set; }
    [Required]
    public DateTime CargoPickupDate { get; set; }
}