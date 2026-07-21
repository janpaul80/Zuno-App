import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = join(repositoryRoot, "game", "Zuno.Unity");
const assetsRoot = join(projectRoot, "Assets");

function fail(message) {
  throw new Error(`[ZUNO Unity validation] ${message}`);
}

function requireFile(path) {
  if (!existsSync(path)) fail(`Missing required file: ${relative(repositoryRoot, path)}`);
  return readFileSync(path, "utf8");
}

function requireIncludes(path, expected) {
  const value = requireFile(path);
  if (!value.includes(expected)) {
    fail(`${relative(repositoryRoot, path)} does not contain required value: ${expected}`);
  }
}

function walk(path) {
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });
}

const manifestPath = join(projectRoot, "Packages", "manifest.json");
const manifest = JSON.parse(requireFile(manifestPath));
const expectedPackages = {
  "com.unity.inputsystem": "1.19.0",
  "com.unity.render-pipelines.universal": "17.3.0",
  "com.unity.test-framework": "1.6.0",
  "com.unity.ugui": "2.0.0",
  "com.unity.modules.video": "1.0.0",
};

for (const [name, version] of Object.entries(expectedPackages)) {
  if (manifest.dependencies?.[name] !== version) {
    fail(`Expected ${name}@${version}, received ${manifest.dependencies?.[name] ?? "missing"}`);
  }
}

requireIncludes(join(projectRoot, "ProjectSettings", "ProjectVersion.txt"), "6000.3.20f1");
requireIncludes(join(projectRoot, "ProjectSettings", "EditorBuildSettings.asset"), "Assets/Scenes/GrasslandsVerticalSlice.unity");
requireIncludes(join(assetsRoot, "Scenes", "GrasslandsVerticalSlice.unity.meta"), "a8501a61bb7547d496862388c4d1260a");
requireIncludes(join(assetsRoot, "Zuno", "Editor", "ZunoProjectSetup.cs"), "app.zunobattle.game");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Core", "ZunoRuntimeBootstrap.cs"), "CreateGrasslandsSlice");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Gameplay", "GuardianMotor.cs"), "QueueJump");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Gameplay", "GuardianCombat.cs"), "TryAttack");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Domain", "MissionProgress.cs"), "TryCompleteAtExit");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Domain", "MissionCatalogue.cs"), "Titan Arena");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Domain", "GuardianLoadout.cs"), "BluePulseBlaster");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Presentation", "MissionCinematicPlayer.cs"), "VideoPlayer");
requireIncludes(join(assetsRoot, "Zuno", "Runtime", "Presentation", "MissionLaunchFlow.cs"), "ShowRoadmap");

const assetFiles = walk(assetsRoot);
for (const file of assetFiles) {
  if (file.endsWith(".meta")) continue;
  if (!existsSync(`${file}.meta`)) {
    fail(`Unity asset has no tracked .meta file: ${relative(projectRoot, file)}`);
  }
}

const sourceFiles = assetFiles.filter((file) => extname(file) === ".cs");
const forbiddenSourcePatterns = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "MESHY_AI_API",
  "LOGICC_API_KEY",
  "LANGDOCK_API_KEY",
  "BLACKBOX_API_KEY",
  "VOICEBOX_BASE_URL",
  "UnityWebRequest",
];

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  for (const forbidden of forbiddenSourcePatterns) {
    if (source.includes(forbidden)) {
      fail(`Forbidden client dependency or credential marker '${forbidden}' found in ${relative(projectRoot, file)}`);
    }
  }
}

const requiredTests = [
  "VitalityTests.cs",
  "MissionProgressTests.cs",
  "MissionCatalogueTests.cs",
  "GuardianLoadoutTests.cs",
];
for (const test of requiredTests) {
  if (!sourceFiles.some((file) => file.endsWith(test))) fail(`Missing EditMode test: ${test}`);
}

console.log(JSON.stringify({
  ok: true,
  unity: "6000.3.20f1",
  applicationId: "app.zunobattle.game",
  assetFiles: assetFiles.filter((file) => !file.endsWith(".meta")).length,
  csharpFiles: sourceFiles.length,
  editModeTestFiles: requiredTests.length,
}, null, 2));
