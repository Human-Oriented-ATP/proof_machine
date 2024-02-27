# proof_machine


## Windows setup instructions
1. Install PyGObject with Gtk3. To do this, you can follow the instructions as explained on https://gnome.pages.gitlab.gnome.org/pygobject/getting_started.html#windows-getting-started but make sure to replace `gtk4` with `gtk3`. That is, step 5 should be to execute
`pacman -S mingw-w64-ucrt-x86_64-gtk3 mingw-w64-ucrt-x86_64-python3 mingw-w64-ucrt-x86_64-python3-gobject` and step 6 becomes `gtk3-demo`.
2. Run `python3` in the UCRT console to check that the python installation has worked. 
3. Install the Python package ply by executing `pacman -S mingw-w64-ucrt-x86_64-python3-ply`. You can check that this has worked by running `python3` in the UCRT console and then running `import ply` in the Python console.  
3. Clone this repository to the `home/your_username` folder of the msys2 instructions. If you kept the defaults during installation this is likely to be `C:\msys64\home\your_username`.
4. Navigate to that folder in the UCRT console and run `python3 tim.py problem1.pl`