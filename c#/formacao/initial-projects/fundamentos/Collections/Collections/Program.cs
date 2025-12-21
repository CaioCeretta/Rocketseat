using System.Runtime.CompilerServices;

namespace HelloWorld;

class Program
{
	static void Main()
	{

		Dictionary<int, string> dictionary = new Dictionary<int, string>();

		dictionary.Add(1, "Caio");
		dictionary.Add(2, "Ceretta");
		dictionary.Add(5, "Alex");

		string value = dictionary[2];

		bool exists = dictionary.ContainsKey(8);

		Console.WriteLine(value);
		Console.WriteLine(exists);


	}
}
