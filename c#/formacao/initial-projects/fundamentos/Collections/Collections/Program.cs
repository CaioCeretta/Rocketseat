using System.Runtime.CompilerServices;

namespace HelloWorld;

class Program
{
	static void Main()
	{

		List<string> strings = new List<string>();

		strings.Add("Ciao,");
		strings.Add("Mondo");

		string resultado = string.Join(" ", strings);

		Console.WriteLine(resultado);


	}
}
