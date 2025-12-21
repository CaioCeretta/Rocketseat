using System.Runtime.CompilerServices;

namespace LegacyyHelloWorld;
					 
class LegacyProgram      
{
	static void LegacyMain()
	{

		List<string> strings = new List<string>();	
													
		strings.Add("Ciao,");						
		strings.Add("Mondo");						
													
		string resultado = string.Join(" ", strings);

		Console.WriteLine(resultado);


	}
}
 