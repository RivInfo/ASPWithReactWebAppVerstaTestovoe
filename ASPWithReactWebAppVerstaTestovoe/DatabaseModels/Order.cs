using System.ComponentModel.DataAnnotations;

namespace ASPWithReactWebAppVerstaTestovoe.DatabaseModels;

public class Order
{
    [Key]
    public long Id { get; set; }
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