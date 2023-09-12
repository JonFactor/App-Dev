namespace ContactTutTest;
using ContactTutTest.Views;

public partial class AppShell : Shell
{
	public AppShell()
	{
		InitializeComponent();

		Routing.RegisterRoute(nameof(HomePage), typeof(HomePage));
		Routing.RegisterRoute(nameof(MyContactDetails), typeof(MyContactDetails));
		Routing.RegisterRoute(nameof(ContactDetails), typeof(ContactDetails));
	}
}
