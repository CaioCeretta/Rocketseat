namespace legacy_functions_variables_debug;
using functions_variables_debug;

class legacyProgram
{
	static void legacyMain()
	{
		var math = new MathOperations();

		(int result, string author) = math.Add(5, 7);



		Console.WriteLine(result);
		Console.WriteLine(author);

		math.Test(a: 1);

		//math.Subtract(b: 5, a: 7);

		
	}
}