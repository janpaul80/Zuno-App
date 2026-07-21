using System;
using UnityEngine;
using UnityEngine.SceneManagement;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay
{
    [DisallowMultipleComponent]
    public sealed class GrasslandsMission : MonoBehaviour
    {
        private MissionProgress _progress;

        public event Action<MissionProgress> Changed;

        public MissionProgress Progress => _progress;

        public void Initialize(int requiredDefeats)
        {
            _progress = new MissionProgress(requiredDefeats);
            Changed?.Invoke(_progress);
        }

        public void WatchEnemy(Combatant enemy)
        {
            enemy.Defeated += OnCombatantDefeated;
        }

        public void WatchGuardian(Combatant guardian)
        {
            guardian.Defeated += OnGuardianDefeated;
        }

        public bool TryCompleteAtExit()
        {
            if (_progress == null || !_progress.TryCompleteAtExit())
            {
                return false;
            }

            Changed?.Invoke(_progress);
            return true;
        }

        public void Restart()
        {
            SceneManager.LoadScene(SceneManager.GetActiveScene().buildIndex);
        }

        private void OnCombatantDefeated(Combatant combatant, GameObject source)
        {
            if (combatant.Faction != Faction.Corruption || _progress == null)
            {
                return;
            }

            if (_progress.RecordEnemyDefeated())
            {
                Changed?.Invoke(_progress);
            }
        }

        private void OnGuardianDefeated(Combatant combatant, GameObject source)
        {
            if (_progress != null && _progress.Fail())
            {
                Changed?.Invoke(_progress);
            }
        }
    }
}
