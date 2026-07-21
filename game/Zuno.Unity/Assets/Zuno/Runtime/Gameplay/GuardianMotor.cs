using UnityEngine;
using UnityEngine.InputSystem;

namespace Zuno.Gameplay
{
    [RequireComponent(typeof(CharacterController))]
    [DisallowMultipleComponent]
    public sealed class GuardianMotor : MonoBehaviour
    {
        [Header("Locomotion")]
        [SerializeField, Min(0.1f)] private float moveSpeed = 6.4f;
        [SerializeField, Min(0.1f)] private float rotationSpeed = 14f;
        [SerializeField, Min(0.1f)] private float jumpHeight = 1.8f;
        [SerializeField, Min(0.1f)] private float gravity = 24f;
        [SerializeField, Min(0f)] private float coyoteTime = 0.12f;
        [SerializeField, Min(0f)] private float jumpBuffer = 0.12f;

        [Header("Dash")]
        [SerializeField, Min(0.1f)] private float dashSpeed = 15f;
        [SerializeField, Min(0.05f)] private float dashDuration = 0.18f;
        [SerializeField, Min(0.1f)] private float dashCooldown = 1.1f;

        private CharacterController _controller;
        private Transform _cameraTransform;
        private Vector2 _virtualMove;
        private Vector3 _planarImpulse;
        private Vector3 _dashDirection;
        private float _verticalVelocity;
        private float _lastGroundedTime = float.NegativeInfinity;
        private float _lastJumpQueuedTime = float.NegativeInfinity;
        private float _dashEndsAt;
        private float _nextDashAt;
        private bool _controlEnabled = true;

        public float DashCooldownNormalized => dashCooldown <= 0f
            ? 0f
            : Mathf.Clamp01((_nextDashAt - Time.time) / dashCooldown);

        public bool ControlEnabled => _controlEnabled;

        public void Initialize(Transform cameraTransform)
        {
            _cameraTransform = cameraTransform;
        }

        private void Awake()
        {
            _controller = GetComponent<CharacterController>();
        }

        private void Update()
        {
            if (!_controlEnabled || !_controller.enabled)
            {
                return;
            }

            ReadDeviceActions();

            if (_controller.isGrounded)
            {
                _lastGroundedTime = Time.time;
                if (_verticalVelocity < 0f)
                {
                    _verticalVelocity = -2f;
                }
            }

            if (Time.time <= _lastJumpQueuedTime + jumpBuffer && Time.time <= _lastGroundedTime + coyoteTime)
            {
                _verticalVelocity = Mathf.Sqrt(2f * gravity * jumpHeight);
                _lastJumpQueuedTime = float.NegativeInfinity;
                _lastGroundedTime = float.NegativeInfinity;
            }

            Vector3 displacement;
            if (Time.time < _dashEndsAt)
            {
                displacement = _dashDirection * dashSpeed;
            }
            else
            {
                Vector3 desiredDirection = CameraRelativeDirection(ReadMoveInput());
                if (desiredDirection.sqrMagnitude > 0.01f)
                {
                    Quaternion targetRotation = Quaternion.LookRotation(desiredDirection, Vector3.up);
                    transform.rotation = Quaternion.Slerp(
                        transform.rotation,
                        targetRotation,
                        1f - Mathf.Exp(-rotationSpeed * Time.deltaTime));
                }

                displacement = desiredDirection * moveSpeed + _planarImpulse;
            }

            _planarImpulse = Vector3.MoveTowards(_planarImpulse, Vector3.zero, 14f * Time.deltaTime);
            _verticalVelocity -= gravity * Time.deltaTime;
            displacement.y = _verticalVelocity;
            _controller.Move(displacement * Time.deltaTime);

            if (transform.position.y < -12f)
            {
                Combatant guardian = GetComponent<Combatant>();
                guardian?.ApplyDamage(guardian.MaximumVitality, Faction.Corruption, gameObject);
            }
        }

        public void SetVirtualMove(Vector2 input)
        {
            _virtualMove = Vector2.ClampMagnitude(input, 1f);
        }

        public void QueueJump()
        {
            if (_controlEnabled)
            {
                _lastJumpQueuedTime = Time.time;
            }
        }

        public void TryDash()
        {
            if (!_controlEnabled || Time.time < _nextDashAt)
            {
                return;
            }

            Vector3 requestedDirection = CameraRelativeDirection(ReadMoveInput());
            _dashDirection = requestedDirection.sqrMagnitude > 0.01f ? requestedDirection : transform.forward;
            _dashDirection.y = 0f;
            _dashDirection.Normalize();
            _dashEndsAt = Time.time + dashDuration;
            _nextDashAt = Time.time + dashCooldown;
        }

        public void AddPlanarImpulse(Vector3 impulse)
        {
            impulse.y = 0f;
            _planarImpulse += impulse;
        }

        public void SetControlEnabled(bool enabled)
        {
            _controlEnabled = enabled;
            if (!enabled)
            {
                _virtualMove = Vector2.zero;
                _planarImpulse = Vector3.zero;
            }
        }

        private void ReadDeviceActions()
        {
            Keyboard keyboard = Keyboard.current;
            if (keyboard != null)
            {
                if (keyboard.spaceKey.wasPressedThisFrame)
                {
                    QueueJump();
                }

                if (keyboard.leftShiftKey.wasPressedThisFrame || keyboard.rightShiftKey.wasPressedThisFrame)
                {
                    TryDash();
                }
            }

            Gamepad gamepad = Gamepad.current;
            if (gamepad != null)
            {
                if (gamepad.buttonSouth.wasPressedThisFrame)
                {
                    QueueJump();
                }

                if (gamepad.rightShoulder.wasPressedThisFrame)
                {
                    TryDash();
                }
            }
        }

        private Vector2 ReadMoveInput()
        {
            Vector2 result = _virtualMove;
            Keyboard keyboard = Keyboard.current;

            if (keyboard != null)
            {
                Vector2 keyboardInput = Vector2.zero;
                if (keyboard.aKey.isPressed || keyboard.leftArrowKey.isPressed) keyboardInput.x -= 1f;
                if (keyboard.dKey.isPressed || keyboard.rightArrowKey.isPressed) keyboardInput.x += 1f;
                if (keyboard.sKey.isPressed || keyboard.downArrowKey.isPressed) keyboardInput.y -= 1f;
                if (keyboard.wKey.isPressed || keyboard.upArrowKey.isPressed) keyboardInput.y += 1f;
                if (keyboardInput.sqrMagnitude > result.sqrMagnitude) result = keyboardInput;
            }

            Gamepad gamepad = Gamepad.current;
            if (gamepad != null)
            {
                Vector2 gamepadInput = gamepad.leftStick.ReadValue();
                if (gamepadInput.sqrMagnitude > result.sqrMagnitude) result = gamepadInput;
            }

            return Vector2.ClampMagnitude(result, 1f);
        }

        private Vector3 CameraRelativeDirection(Vector2 input)
        {
            if (input.sqrMagnitude < 0.001f)
            {
                return Vector3.zero;
            }

            Transform reference = _cameraTransform != null ? _cameraTransform : transform;
            Vector3 forward = reference.forward;
            Vector3 right = reference.right;
            forward.y = 0f;
            right.y = 0f;
            forward.Normalize();
            right.Normalize();
            return Vector3.ClampMagnitude(forward * input.y + right * input.x, 1f);
        }
    }
}
