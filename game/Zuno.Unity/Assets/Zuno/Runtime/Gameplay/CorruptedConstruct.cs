using UnityEngine;

namespace Zuno.Gameplay
{
    [RequireComponent(typeof(CharacterController), typeof(Combatant))]
    [DisallowMultipleComponent]
    public sealed class CorruptedConstruct : MonoBehaviour
    {
        [SerializeField, Min(0.1f)] private float detectionRange = 14f;
        [SerializeField, Min(0.1f)] private float moveSpeed = 2.4f;
        [SerializeField, Min(0.1f)] private float attackRange = 1.65f;
        [SerializeField, Min(0.1f)] private float attackCooldown = 1.15f;
        [SerializeField, Min(1)] private int attackDamage = 12;

        private CharacterController _controller;
        private Combatant _self;
        private Combatant _target;
        private float _nextAttackAt;
        private float _verticalVelocity;
        private bool _behaviorEnabled = true;

        public void Initialize(Combatant target)
        {
            _target = target;
        }

        private void Awake()
        {
            _controller = GetComponent<CharacterController>();
            _self = GetComponent<Combatant>();
        }

        private void Update()
        {
            if (!_behaviorEnabled || _self.IsDefeated || _target == null || _target.IsDefeated || !_controller.enabled)
            {
                return;
            }

            Vector3 toTarget = _target.transform.position - transform.position;
            toTarget.y = 0f;
            float distance = toTarget.magnitude;

            if (_controller.isGrounded && _verticalVelocity < 0f)
            {
                _verticalVelocity = -2f;
            }
            _verticalVelocity -= 24f * Time.deltaTime;

            Vector3 velocity = Vector3.up * _verticalVelocity;
            if (distance <= detectionRange && distance > attackRange)
            {
                Vector3 direction = toTarget.normalized;
                transform.rotation = Quaternion.Slerp(
                    transform.rotation,
                    Quaternion.LookRotation(direction, Vector3.up),
                    1f - Mathf.Exp(-10f * Time.deltaTime));
                velocity += direction * moveSpeed;
            }
            else if (distance <= attackRange && Time.time >= _nextAttackAt)
            {
                _nextAttackAt = Time.time + attackCooldown;
                transform.rotation = Quaternion.LookRotation(toTarget.normalized, Vector3.up);
                _target.ApplyDamage(attackDamage, Faction.Corruption, gameObject);
            }

            _controller.Move(velocity * Time.deltaTime);
        }

        public void SetBehaviorEnabled(bool enabled)
        {
            _behaviorEnabled = enabled;
        }
    }
}
