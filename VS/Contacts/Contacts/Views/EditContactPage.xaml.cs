using Contacts.Models;
using System.Text;
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
	public string ContactId
	{
		set
		{
			contact = ContactRepository.GetContactById(int.Parse(value));
			if (contact !=  null) 
			{ 
				entName.Text = contact.Name;
				entEmail.Text = contact.Email;
				entPhone.Text = contact.PoneNumber;
				entAddress.Text = contact.Address;
			}

		}
	}
	
	private void Cancel_Clicked(object sender, EventArgs e)
	{
		// .. used for parent page / back && to goto main page w/ basic
		// shell nagivation u need to put a double "//" before the string
		// as it is the root page
		Shell.Current.GoToAsync("..");
		
    }


	private void btnUpdate_Clicked(object sender, EventArgs e)
	{
		// update validation

		if (nameValidation.IsNotValid)
		{
			DisplayAlert("ERROR", "name is required", "ok");
			entName.Text = contact.Name;
			return;
		}

		if (emailValidation.IsNotValid)
		{

			StringBuilder sb = new StringBuilder("", 50);
			foreach(var i in emailValidation.Errors)
			{
				string errorMsg;
				if (emailValidation.Errors.IndexOf(i) == emailValidation.Errors.Count - 1)
					errorMsg = i.ToString();
				else
					errorMsg = i.ToString() + ", and ";

				sb.Append(errorMsg);
			}
			DisplayAlert("ERROR", sb.ToString(), "ok");

			entEmail.Text = contact.Email;
			return;
		}

		// push changes

		contact.Name = entName.Text;
		contact.Email = entEmail.Text;
		contact.Address = entAddress.Text;

		ContactRepository.UpdateContact(contact.ContactId, contact);

		Shell.Current.GoToAsync("..");
	}

}