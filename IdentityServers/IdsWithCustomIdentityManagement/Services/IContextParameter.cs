namespace IdsWithCustomIdentityManagement.Services;

public interface IContextParameter
{
    string? Lang { get; set; }
    string? CoreDB { get; set; }
    string? EventDB { get; set; }
    string? AssociationCode { get; set; }
}
