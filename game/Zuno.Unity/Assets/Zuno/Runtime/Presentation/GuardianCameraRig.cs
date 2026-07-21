using UnityEngine;

namespace Zuno.Gameplay.Presentation
{
    [DisallowMultipleComponent]
    public sealed class GuardianCameraRig : MonoBehaviour
    {
        [SerializeField] private Transform target;
        [SerializeField] private Vector3 localOffset = new(0f, 4.6f, -7.2f);
        [SerializeField, Min(0.1f)] private float positionSharpness = 8f;
        [SerializeField, Min(0.1f)] private float lookSharpness = 12f;

        private Vector3 _lookPoint;

        public void Initialize(Transform followTarget)
        {
            target = followTarget;
            _lookPoint = target.position + Vector3.up * 1.15f;
            transform.position = target.TransformPoint(localOffset);
            transform.LookAt(_lookPoint);
        }

        private void LateUpdate()
        {
            if (target == null)
            {
                return;
            }

            Vector3 desiredPosition = target.TransformPoint(localOffset);
            transform.position = Vector3.Lerp(
                transform.position,
                desiredPosition,
                1f - Mathf.Exp(-positionSharpness * Time.deltaTime));

            Vector3 desiredLookPoint = target.position + Vector3.up * 1.15f;
            _lookPoint = Vector3.Lerp(
                _lookPoint,
                desiredLookPoint,
                1f - Mathf.Exp(-lookSharpness * Time.deltaTime));
            transform.rotation = Quaternion.LookRotation(_lookPoint - transform.position, Vector3.up);
        }
    }
}
