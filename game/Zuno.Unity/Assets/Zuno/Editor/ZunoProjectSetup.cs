using System;
using System.IO;
using System.Reflection;
using UnityEditor;
using UnityEditor.Build;
using UnityEngine;
using UnityEngine.Rendering;
using UnityEngine.Rendering.Universal;

namespace Zuno.Editor
{
    [InitializeOnLoad]
    public static class ZunoProjectSetup
    {
        public const string ApplicationId = "app.zunobattle.game";
        public const string ScenePath = "Assets/Scenes/GrasslandsVerticalSlice.unity";

        private const string SettingsFolder = "Assets/Zuno/Settings";
        private const string RendererPath = SettingsFolder + "/ZunoMobileRenderer.asset";
        private const string PipelinePath = SettingsFolder + "/ZunoMobilePipeline.asset";

        static ZunoProjectSetup()
        {
            EditorApplication.delayCall += Apply;
        }

        [MenuItem("ZUNO/Project/Apply Android + URP Settings")]
        public static void Apply()
        {
            if (EditorApplication.isCompiling || EditorApplication.isUpdating)
            {
                EditorApplication.delayCall += Apply;
                return;
            }

            PlayerSettings.companyName = "Paul-Hartmann LLC";
            PlayerSettings.productName = "ZUNO Battle";
            PlayerSettings.bundleVersion = "0.2.0";
            PlayerSettings.SetApplicationIdentifier(NamedBuildTarget.Android, ApplicationId);
            PlayerSettings.defaultInterfaceOrientation = UIOrientation.LandscapeLeft;
            PlayerSettings.colorSpace = ColorSpace.Linear;
            PlayerSettings.MTRendering = true;
            PlayerSettings.Android.bundleVersionCode = 2;
            PlayerSettings.Android.minSdkVersion = AndroidSdkVersions.AndroidApiLevel24;
            PlayerSettings.Android.targetSdkVersion = AndroidSdkVersions.AndroidApiLevelAuto;
            PlayerSettings.Android.targetArchitectures = AndroidArchitecture.ARM64;
            PlayerSettings.SetScriptingBackend(NamedBuildTarget.Android, ScriptingImplementation.IL2CPP);
            PlayerSettings.SetManagedStrippingLevel(NamedBuildTarget.Android, ManagedStrippingLevel.Medium);
            EnableInputSystem();

            QualitySettings.vSyncCount = 0;
            QualitySettings.antiAliasing = 2;
            QualitySettings.shadowDistance = 28f;
            QualitySettings.shadows = ShadowQuality.All;
            QualitySettings.shadowResolution = ShadowResolution.Medium;

            UniversalRenderPipelineAsset pipeline = EnsureMobilePipeline();
            if (pipeline != null)
            {
                GraphicsSettings.defaultRenderPipeline = pipeline;
                QualitySettings.renderPipeline = pipeline;
            }

            EditorBuildSettings.scenes = new[]
            {
                new EditorBuildSettingsScene(ScenePath, true)
            };

            AssetDatabase.SaveAssets();
        }

        private static void EnableInputSystem()
        {
            UnityEngine.Object[] projectSettings = AssetDatabase.LoadAllAssetsAtPath("ProjectSettings/ProjectSettings.asset");
            if (projectSettings.Length == 0)
            {
                return;
            }

            SerializedObject serialized = new(projectSettings[0]);
            SerializedProperty activeInputHandler = serialized.FindProperty("activeInputHandler");
            if (activeInputHandler == null || activeInputHandler.intValue == 1)
            {
                return;
            }

            activeInputHandler.intValue = 1;
            serialized.ApplyModifiedPropertiesWithoutUndo();
        }

        private static UniversalRenderPipelineAsset EnsureMobilePipeline()
        {
            UniversalRenderPipelineAsset existing = AssetDatabase.LoadAssetAtPath<UniversalRenderPipelineAsset>(PipelinePath);
            if (existing != null)
            {
                ConfigurePipeline(existing);
                return existing;
            }

            Directory.CreateDirectory(SettingsFolder);
            UniversalRendererData rendererData = AssetDatabase.LoadAssetAtPath<UniversalRendererData>(RendererPath);
            if (rendererData == null)
            {
                rendererData = ScriptableObject.CreateInstance<UniversalRendererData>();
                rendererData.name = "ZunoMobileRenderer";
                AssetDatabase.CreateAsset(rendererData, RendererPath);
            }

            UniversalRenderPipelineAsset pipeline = CreatePipelineAsset(rendererData);
            if (pipeline == null)
            {
                Debug.LogError("[ZUNO] Unable to create the URP asset. Create a URP Asset with Universal Renderer in Assets/Zuno/Settings and run the setup again.");
                return null;
            }

            pipeline.name = "ZunoMobilePipeline";
            AssetDatabase.CreateAsset(pipeline, PipelinePath);
            ConfigurePipeline(pipeline);
            AssetDatabase.ImportAsset(PipelinePath, ImportAssetOptions.ForceUpdate);
            return pipeline;
        }

        private static UniversalRenderPipelineAsset CreatePipelineAsset(UniversalRendererData rendererData)
        {
            MethodInfo createMethod = typeof(UniversalRenderPipelineAsset).GetMethod(
                "Create",
                BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Static,
                binder: null,
                types: new[] { typeof(ScriptableRendererData) },
                modifiers: null);

            if (createMethod?.Invoke(null, new object[] { rendererData }) is UniversalRenderPipelineAsset created)
            {
                return created;
            }

            UniversalRenderPipelineAsset fallback = ScriptableObject.CreateInstance<UniversalRenderPipelineAsset>();
            SerializedObject serialized = new(fallback);
            SerializedProperty rendererList = serialized.FindProperty("m_RendererDataList");
            SerializedProperty defaultRenderer = serialized.FindProperty("m_DefaultRendererIndex");
            if (rendererList == null || defaultRenderer == null)
            {
                UnityEngine.Object.DestroyImmediate(fallback);
                return null;
            }

            rendererList.arraySize = 1;
            rendererList.GetArrayElementAtIndex(0).objectReferenceValue = rendererData;
            defaultRenderer.intValue = 0;
            serialized.ApplyModifiedPropertiesWithoutUndo();
            return fallback;
        }

        private static void ConfigurePipeline(UniversalRenderPipelineAsset pipeline)
        {
            pipeline.renderScale = 0.9f;
            pipeline.supportsCameraDepthTexture = false;
            pipeline.supportsCameraOpaqueTexture = false;
            pipeline.shadowDistance = 28f;
            pipeline.shadowCascadeCount = 2;
            pipeline.msaaSampleCount = 2;
            EditorUtility.SetDirty(pipeline);
        }
    }
}
