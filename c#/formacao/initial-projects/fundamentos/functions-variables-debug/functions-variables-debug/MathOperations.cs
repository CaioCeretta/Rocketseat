

namespace functions_variables_debug;
public class MathOperations
{
	// Returning more than one value

	public (int sumResult, string name) Add(int a, int b)
	{
		var result = a + b;


		return (result, "Caio");
		
	}

	public void Test(int a, int b = 7)
	{
		Console.WriteLine(a + b);
	}



	//Returning one value 

	/*public void Add(int a, int b) => Console.WriteLine(a + b);

	//public int Add(int a, int b) => a + b;

	//public int Add(int a, int b)
	//{
	//    return a + b;   
	//}

	//public void Subtract(int a, int b)
	//{
	//    var result = a - b;

	//    Console.WriteLine(result);  
	  }	*/




}

