using System;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography.X509Certificates;

namespace PlacaVeiculo
{
	internal class Program
	{
		static void Main(string[] args)
		{

			Console.WriteLine("Informe uma placa com 7 caracteres alfanuméricos");

			string placa = Console.ReadLine()!;

			bool validaBool = PlacaValida(placa);

			string valida = validaBool ? "Válida" : "Inválida";


			Console.WriteLine($"A placa é {valida}");

		}

		static bool PlacaValida(string placa)
		{
			bool comecaComCarateres = true;
			bool terminaComNumeros = true;

			bool igualASete = placa.Length == 7;

			if(!igualASete)
			{
				return false;
			}

			for (int i = 0; i < 3; i++)
			{
				if (!char.IsLetter(placa[i]))
				{
					comecaComCarateres = false;
				}
			}


			for (int i = placa.Length - 4; i < placa.Length; i++)
			{
				if (char.IsLetter(placa[i]))
				{
					terminaComNumeros = false;
				}

			}

			return comecaComCarateres && terminaComNumeros;

			

		}

	}
}



