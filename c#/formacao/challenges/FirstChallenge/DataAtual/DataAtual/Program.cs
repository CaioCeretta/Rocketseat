using System.Globalization;

namespace DataAtual
{
    internal class Program
    {
        static void Main(string[] args)
        {

            DateTime agora = DateTime.Now;

            List<string> opcoes = new List<string>
            {
                "Data Completa",
                "Apenas a data (dd/MM/yyyy)",
                "Apenas a hora (24h)",
                "Data com mês por extenso"
             };

            List<string> formatos = new List<string>
            {

                "dddd, dd 'de' MMMM 'de' yyyy HHHH:mm:ss",
                "dd/MM/yyyy",
                "HH:mm:ss",
                "dd 'de' MMMM de 'yyyy"
            };

            Console.WriteLine("Escolha o formato da data");

			for (int i = 0; i < opcoes.Count; i++)
			{
				Console.WriteLine($"{i + 1} - {opcoes[i]}");
			}

			int escolha = int.Parse(Console.ReadLine()!);

            if(escolha >= 1 && escolha <= formatos.Count)
            {
                string resultado = agora.ToString(
                    formatos[escolha - 1],
                    new CultureInfo("pt-BR")
                );

                Console.WriteLine(resultado);
            } else
            {
                Console.WriteLine("Opção inválida");
            }


        }
    }
}
