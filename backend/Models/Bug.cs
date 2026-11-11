using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BugManagement.Api.Models;

/// <summary>
/// Database entity representing a Bug report.
/// </summary>
public class Bug
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(150)]
    public string BugName { get; set; } = string.Empty;

    [Required]
    [MaxLength(2000)]
    public string BugDescription { get; set; } = string.Empty;

    /// <summary>
    /// The timestamp when the bug was reported. Automatically set by backend on creation.
    /// </summary>
    public DateTime ReportDate { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Severity level of the bug (Critical, High, Medium, Low).
    /// </summary>
    [Required]
    public SeverityLevel Level { get; set; }
}

