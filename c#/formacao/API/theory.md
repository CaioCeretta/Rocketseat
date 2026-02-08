## This section will focus both on the creation of an API as well as understanding the files inside a project

## Lesson 1 - API project creation

Inside visual studio `Create New Project` window, choose the `ASP .NET Core Web API` option. Fill the options, rename
as we want, click next and create the project.

For this initial project, we delete the `WeatherForecast.cs` file and its Controllers file that is automatically created
by VS to start a clean project. 

## Lesson 2 - Properties

A properties folder is automatically created for us, and inside it, we have a `launchSettings.json` file.

The purpose of this file is to store some configurations for the debug mode. Therefore, when we execute our API in
debug mode, this file will be used to define some configurations.

### Two different launching modes

1. Debug: Different from the release configuration, it is not optimized for performance. It will include the compiler,
some symbols, extra information, to allow us to debug our code, like placing a breakpoint, and verifying line by line
what our project is executing, the variables values, etc.

2. Release: This returns us a compiled code with focus on performance, removing inutile parts of the code, such as
comments, or the compiler being "smart" enough to optimize the code.

### launchSettings

The profile property is an object containing multiple profiles. Such as http, https, and IIS Express (Server created while
executing the API).
We can toggle which profile we wish to use next to the run button, where it has a down arrow, where we can select which
one we would like.

Let's take the http property as an example, each profile contains properties like:

. commandName: Simply says how we will execute our project, in this case, as an 'Project'.
. dotNetRunMessage: Boolean to choose whether a message will be displayed or not
. launchBrowser: Boolean to determine if it will execute on our 
. applicationUrl: URL where the API will be started on
. environmentVariables: Variables for the API environment.

### Modifications in order to use swagger

Since the more recent versions of .NET, does not use swagger (like the instructor is using)  because Microsoft replaced
it with Scalar. Scalar generates the documentation's JSON but does not generate the visual interface.

In order to use it, with swagger, we must do the following

1. Add swagger manually, opening the terminal in the project's folder and executing:   
`dotnet add package Swashbuckle.AspNetCore`
2. Add a new attribute to the desired configuration on the launchSettings: "launchUrl": "swagger"
3. Add these lines in our Program.cs, before calling `app.UseSwagger()`:
    builder.Services.AddEndpointsApiExplorer(); // Required to find the routes
    builder.Services.AddSwaggerGen();

## Lesson 3 - Program.cs

`Program.cs` is our entry point. When we execute the API, the lines defined on this file are going to be the first lines
to be executed.

Everything related to configuration in order for the API to work, will be configured on that file.\

Let's use the API project as an example:

. `var builder = WebApplication.CreateBuilder(args)`:

    After this variable builder, it will make the addition and the import configurations for the entry point, such as:  

    . builder.Services.AddController(): Adding the controllers defined on the Controllers folder
    . builder.Services.AddEndpointsApiExplorer(): Add the endpoints defined by us to the API
    . builder.Services.AddSwaggerGen(): This function generates a swagger file, which is read by the browser and display
    it to use.

. `var app = builder.Build();`

    . After defining and adding these configurations to the builder variable. Store in a variable app, the result of
    calling Build() on the builder configurations and it will persist all the configurations already defined.
    
    . With the app variable, check if its Environment is set to IsDevelopment, and if yes, call the `useSwagger()` function
    and allow the browser show the Swagger page. Swagger is a simple page to document all our endpoints. 
        - When we execute the project on the cloud and in production/release mode. These page won't be displayed.
    
. `app.UseHttpsRedirection()`: What redirects our api to inform it uses https.

. `app.UseAuthorization()`: We will focus on this later

. `app.MapControllers()`: We already added all the controllers on the builder, now we map them to the API.

. `app.Run()`: It is after this point, that the browser opens the swagger and our API will be ready to receive the requests.

## Lesson 4 - AppSettings.JSON

The AppSettings.JSON is very similar to the .env file in JS applications, it also follows the idea tof separating configuration
from code.

Although the objective is the same, the way the operate "over the hood" has some important differences of resource structuring.

Core differences

1. Data Structure

`.env` is a list of `key=value`. And the `AppSettings` uses the JSON hierarchical structure. What allow us to better organize
complex configurations.

2. Native .NET behavior

While in Node.js we generally need libraries like `dotenv` to load the file, inside `.NET` the support to this file is
configured by default in the `Host.CreateDefaultBuilder()`.

.NET also work with the file inheritance concept

    1. It reads the appsettings.json (general)
    2. Then it reads the specific `appsettings.Development.json`
    3. What is inside this second files, overwrites the first

    In C#, for really sensitive data in development, such as DB passwords, the official recommendation is not even to
    place them inside the JSON, but inside the User Secrets , that store data outside of the project folder to avoid
    accidental commits

### Profiles AppSettings

We can also, inside the `launchSettings.json`, inside a profile array item, determine that the ASPNETCORE_ENVIRONMENT attribute
that we define for each launch profile, is going to use any given appSettings file we choose. e.g. `appsettings.Caio.json`.

Notice that, the app settings for the production, such as appsettings.Production.json, will never be available inside
this "public" files.

### Why do we also have these nested AppSettings, other than the default one?

As we have seen, it will first read the general appsettings, and after that, read the specific one, and in case the
specific one has equal properties. The specific overwrites the general.

So, the general one defines configurations that should be shared across all settings, and merge these settings with the
specific ones.

We usually add inside the general one, the variables that are independent of the environment. Assume we have an email
service where we have the URL to that service and our private key. This url is usually public and this URL is totally
fine to be public. Whereas a key, for particular uses, or different environments, it can't be on the general one.

## Lesson 5 - Reading AppSettings.json

We start by defining a new property inside the main appSettings.json and another property inside the appSettings.Development.json.

We must use `Program.cs` to access these properties, since we will need the `builder.Configuration` method. We can also,
in the future, pass this builder as a reference to other parts of the project.

inside `Program.cs`, we call `builder.Configuration.GetSection("sectionName")`. The name here is section, but we can
understand this as an object and use it to access the objects inside our JSON config file. We can also use it to chain
nested objects, so if we have an object login with other objects inside of it, we could use something like:

`builder.Configuration.GetSection("Logging").GetSection("LogLevel").Value`.

`.Value` always returns us a string, in case we have a number field, and we want to get its value as a Number, we can
make use of the `Get` method: 

Like this: `var test = builder.Configuration.GetSection("MyClass").GetSection("Number").Get<int>();`

There is also a simpler syntax than this:

`var test = builder.Configuration.GetValue<int>("MyClass:Number");`

This means that we are getting the int value from the Class:Property


### Manual Lookup (String-Based)

What we just did is often called **manual configuration access**. The problem with this approach, is that is "string-heavy".
If we have a typo in any section value. The code won't break until we run it. We can also have to manually cast values if
they are numbers or booleans

### Typed Binding

    - 1. The Concept of Schema Mirroring
    
    For this technique to work, our C# class acts as a template or a blueprint of the JSON data.

    In our JSON, `MyClass` is not just a single piece of data, it is an Object Node. Everything inside the curly braces
    are Attributes (or fields) of that node. When we use `.Get<MyClass>()`, .NET performs a recursive search

    1. It identifies the section "MyClass"
    2. It looks at the properties of the C# class we provided
    3. It searchers the JSON for the keys that match those property name.
    
    - 2. How the "Binding" engine works
    
    When we call `.Get<T>()`, .NET uses a process called **Property Matching**. Even though the JSON is just text, the binder
    is smart enough to handle the "Deep Merge".

    . Discovery: The binder sees `Prop1` in the class. It looks through the merged configuration (The combined result of
    all our `appsettings` file)
    . Type Conversion: If our JSON value is "100" but our C# property is `public int Prop1 { get; set;}`, the binder will
    automatically convert that string into an integer.
    . Null Handling: If a property exists in our Class but is missing from the JSON, the binder simply leaves it as null
    (or the default value) rather than crashing.

    - 3. The "Object Graph" vs "Flat Keys"
    
    . Flat Access (Old way): We are trusting the configuration like a dictionary. We have to know the exact "path" to the
    value `MyClass:Prop1`

    . Object Graph (New Way): We are treating the configuration like a Tree. By binding to a class, we are capturing an
    entire "branch" of that tree and turning it into a structured C# object in one command.

## Lesson 6 - What is a Controller

Inside an API project there will exist a Controllers folder. And inside this folder we will place special classes, that
are controllers. 

A Controller is a special class, and inside this class, we will put functions that are going to consist of our endpoints.
Each endpoint will perform a specific functionality, commonly regarding our HTML methods.

A `Controller` is usually a grouping of related endpoints, so if we for example, have a `UserController`, every endpoint
inside this controller are going to be specific user related functionalities, such as creating a user, recovering the users,
updating user information, etc.

### Visual Studio - Controller Creation

Inside the `Controllers` folder, add a new Controller. Controllers -> add -> Controller -> (Here we need to be careful,
VS opens the window with the MVC list being displayed, and this is not what we want for an API, select API in the sidebar
and choose a empty controller) -> Choose whatever name we want (Singular, e.g. UserController). The logic behind this is
that the class name should represent the **main resource** or the **entity** that this controller manages, and not the
items collection.

## Controller Implementation

For us to tell .NET, that this class (UserController), is a special class that will group endpoints that have similar
context, before the class block, we need to to add the attribute [ApiController].

The `UserController : ControllerBase`, is what we call inheritance between classes. But this lesson isn't focused on
this. However, every controller is required to inherit from the `ControllerBase`.

The `Route("api/[controller])` is addressing our `launchSettings.json`. Inside our profiles, we are informing the
applicationUrl, like `https://localhost:7081`. And this api/controller will complement this given route. e.g.
POST to `https://localhost:7081/api/user`

 



 



