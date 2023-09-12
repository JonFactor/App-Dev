
using Contacts.Models;
using Microsoft.Maui.Controls.Platform;
using System.Collections.ObjectModel;
using Contact = Contacts.Models.Contact;

namespace Contacts.Views;

public partial class ContactsPage : ContentPage
{
	public ContactsPage()
	{
		InitializeComponent();

		List<Contact> contacts = ContactRepository.GetContacts();

		listContacts.ItemsSource = contacts;
	}

	protected override void OnAppearing()
	{
		base.OnAppearing();

		var contacts = new ObservableCollection<Contact>( ContactRepository.GetContacts()); // observables tell xaml to update ui w/ binding

		listContacts.ItemsSource = contacts;
	}

	private async void listContacts_ItemSelected(object sender, SelectedItemChangedEventArgs e) // should be item changed not item selected
	{
		if (listContacts.SelectedItem != null) {
			int selectedContactId = ((Contact)listContacts.SelectedItem).ContactId;
			await Shell.Current.GoToAsync($"{nameof(EditContactPage)}?Id={selectedContactId}"); //queritzed string
		}

		
	}

	private void listContacts_ItemTapped(object sender, ItemTappedEventArgs e)
	{

		// reset for further use
		listContacts.SelectedItem = null;

		// triggerd after itemslected -always gets ran so, selected item
		// should be reset here instead of itemSelected, triggers itemSelected
		// again
	}



}