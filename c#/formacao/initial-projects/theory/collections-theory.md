## Lesson 1 - Arrays

Integers in c# can be defined with: 

1. int[]  integers = new int[10];
  This creates a new array in memory named integers, with tye type of an array of integers and its length will be 10

2. int[] integers2 = [1, 2, 3];
  This creates a new array in memory named integers, with type type of an array of integers and its length will be inferred
  as 3

3. int[,] integers = new int[10, 10] = This creates a new array in memory named integers, with the type of a two-dimensional
array of integers and its length will be 1o0


We must be cautious that, we should choose the second option only if we are sure of how many items we will have in the
array, otherwise, modifying that size, may be costly for memory/performance

## Lesson 2 - lists

In C#, lists are often considered more flexible and powerful than arrays, specially when the size of the collection is not
fixed or when we need to perform frequent insertions or deletions. Here's why:

### Advantages of Lists over Arrays

  1. **Dynamic Size**: Lists can grow oer shrink dynamically, where arrays have defined size once created.
  2. **Built-in Methods**: Lists come with many useful methods like `Add()`, `Remove()`, `Insert()`, and `Sort()`, which
  can make working with collections much easier
  3. **Ease of use**: Lists are part of the `System.Collection.Generic` namespace, and they work well with modern C#
features like LINQ.

### When Arrays are better:

  . Arrays can be faster for certain performance-critical scenarios where the size of the collection is known in advance
  and won't change
  . They are less memory overhead compared to lists because they don't need extra space for resizing

### Quick example
```cs
  using System;
  using System.Collections.Generic;

  class Program {
    static void Main() {

       // Creating list of integers
      List<int> numbers = new List<int>();

      // Adding elements to the list
      numbers.Add(10);
      numbers.Add(20);
      numbers.Add(30);

      // Printing the List
      foreach (int num in numbers) {
        Console.WriteLine(num);
      }

      // Removing an element
      numbers.remove(20);

      // Accessing the first element of the list
      int firstElement = numbers.First();

      // Accessing the last element of the list
      int lastElement = numbers.Last();

      // Accessing the element in a given position
      int element = numbers.ElementsAt(1);  

      // Removing the element in a given position
      numbers.RemoveAt(2);

      // Clear the list
      numbers.Clear();




      //Printing the updated list
      foreach(int num in numbers) {
        Console.WriteLine(num);
      }
    }
  }


