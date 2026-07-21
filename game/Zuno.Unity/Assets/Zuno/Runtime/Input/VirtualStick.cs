using UnityEngine;
using UnityEngine.EventSystems;

namespace Zuno.Gameplay.Input
{
    [DisallowMultipleComponent]
    public sealed class VirtualStick : MonoBehaviour, IPointerDownHandler, IDragHandler, IPointerUpHandler
    {
        [SerializeField] private RectTransform handle;
        [SerializeField, Range(0.1f, 1f)] private float handleRange = 0.62f;

        private RectTransform _baseRect;
        private GuardianMotor _motor;

        public void Initialize(RectTransform stickHandle, GuardianMotor motor)
        {
            _baseRect = (RectTransform)transform;
            handle = stickHandle;
            _motor = motor;
        }

        private void Awake()
        {
            _baseRect = (RectTransform)transform;
        }

        public void OnPointerDown(PointerEventData eventData)
        {
            OnDrag(eventData);
        }

        public void OnDrag(PointerEventData eventData)
        {
            if (_baseRect == null || handle == null || _motor == null)
            {
                return;
            }

            if (!RectTransformUtility.ScreenPointToLocalPointInRectangle(
                    _baseRect,
                    eventData.position,
                    eventData.pressEventCamera,
                    out Vector2 localPoint))
            {
                return;
            }

            Vector2 halfSize = _baseRect.rect.size * 0.5f;
            Vector2 normalized = new(
                halfSize.x > 0f ? localPoint.x / halfSize.x : 0f,
                halfSize.y > 0f ? localPoint.y / halfSize.y : 0f);
            normalized = Vector2.ClampMagnitude(normalized, 1f);
            handle.anchoredPosition = Vector2.Scale(normalized, halfSize) * handleRange;
            _motor.SetVirtualMove(normalized);
        }

        public void OnPointerUp(PointerEventData eventData)
        {
            if (handle != null)
            {
                handle.anchoredPosition = Vector2.zero;
            }

            _motor?.SetVirtualMove(Vector2.zero);
        }
    }
}
