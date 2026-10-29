#ifndef AppVersion
  #define AppVersion "0.0.2"
#endif
#ifndef BinaryDir
  #define BinaryDir "..\..\cli\target\release"
#endif
#ifndef OutputDir
  #define OutputDir "."
#endif

[Setup]
AppId=DevInit.CLI
AppName=DevInit CLI
AppVersion={#AppVersion}
AppPublisher=DevInit
AppPublisherURL=https://github.com/GorkiyChocolate/Diploma-Project
DefaultDirName={localappdata}\Programs\DevInit
DefaultGroupName=DevInit
PrivilegesRequired=lowest
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
DisableProgramGroupPage=yes
UninstallDisplayIcon={app}\devinit.exe
OutputDir={#OutputDir}
OutputBaseFilename=DevInit-Setup-{#AppVersion}
Compression=lzma
SolidCompression=yes
WizardStyle=modern
ChangesEnvironment=yes

[Files]
Source: "{#BinaryDir}\devinit.exe"; DestDir: "{app}"; Flags: ignoreversion

[Code]
procedure UpdateUserPath(AddDirectory: Boolean);
var
  Existing, Remaining, Item, Updated, AppDirectory: string;
  Sep: Integer;
begin
  if not RegQueryStringValue(HKCU, 'Environment', 'Path', Existing) then
    Existing := '';

  AppDirectory := RemoveBackslashUnlessRoot(ExpandConstant('{app}'));
  Remaining := Existing;
  Updated := '';

  while Remaining <> '' do
  begin
    Sep := Pos(';', Remaining);
    if Sep = 0 then
    begin
      Item := Remaining;
      Remaining := '';
    end
    else
    begin
      Item := Copy(Remaining, 1, Sep - 1);
      Delete(Remaining, 1, Sep);
    end;

    if (Trim(Item) <> '') and (CompareText(Trim(Item), AppDirectory) <> 0) then
    begin
      if Updated <> '' then Updated := Updated + ';';
      Updated := Updated + Item;
    end;
  end;

  if AddDirectory then
  begin
    if Updated <> '' then Updated := Updated + ';';
    Updated := Updated + AppDirectory;
  end;

  if Updated <> Existing then
    if not RegWriteExpandStringValue(HKCU, 'Environment', 'Path', Updated) then
      Log('WARNING: Unable to update user PATH');
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then UpdateUserPath(True);
end;

procedure CurUninstallStepChanged(CurUninstallStep: TUninstallStep);
begin
  if CurUninstallStep = usUninstall then UpdateUserPath(False);
end;
