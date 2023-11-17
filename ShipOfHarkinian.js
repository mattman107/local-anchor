//Essential Lines
Game.SymlinkGame = true;                                //If we should symbolic link the game's files to a temporary directory (Nucleus instances folders in its content folder). If not will launch straight from the installation directory.
Game.SymlinkExe = false;                                //If SymlinkGame is enabled, if we should copy or symlink the game executable. 
Game.SymlinkFolders = false;                //Folders by default are hardcopied, with this enabled, folders will be symlinked instead | warning files placed in symlink folders will appear in the original game files too.
Game.KeepSymLinkOnExit = true;                 //Enable or disable symlink files from being deleted when Nucleus is closed | default: false.

Game.DirSymlinkExclusions = ["Save", "mods","Randomizer", "logs"];     //Array with the name of the folders you don't want Nucleus Co-op to symlink, only the folders placed here get hardcopied not the files.
Game.FileSymlinkExclusions = ["imgui.ini", "global.sav", "file1.sav", "file2.sav", "file3.sav", "Ship of Harkinian.log"]; //Array with the name of the files you don't want Nucleus Co-op to symlink, useful if you want to replace files or add external files.  
Game.FileSymlinkCopyInstead = ["shipofharkinian.json"]; //Array with the name of the files you want Nucleus Co-op to make full copies of, in some cases games need certain files to be full copies or they won't run. 

//Game.DirSymlinkCopyInstead = ["Randomizer"];	//Copy (not symlink) all files within a given folder | Folder name is relative from root game folder.
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;	//When specifying folder(s) to copy all its contents instead of linking, should subfolders and files be included as well?

Game.ExecutableName = "soh.exe";
Game.GUID = "Ship of Harkinian";
Game.GameName = "Ship of Harkinian";
Game.Description =
  'Visit https://github.com/mattman107/local-anchor to view all instructions on how to setup this handler.'
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 16;

Game.BinariesFolder = "";

Game.SupportsKeyboard = true;

Game.UseNucleusEnvironment = false;

Game.HandlerInterval = 10;
Game.PauseBetweenProcessGrab = 11;
Game.PauseBetweenStarts = 10;

Game.ProcessChangesAtEnd = true;			//Do the resizing, repositioning and post-launch hooking of all game instances at the very end | will not work with every option ran normally.
Game.PromptProcessChangesAtEnd = false;			//If ProcessChangesAtEnd = true, pause and show a prompt, before making changes to processes.

// OLD HOOKS - USE IN FALSE 
Game.HookSetCursorPos = false;
Game.HookGetCursorPos = false;
Game.HookGetKeyState = false;
Game.HookGetAsyncKeyState = false;
Game.HookGetKeyboardState = false;
Game.HookFilterRawInput = false;
Game.HookFilterMouseMessages = false;
Game.HookUseLegacyInput = false;
Game.HookDontUpdateLegacyInMouseMsg = false;
Game.HookMouseVisibility = false;
Game.SendNormalMouseInput = false;
Game.SendNormalKeyboardInput = false;
Game.SendScrollWheel = false;
Game.ForwardRawKeyboardInput = false;
Game.ForwardRawMouseInput = false;
Game.DrawFakeMouseCursor = false;
//////////////////////////////////

// //// for work gamepads
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = true;

var menu = ["No", "Yes"];
Game.AddOption(
  "Open Controller menu on start?",
  "Opens the SOH controller menu on startup. Recommended for first time to properly assign controllers/keyboard to a certain instance",
  "MENU",
  menu
);

Game.Play = function() {
   /////////////  edit shipofharkinian.json
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\shipofharkinian.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '        "Height": ', Nucleus.SearchType.StartsWith) + '|        "Height": ' + Context.Height + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "PositionX": ', Nucleus.SearchType.StartsWith) + '|        "PositionX": ' + Context.PosX + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "PositionY": ', Nucleus.SearchType.StartsWith) + '|        "PositionY": ' + Context.PosY + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "Width": ', Nucleus.SearchType.StartsWith) + '|        "Width": ' + Context.Width,
    
  ];

  var menu = Context.Options["MENU"];

  if (menu == "Yes") {
    dict.push(Context.FindLineNumberInTextFile(txtPath, '    "CVars": {', Nucleus.SearchType.StartsWith) + '|    "CVars": {\n        "gControllerConfigurationEnabled": 1,');
  }

  Context.ReplaceLinesInTextFile(txtPath, dict);

  // dict = [
  //   Context.FindLineNumberInTextFile(txtPath, '            "Slot_0": "Auto",', Nucleus.SearchType.StartsWith) + '|            "Slot_0": "030003f05e0400008e02000000007200"' + ","
  // ]
  // Context.ReplaceLinesInTextFile(txtPath, dict);
 
  //// for xinput work
  // var numPlayers = 0;

  // for (var i = 0; i < PlayerList.Count; i++) {
  //   var player = PlayerList[i];

  //   if (player.IsXInput && player.ScreenIndex !== -1) {
  //     numPlayers++;
  //   }
  //   player.ProtoController1 = Context.GamepadId;
  //   player.ProtoController2 = Context.GamepadId;
  //   player.ProtoController3 = Context.GamepadId;
  //   player.ProtoController4 = Context.GamepadId;
  //   player.ProtoController5 = Context.GamepadId;
  //   player.ProtoController6 = Context.GamepadId;
  //   player.ProtoController7 = Context.GamepadId;
  //   player.ProtoController8 = Context.GamepadId;
  // }
};