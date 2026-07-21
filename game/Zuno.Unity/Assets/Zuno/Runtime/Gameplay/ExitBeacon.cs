using UnityEngine;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay
{
    [RequireComponent(typeof(SphereCollider))]
    [DisallowMultipleComponent]
    public sealed class ExitBeacon : MonoBehaviour
    {
        private GrasslandsMission _mission;
        private Renderer _renderer;
        private Material _material;
        private Color _lockedColor = new(0.55f, 0.08f, 0.85f);
        private Color _unlockedColor = new(0.1f, 1f, 0.45f);

        public void Initialize(GrasslandsMission mission, Renderer beaconRenderer)
        {
            _mission = mission;
            _renderer = beaconRenderer;
            _material = _renderer != null ? _renderer.material : null;
            _mission.Changed += OnMissionChanged;
            OnMissionChanged(_mission.Progress);
        }

        private void Awake()
        {
            SphereCollider trigger = GetComponent<SphereCollider>();
            trigger.isTrigger = true;
            trigger.radius = 1.8f;
        }

        private void Update()
        {
            transform.Rotate(Vector3.up, 55f * Time.deltaTime, Space.World);
            float pulse = 1f + Mathf.Sin(Time.time * 3.4f) * 0.08f;
            transform.localScale = Vector3.one * pulse;
        }

        private void OnTriggerEnter(Collider other)
        {
            GuardianMotor guardian = other.GetComponentInParent<GuardianMotor>();
            if (guardian == null || _mission == null || !_mission.TryCompleteAtExit())
            {
                return;
            }

            guardian.SetControlEnabled(false);
            guardian.GetComponent<GuardianCombat>()?.SetControlEnabled(false);
        }

        private void OnMissionChanged(MissionProgress progress)
        {
            if (_material == null || progress == null)
            {
                return;
            }

            Color color = progress.State is MissionState.ExitUnlocked or MissionState.Completed
                ? _unlockedColor
                : _lockedColor;

            if (_material.HasProperty("_BaseColor")) _material.SetColor("_BaseColor", color);
            if (_material.HasProperty("_Color")) _material.SetColor("_Color", color);
            if (_material.HasProperty("_EmissionColor")) _material.SetColor("_EmissionColor", color * 3f);
        }

        private void OnDestroy()
        {
            if (_mission != null)
            {
                _mission.Changed -= OnMissionChanged;
            }
        }
    }
}
