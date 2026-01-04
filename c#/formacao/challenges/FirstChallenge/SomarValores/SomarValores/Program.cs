namespace SomarValores
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Calculadora calculadora = new Calculadora();

            Console.WriteLine("Digite o número 1");
            double num1 = double.Parse(Console.ReadLine()!);
			Console.WriteLine("Digite o número 2");
			double num2 = double.Parse(Console.ReadLine()!);

            double resultadoSoma = calculadora.Somar(num1, num2);
			double resultadoSubtracao = calculadora.SubtrairPositivo(num1, num2);
			double resultadoMultiplicacao = calculadora.Multiplicar(num1, num2);
			double resultadoDivisao = calculadora.Dividir(num1, num2);
            double resultadoMedia = calculadora.Media(num1, num2);
			
		}

        class Calculadora
        {
			public double Somar(double num1, double num2) => num1 + num2;
            

			public double SubtrairPositivo(double num1, double num2)
            {
                if (num1 > num2) return num1 - num2;
                return num2 - num1;
            }
            
            public double Multiplicar(double num1, double num2) => num1 * num2;   
            

			public double Dividir(double num1, double num2)
            {
                if(num2 == 0)
                {
                    Console.WriteLine("Erro: Divisão por zero!");
                }

                return num1 / num2;
            }

            public double Media(double num1, double num2) => (num1 + num2) / 2;
            

        }
    }
}
