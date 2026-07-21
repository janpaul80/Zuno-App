using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.InputSystem;

namespace Zuno.Gameplay
{
    [DisallowMultipleComponent]
    public sealed class GuardianCombat : MonoBehaviour
    {
        [SerializeField] private Transform hitOrigin;
        [SerializeField] private Transform weaponVisual;
        [SerializeField, Min(0.25f)] private float attackRadius = 1.35f;
        [SerializeField, Min(0.1f)] private float attackCooldown = 0.34f;
        [SerializeField, Min(0.1f)] private float comboResetTime = 0.8f;
        [SerializeField] private int[] comboDamage = { 22, 26, 36 };

        private readonly Collider[] _hitBuffer = new Collider[20];
        private readonly HashSet<Combatant> _uniqueTargets = new();
        private GuardianMotor _motor;
        private float _nextAttackAt;
        private float _lastAttackAt = float.NegativeInfinity;
        private int _comboIndex;
        private bool _controlEnabled = true;

        public void Initialize(Transform origin, Transform weapon)
        {
            hitOrigin = origin;
            weaponVisual = weapon;
        }

        private void Awake()
        {
            _motor = GetComponent<GuardianMotor>();
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
