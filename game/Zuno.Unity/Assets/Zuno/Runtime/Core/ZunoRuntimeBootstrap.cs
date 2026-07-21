using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;
using UnityEngine.InputSystem.UI;
using UnityEngine.SceneManagement;
using UnityEngine.UI;
using Zuno.Gameplay.Input;
using Zuno.Gameplay.Presentation;

namespace Zuno.Gameplay.Core
{
    public static class ZunoRuntimeBootstrap
    {
        private static readonly Dictionary<string, Material> Materials = new();
        private static Font _font;

        [RuntimeInitializeOnLoadMethod(RuntimeInitializeLoadType.AfterSceneLoad)]
        private static void CreateGrasslandsSlice()
        {
            if (SceneManager.GetActiveScene().name != "GrasslandsVerticalSlice" ||
                Object.FindFirstObjectByType<GrasslandsMission>() != null)
            {
                return;
            }

            Application.targetFrameRate = 60;
            QualitySettings.vSyncCount = 0;
            Screen.orientation = ScreenOrientation.LandscapeLeft;

            GameObject root = new("ZUNO_Grasslands_Runtime");
            GrasslandsMission mission = root.AddComponent<GrasslandsMission>();
            mission.Initialize(3);

            BuildLighting(root.transform);
            BuildGrasslands(root.transform);

            Camera camera = BuildCamera(root.transform);
            GuardianReferences guardian = BuildAelis(root.transform, camera.transform);
            mission.WatchGuardian(guardian.Combatant);

            GuardianCameraRig cameraRig = camera.gameObject.AddComponent<GuardianCameraRig>();
            cameraRig.Initialize(guardian.Root.transform);
            guardian.Motor.Initialize(camera.transform);

            BuildEnemies(root.transform, guardian.Combatant, mission);
            BuildExitBeacon(root.transform, mission);
            BuildHud(root.transform, guardian, mission);
        }

        private static void BuildLighting(Transform parent)
        {
            RenderSettings.ambientMode = UnityEngine.Rendering.AmbientMode.Trilight;
            RenderSettings.ambientSkyColor = new Color(0.31f, 0.48f, 0.65f);
            RenderSettings.ambientEquatorColor = new Color(0.18f, 0.31f, 0.25f);
            RenderSettings.ambientGroundColor = new Color(0.04f, 0.08f, 0.12f);
            RenderSettings.fog = true;
            RenderSettings.fogColor = new Color(0.23f, 0.44f, 0.47f);
            RenderSettings.fogMode = FogMode.Linear;
            RenderSettings.fogStartDistance = 24f;
            RenderSettings.fogEndDistance = 68f;

            GameObject sun = new("Grasslands Sun");
            sun.transform.SetParent(parent);
            sun.transform.rotation = Quaternion.Euler(48f, -28f, 0f);
            Light light = sun.AddComponent<Light>();
            light.type = LightType.Directional;
            light.color = new Color(1f, 0.81f, 0.56f);
            light.intensity = 1.25f;
            light.shadows = LightShadows.Soft;
        }

        private static Camera BuildCamera(Transform parent)
        {
            GameObject cameraObject = new("Guardian Camera");
            cameraObject.transform.SetParent(parent);
            Camera camera = cameraObject.AddComponent<Camera>();
            camera.tag = "MainCamera";
            camera.fieldOfView = 62f;
            camera.nearClipPlane = 0.1f;
            camera.farClipPlane = 120f;
            camera.clearFlags = CameraClearFlags.SolidColor;
            camera.backgroundColor = new Color(0.08f, 0.17f, 0.27f);
            cameraObject.AddComponent<AudioListener>();
            return camera;
        }

        private static void BuildGrasslands(Transform parent)
        {
            CreatePrimitive(
                PrimitiveType.Plane,
                "Grasslands Ground",
                parent,
                new Vector3(0f, 0f, 22f),
                new Vector3(4.2f, 1f, 7.2f),
                Quaternion.identity,
                GetMaterial("Grass", new Color(0.14f, 0.38f, 0.15f), 0.1f));

            for (int index = 0; index < 13; index++)
            {
                float z = -2f + index * 4f;
                float leftX = -7f - (index % 3);
                float rightX = 7f + ((index + 1) % 3);
                CreateTree(parent, new Vector3(leftX, 0f, z), 0.8f + (index % 4) * 0.12f);
                CreateTree(parent, new Vector3(rightX, 0f, z + 1.6f), 0.9f + (index % 3) * 0.14f);
            }

            CreatePlatform(parent, new Vector3(-3.2f, 0.35f, 8f), new Vector3(2.4f, 0.7f, 2.4f));
            CreatePlatform(parent, new Vector3(3.4f, 0.55f, 18f), new Vector3(2.8f, 1.1f, 2.8f));
            CreatePlatform(parent, new Vector3(-3.5f, 0.4f, 29f), new Vector3(3.4f, 0.8f, 2.5f));

            for (int index = 0; index < 18; index++)
            {
                float x = index % 2 == 0 ? -5.6f : 5.6f;
                float z = index * 2.8f;
                CreatePrimitive(
                    PrimitiveType.Sphere,
                    $"Path Rock {index + 1}",
                    parent,
                    new Vector3(x + Mathf.Sin(index) * 0.8f, 0.35f, z),
                    new Vector3(0.8f, 0.55f, 0.95f),
                    Quaternion.Euler(0f, index * 31f, 0f),
                    GetMaterial("Stone", new Color(0.22f, 0.28f, 0.31f), 0.05f));
            }
        }

        private static GuardianReferences BuildAelis(Transform parent, Transform cameraTransform)
        {
            GameObject root = new("Aelis_Guardian_Greybox");
            root.transform.SetParent(parent);
            root.transform.position = new Vector3(0f, 1.02f, 0f);

            CharacterController controller = root.AddComponent<CharacterController>();
            controller.height = 1.9f;
            controller.radius = 0.42f;
            controller.center = new Vector3(0f, 0.95f, 0f);
            controller.stepOffset = 0.35f;
            controller.slopeLimit = 48f;

            Material orange = GetMaterial("Aelis Orange", new Color(1f, 0.27f, 0.035f), 0.32f);
            Material cyan = GetMaterial("Aelis Cyan", new Color(0.02f, 0.76f, 1f), 0.7f, true);
            Material dark = GetMaterial("Aelis Armor", new Color(0.025f, 0.05f, 0.11f), 0.72f);

            Transform visual = new GameObject("VISUAL_GREYBOX_REPLACE_ME").transform;
            visual.SetParent(root.transform, false);
            CreateVisualPart(PrimitiveType.Capsule, "Body", visual, new Vector3(0f, 0.92f, 0f), new Vector3(0.72f, 0.78f, 0.58f), Quaternion.identity, orange);
            CreateVisualPart(PrimitiveType.Sphere, "Head", visual, new Vector3(0f, 1.72f, 0.07f), new Vector3(0.82f, 0.72f, 0.74f), Quaternion.identity, orange);
            CreateVisualPart(PrimitiveType.Cube, "Left Ear", visual, new Vector3(-0.27f, 2.14f, 0.06f), new Vector3(0.24f, 0.46f, 0.22f), Quaternion.Euler(0f, 0f, -18f), orange);
            CreateVisualPart(PrimitiveType.Cube, "Right Ear", visual, new Vector3(0.27f, 2.14f, 0.06f), new Vector3(0.24f, 0.46f, 0.22f), Quaternion.Euler(0f, 0f, 18f), orange);
            CreateVisualPart(PrimitiveType.Cube, "Chest Armor", visual, new Vector3(0f, 1.08f, 0.32f), new Vector3(0.76f, 0.62f, 0.16f), Quaternion.identity, dark);
            CreateVisualPart(PrimitiveType.Sphere, "Chest Core", visual, new Vector3(0f, 1.12f, 0.43f), new Vector3(0.18f, 0.18f, 0.1f), Quaternion.identity, cyan);
            CreateVisualPart(PrimitiveType.Capsule, "Tail", visual, new Vector3(0f, 0.82f, -0.55f), new Vector3(0.34f, 0.65f, 0.34f), Quaternion.Euler(58f, 0f, 0f), orange);

            Transform weaponPivot = new GameObject("Weapon Pivot").transform;
            weaponPivot.SetParent(visual, false);
            weaponPivot.localPosition = new Vector3(0.62f, 1.03f, 0.2f);
            Transform weapon = CreateVisualPart(PrimitiveType.Cube, "Aelis Energy Blade Greybox", weaponPivot, new Vector3(0f, 0.42f, 0f), new Vector3(0.12f, 0.92f, 0.12f), Quaternion.Euler(0f, 0f, -24f), cyan);

            Transform hitOrigin = new GameObject("Melee Hit Origin").transform;
            hitOrigin.SetParent(root.transform, false);
            hitOrigin.localPosition = new Vector3(0f, 1.05f, 1.05f);

            Combatant combatant = root.AddComponent<Combatant>();
            combatant.Initialize(100, Faction.Guardian, false);
            GuardianMotor motor = root.AddComponent<GuardianMotor>();
            motor.Initialize(cameraTransform);
            GuardianCombat combat = root.AddComponent<GuardianCombat>();
            combat.Initialize(hitOrigin, weaponPivot);
            combatant.Defeated += (_, _) =>
            {
                motor.SetControlEnabled(false);
                combat.SetControlEnabled(false);
            };

            return new GuardianReferences(root, combatant, motor, combat);
        }

        private static void BuildEnemies(Transform parent, Combatant guardian, GrasslandsMission mission)
        {
            Vector3[] positions =
            {
                new(-2.1f, 1f, 11f),
                new(2.5f, 1f, 20f),
                new(-2.8f, 1f, 30f),
                new(2.2f, 1f, 37f)
            };

            for (int index = 0; index < positions.Length; index++)
            {
                GameObject enemy = new($"Corrupted Construct {index + 1}");
                enemy.transform.SetParent(parent);
                enemy.transform.position = positions[index];

                CharacterController controller = enemy.AddComponent<CharacterController>();
                controller.height = 1.7f;
                controller.radius = 0.46f;
                controller.center = new Vector3(0f, 0.85f, 0f);

                Transform visual = new GameObject("VISUAL_GREYBOX_REPLACE_ME").transform;
                visual.SetParent(enemy.transform, false);
                Material corruption = GetMaterial("Corruption", new Color(0.45f, 0.025f, 0.62f), 0.5f, true);
                Material core = GetMaterial("Corruption Core", new Color(1f, 0.05f, 0.22f), 0.35f, true);
                CreateVisualPart(PrimitiveType.Capsule, "Construct Body", visual, new Vector3(0f, 0.82f, 0f), new Vector3(0.86f, 0.82f, 0.78f), Quaternion.identity, corruption);
                CreateVisualPart(PrimitiveType.Sphere, "Construct Core", visual, new Vector3(0f, 0.92f, 0.43f), new Vector3(0.24f, 0.24f, 0.14f), Quaternion.identity, core);
                CreateVisualPart(PrimitiveType.Cube, "Left Horn", visual, new Vector3(-0.32f, 1.62f, 0f), new Vector3(0.18f, 0.48f, 0.18f), Quaternion.Euler(0f, 0f, -28f), core);
                CreateVisualPart(PrimitiveType.Cube, "Right Horn", visual, new Vector3(0.32f, 1.62f, 0f), new Vector3(0.18f, 0.48f, 0.18f), Quaternion.Euler(0f, 0f, 28f), core);

                Combatant combatant = enemy.AddComponent<Combatant>();
                combatant.Initialize(58 + index * 6, Faction.Corruption, true);
                CorruptedConstruct brain = enemy.AddComponent<CorruptedConstruct>();
                brain.Initialize(guardian);
                mission.WatchEnemy(combatant);
            }
        }

        private static void BuildExitBeacon(Transform parent, GrasslandsMission mission)
        {
            GameObject beacon = new("Grasslands Exit Beacon");
            beacon.transform.SetParent(parent);
            beacon.transform.position = new Vector3(0f, 1.4f, 45f);
            beacon.AddComponent<SphereCollider>().isTrigger = true;
            Rigidbody triggerBody = beacon.AddComponent<Rigidbody>();
            triggerBody.isKinematic = true;
            triggerBody.useGravity = false;

            Material beaconMaterial = GetMaterial("Beacon", new Color(0.55f, 0.08f, 0.85f), 0.5f, true);
            Transform ring = CreateVisualPart(
                PrimitiveType.Cylinder,
                "Beacon Energy",
                beacon.transform,
                Vector3.zero,
                new Vector3(1.2f, 0.08f, 1.2f),
                Quaternion.identity,
                beaconMaterial);
            CreateVisualPart(PrimitiveType.Sphere, "Beacon Core", beacon.transform, new Vector3(0f, 0.9f, 0f), new Vector3(0.55f, 0.55f, 0.55f), Quaternion.identity, beaconMaterial);

            ExitBeacon exit = beacon.AddComponent<ExitBeacon>();
            exit.Initialize(mission, ring.GetComponent<Renderer>());
        }

        private static void BuildHud(Transform parent, GuardianReferences guardian, GrasslandsMission mission)
        {
            EnsureEventSystem(parent);
            _font = Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");

            GameObject canvasObject = new("ZUNO HUD");
            canvasObject.transform.SetParent(parent);
            Canvas canvas = canvasObject.AddComponent<Canvas>();
            canvas.renderMode = RenderMode.ScreenSpaceOverlay;
            CanvasScaler scaler = canvasObject.AddComponent<CanvasScaler>();
            scaler.uiScaleMode = CanvasScaler.ScaleMode.ScaleWithScreenSize;
            scaler.referenceResolution = new Vector2(1920f, 1080f);
            scaler.matchWidthOrHeight = 0.5f;
            canvasObject.AddComponent<GraphicRaycaster>();

            Text objective = CreateText(canvasObject.transform, "Objective", "GRASSLANDS // CLEANSE THE PATH  0/3", 30, TextAnchor.MiddleCenter, Color.white);
            SetRect(objective.rectTransform, new Vector2(0.5f, 1f), new Vector2(0.5f, 1f), new Vector2(0f, -54f), new Vector2(950f, 70f));

            Image healthBack = CreateImage(canvasObject.transform, "Health Back", new Color(0.02f, 0.035f, 0.08f, 0.92f));
            SetRect(healthBack.rectTransform, new Vector2(0f, 1f), new Vector2(0f, 1f), new Vector2(250f, -92f), new Vector2(390f, 44f));
            Image healthFill = CreateImage(healthBack.transform, "Health Fill", new Color(0.05f, 0.9f, 0.6f, 1f));
            Stretch(healthFill.rectTransform, 6f);
            healthFill.type = Image.Type.Filled;
            healthFill.fillMethod = Image.FillMethod.Horizontal;
            Text healthLabel = CreateText(healthBack.transform, "Health Label", "AELIS  100/100", 23, TextAnchor.MiddleCenter, Color.white);
            Stretch(healthLabel.rectTransform, 0f);

            Image dashBack = CreateImage(canvasObject.transform, "Dash Back", new Color(0.02f, 0.035f, 0.08f, 0.9f));
            SetRect(dashBack.rectTransform, new Vector2(0f, 1f), new Vector2(0f, 1f), new Vector2(162f, -142f), new Vector2(214f, 18f));
            Image dashFill = CreateImage(dashBack.transform, "Dash Fill", new Color(0f, 0.75f, 1f, 1f));
            Stretch(dashFill.rectTransform, 3f);
            dashFill.type = Image.Type.Filled;
            dashFill.fillMethod = Image.FillMethod.Horizontal;

            BuildVirtualStick(canvasObject.transform, guardian.Motor);
            CreateActionButton(canvasObject.transform, "ATTACK", new Vector2(-155f, 175f), new Color(1f, 0.22f, 0.18f, 0.88f), guardian.Combat.TryAttack);
            CreateActionButton(canvasObject.transform, "JUMP", new Vector2(-315f, 110f), new Color(0.03f, 0.7f, 1f, 0.88f), guardian.Motor.QueueJump);
            CreateActionButton(canvasObject.transform, "DASH", new Vector2(-115f, 330f), new Color(0.65f, 0.08f, 1f, 0.88f), guardian.Motor.TryDash);

            GameObject terminalPanel = CreateImage(canvasObject.transform, "Mission Result", new Color(0.015f, 0.025f, 0.07f, 0.94f)).gameObject;
            SetRect((RectTransform)terminalPanel.transform, new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(800f, 390f));
            Text terminalTitle = CreateText(terminalPanel.transform, "Result Title", "MISSION COMPLETE", 56, TextAnchor.MiddleCenter, new Color(1f, 0.76f, 0.08f));
            SetRect(terminalTitle.rectTransform, new Vector2(0.5f, 1f), new Vector2(0.5f, 1f), new Vector2(0f, -78f), new Vector2(700f, 90f));
            Text terminalBody = CreateText(terminalPanel.transform, "Result Body", string.Empty, 25, TextAnchor.MiddleCenter, Color.white);
            SetRect(terminalBody.rectTransform, new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), new Vector2(0f, -10f), new Vector2(700f, 170f));
            CreateActionButton(terminalPanel.transform, "RESTART", new Vector2(0f, 42f), new Color(0.1f, 0.85f, 0.42f, 0.95f), mission.Restart, false, new Vector2(270f, 76f));

            ZunoHud hud = canvasObject.AddComponent<ZunoHud>();
            hud.Initialize(guardian.Combatant, guardian.Motor, mission, healthFill, dashFill, healthLabel, objective, terminalPanel, terminalTitle, terminalBody);
        }

        private static void EnsureEventSystem(Transform parent)
        {
            if (Object.FindFirstObjectByType<EventSystem>() != null)
            {
                return;
            }

            GameObject eventSystemObject = new("Event System");
            eventSystemObject.transform.SetParent(parent);
            eventSystemObject.AddComponent<EventSystem>();
            InputSystemUIInputModule module = eventSystemObject.AddComponent<InputSystemUIInputModule>();
            module.AssignDefaultActions();
        }

        private static void BuildVirtualStick(Transform canvas, GuardianMotor motor)
        {
            Image background = CreateImage(canvas, "Movement Stick", new Color(0.02f, 0.05f, 0.12f, 0.62f));
            SetRect(background.rectTransform, new Vector2(0f, 0f), new Vector2(0f, 0f), new Vector2(190f, 190f), new Vector2(230f, 230f));
            Image handle = CreateImage(background.transform, "Handle", new Color(0.02f, 0.78f, 1f, 0.78f));
            SetRect(handle.rectTransform, new Vector2(0.5f, 0.5f), new Vector2(0.5f, 0.5f), Vector2.zero, new Vector2(92f, 92f));
            VirtualStick stick = background.gameObject.AddComponent<VirtualStick>();
            stick.Initialize(handle.rectTransform, motor);
        }

        private static Button CreateActionButton(
            Transform parent,
            string label,
            Vector2 anchoredPosition,
            Color color,
            UnityEngine.Events.UnityAction action,
            bool anchorBottomRight = true,
            Vector2? size = null)
        {
            Image image = CreateImage(parent, $"{label} Button", color);
            Vector2 anchor = anchorBottomRight ? new Vector2(1f, 0f) : new Vector2(0.5f, 0f);
            SetRect(image.rectTransform, anchor, anchor, anchoredPosition, size ?? new Vector2(136f, 136f));
            Button button = image.gameObject.AddComponent<Button>();
            button.targetGraphic = image;
            button.onClick.AddListener(action);
            Text text = CreateText(image.transform, "Label", label, 24, TextAnchor.MiddleCenter, Color.white);
            Stretch(text.rectTransform, 0f);
            return button;
        }

        private static Text CreateText(Transform parent, string name, string value, int fontSize, TextAnchor alignment, Color color)
        {
            GameObject target = new(name, typeof(RectTransform));
            target.transform.SetParent(parent, false);
            Text text = target.AddComponent<Text>();
            text.font = _font ?? Resources.GetBuiltinResource<Font>("LegacyRuntime.ttf");
            text.text = value;
            text.fontSize = fontSize;
            text.alignment = alignment;
            text.color = color;
            text.fontStyle = FontStyle.Bold;
            text.raycastTarget = false;
            return text;
        }

        private static Image CreateImage(Transform parent, string name, Color color)
        {
            GameObject target = new(name, typeof(RectTransform));
            target.transform.SetParent(parent, false);
            Image image = target.AddComponent<Image>();
            image.color = color;
            return image;
        }

        private static void SetRect(RectTransform rect, Vector2 anchorMin, Vector2 anchorMax, Vector2 position, Vector2 size)
        {
            rect.anchorMin = anchorMin;
            rect.anchorMax = anchorMax;
            rect.pivot = new Vector2(0.5f, 0.5f);
            rect.anchoredPosition = position;
            rect.sizeDelta = size;
        }

        private static void Stretch(RectTransform rect, float inset)
        {
            rect.anchorMin = Vector2.zero;
            rect.anchorMax = Vector2.one;
            rect.offsetMin = new Vector2(inset, inset);
            rect.offsetMax = new Vector2(-inset, -inset);
        }

        private static void CreateTree(Transform parent, Vector3 position, float scale)
        {
            Material trunk = GetMaterial("Tree Trunk", new Color(0.18f, 0.08f, 0.035f), 0.1f);
            Material leaves = GetMaterial("Tree Leaves", new Color(0.06f, 0.28f, 0.12f), 0.05f);
            GameObject tree = new("Grasslands Tree Greybox");
            tree.transform.SetParent(parent);
            tree.transform.position = position;
            tree.transform.localScale = Vector3.one * scale;
            CreateVisualPart(PrimitiveType.Cylinder, "Trunk", tree.transform, new Vector3(0f, 1.5f, 0f), new Vector3(0.48f, 1.5f, 0.48f), Quaternion.identity, trunk, false);
            CreateVisualPart(PrimitiveType.Sphere, "Canopy", tree.transform, new Vector3(0f, 3.3f, 0f), new Vector3(2f, 1.35f, 2f), Quaternion.identity, leaves);
        }

        private static void CreatePlatform(Transform parent, Vector3 position, Vector3 scale)
        {
            CreatePrimitive(PrimitiveType.Cube, "Grasslands Platform", parent, position, scale, Quaternion.identity, GetMaterial("Platform", new Color(0.23f, 0.34f, 0.18f), 0.1f));
        }

        private static GameObject CreatePrimitive(
            PrimitiveType type,
            string name,
            Transform parent,
            Vector3 position,
            Vector3 scale,
            Quaternion rotation,
            Material material)
        {
            GameObject target = GameObject.CreatePrimitive(type);
            target.name = name;
            target.transform.SetParent(parent);
            target.transform.position = position;
            target.transform.rotation = rotation;
            target.transform.localScale = scale;
            target.GetComponent<Renderer>().sharedMaterial = material;
            return target;
        }

        private static Transform CreateVisualPart(
            PrimitiveType type,
            string name,
            Transform parent,
            Vector3 localPosition,
            Vector3 localScale,
            Quaternion localRotation,
            Material material,
            bool removeCollider = true)
        {
            GameObject target = GameObject.CreatePrimitive(type);
            target.name = name;
            target.transform.SetParent(parent, false);
            target.transform.localPosition = localPosition;
            target.transform.localRotation = localRotation;
            target.transform.localScale = localScale;
            target.GetComponent<Renderer>().sharedMaterial = material;
            if (removeCollider)
            {
                Object.Destroy(target.GetComponent<Collider>());
            }

            return target.transform;
        }

        private static Material GetMaterial(string name, Color color, float metallic, bool emission = false)
        {
            if (Materials.TryGetValue(name, out Material existing))
            {
                return existing;
            }

            Shader shader = Shader.Find("Universal Render Pipeline/Lit") ?? Shader.Find("Standard");
            Material material = new(shader) { name = name };
            if (material.HasProperty("_BaseColor")) material.SetColor("_BaseColor", color);
            if (material.HasProperty("_Color")) material.SetColor("_Color", color);
            if (material.HasProperty("_Metallic")) material.SetFloat("_Metallic", metallic);
            if (material.HasProperty("_Smoothness")) material.SetFloat("_Smoothness", 0.48f);
            if (emission && material.HasProperty("_EmissionColor"))
            {
                material.EnableKeyword("_EMISSION");
                material.SetColor("_EmissionColor", color * 2.4f);
            }

            Materials.Add(name, material);
            return material;
        }

        private readonly struct GuardianReferences
        {
            public GuardianReferences(GameObject root, Combatant combatant, GuardianMotor motor, GuardianCombat combat)
            {
                Root = root;
                Combatant = combatant;
                Motor = motor;
                Combat = combat;
            }

            public GameObject Root { get; }
            public Combatant Combatant { get; }
            public GuardianMotor Motor { get; }
            public GuardianCombat Combat { get; }
        }
    }
}
