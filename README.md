# local-anchor

This is a Nucleus Co-op handler for the Ship of Harkinian OOT PC port.

# How to Setup

1) This handler assumes that you already have a pre-setup SOH environment. It can be done with almost any currently existing (Nov. 12, 2023) SOH install, but I recommend the [modded anchor builds](https://github.com/garrettjoecox/OOT/pulls) if you would actually like to play local co-op. If you need help setting up please refer to the [official quick start guide](https://github.com/HarbourMasters/Shipwright#quick-start) or join the [HarborMaster64 Discord](https://discord.com/invite/shipofharkinian) and interact with the community. We won't bite (that much!). If you plan on playing the randomizer you should generate your seed at this point before moving on. **Also it is important that this install of SOH doesn't contain multiple randomizer spoiler logs. The handler is expecting only one spoiler log to be there so we can sync what randomizer all instances should be using.**
2) Next you have to install Nucleus Co-op. I recommend following their [official documentation](https://www.splitscreen.me/docs/installation/) or joining the [Nucleus Co-op Discord](https://discord.com/invite/QDUt8HpCvr) to get support with the install.
3) Here comes the cool parts! Depending on where you installed Nucleus Co-op this could be a bit different for everyone, but go to the Nucleus Co-op folder (If you followed the official install instructions it should be at this path: C:/NucleusCo-op) and open the handlers folder. In here you will place the ShipOfHarkinian.js file found in this Github Repo.
4) Next open the Nucleus Co-op and select 'Search Game'. This will open up a Windows file explorer tab where you should go to the path of your SOH install and select soh.exe.
5) This should add the Ship of Harkinian game to the Nucleus Co-op games list. From here select the game, choose how you would like the screen split, and place all your gamepads in a different instances (different boxes. The position doesn't matter because it can be edited in SOH)
6) Press the play button and wait for all instances of the game to load to the menu. (This is really cool to watch!)
7) Once all of the game instances have loaded you will have to manually assign the gamepads to a specific instance in game. Go to Settings > Controller > Controller Mapping and individually assign a gamepad to each instance (Unfortunatly this will have to be set everytime Nucleus Co-op handler is started. See [current limitations #3](https://github.com/mattman107/local-anchor/edit/main/README.md#current-limitations)).
8) Finally you can choose to start playing or tinker a bit. Each instance of the game has mostly its own set of files so settings will be different between them all, they have different save files, and different mods can be applied. You can find these instance folders in the Nucleus Co-op folder in content/Ship of Harkinian (If you followed the official install location it is here: C:/NucleusCo-op/contend/Ship of Harkinian). Thank you so much and have fun playing!

# Current Limitations 
1) Nucleus Co-op only works on Windows so this solution won't work for all computers.
2) ~~Only XInput compatible gamepads will work (no keyboards). The mouse can be used to access the imgui menus on all running instances of the game.~~ One keyboard and every other input XInput gamepads now supported.
3) Currently you will have to manually assign which gamepad works for each individual instance of SOH in the imgui menu.


# Special Thanks
I really have to thank V from the [Nucleus Co-op Discord](https://discord.com/invite/QDUt8HpCvr) community. He was really helpful and knowledgeable about writting these handler files. Without him I would have been seriously lost. Go over and thank him if you are interested in learning more! Tell him I sent you!
