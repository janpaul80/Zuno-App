import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const projectRoot = join(repositoryRoot, "game", "Zuno.Unity");
const assetsRoot = join(projectRoot, "Assets");
const musicRegisterPath = join(repositoryRoot, "docs", "music-source-register.json");

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

const musicRegister = JSON.parse(requireFile(musicRegisterPath));
if (musicRegister.schemaVersion !== 1) fail("Unsupported music source register schema");
if (musicRegister.owner !== "Paul-Hartmann LLC") fail("Music source register owner is incorrect");
if (!Array.isArray(musicRegister.sources) || musicRegister.sources.length === 0) {
  fail("Music source register must contain at least one reviewed source");
}

const musicSourceIds = new Set();
const allowedMusicStatuses = new Set(["candidate", "conditional", "blocked", "paid-option"]);
for (const source of musicRegister.sources) {
  const requiredFields = ["id", "name", "publisher", "license", "costClass", "status", "commercialGameUse", "notes"];
  for (const field of requiredFields) {
    if (typeof source[field] !== "string" || source[field].trim().length === 0) {
      fail(`Music source '${source.id ?? "unknown"}' is missing ${field}`);
    }
  }
  if (musicSourceIds.has(source.id)) fail(`Duplicate music source id: ${source.id}`);
  musicSourceIds.add(source.id);
  if (!allowedMusicStatuses.has(source.status)) fail(`Unsupported music source status: ${source.status}`);
  const allowedAttributionRequirements = new Set(["yes", "no", "verify-at-purchase", "unverified"]);
  if (!allowedAttributionRequirements.has(source.attributionRequirement)) {
    fail(`Music source '${source.id}' must declare a supported attributionRequirement`);
  }
  if (source.sourceUrl === null) {
    if (source.status !== "blocked") fail(`Only blocked music sources may omit sourceUrl: ${source.id}`);
  } else {
    try {
      const sourceUrl = new URL(source.sourceUrl);
      if (sourceUrl.protocol !== "https:") fail(`Music source '${source.id}' must use an HTTPS sourceUrl`);
    } catch {
      fail(`Music source '${source.id}' has an invalid sourceUrl`);
    }
  }
}

if (!Array.isArray(musicRegister.acceptedTracks)) fail("Music source register acceptedTracks must be an array");
for (const track of musicRegister.acceptedTracks) {
  const requiredFields = [
    "id",
    "sourceId",
    "title",
    "composer",
    "sourceUrl",
    "downloadedOn",
    "license",
    "licenseProofPath",
    "attribution",
    "approvedUses",
    "approvalStatus",
    "sourceSha256",
    "deliverySha256",
  ];
  for (const field of requiredFields) {
    if (typeof track[field] !== "string" || track[field].trim().length === 0) {
      fail(`Accepted music track '${track.id ?? "unknown"}' is missing ${field}`);
    }
  }
  if (!musicSourceIds.has(track.sourceId)) fail(`Accepted music track references unknown source: ${track.sourceId}`);
  if (!/^[a-f0-9]{64}$/i.test(track.sourceSha256) || !/^[a-f0-9]{64}$/i.test(track.deliverySha256)) {
    fail(`Accepted music track '${track.id}' must contain complete SHA-256 checksums`);
  }
}

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
  reviewedMusicSources: musicRegister.sources.length,
  acceptedMusicTracks: musicRegister.acceptedTracks.length,
}, null, 2));
