using System;
using System.Collections;
using UnityEngine;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay
{
    public enum Faction
    {
        Guardian,
        Corruption
    }

    [DisallowMultipleComponent]
    public sealed class Combatant : MonoBehaviour
    {
        [SerializeField, Min(1)] private int maximumVitality = 100;
        [SerializeField] private Faction faction = Faction.Corruption;
        [SerializeField] private bool destroyAfterDefeat = true;

        private Renderer[] _renderers = Array.Empty<Renderer>();
        private Vitality _vitality;
        private bool _initialized;

        public event Action<Combatant, GameObject> Damaged;
        public event Action<Combatant, GameObject> Defeated;

        public Faction Faction => faction;
        public bool IsDefeated => _vitality?.IsDepleted ?? false;
        public int CurrentVitality => _vitality?.Current ?? maximumVitality;
        public int MaximumVitality => _vitality?.Maximum ?? maximumVitality;
        public float NormalizedVitality => _vitality?.Normalized ?? 1f;

        public void Initialize(int vitality, Faction combatantFaction, bool destroyOnDefeat)
        {
            maximumVitality = Mathf.Max(1, vitality);
            faction = combatantFaction;
            destroyAfterDefeat = destroyOnDefeat;
            _vitality = new Vitality(maximumVitality);
            _renderers = GetComponentsInChildren<Renderer>(true);
            _initialized = true;
        }

        private void Awake()
        {
            if (!_initialized)
            {
                Initialize(maximumVitality, faction, destroyAfterDefeat);
            }
        }

        public bool ApplyDamage(int amount, Faction sourceFaction, GameObject source)
        {
            if (amount <= 0 || IsDefeated || sourceFaction == faction)
            {
                return false;
            }

            DamageResult result = _vitality.ApplyDamage(amount);
            if (result.Applied == 0)
            {
                return false;
            }

            Damaged?.Invoke(this, source);
            StartCoroutine(FlashDamage());

            if (result.BecameDepleted)
            {
                Defeated?.Invoke(this, source);
                DisableCollision();
                if (destroyAfterDefeat)
                {
                    StartCoroutine(DefeatSequence());
                }
            }

            return true;
        }

        private void DisableCollision()
        {
            foreach (Collider targetCollider in GetComponentsInChildren<Collider>())
            {
                targetCollider.enabled = false;
            }

            CharacterController controller = GetComponent<CharacterController>();
            if (controller != null)
            {
                controller.enabled = false;
            }
        }

        private IEnumerator FlashDamage()
        {
            Color[] previousColors = new Color[_renderers.Length];
            for (int index = 0; index < _renderers.Length; index++)
            {
                Material material = _renderers[index].material;
                previousColors[index] = ReadColor(material);
                WriteColor(material, new Color(1f, 0.18f, 0.12f));
            }

            yield return new WaitForSeconds(0.09f);

            for (int index = 0; index < _renderers.Length; index++)
            {
                if (_renderers[index] != null)
                {
                    WriteColor(_renderers[index].material, previousColors[index]);
                }
            }
        }

        private IEnumerator DefeatSequence()
        {
            Vector3 startingScale = transform.localScale;
            float elapsed = 0f;
            const float duration = 0.38f;

            while (elapsed < duration)
            {
                elapsed += Time.deltaTime;
                transform.localScale = Vector3.Lerp(startingScale, Vector3.zero, elapsed / duration);
                transform.Rotate(Vector3.up, 360f * Time.deltaTime, Space.World);
                yield return null;
            }

            Destroy(gameObject);
        }

        private static Color ReadColor(Material material)
        {
            if (material.HasProperty("_BaseColor"))
            {
                return material.GetColor("_BaseColor");
            }

            return material.HasProperty("_Color") ? material.GetColor("_Color") : Color.white;
        }

        private static void WriteColor(Material material, Color color)
        {
            if (material.HasProperty("_BaseColor"))
            {
                material.SetColor("_BaseColor", color);
            }

            if (material.HasProperty("_Color"))
            {
                material.SetColor("_Color", color);
            }
        }
    }
}
