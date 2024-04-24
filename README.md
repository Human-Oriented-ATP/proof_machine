# proof_machine

## Python version

### Windows setup instructions
1. Install PyGObject with Gtk3. To do this, you can follow the instructions as explained on https://gnome.pages.gitlab.gnome.org/pygobject/getting_started.html#windows-getting-started but make sure to replace `gtk4` with `gtk3`. That is, step 5 should be to execute
`pacman -S mingw-w64-ucrt-x86_64-gtk3 mingw-w64-ucrt-x86_64-python3 mingw-w64-ucrt-x86_64-python3-gobject` and step 6 becomes `gtk3-demo`.
2. Run `python3` in the UCRT console to check that the python installation has worked. 
3. Install the Python package ply by executing `pacman -S mingw-w64-ucrt-x86_64-python3-ply`. You can check that this has worked by running `python3` in the UCRT console and then running `import ply` in the Python console.  
3. Clone this repository to the `home/your_username` folder of the msys2 instructions. If you kept the defaults during installation this is likely to be `C:\msys64\home\your_username`.
4. Navigate to that folder in the UCRT console and run `python3 tim.py problem1.pl`


### Mac setup instructions
1. Install gtk3 with
```
brew install gtk+3
```
2. Install PyGObject with
```
brew install pygobject3 gtk+3
```
If it worked, running `python3 -c "import gi"` should produce no errors.
3. Install ply with
```
brew install python-ply
```
If it worked, running `python3 -c "import ply"` should produce no errors.
4. To launch program, run this python file in the main folder of this repo.
```python3 tim.py problem1.pl```


## Setup instructions for the web version

1. You need to have the package manager `npm` and `Node.js` installed.
2. Open a console in the directory `web-proof-machine`.
3. Run `npm ci` which should install the required packages. 
4. Run `npm run dev` to run the development version of the game.

## Writing problem files
The colors compatible with the web version are: 

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
