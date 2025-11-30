## State Management

  ### • Initial Misconception

 The initial idea of state managenement often begins with the simple need to share data or synchronize information across
 different components.

### • Distinguishing Simple Sharing from True State Management

  **True state management** is more than just sharing data. Simple data sharing can often be accomplished using React's
  `Context API` or the `lifting state up` pattern.

  State management, specially when using dedicated libraries or advanced patterns, involves creating a **structured data model**
  that not only holds information but is specially designed to be the single source of truth for the entire application's
  UI.

### • Dynamic/Derived State ('Upload Page' Example):

 A key aspect of advanced state management is handling **derived state** (or dynamic state). In the upload example

  • We have the **primitive/source states** (e.g. progress_of_item_A and progress_of_item_B)

  • We then calculate a **derived state** (e.g. total_upload_progress) based on these two source states.

### • The role of actions/entry ports

  True state management involves formalizing **how** the state can be changed. These are the **entry ports**, commonly
  referred to as **actions** (Or dispatches, mutations). These actions are the only prescribed way to modify the central
  state, ensuring predictable updates

### • Beyong Simple Component State:

This type of application-wide state is often more complex than the simple, local state managed by a component's `useState`
hook.

A robust state management system often **minimizes direct modification** of stored data. Instead, it calculates (derives)
new state based on **Actions** and the **previous state** (data received). This principle is central to patterns like Redux
or Flux. 

## Back-end

The back-end is basically going to be a server to store our files. It will simply have a route that receive the file and
upload it to the cloudflare r2.

R2 is a storage system specially for storing images similar to amazon s3.

What is the benefit of R2 in comparison to S3? 

R2 is way cheaper because when we use it with the purpose of storing images or other files we are publicly going to
display. R2 doesn't charge any download fee, meaning that we can show the images how many times we want with no added
cost. Only $0.10 month for gigabyte

S3 in other hand, has a much highter cost when our app scales because it charges for exit rate as well as the storage
itself.

R2 also uses the same API/routes that AWS S3 uses. Therefore, everything we do using S3 we can make using R2. We can
also use aws's sdk to manage R2.
