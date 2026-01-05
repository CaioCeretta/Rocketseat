# Overall Comments

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

Place the line at the very top of our stylesheet

• Pro: It keeps our HTML cleaner and centralizes everything related  to styling in the CSS. It is very useful in frameworks
where we have a "global styles" file
• Con: The browser must first download the CSS, parse it, and only then discover it needs to download the font. This can
cause the FOIT/FOUT effect (where text appears in a system font and "pops" into the google font a second later)
  . FOIT - Flash of Invisible Text: The browser completely hides the text while the font is being loaded. The text will
  only appear when the font is ready.
  . FOUT - Flash of Unstyled Text: The browser displays the text immediately using a system's default font, e, as soon
  as the custom font finishes downloading, it instantly replaces it.

### Which one should we choose?

• Performance: HTML uses parallel loading and CSS uses sequential loading
• Organization: Using links we have a "Cluttered" HTML, and imports we have a centralized CSS
• Best use cases: <link> for production sites & SEO and @import for quick prototypes or CSS-in-JS

## Aligning a flex item to the end

We may think that because exists an align-self in a flex container, that justify-self should also exist. But it doesn't.

`justify-self` does'nt work inside a Flex box. This property exists only on CSS Grids.

However, there is a classic trick. Which is the margin-left: auto;

To push a specific element to the end of the container flex, we must use automatic margins. This works because an auto
margin will occupy all the remaining space in that direction, pushing the element to the edge

### Other approaches are:

• 1. **Spacer div**: Set an empty div with `flex-grow: 1` between our items. This div will expand to fill all space, pushing
the last item to the end.

• 2. **Switch to CSS grid**: If we need a more granular control over every item's position, display grid might be a better
fit

