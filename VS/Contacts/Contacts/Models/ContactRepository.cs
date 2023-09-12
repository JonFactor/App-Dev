using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Contacts.Models
{
	public static class ContactRepository
	{
		public static List<Contact> _contacts = new List<Contact>()
		{
			new Contact {ContactId=1 ,Name="joe danger", Email="henry ford"},
			new Contact {ContactId=2 ,Name="jane doe", Email="jane.doe@gmail.com" },
			new Contact {ContactId=3 ,Name="frank liu", Email="frank.Liu@gmail.com" }
		};

		public static List<Contact> GetContacts() => _contacts;

		public static Contact GetContactById(int contactId)
		{
			var contact = _contacts.FirstOrDefault(x => x.ContactId == contactId);
			if (contact != null)
			{
				return new Contact
				{
					ContactId = contactId,
					Address = contact.Address,
					Email = contact.Email,
					Name = contact.Name,
					PoneNumber = contact.PoneNumber
				};
			}

			return null;
		}

		public static void UpdateContact(int contactId, Contact contact)
		{
			if (contactId != contact.ContactId) return;

			var ContactToUpdate = _contacts.FirstOrDefault(x => x.ContactId == contactId);
			if (ContactToUpdate != null)
			{
				ContactToUpdate.Address = contact.Address;
				ContactToUpdate.PoneNumber = contact.PoneNumber;
				ContactToUpdate.Email = contact.Email;

			}
		}
	}
}
