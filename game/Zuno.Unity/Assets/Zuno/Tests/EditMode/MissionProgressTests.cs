using NUnit.Framework;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay.Tests
{
    public sealed class MissionProgressTests
    {
        [Test]
        public void RequiredDefeatsUnlockExitWithoutCompletingMission()
        {
            MissionProgress mission = new(3);

            mission.RecordEnemyDefeated();
            mission.RecordEnemyDefeated();
            mission.RecordEnemyDefeated();

            Assert.That(mission.Defeats, Is.EqualTo(3));
            Assert.That(mission.State, Is.EqualTo(MissionState.ExitUnlocked));
            Assert.That(mission.IsTerminal, Is.False);
        }

        [Test]
        public void ExitCannotCompleteBeforeObjective()
        {
            MissionProgress mission = new(1);

            Assert.That(mission.TryCompleteAtExit(), Is.False);
            Assert.That(mission.State, Is.EqualTo(MissionState.Active));
        }

        [Test]
        public void UnlockedExitCompletesExactlyOnce()
        {
            MissionProgress mission = new(1);
            mission.RecordEnemyDefeated();

            Assert.That(mission.TryCompleteAtExit(), Is.True);
            Assert.That(mission.TryCompleteAtExit(), Is.False);
            Assert.That(mission.State, Is.EqualTo(MissionState.Completed));
        }

        [Test]
        public void FailedMissionRejectsFurtherProgress()
        {
            MissionProgress mission = new(2);

            Assert.That(mission.Fail(), Is.True);
            Assert.That(mission.RecordEnemyDefeated(), Is.False);
            Assert.That(mission.TryCompleteAtExit(), Is.False);
            Assert.That(mission.State, Is.EqualTo(MissionState.Failed));
        }
    }
}
