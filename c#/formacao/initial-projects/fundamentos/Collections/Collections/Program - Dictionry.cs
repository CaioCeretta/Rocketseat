using System.Runtime.CompilerServices;

namespace LegacyHelloWorld;

class Legacy3Program
{
	static void LegacyMain()
	{

		Dictionary<int, string> dictionary = new Dictionary<int, string>();

		dictionary.Add(1, "Caio");
		dictionary.Add(2, "Ceretta");
		dictionary.Add(5, "Alex");

		string value = dictionary[2];

		Console.WriteLine(value);


	}
}
