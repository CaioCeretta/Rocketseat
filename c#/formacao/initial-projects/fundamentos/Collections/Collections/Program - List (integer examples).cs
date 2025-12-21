using System.Runtime.CompilerServices;

namespace LegacyHelloWorld;

class Legacy2Program
{
	static void LegacyMain()
	{
		List<int> integers = new List<int>();

		integers.Add(0);
		integers.Add(1);
		integers.Add(3);
		integers.Add(2);


		int firstElement = integers.First();
		int lastElement = integers.Last();
		int element = integers.ElementAt(2);
		

		Console.WriteLine(firstElement);
		Console.WriteLine(lastElement);
		Console.WriteLine(element);
		Console.WriteLine(integers.Count);
		integers.RemoveAt(2);
		Console.WriteLine(integers.Count);

		integers.Clear();
		Console.WriteLine(integers.Count);


	}
}
