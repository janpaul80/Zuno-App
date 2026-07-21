using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay.Presentation
{
    [DisallowMultipleComponent]
    public sealed class MissionLaunchFlow : MonoBehaviour
    {
        private GuardianMotor _motor;
        private GuardianCombat _combat;
        private IReadOnlyList<CorruptedConstruct> _enemies;
        private GameObject _roadmapPanel;
        private GameObject _briefingPanel;
        private Text _briefingTitle;
        private Text _briefingBody;
        private Text _briefingReward;
        private MissionCinematicPlayer _cinematicPlayer;
        private MissionDefinition _selectedMission;

        public void Initialize(
            GuardianMotor motor,
            GuardianCombat combat,
            IReadOnlyList<CorruptedConstruct> enemies,
            GameObject roadmapPanel,
            GameObject briefingPanel,
            Text briefingTitle,
            Text briefingBody,
            Text briefingReward,
            MissionCinematicPlayer cinematicPlayer)
        {
            _motor = motor;
            _combat = combat;
            _enemies = enemies;
            _roadmapPanel = roadmapPanel;
            _briefingPanel = briefingPanel;
            _briefingTitle = briefingTitle;
            _briefingBody = briefingBody;
            _briefingReward = briefingReward;
            _cinematicPlayer = cinematicPlayer;

            SetGameplayEnabled(false);
            ShowRoadmap();
        }

        public void ShowRoadmap()
        {
            _cinematicPlayer?.Close();
            _briefingPanel.SetActive(false);
            _roadmapPanel.SetActive(true);
        }

        public void ShowBriefing(MissionDefinition definition)
        {
            if (definition == null || !definition.Playable)
            {
                return;
            }

            _selectedMission = definition;
            _briefingTitle.text = $"MISSION {definition.Sequence:00} // {definition.Name.ToUpperInvariant()}";
            _briefingBody.text =
                $"{definition.DifficultyLabel}\n\n" +
                $"PROTECT: {definition.ProtectedSite}\n" +
                $"ENEMIES: {definition.EnemyFaction}\n" +
                $"OBJECTIVE: {definition.Objective}\n\n" +
                definition.Briefing;
            _briefingReward.text = $"POTENTIAL REWARD  {definition.BaseCoinReward:N0} COINS\nSERVER VALIDATION REQUIRED";
            _roadmapPanel.SetActive(false);
            _briefingPanel.SetActive(true);
        }

        public void PlaySelectedCinematic()
        {
            if (_selectedMission != null)
            {
                _cinematicPlayer.Play(_selectedMission);
            }
        }

        public void Deploy()
        {
            if (_selectedMission == null || !_selectedMission.Playable)
            {
                return;
            }

            _cinematicPlayer.Close();
            _roadmapPanel.SetActive(false);
            _briefingPanel.SetActive(false);
            SetGameplayEnabled(true);
        }

        private void SetGameplayEnabled(bool enabled)
        {
            _motor?.SetControlEnabled(enabled);
            _combat?.SetControlEnabled(enabled);
            if (_enemies == null) return;

            foreach (CorruptedConstruct enemy in _enemies)
            {
                enemy?.SetBehaviorEnabled(enabled);
            }
        }
    }
}
