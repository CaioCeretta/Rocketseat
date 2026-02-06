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





 











