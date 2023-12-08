//Essential Lines
Game.SymlinkGame = true;                                //If we should symbolic link the game's files to a temporary directory (Nucleus instances folders in its content folder). If not will launch straight from the installation directory.
Game.SymlinkExe = false;                                //If SymlinkGame is enabled, if we should copy or symlink the game executable. 
Game.SymlinkFolders = false;                //Folders by default are hardcopied, with this enabled, folders will be symlinked instead | warning files placed in symlink folders will appear in the original game files too.
Game.KeepSymLinkOnExit = true;                 //Enable or disable symlink files from being deleted when Nucleus is closed | default: false.

Game.DirSymlinkExclusions = ["Save", "mods","Randomizer", "logs"];     //Array with the name of the folders you don't want Nucleus Co-op to symlink, only the folders placed here get hardcopied not the files.
Game.FileSymlinkExclusions = ["imgui.ini", "global.sav", "file1.sav", "file2.sav", "file3.sav", "Ship of Harkinian.log"]; //Array with the name of the files you don't want Nucleus Co-op to symlink, useful if you want to replace files or add external files.  
Game.FileSymlinkCopyInstead = ["shipofharkinian.json"]; //Array with the name of the files you want Nucleus Co-op to make full copies of, in some cases games need certain files to be full copies or they won't run. 

Game.DirSymlinkCopyInsteadIncludeSubFolders = true;	//When specifying folder(s) to copy all its contents instead of linking, should subfolders and files be included as well?


Game.ExecutableName = "soh.exe";
Game.GUID = "Ship of Harkinian";
Game.GameName = "Ship of Harkinian";
Game.MaxPlayersOneMonitor = 4;
Game.MaxPlayers = 8;

Game.BinariesFolder = "";

// Game.HookFocus = true;
Game.Hook.ForceFocus = true;
Game.HasDynamicWindowTitle = true;
Game.Hook.ForceFocusWindowName = "Ship of Harkinian (DirectX 11)";


Game.UseNucleusEnvironment = false;

//Handlers
Game.HandlerInterval = 100;
Game.PauseBetweenStarts = 10;

Game.ProcessChangesAtEnd = true;			//Do the resizing, repositioning and post-launch hooking of all game instances at the very end | will not work with every option ran normally.




// Deprecated options
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

Game.LockInputAtStart = false;
Game.LockInputSuspendsExplorer = true;
Game.ProtoInput.FreezeExternalInputWhenInputNotLocked = true;
Game.LockInputToggleKey = 0x23;

Game.ProtoInput.InjectStartup = false;
Game.ProtoInput.InjectRuntime_RemoteLoadMethod = false;
Game.ProtoInput.InjectRuntime_EasyHookMethod = true;
Game.ProtoInput.InjectRuntime_EasyHookStealthMethod = false;

// This hook should always be on, regardless of input lock
Game.ProtoInput.RegisterRawInputHook = true;

// This can always be enabled, since we are going to allow/disallow raw input with the bypass function
Game.ProtoInput.GetRawInputDataHook = true;

// We will be installing/uninstalling the filters manually so there's no need to
Game.ProtoInput.MessageFilterHook = true;
Game.ProtoInput.ClipCursorHook = true;
Game.ProtoInput.FocusHooks = true;

// These aren't problematic to leave on, since the external "freeze fake input input" when real input ISN'T locked will prevent these from interfering
Game.ProtoInput.SendMouseWheelMessages = true;
Game.ProtoInput.SendMouseButtonMessages = true;
Game.ProtoInput.SendMouseMovementMessages = true;
Game.ProtoInput.SendKeyboardButtonMessages = true;

// Handled on input lock/unlock, don't enable this by default
Game.ProtoInput.EnableFocusMessageLoop = false;
//Game.ProtoInput.FocusLoopIntervalMilliseconds = 5;
//Game.ProtoInput.FocusLoop_WM_ACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_ACTIVATEAPP = true;
//Game.ProtoInput.FocusLoop_WM_NCACTIVATE = true;
//Game.ProtoInput.FocusLoop_WM_SETFOCUS = true;
//Game.ProtoInput.FocusLoop_WM_MOUSEACTIVATE = true;

Game.ProtoInput.DrawFakeCursor = false; // This is set in the input locking

Game.ProtoInput.BlockedMessages = [ 0x0008 ]; // Blocks WM_KILLFOCUS

// We can leave these on and not worry about input lock. 
// It doesn't matter if controller input still works since it won't get in the way
Game.ProtoInput.XinputHook = true;
Game.ProtoInput.UseOpenXinput = true;
Game.ProtoInput.UseDinputRedirection = false;
Game.ProtoInput.MultipleProtoControllers = true;
Game.CreateSingleDeviceFile = true;

// The old Nucleus options. Don't use these with the Xinput hook
Game.Hook.DInputEnabled = false;
Game.Hook.DInputForceDisable = false;
Game.Hook.XInputEnabled = false;
Game.Hook.XInputReroute = false;
Game.Hook.CustomDllEnabled = false;


Game.ProtoInput.OnInputLocked = function()
{
	for (var i = 0; i < PlayerList.Count; i++)
	{
		var player = PlayerList[i];

		ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
		ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
		ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
		ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
		ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
		ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

		ProtoInput.InstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

		ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);

		// Avoid the mouse move filter unless absolutely necessary as it can massively affect performance if the game gets primary input from mouse move moessages
		//ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);

		ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
		ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
		ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
		ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
		ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
		ProtoInput.EnableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

		ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

		ProtoInput.StartFocusMessageLoop(player.ProtoInputInstanceHandle, 5, true, true, true, true, true);

		// Disable the bypass: let the input be processed by Proto Input
		ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, false);
	}
}

Game.ProtoInput.OnInputUnlocked = function()
{
	for (var i = 0; i < PlayerList.Count; i++)
	{
		var player = PlayerList[i];

		ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetCursorPosHookID);
		ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.SetCursorPosHookID);
		ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyStateHookID);
		ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetAsyncKeyStateHookID);
		ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.GetKeyboardStateHookID);
		ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.CursorVisibilityStateHookID);

		// Intentionally disable focus so all the instances don't respond to input at the same time
		ProtoInput.UninstallHook(player.ProtoInputInstanceHandle, ProtoInput.Values.FocusHooksHookID);

		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.RawInputFilterID);
		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseMoveFilterID);
		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseActivateFilterID);
		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateFilterID);
		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.WindowActivateAppFilterID);
		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseWheelFilterID);
		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.MouseButtonFilterID);
		ProtoInput.DisableMessageFilter(player.ProtoInputInstanceHandle, ProtoInput.Values.KeyboardButtonFilterID);

		ProtoInput.SetDrawFakeCursor(player.ProtoInputInstanceHandle, false);

		// Intentionally disable focus so all the instances don't respond to input at the same time
		ProtoInput.StopFocusMessageLoop(player.ProtoInputInstanceHandle);

		// Enable the bypass: allow any raw input to pass
		ProtoInput.SetRawInputBypass(player.ProtoInputInstanceHandle, true);
	}
}




Game.Play = function() {
	Game.SupportsMultipleKeyboardsAndMice = true;
	
	  //// for xinput work
  var numPlayers = 0;

  for (var i = 0; i < PlayerList.Count; i++) {
    var player = PlayerList[i];

    if (player.IsXInput && player.ScreenIndex !== -1) {
      numPlayers++;
    }
    player.ProtoController1 = Context.GamepadId;
  }

   /////////////  edit shipofharkinian.json
  var txtPath = Context.GetFolder(Nucleus.Folder.InstancedGameFolder) + "\\shipofharkinian.json";
  var dict = [
    Context.FindLineNumberInTextFile(txtPath, '        "Height": ', Nucleus.SearchType.StartsWith) + '|        "Height": ' + Context.Height + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "PositionX": ', Nucleus.SearchType.StartsWith) + '|        "PositionX": ' + Context.PosX + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "PositionY": ', Nucleus.SearchType.StartsWith) + '|        "PositionY": ' + Context.PosY + ",",
    Context.FindLineNumberInTextFile(txtPath, '        "Width": ', Nucleus.SearchType.StartsWith) + '|        "Width": ' + Context.Width,
  ];
  Context.ReplaceLinesInTextFile(txtPath, dict);
 
}
