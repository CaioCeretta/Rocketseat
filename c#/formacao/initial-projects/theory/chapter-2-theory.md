## Lesson 1 - Numeric Primitive Types

We can learn about the types inside the microsoft website itself in the tutorials.

The integer types go from byte to long, the unsigned types, the ones that starts with u are only used for positive numbers.

### Double explanation


This happens because, in C#, a numerical number with a point is interpreted as a double by default, and not as a float.
That's why if we really want a float, we need to insert the suffix f or F at the end — otherwise, the compiler won't allow
the direct conversion

Therefore, when we write

`var x = 1.5`

the compiler automatically understands it as 

`double x = 1.5;`

This happens because the default type for literals with floating points in `C#` is `double`, following the language specification.

#### Why we can't use `float`? 

If we try

`float x = 1.5` it throws an error

We are trying to convert a double to a float, and C# implicitly considers it as unsafe (may have a loss of precision).

#### Why is the suffix necessary? 

Without it:
• 3.14 is double
• float has lower precision
• C# doesn't allow the automatic conversion of something bigger to something smaller

C# only allow implicit conversions that do not lose information.

float has the smallest precision, while double has a higher precision, and decimal is the type with the biggest one. However,
it comes with a bigger performance cost and a smaller numeric range.

### What are the suffixes? 

10 int
10.0 double
10.0f float
10.0m decimal

### Legibility tip

In some cases, where we have numbers like 1.000, we can use 1_000 to imrpove legibility

## Lesson 2 - Boolean types

Simply true or false

## Lesson 3 - Text types and functions

Text types are char os string

char is for single character variables and string is a sequence of characters

we create strings with double quotes, different from other languages that is up that is up to us to choose whether to use
single our double quotes

string.StarsWith("T") - The method starts with returns us a boolean
string.EndsWith("E") - same thing
string.Replace(desiredLetter, letterToReplace)
string.Contains("stringToCheck") - Checks if the variable contains the string
string.Equals("stringToCheck") - Checks if the string is exactly equal to the property content

## Lesson 4 - Operations with texts

Imagine we have a string variable which has a sentence, and a second string variable with other sentence. We then want to
concatenate them creating a third variable with a single paragraph

This can be done with + signs and adding a blank space. The concat also works with other types and we don't have to only
use strings

In case we are dealing with paths and don't want to escape each \ with other \, we can start thr string with @, before 
the quotes and it will disable the special characters (such as \s \t, etc.) and use the literal value.

Instead of concatening with '+' we can start a string with the dollar sign, which enables string interpolation and we can
do something as

`string paragraph = text1 + " " + 7 + " " + true + " " + text2;`

String Interpolation is available after the version 6 of C#, in older version, would'nt be able to do this 

### Performance cost

All these operations have a cost. And it will depend if it will affect the performance of not.

These simples concatenations with + do not cause any trouble, but at the moment we start losing control and having to concat
multiple variables, it is not recommended to use none of these forms.

What C# has to make this in a  better way, is by using a class named `StringBuilder` and use the `Append` method to make
these concatenations and by the end, we use toString on that stringBuilder.

### Dynamic Texts

Assume we have a string variable, with a given text with a name a on it, suppose we don't want the user name to be fixed
and make it dynamic, or in the future, to translate that text to other languages.

For this, we make use of the syntax {0}, {1}, and so on,  for what we want to make dynamic .

Now we define a string.Format passing as first argument the text variable, and after it, the strings we want to use to replace
the {0}, {1}, {2} and so on. **We have to fill all the dynamic variables we definedd, otherwise it will throw an error

Format returns us a new string, which is the result of the formatting


## Lesson 5 - Working with Dates

### DateOnly

We can create a `day` variable of the type `DateOnly`. By printing that variable we are going to see 01/01/0001.

If we want to modify that date, inside its parentheses we need to inform its year, month, day

DateOnly type have some properties like, .ToShortDateString(), .ToLongDateString(), which modify the date in the formats
we are used to.

If we want to modify the language to portuguese, as instance. We must to convert the day to a string, and pass to it the
parameter new CultureInfo("PT-BR"). To further formatting, we pass as fist parameter of ToString, the desired format

The language already has some pre formats, such as "d", "D", ... But we also can create our own

e.g. "d MMMM yyyy" which  will reproduce "15 December 2025"  or "dd/MMMM/yyyy which returns 15/december/2025

### DateTime

Similar to DateOnly, but with time included

To get the current day, we use DateTime.Now;

To get only the current day, DateTime.Today

And more.

## 


