import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const workflowPath = join(repositoryRoot, ".github", "workflows", "unity-android.yml");

function fail(message) {
  throw new Error(`[ZUNO Unity CI validation] ${message}`);
}

if (!existsSync(workflowPath)) {
  fail(`Missing workflow: ${relative(repositoryRoot, workflowPath)}`);
}

const workflow = readFileSync(workflowPath, "utf8");

function requireText(value, message) {
  if (!workflow.includes(value)) fail(message);
}

const requiredText = [
  ["pull_request:", "Pull requests must run the credential-free validation gate"],
  ["workflow_dispatch:", "The Unity build must support trusted manual dispatch"],
  ['UNITY_VERSION: "6000.3.20f1"', "The workflow must pin Unity 6000.3.20f1"],
  ["persist-credentials: false", "Checkout credentials must not persist"],
  ["needs: validate", "Unity tests must depend on structural validation"],
  ["needs: unity-tests", "The APK build must depend on Unity tests"],
  ["testMode: EditMode", "The workflow must run Unity EditMode tests"],
  ["targetPlatform: Android", "The workflow must target Android"],
  ["Zuno.Editor.ZunoAndroidBuild.BuildDevelopmentApk", "The workflow must use ZUNO's controlled APK build method"],
  ["game/Zuno.Unity/Builds/Android/ZunoBattle-development.apk", "The workflow must verify the expected APK path"],
  ["UNITY_EMAIL: ${{ secrets.UNITY_EMAIL }}", "UNITY_EMAIL must come from GitHub Secrets"],
  ["UNITY_PASSWORD: ${{ secrets.UNITY_PASSWORD }}", "UNITY_PASSWORD must come from GitHub Secrets"],
  ["UNITY_LICENSE: ${{ secrets.UNITY_LICENSE }}", "UNITY_LICENSE must come from GitHub Secrets"],
  ["UNITY_SERIAL: ${{ secrets.UNITY_SERIAL }}", "UNITY_SERIAL must come from GitHub Secrets"],
];

for (const [value, message] of requiredText) requireText(value, message);

if (workflow.includes("pull_request_target:")) {
  fail("pull_request_target is forbidden because it can expose secrets to untrusted PR code");
}

if (/permissions:\s*[\s\S]{0,120}\b(?:contents|actions|checks):\s*write\b/.test(workflow)) {
  fail("The Unity workflow must not grant write permissions");
}

const licensedJobs = ["unity-tests", "android-apk"];
for (const jobName of licensedJobs) {
  const start = workflow.indexOf(`  ${jobName}:`);
  if (start === -1) fail(`Missing licensed job: ${jobName}`);
  const remainder = workflow.slice(start + 2);
  const nextJob = remainder.search(/\n  [a-z][a-z0-9-]+:\n/);
  const job = nextJob === -1 ? workflow.slice(start) : workflow.slice(start, start + 2 + nextJob);
  if (!job.includes("github.event_name == 'push' || github.event_name == 'workflow_dispatch'")) {
    fail(`${jobName} must never run for pull_request events`);
  }
}

const allowedActions = new Map([
  ["actions/checkout", "11bd71901bbe5b1630ceea73d27597364c9af683"],
  ["game-ci/unity-test-runner", "0ff419b913a3630032cbe0de48a0099b5a9f0ed9"],
  ["game-ci/unity-builder", "d829bfc901f2347c8fe18898f06712b66916ef42"],
  ["actions/upload-artifact", "ea165f8d65b6e75b540449e92b4886f43607fa02"],
]);

const actionReferences = [...workflow.matchAll(/^\s*uses:\s*([^@\s]+)@([^\s#]+)/gm)];
if (actionReferences.length === 0) fail("Workflow contains no GitHub Action references");

for (const [, action, revision] of actionReferences) {
  const expectedRevision = allowedActions.get(action);
  if (!expectedRevision) fail(`Unapproved third-party Action: ${action}`);
  if (!/^[a-f0-9]{40}$/.test(revision)) fail(`${action} must use an immutable 40-character commit SHA`);
  if (revision !== expectedRevision) fail(`${action} is not pinned to its reviewed revision`);
}

for (const action of allowedActions.keys()) {
  if (!actionReferences.some((reference) => reference[1] === action)) {
    fail(`Required Action is not used: ${action}`);
  }
}

const providerSecretMarkers = [
  "LOGICC_API_KEY",
  "LANGDOCK_API_KEY",
  "MESHY_AI_API_KEY",
  "BLACKBOX_API_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
];
for (const marker of providerSecretMarkers) {
  if (workflow.includes(marker)) fail(`Provider secret does not belong in Unity CI: ${marker}`);
}

console.log(JSON.stringify({
  ok: true,
  workflow: relative(repositoryRoot, workflowPath),
  unity: "6000.3.20f1",
  actionReferences: actionReferences.length,
  credentialFreePullRequests: true,
  androidArtifact: "ZunoBattle-development.apk",
}, null, 2));
