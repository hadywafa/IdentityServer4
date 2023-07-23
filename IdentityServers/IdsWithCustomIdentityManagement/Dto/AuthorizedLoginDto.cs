namespace IdsWithCustomIdentityManagement.Dto;

public class AuthorizedLoginDto
{
    //-------------------------------------- Contact Data --------------------------------
    public int? ContactId { get; set; }
    public int? ContactType { get; set; }

    //Person
    public int? CtPersonID { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }

    //Company
    public int? CtCompanyId { get; set; }
    public string? CtCompanyName { get; set; }
    public int? CtPrimaryPersonId { get; set; }
    public int? PrimaryContactId { get; set; }
    public string? PersonNumber { get; set; }

    //-------------------------------------- TeamEvent Data ------------------------------
    public int? RegTypeId { get; set; }
    public string? Description { get; set; } //registrationType
    public int? PersonRegistrationId { get; set; }
    public int? CompanyRegistrationId { get; set; }
    public DateTime? RegDate { get; set; }
    public int? IsRequestForDelegate { get; set; }
    public int? NotificationMessageId { get; set; }
    public int? MessageId { get; set; }
    public string? NoShow { get; set; }

    #region NEVER_USED
    public int? PrimaryDelegateEventRoleId { get; set; }
    public int? RegistrationStatusId { get; set; }
    public bool? CanBlock { get; set; }
    public bool? CanManualRequest { get; set; }
    public bool? CanManualReject { get; set; }
    public string? SellerPrimaryDelegate { get; set; }
    public string? CompanyProfileExported { get; set; }
    public string? HotelAssigned { get; set; }
    public string? CompanyHasAccommodationPkg { get; set; }
    public string? CompanyHasSharedBooth { get; set; }
    public int? AppointmentStatusId { get; set; }
    public string? CmpNum { get; set; }
    public string? OwedAmount { get; set; }
    public string? InstanceOwner { get; set; }
    public string? PenndingSchedule { get; set; }
    public string? PriPersonFirstName { get; set; }
    public string? PriPersonLastName { get; set; }
    #endregion

    //-------------------------------------- Association Data -----------------------------
}
