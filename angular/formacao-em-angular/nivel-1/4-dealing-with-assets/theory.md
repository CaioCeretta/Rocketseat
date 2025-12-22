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

## Lesson 4 - Importing font-awesome icons via CDN.

First, subscribe to the font-awesome to get a free kit and it will give us a line of javascript to import the CDN

Create a new component to hold the font-awesome icons.

Load the component inside the index.html of our app and import the app-font-awesome-cdn component inside our app.html

To use a car icon, for example, we can simply use it with `<i class="fa-solid fa-car"></i>`

and use the color, size, rotate, animate, transform with ease

## Lesson 5 - npm font-awesome

Create a new component for this test, which is the font-awesome-npm. We will start by going to do the docs, getting started
and on the angular page and click on the API docs. It will redirect us to the npm page and we see that there are three
different commands: with ng, npm and yarn

We will use the ng option, which is the quickest way to configure font-awesome with the command
`ng add @fortawesome/angular-fontawesome` 

Now, we simply import the icons in the ts file, import the FontAwesomeModule and add it into the imports array, and assign
the imported icon to a property

e.g: 

```
import { faCar } from "@fortawesome/free-solid-svg-icons";

...
faCarIcon = faCar;
...
```
and use them on the html template with

`<fa-icon [icon]="faCar"></fa-icon>`

The FontAwesomeModule will make the fa-icon tag available to us


## Lesson 6 - Downloading and Using Third Party Fonts

Here, we will make use of the "Google Fonts" and downloading the desired font, which will be "Cascadia Code".

We have two ways of retrieving a font: Getting embedded code and pasting on the index, or downloading it.

Download and extract it. The VariableFont, which is the option with all the weight variations included, or install it
statically with only the desired weights.

### How to import them?

Fonts are also an asset, meaning that we can paste both the "regular" file with all the weights included and same for the
italic fonts inside public folder. Now, they will be copied to the final bundle.

### How we use them?

Normally, we use them inside the `styles.css` so they will be loaded before the components and will be available in the
whole app.

So we define some styling in the `styles.css`.

### What is @font-face?

`@font-face` is a CSS rule that allows us to load customs fonts on a website

In the past, developers were limited to "web-safe-fonts" (like Arial, Times New Roman or Georgia) that were already installed
n the user's computer. With @font-face, we can host our own font files, ensuring our design looks consistent for every
visitor.

The process involves two steps: 1 - defining the font and applying it to our elements

1. In the font-definition, inside the @font-face selector block, define a name for it
and in the src property, the url where it is located in
2. Apply this name into any desired element

If we are importing the static ones, such as only the regular and the bold, we would import only the weights: 400 and 700

## Lesson 6 - Importing Fonts from Google Fonts

We also can utilize the fonts directly from the google-fonts.

For this example, we will get the `Roboto` font and copy the embedded file into our index.html

We have two options of "downloading" the embedded font. <link> or @import.

`<link>` is the way we reference on the head of our html.
@import is where we copy the @import code and place it on the styles.css of our app

<link> is more performative, because when we insert it in the head, when the browser starts creating our HTML, it will
start by the index, identify the tags and start downloading them in parallel with the styles and js code. Meaning that
it won't block the rendering of our screen.

@import is inside the css file. The browser will start rendering our file, will encounter in the head the stylesheet,
download it, and after it downloads it, he will find the font and block the rendering while it downloads that font.

We usually use imports in systems we don't have access to the index.html













