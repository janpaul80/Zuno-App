using System.IO;
using System.Linq;
using UnityEditor;
using UnityEditor.Build;
using UnityEditor.Build.Reporting;
using UnityEngine;

namespace Zuno.Editor
{
    public static class ZunoAndroidBuild
    {
        private const string OutputPath = "Builds/Android/ZunoBattle-development.apk";

        [MenuItem("ZUNO/Build/Development APK")]
        public static void BuildDevelopmentApk()
        {
            ZunoProjectSetup.Apply();

            if (!BuildPipeline.IsBuildTargetSupported(BuildTargetGroup.Android, BuildTarget.Android))
            {
                throw new BuildFailedException(
                    "Android Build Support is not installed for this Unity Editor. Add Android Build Support, SDK, NDK, and OpenJDK through Unity Hub.");
            }

            string[] scenes = EditorBuildSettings.scenes
                .Where(scene => scene.enabled)
                .Select(scene => scene.path)
                .ToArray();

            if (scenes.Length == 0)
            {
                throw new BuildFailedException("No enabled ZUNO scene is present in Editor Build Settings.");
            }

            string outputDirectory = Path.GetDirectoryName(OutputPath);
            if (!string.IsNullOrWhiteSpace(outputDirectory))
            {
                Directory.CreateDirectory(outputDirectory);
            }

            EditorUserBuildSettings.buildAppBundle = false;
            BuildPlayerOptions options = new()
            {
                scenes = scenes,
                locationPathName = OutputPath,
                target = BuildTarget.Android,
                targetGroup = BuildTargetGroup.Android,
                options = BuildOptions.Development | BuildOptions.AllowDebugging
            };

            BuildReport report = BuildPipeline.BuildPlayer(options);
            if (report.summary.result != BuildResult.Succeeded)
            {
                throw new BuildFailedException(
                    $"ZUNO Android build failed: {report.summary.result} with {report.summary.totalErrors} errors.");
            }

            Debug.Log($"[ZUNO] Development APK built at {Path.GetFullPath(OutputPath)} ({report.summary.totalSize} bytes).");
        }
    }
}
