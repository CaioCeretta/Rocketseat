### Looping

Looping is also similar as it is on other languages.

### Mapping lists

When we map over dictionaries using foreach we use the syntax
foreach(element in dictionary) {...} where each element is a key, value pair
if we want to print only the keys we use element.key and the same for the values

### Continue keyword

When we use `break;`, we want to exit the loop and continue on the program processing. When we use continue, we only
want to stop it right there and keep the process on the next iteration. However, if we do something like

```cs
			while (number < 100)
			{

				if (number == 50)
				{
					//break;
					continue;
				}

				Console.WriteLine($"Test {number}");
				number++;

			}
```

The number will reach 50 and continue, but it does not see the number increment to start on 51. Therefore, if we put
the number++ at the bottom of the file, the program will break on this flow.

