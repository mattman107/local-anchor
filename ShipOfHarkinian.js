//Essential Lines
Game.SymlinkGame = true;                                //If we should symbolic link the game's files to a temporary directory (Nucleus instances folders in its content folder). If not will launch straight from the installation directory.
Game.SymlinkExe = false;                                //If SymlinkGame is enabled, if we should copy or symlink the game executable. 
Game.SymlinkFolders = false;                //Folders by default are hardcopied, with this enabled, folders will be symlinked instead | warning files placed in symlink folders will appear in the original game files too.
Game.KeepSymLinkOnExit = true;                 //Enable or disable symlink files from being deleted when Nucleus is closed | default: false.

Game.DirSymlinkExclusions = ["Save", "mods","Randomizer"];     //Array with the name of the folders you don't want Nucleus Co-op to symlink, only the folders placed here get hardcopied not the files.
Game.FileSymlinkExclusions = ["imgui.ini", "global.sav", "file1.sav", "file2.sav", "file3.sav"]; //Array with the name of the files you don't want Nucleus Co-op to symlink, useful if you want to replace files or add external files.  
Game.FileSymlinkCopyInstead = ["oot.otr", "soh.otr", "gamecontrollerdb.txt", "shipofharkinian.json"]; //Array with the name of the files you want Nucleus Co-op to make full copies of, in some cases games need certain files to be full copies or they won't run. 

Game.DirSymlinkCopyInstead = ["Randomizer"];	//Copy (not symlink) all files within a given folder | Folder name is relative from root game folder.
Game.DirSymlinkCopyInsteadIncludeSubFolders = true;	//When specifying folder(s) to copy all its contents instead of linking, should subfolders and files be included as well?


Game.ExecutableName = "soh.exe";
Game.GUID = "Ship of Harkinian";
Game.GameName = "Ship of Harkinian";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 8;

//Not sure about this one yet
Game.BinariesFolder = "";

Game.SupportsMultipleKeyboardsAndMice = true;
Game.KeyboardPlayerFirst = true;			//If the keyboard player should be processed first.

Game.HookFocus = false;
Game.Hook.ForceFocus = true;
Game.HasDynamicWindowTitle = false;
Game.Hook.ForceFocusWindowName = "Ship of Harkinian (DirectX 11)";
Game.ResetWindows = false;
Game.RefreshWindowAfterStart = true;


//Nucleus Environment
//Probably need more of these but I don't know what the others do
Game.UseNucleusEnvironment = false;

//Handlers
Game.HandlerInterval = 100;
Game.PauseBetweenProcessGrab = 5;
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

//// for work gamepads
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.DinputDeviceHook = false;
Game.ProtoInput.DinputHookAlsoHooksGetDeviceState = false;
Game.ProtoInput.MultipleProtoControllers = true;

Game.Play = function() {
	
//Proto Input



Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

Game.ProtoInput.RegisterRawInputHook = true;
Game.ProtoInput.GetRawInputDataHook = true;
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.GetCursorPosHook = true;
Game.ProtoInput.SetCursorPosHook = true;

Game.ProtoInput.RawInputFilter = true;
Game.ProtoInput.MouseMoveFilter = false;
Game.ProtoInput.MouseActivateFilter = true;
Game.ProtoInput.WindowActivateFilter = true;
Game.ProtoInput.WindowActvateAppFilter = true;
Game.ProtoInput.MouseWheelFilter = true;
Game.ProtoInput.MouseButtonFilter = true;
Game.ProtoInput.KeyboardButtonFilter = true;

Game.ProtoInput.DrawFakeCursor = true;
Game.ProtoInput.CursorVisibilityHook = true;
Game.ProtoInput.ClipCursorHook = false;
Game.ProtoInput.FocusHooks = true; 
Game.ProtoInput.DontShowCursorWhenImageUpdated = true;

Game.ProtoInput.GetKeyStateHook = true;
Game.ProtoInput.GetAsyncKeyStateHook = true;
Game.ProtoInput.GetKeyboardStateHook = true;

Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

Game.ProtoInput.EnableFocusMessageLoop = false;
// Game.ProtoInput.FocusLoopIntervalMilliseconds = 99;
// Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
// Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
// Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
// Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
// Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;
 
   /////////////  edit shipofharkinian.json
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\shipofharkinian.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '        "Height": ', Nucleus.SearchType.StartsWith) + '|        "Height": ' + Context.Height + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "PositionX": ', Nucleus.SearchType.StartsWith) + '|        "PositionX": ' + Context.PosX + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "PositionY": ', Nucleus.SearchType.StartsWith) + '|        "PositionY": ' + Context.PosY + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "Width": ', Nucleus.SearchType.StartsWith) + '|        "Width": ' + Context.Width,
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
 
 
  //// for xinput work
  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
    player.ProtoController2 = Context.GamepadId;
    player.ProtoController3 = Context.GamepadId;
    player.ProtoController4 = Context.GamepadId;
    player.ProtoController5 = Context.GamepadId;
    player.ProtoController6 = Context.GamepadId;
    player.ProtoController7 = Context.GamepadId;
    player.ProtoController8 = Context.GamepadId;
  }
 
}