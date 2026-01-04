namespace ConcatenarNome
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Informe o nome");
			string nome = Console.ReadLine() ?? "John";
            Console.WriteLine("Informe o sobrenome");
            string sobrenome = Console.ReadLine() ?? "Doe";

            string nomeCompleto = nome + ' ' + sobrenome;

            Console.WriteLine(nomeCompleto);
        }
    }
}
