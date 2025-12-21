## Lesson 1 - Introduction

In this section we are going to learn about

- Working with images
- Working with SVGs
- Importing icons from font-awesome via cdn and npm
- Importing own font-families
- Importing fonts from google-fonts

## Lesson 2 - Images

The public/ folder is where we place the assets of our apps.

### What is an asset?

Asset is basically a static file, a file that won't change, such as an image. When we generate the final code of the app,
we just want it to be available. Different from the ts, css, that are treated internally.

We can even notice that inside `angular.json` it has an assets property containing the input folder as public, meaning that
when we generate the final bundle, these assets from the public folder are going to be copied to the dist folder.

### How we add an asset?

We can add the images into the public folder and to reference them inside the HTML, we can use a relative path to that file
because angular will automatically know that this image will be coming from public, so a simple `/` would be enough.
In this case `images/rocketseat.png`, since we have a nested images file /inside public

#### Other way to reference an image

We can also reference images with css, with properties like
`background-image: url("/images/rocketseat.png");`

### Build Example

By running `ng build`, it builds our project and generates a dist folder, and it will have all our files converted to plain
JS and HTML, including the images folder defined in public.

The browser name is the one we used in angular.json, build option's attribute.

### Image Size

When creating our app, we must be careful not to upload large image files. Because angular does not treat these images
and make the app more performative and concise. 

There are websites that make this image compressing for us without losing too much quality. 

### Base64 Conversion

One image can be converted to base64 and be directly referenced inside our HTML.

Let's use the website `base64.guru/converter/encode/image` web page as an example. When uploading our files, it will generate
the base64 string for us, and we can paste that whole string into the src attribute of the img, and it will work as expected.

However, doing this is not a good option. This base64 string will be in our final bundle, but not separate. The browser won´t
make a request in parallel to get the image. It will bring it from the JS file. Which will cause our application to delay
its loading in the user browser, since it will have to load it every time.

When we reference these images separately, like we are doing with the public/images/ file, the browser when mounting the
webpage will make the request to bring the final js files and in parallel, also make the request to bring the image without
impacting the download of the other files. 

And if we have a hard coded base 64, angular will need to download the image along the JS files, it won't be able to do the
caching. Separate files like the favicon, or a static image, it will be able to store in the cache.

## Lesson 3 - SVGs

SVGs can be loaded in two different ways

1. Directly in the HTML — will be part of the final bundle. Increasing the size of the final.js
2. Put it in a separate file — faster option

However, many times, the svg icons that we load on our app are usually very small and won't have a great impact on
performance.

### 1st way:

One option is to download t he fa library and use the snippet provided by it, or the svg way, which we should only copy
and paste into our project.

However, in this way there are some benefits, like setting the svg color with the fill property and property bind the
the element itself

2nd way:

Removing the svg from the parent component and put it into a separate file, such as, inside the public folder, create a
icons folder, create a file for the car.svg and put the code inside of it. Then, inside the component where we want to use
the svg, reference it on the src attribute of an img.

And different from the 1st way, if we go into the network tab on the developer tools, we will see that a request has been
done to the requested svg

We can also define a property on our ts file, and property bind it with the src attribute

However, if we don't choose to download the font icon library, and import the CarIcon from it, we won't be able to use the
fill property, and in case we want to make it more dynamic, we wouldn't be able to do it by copying the svg and creating
our own file.








