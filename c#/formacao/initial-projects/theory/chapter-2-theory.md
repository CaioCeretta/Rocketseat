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

## Lesson 3 - Text types

Text types are char os string

char is for single character variables and string is a sequence of characters

we create strings with double quotes, different from other languages that is up that is up to us to choose whether to use
single our double quotes

string.StarsWith("T") - The method starts with returns us a boolean
string.EndsWith("E") - same thing
