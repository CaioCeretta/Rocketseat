## Initial comments

C# is a high level language, which means it is a programming language that is very similar to the human language, and not
to the machine language.

It is a language destined to be simple, modern, and economic, concerning the memory consume and processing. It is not
a direct contestant of lower level languages, like C and Assembly.

With C# we can create a great variety of softwares with different objectives. Like APIs, Apps for windows, mac, android
and IOS, and we are also able to create our own websites.

Some of its characteristics are:

Object Oriented: Everything in C# is an object, which is great for organizing and sharing our code.
Memory Management: C# already equipped with a garbage collector, that runs automatically and we do not have to worry with
liberating memory, and it will, itself, notice that there is a memory space that isn't being used anymore for a variable
and deletes it.
Typed language
Security: It's widely used inside corporate environments.

### Differences between C, C++, and C#

#### C vs C++: 

The relationship between C and C++ is the most direct; C++ is essentially an extension of C.

**C**: C is a procedural language. It focuses on a sequence of steps (procedures or functions) to compute something. It's
often called a "middle-level" language because it offers close access to hardware and memory.

**C++**: C++ is a multi-paradigm language. It keeps all the procedural power of C but introduces the ability to organize
code around objects (data structures and methods that operate on that data). This is the main difference.

#### C/C++ vs. C#

C# is a much newer language, developed by Microsoft, and its philosophy is very different from its predecessors.

• **C#** is a modern, object-oriented language that runs in a managed environment (the CLR). This environment provides
services like the Garbage Collector, which eliminates most manual memory management and its associated bugs (a major
source of headaches in C and C++).

• **C#** focuses on developer productivity and safety, trading some of the raw, low-level control of C/C++ for a safer,
more robust framework.

#### Summary

In short

**C**: The original, procedural, low-level language.
**C++**: C plus OOP
**C#**: Is a managed, modern OOP language,  build for the .NET framework, prioritizing safety and rapid development over
C/C++'s raw hardware access

#### Visual Studio vs Visual Studio Code

Even though they share the same name, they serve different purposes. Visual Studio is a more complete tool, where we can
have a more robust debugging, how much processing the program we are developing consumes of our machine, and more.
Code in other hand, it is a "lighter" approach then VS, we can make use of it by adding extensions, but VS is way more
complete and the difference between both is considerate.

In short: VS is the massive, fully-loaded workshop for large, deep projects, mainly within the Microsoft stack. VS Code
is the highly adaptable, fast-starting utility belt for projects of all sizes and languages, especially where resource
consumption or a Linux environment is a factor.

## Lesson 1 - Creating the first project

First project  is going to be a console project

if using vscode, start by running the command `dotnet new console` which will initialize a project with the initial config.

#### Difference between the project and a solution

A project is where we implement our code and the solution is nothing more than a **container**, a container where we will
group the related projects. When we close our VS, and open a solution it already loads every project that are inside that
box of related projects.

#### Types of projects

When we create a console project, like the one being created, and compile it, it will generate an executable for us, which
will open for us a terminal for us to interact with — sending data, retrieving data, and so on. 

But there are other types of projects. Like .net projects using C# that create apps for windows/android, or simply a library
that when compiled becomes a simple `dll`. 

### Back to the code

In the right tab we can see the solution and every project that is related to it.

The basic project that is created by vscode simply creates a .cs file that defines a `Console.WriteLine`, similar to `console.log` and it can be executed simply by clicking on the play button.

## Lesson 2 - Namespace Introduction

### What is a namespace?

In simple terms, a name space is a way for us to organize our classes/interfaces/files inside a project.
Imagine we have a room full of toys which are all unorganized and we decide to organize them. Let's say we get all the
cars and put inside a box containing the cars, the same for action figures and so on.
 
These boxes are like the **namespaces** of an app, they are a way of organizing the content inside our project.

Namespaces gives us the freedom of creating two classes with the same name on two different namespaces. We can even use
it to make references and address where a certain class is located.

We can choose whatever name we would like for a namespace, however, there is a nomenclature standard that is:

1st - Project Name, e.g. starting with HelloWorld
2st - If inside that project we have more folders, we make a concatenation between project name . folder name, and so on.

### Older version

If we end up seeing a project that uses an older version of C#, its names are going to be something as

`namespace HelloWorld
{



}
`

Every code we end up creating is going to be inside these curly braces, but in newer versions we don't need to use curly
braces and simply add a semicolon on the end

### Coding

Utilize the `namespace HelloWorld` since it is on the root of the project.

If in case there was a folder `Teste1` inside the project, its namespace would be `namespace HelloWorld.Teste1`

## Lesson 3 - Namespace simplified

If we are in windows using visual studio and would like the code to be generated in this new form, we need to go to the
tools/options and modify the code style namespace definition, and change it from block scoped to file scoped

## Lesson 4 - Classes in C#

Classes are the same as other languages.

Their name should be the same one as the file name
A folder can have one or more classes and they will share the same namespace;

## Lesson 5 - Functions

Functions are also the same.

Their naming conventions are basically

• PascalCase (NameOfTheFunction): Used for:
  • Methods/Functions
  • Classes and Structs
  • Properties and Events
  • Namespaces;
  • Constants (const and static readonly)
  • Interfaces (Usually start with I)

### Function types

Different from other languages, if we omit the access modifier, and simply use void for the return, C# understands it
assumes the more restrict level as default, which is private. Therefore, we need to inform that it is public in case we
want to use it outside the class. 

  ### Main() is the official entry point of a C# program.

  Main() is the first method that .NET's runtime executes when the application starts.

  When we run a .dll/.exe file, .NET looks for a static Main method inside assembly.
  It needs to have one of the following signatures

  `static void Main()`
  `static void Main(string[] args)`
  `static int Main()`
  `static in Main(string[] args)`

## Lesson 6 - Using other classes behaviors

Suppose we have a class `Carro` which has two methods: `Ligar()` and `Desligar()`  and we want to use this class inside
the Main method.

In C# when we want to instantiate a separate class we don't need to import classes from the same namespace, so we can
normally instantiate a `new Carro()` without the need of exporting Carro and importing it inside the Main

### Variables 



To define new variables inside C# we need to inform the variable type and then the variable name.












