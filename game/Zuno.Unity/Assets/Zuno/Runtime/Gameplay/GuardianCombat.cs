using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay
{
    [DisallowMultipleComponent]
    public sealed class GuardianCombat : MonoBehaviour
    {
        [SerializeField] private Transform hitOrigin;
        [SerializeField] private Transform weaponVisual;
        [SerializeField] private Transform rangedWeaponVisual;
        [SerializeField, Min(0.25f)] private float attackRadius = 1.35f;
        [SerializeField, Min(0.1f)] private float attackCooldown = 0.34f;
        [SerializeField, Min(0.1f)] private float comboResetTime = 0.8f;
        [SerializeField] private int[] comboDamage = { 22, 26, 36 };
        [SerializeField, Min(1f)] private float rangedAttackDistance = 28f;

        private readonly Collider[] _hitBuffer = new Collider[20];
        private readonly RaycastHit[] _rangedHitBuffer = new RaycastHit[20];
        private readonly HashSet<Combatant> _uniqueTargets = new();
        private GuardianMotor _motor;
        private GuardianLoadout _loadout;
        private float _nextAttackAt;
        private float _lastAttackAt = float.NegativeInfinity;
        private int _comboIndex;
        private bool _controlEnabled = true;

        public GuardianLoadout Loadout => _loadout ??= new GuardianLoadout();

        public void Initialize(Transform origin, Transform weapon, Transform rangedWeapon)
        {
            hitOrigin = origin;
            weaponVisual = weapon;
            rangedWeaponVisual = rangedWeapon;
            UpdateWeaponVisibility();
        }

        private void Awake()
        {
            _motor = GetComponent<GuardianMotor>();
            _loadout = new GuardianLoadout();
            _loadout.Changed += UpdateWeaponVisibility;
        }

        private void Update()
        {
            if (!_controlEnabled)
            {
                return;
            }

            Keyboard keyboard = Keyboard.current;
            Gamepad gamepad = Gamepad.current;
            if ((keyboard != null && keyboard.jKey.wasPressedThisFrame) ||
                (gamepad != null && gamepad.buttonWest.wasPressedThisFrame))
            {
                TryAttack();
            }
        }

        public void TryAttack()
        {
            if (!_controlEnabled || Time.time < _nextAttackAt || comboDamage.Length == 0)
            {
                return;
            }

            if (Loadout.Weapon == GuardianWeapon.BluePulseBlaster)
            {
                TryRangedAttack();
                return;
            }

            if (Time.time > _lastAttackAt + comboResetTime)
            {
                _comboIndex = 0;
            }

            int damage = comboDamage[_comboIndex];
            _comboIndex = (_comboIndex + 1) % comboDamage.Length;
            _lastAttackAt = Time.time;
            _nextAttackAt = Time.time + attackCooldown;

            _motor?.AddPlanarImpulse(transform.forward * 2.2f);
            ResolveHit(damage);
            if (weaponVisual != null)
            {
                StartCoroutine(AnimateWeapon());
            }
        }

        public void CycleWeapon()
        {
            Loadout.CycleWeapon();
        }

        public void CycleAmmo()
        {
            Loadout.CycleAmmo();
        }

        public void CycleArmor()
        {
            Loadout.CycleArmor();
        }

        public void CycleGadget()
        {
            Loadout.CycleGadget();
        }

        public void SetControlEnabled(bool enabled)
        {
            _controlEnabled = enabled;
        }

        private void ResolveHit(int damage)
        {
            Vector3 center = hitOrigin != null
                ? hitOrigin.position
                : transform.position + transform.forward * 1.05f + Vector3.up;

            int hitCount = Physics.OverlapSphereNonAlloc(
                center,
                attackRadius,
                _hitBuffer,
                ~0,
                QueryTriggerInteraction.Ignore);

            _uniqueTargets.Clear();
            for (int index = 0; index < hitCount; index++)
            {
                Combatant target = _hitBuffer[index].GetComponentInParent<Combatant>();
                if (target == null || target.gameObject == gameObject || !_uniqueTargets.Add(target))
                {
                    continue;
                }

                target.ApplyDamage(damage, Faction.Guardian, gameObject);
            }
        }

        private void TryRangedAttack()
        {
            if (!Loadout.TryConsumeRangedAmmo())
            {
                return;
            }

            _lastAttackAt = Time.time;
            _nextAttackAt = Time.time + attackCooldown;

            Vector3 origin = hitOrigin != null
                ? hitOrigin.position
                : transform.position + Vector3.up * 1.05f;
            Vector3 direction = transform.forward;
            Vector3 endpoint = origin + direction * rangedAttackDistance;

            int hitCount = Physics.SphereCastNonAlloc(
                origin,
                0.24f,
                direction,
                _rangedHitBuffer,
                rangedAttackDistance,
                ~0,
                QueryTriggerInteraction.Ignore);

            Combatant closestTarget = null;
            float closestDistance = float.PositiveInfinity;
            for (int index = 0; index < hitCount; index++)
            {
                RaycastHit hit = _rangedHitBuffer[index];
                Combatant target = hit.collider.GetComponentInParent<Combatant>();
                if (target == null || target.gameObject == gameObject || target.Faction != Faction.Corruption || hit.distance >= closestDistance)
                {
                    continue;
                }

                closestTarget = target;
                closestDistance = hit.distance;
                endpoint = hit.point;
            }

            closestTarget?.ApplyDamage(Loadout.RangedDamage, Faction.Guardian, gameObject);
            StartCoroutine(AnimatePulse(origin, endpoint));
        }

        private IEnumerator AnimatePulse(Vector3 origin, Vector3 endpoint)
        {
            GameObject pulse = new("Blue Pulse Shot");
            LineRenderer line = pulse.AddComponent<LineRenderer>();
            line.positionCount = 2;
            line.SetPosition(0, origin);
            line.SetPosition(1, endpoint);
            line.startWidth = 0.12f;
            line.endWidth = 0.025f;
            line.numCapVertices = 4;
            line.startColor = new Color(0.15f, 0.92f, 1f, 1f);
            line.endColor = new Color(0.25f, 0.45f, 1f, 0.1f);
            Shader shader = Shader.Find("Universal Render Pipeline/Unlit") ?? Shader.Find("Sprites/Default");
            line.material = new Material(shader);
            if (line.material.HasProperty("_BaseColor"))
            {
                line.material.SetColor("_BaseColor", new Color(0.05f, 0.8f, 1f, 1f));
            }

            yield return new WaitForSeconds(0.08f);
            Material pulseMaterial = line.material;
            Destroy(pulse);
            Destroy(pulseMaterial);
        }

        private IEnumerator AnimateWeapon()
        {
            Quaternion startingRotation = weaponVisual.localRotation;
            Quaternion apexRotation = startingRotation * Quaternion.Euler(0f, 0f, -115f);
            const float halfDuration = 0.09f;

            for (float elapsed = 0f; elapsed < halfDuration; elapsed += Time.deltaTime)
            {
                weaponVisual.localRotation = Quaternion.Slerp(startingRotation, apexRotation, elapsed / halfDuration);
                yield return null;
            }

            for (float elapsed = 0f; elapsed < halfDuration; elapsed += Time.deltaTime)
            {
                weaponVisual.localRotation = Quaternion.Slerp(apexRotation, startingRotation, elapsed / halfDuration);
                yield return null;
            }

            weaponVisual.localRotation = startingRotation;
        }

        private void UpdateWeaponVisibility()
        {
            if (weaponVisual != null)
            {
                weaponVisual.gameObject.SetActive(Loadout.Weapon == GuardianWeapon.EnergyBlade);
            }
            if (rangedWeaponVisual != null)
            {
                rangedWeaponVisual.gameObject.SetActive(Loadout.Weapon == GuardianWeapon.BluePulseBlaster);
            }
        }

        private void OnDestroy()
        {
            if (_loadout != null)
            {
                _loadout.Changed -= UpdateWeaponVisibility;
            }
        }

        private void OnDrawGizmosSelected()
        {
            Gizmos.color = Color.cyan;
            Vector3 center = hitOrigin != null
                ? hitOrigin.position
                : transform.position + transform.forward * 1.05f + Vector3.up;
            Gizmos.DrawWireSphere(center, attackRadius);
        }
    }
}
