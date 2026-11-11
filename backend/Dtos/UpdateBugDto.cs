using System.ComponentModel.DataAnnotations;
using BugManagement.Api.Models;

namespace BugManagement.Api.Dtos;

/// <summary>
/// Data Transfer Object for updating an existing bug report.
/// </summary>
public class UpdateBugDto
{
    [Required(ErrorMessage = "Bug name is required.")]
    [StringLength(150, MinimumLength = 3, ErrorMessage = "Bug name must be between 3 and 150 characters.")]
    public string BugName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Bug description is required.")]
    [StringLength(2000, MinimumLength = 5, ErrorMessage = "Bug description must be between 5 and 2000 characters.")]
    public string BugDescription { get; set; } = string.Empty;

    [Required(ErrorMessage = "Severity level is required.")]
    [EnumDataType(typeof(SeverityLevel), ErrorMessage = "Level must be Critical, High, Medium, or Low.")]
    public SeverityLevel Level { get; set; }
}

