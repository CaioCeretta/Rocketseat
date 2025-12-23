namespace functions_variables_debug;

class Program
{
	static void Main()
	{
		var math = new MathOperations();

		math.Add(4, 7);

		math.Subtract(b: 5, a: 7);
	}
}