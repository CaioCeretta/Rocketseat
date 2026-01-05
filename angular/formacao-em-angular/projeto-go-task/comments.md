## Global angular

In case we don't have angular installed globally in our machine, we must create a new script property named something
as "ng", which will call the ng method from the angular cli, and for the commands such as ng generate, we should use
e.g. "npm run ng generate component test-component"

## Google Fonts

A common question is whether we should import the font on our css or on our index.html <link>. And when we need to choose
one of these.

### 1. Using <link> in the HTML (Recommended)

This way is recommended by google fonts itself. We copy the tags and paste them our <head> tag

• Advantages: It's quicker. The browser starts downloading the font as soon as it reads the HTML, even before processing
the CSS

• Performance: It allows the use of `preconnect`, which tells the browser to establish a connection with google's server
ahead of time.

### 2. Using @import inside CSS



