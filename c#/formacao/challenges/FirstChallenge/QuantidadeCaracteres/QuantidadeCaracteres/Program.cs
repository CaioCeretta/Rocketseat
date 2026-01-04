namespace QuantidadeCaracteres
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Digite a(s) palavra(s) desejada(s)!");
            string palavra = Console.ReadLine()!;
            int contador = 0;
            

            foreach(char c in palavra)
            {
                if(!char.IsWhiteSpace(c))
                {
                    contador++;
                }
            }

            Console.WriteLine(contador);
        }
    }
}
