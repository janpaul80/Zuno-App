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
        private GuardianCombat _combat;
        private GrasslandsMission _mission;
        private Image _healthFill;
        private Image _dashFill;
        private Text _objective;
        private Text _healthLabel;
        private Text _coinsLabel;
        private Text _weaponLabel;
        private Text _ammoLabel;
        private Text _armorLabel;
        private Text _gadgetLabel;
        private GameObject _terminalPanel;
        private Text _terminalTitle;
        private Text _terminalBody;

        public void Initialize(
            Combatant guardian,
            GuardianMotor motor,
            GuardianCombat combat,
            GrasslandsMission mission,
            Image healthFill,
            Image dashFill,
            Text healthLabel,
            Text objective,
            Text coinsLabel,
            Text weaponLabel,
            Text ammoLabel,
            Text armorLabel,
            Text gadgetLabel,
            GameObject terminalPanel,
            Text terminalTitle,
            Text terminalBody)
        {
            _guardian = guardian;
            _motor = motor;
            _combat = combat;
            _mission = mission;
            _healthFill = healthFill;
            _dashFill = dashFill;
            _healthLabel = healthLabel;
            _objective = objective;
            _coinsLabel = coinsLabel;
            _weaponLabel = weaponLabel;
            _ammoLabel = ammoLabel;
            _armorLabel = armorLabel;
            _gadgetLabel = gadgetLabel;
            _terminalPanel = terminalPanel;
            _terminalTitle = terminalTitle;
            _terminalBody = terminalBody;

            _mission.Changed += OnMissionChanged;
            _combat.Loadout.Changed += OnLoadoutChanged;
            OnLoadoutChanged();
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
                    _coinsLabel.text = $"COINS  0  // +{MissionCatalogue.Grasslands.BaseCoinReward} PENDING VALIDATION";
                    _terminalTitle.text = "MISSION COMPLETE";
                    _terminalBody.text = $"Aelis restored the Heartwood Beacon.\nPotential reward: {MissionCatalogue.Grasslands.BaseCoinReward} coins.\nThe server must validate the mission before granting them.\n\nPRESS R OR TAP RESTART";
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

        private void OnLoadoutChanged()
        {
            if (_combat == null) return;

            GuardianLoadout loadout = _combat.Loadout;
            _weaponLabel.text = $"WEAPON  //  {loadout.WeaponLabel}";
            _ammoLabel.text = $"AMMO  //  {loadout.AmmoLabel}  [{loadout.RangedAmmo}]";
            _armorLabel.text = $"ARMOR  //  {loadout.ArmorLabel}";
            _gadgetLabel.text = $"GADGET  //  {loadout.GadgetLabel}";
        }

        private void OnDestroy()
        {
            if (_mission != null)
            {
                _mission.Changed -= OnMissionChanged;
            }


            if (_combat != null)
            {
                _combat.Loadout.Changed -= OnLoadoutChanged;
            }
        }
    }
}
