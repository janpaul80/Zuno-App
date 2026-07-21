# ZUNO Battle — Unity Android Client

Open this folder as a Unity project with Unity `6000.3.20f1` and Android Build
Support installed.

## Play the Grasslands slice

1. Open `Assets/Scenes/GrasslandsVerticalSlice.unity`.
2. Wait for package import and the ZUNO project setup pass to finish.
3. Press Play.

Editor controls:

- WASD / arrows: move
- Space: jump
- J: attack
- Left Shift: dash
- R: restart after mission completion or defeat

Touch controls are created at runtime for Android.

## Build a development APK

Use `ZUNO > Build > Development APK` in the Editor, or:

```bash
Unity -batchmode -projectPath game/Zuno.Unity \
  -executeMethod Zuno.Editor.ZunoAndroidBuild.BuildDevelopmentApk -quit
```

Output: `game/Zuno.Unity/Builds/Android/ZunoBattle-development.apk`.

Do not add provider keys or Supabase service-role credentials here. Production
economy and progression remain backend-authoritative.
