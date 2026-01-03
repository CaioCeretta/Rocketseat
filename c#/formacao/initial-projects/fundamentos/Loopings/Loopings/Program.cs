namespace Loopings
{
    internal class Program
    {
        static void Main(string[] args)
        {
            var list = new List<string> { "Caio", "Alex", "André" };
            var dictionary = new Dictionary<string, string>();

            dictionary.Add("Name1", "Caio");
			dictionary.Add("Name2", "Alex");
			dictionary.Add("Name3", "André");

			//for(int i = 0; i < list.Count; i++)
			//{
			//    Console.WriteLine(list[i]);
			//}

            foreach (var item in dictionary)
            {
                Console.WriteLine(item);
            }

			foreach (var name in list)
            {
                Console.WriteLine(name);
            }


        }
    }
}
