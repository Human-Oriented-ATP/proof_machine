# The Gadget Game

## Setup instructions

1. You need to have the package manager `npm` and `Node.js` installed.
2. Open a console and navigate to this directory.
3. Run `npm ci` which should install the required packages. 
4. Run `npm run dev` to run the development version of the game. 
5. Click the link (which is probably something like `http://localhost:3000`) to access the game in a web browser. 

You can also run unit tests using `npm run test`.

## Writing problem files

You can create your own problem files and put them in the folder `problems` to make them available to the game. They then automatically appear on the page `internal` under Unlisted Problems. The following colors are available: 

| Abbreviation | Color |
| ------------ | ----- |
| r | red |
| y | yellow | 
| g | green | 
| b | blue |
| w | white |
| bl | black | 
| o | orange | 
| p | purple | 
| c | cyan | 

Appending `striped_` will give the cell black stripes and counts as different color. For example, a gadget could be given by `striped_r(A) :- b(A).` There are many examples of problem files in the `problems` folder, take some inspiration! 

## Configuring a study

The folder `study_setup` contains configuration files for setting up experiments on the Gadget Game. They can be used to specify which problems will be shown to the participants and in which order, how long they need to wait until they can skip a problem etc. It is possible to set up A/B tests by using two separate configuration files and making sure that group A receives the link pointing to the study with configuration A and vice-versa for group B.  