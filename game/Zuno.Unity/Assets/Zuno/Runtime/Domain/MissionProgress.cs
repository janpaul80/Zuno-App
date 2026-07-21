using System;

namespace Zuno.Gameplay.Domain
{
    public enum MissionState
    {
        Active,
        ExitUnlocked,
        Completed,
        Failed
    }

    public sealed class MissionProgress
    {
        public MissionProgress(int requiredDefeats)
        {
            if (requiredDefeats <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(requiredDefeats), "A mission needs at least one objective target.");
            }

            RequiredDefeats = requiredDefeats;
            State = MissionState.Active;
        }

        public int RequiredDefeats { get; }
        public int Defeats { get; private set; }
        public MissionState State { get; private set; }
        public bool IsTerminal => State is MissionState.Completed or MissionState.Failed;

        public bool RecordEnemyDefeated()
        {
            if (IsTerminal || Defeats >= RequiredDefeats)
            {
                return false;
            }

            Defeats++;
            if (Defeats == RequiredDefeats)
            {
                State = MissionState.ExitUnlocked;
            }

            return true;
        }

        public bool TryCompleteAtExit()
        {
            if (State != MissionState.ExitUnlocked)
            {
                return false;
            }

            State = MissionState.Completed;
            return true;
        }

        public bool Fail()
        {
            if (IsTerminal)
            {
                return false;
            }

            State = MissionState.Failed;
            return true;
        }
    }
}
