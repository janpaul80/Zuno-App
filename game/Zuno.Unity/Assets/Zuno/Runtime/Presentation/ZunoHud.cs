using UnityEngine;
using UnityEngine.InputSystem;
using UnityEngine.UI;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay.Presentation
{
    [DisallowMultipleComponent]
    public sealed class ZunoHud : MonoBehaviour
    {
        private Combatant _guardian;
        private GuardianMotor _motor;
        private GrasslandsMission _mission;
        private Image _healthFill;
        private Image _dashFill;
        private Text _objective;
        private Text _healthLabel;
        private GameObject _terminalPanel;
        private Text _terminalTitle;
        private Text _terminalBody;

        public void Initialize(
            Combatant guardian,
            GuardianMotor motor,
            GrasslandsMission mission,
            Image healthFill,
            Image dashFill,
            Text healthLabel,
            Text objective,
            GameObject terminalPanel,
            Text terminalTitle,
            Text terminalBody)
        {
            _guardian = guardian;
            _motor = motor;
            _mission = mission;
            _healthFill = healthFill;
            _dashFill = dashFill;
            _healthLabel = healthLabel;
            _objective = objective;
            _terminalPanel = terminalPanel;
            _terminalTitle = terminalTitle;
            _terminalBody = terminalBody;

            _mission.Changed += OnMissionChanged;
            OnMissionChanged(_mission.Progress);
        }

        private void Update()
        {
            if (_guardian == null || _motor == null)
            {
                return;
            }

            _healthFill.fillAmount = _guardian.NormalizedVitality;
            _healthLabel.text = $"AELIS  {_guardian.CurrentVitality}/{_guardian.MaximumVitality}";
            _dashFill.fillAmount = 1f - _motor.DashCooldownNormalized;

            Keyboard keyboard = Keyboard.current;
            if (_mission.Progress.IsTerminal && keyboard != null && keyboard.rKey.wasPressedThisFrame)
            {
                _mission.Restart();
            }
        }

        private void OnMissionChanged(MissionProgress progress)
        {
            if (progress == null)
            {
                return;
            }

            switch (progress.State)
            {
                case MissionState.Active:
                    _objective.text = $"GRASSLANDS // CLEANSE THE PATH  {progress.Defeats}/{progress.RequiredDefeats}";
                    _terminalPanel.SetActive(false);
                    break;
                case MissionState.ExitUnlocked:
                    _objective.text = "OBJECTIVE COMPLETE // ENTER THE GREEN BEACON";
                    _terminalPanel.SetActive(false);
                    break;
                case MissionState.Completed:
                    _objective.text = "GRASSLANDS SECURED";
                    _terminalTitle.text = "MISSION COMPLETE";
                    _terminalBody.text = "Aelis restored the Grasslands beacon.\nNo rewards are granted until a future server validation step.\n\nPRESS R OR TAP RESTART";
                    _terminalPanel.SetActive(true);
                    break;
                case MissionState.Failed:
                    _objective.text = "THE GUARDIAN HAS FALLEN";
                    _terminalTitle.text = "MISSION FAILED";
                    _terminalBody.text = "The corruption still holds the path.\nReturn stronger, Guardian.\n\nPRESS R OR TAP RESTART";
                    _terminalPanel.SetActive(true);
                    break;
            }
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
