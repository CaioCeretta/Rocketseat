namespace functions_variables_debug;

class Program
{
	static void Main()
	{
		var math = new MathOperations();

		(int result, string author) = math.Add(5, 7);



		Console.WriteLine(result);
		Console.WriteLine(author);

		//math.Subtract(b: 5, a: 7);

		
	}
}