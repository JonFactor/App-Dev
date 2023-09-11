using Contacts.Models;
using Contact = Contacts.Models.Contact;

namespace Contacts.Views;

[QueryProperty("ContactId","Id")] // property name (this pg), query string name (previous page)
public partial class EditContactPage : ContentPage
{
	private Contact contact;
	public EditContactPage()
	{
		InitializeComponent();
	}
	private void Cancel_Clicked(object sender, EventArgs e)
	{
		// .. used for parent page / back && to goto main page w/ basic
		// shell nagivation u need to put a double "//" before the string
		// as it is the root page
		Shell.Current.GoToAsync("..");
		
    }

	public string ContactId
	{
		set
		{
			contact = ContactRepository.GetContactById(int.Parse(value));
			lblContactTitle.Text = contact.Name;
		}
	}

}