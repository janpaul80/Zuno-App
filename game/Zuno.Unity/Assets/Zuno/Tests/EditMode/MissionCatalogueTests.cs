using System.Linq;
using NUnit.Framework;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay.Tests
{
    public sealed class MissionCatalogueTests
    {
        [Test]
        public void CatalogueDefinesNineOrderedMissionsAcrossThreeTiers()
        {
            Assert.That(MissionCatalogue.All, Has.Count.EqualTo(9));
            Assert.That(MissionCatalogue.All.Select(mission => mission.Sequence), Is.EqualTo(Enumerable.Range(1, 9)));
            Assert.That(MissionCatalogue.All.Select(mission => mission.Id).Distinct().Count(), Is.EqualTo(9));
            Assert.That(MissionCatalogue.All.Select(mission => mission.Difficulty).Distinct().Count(), Is.EqualTo(3));
        }

        [Test]
        public void EveryMissionExplainsEnemiesProtectionRewardsAndCinematic()
        {
            foreach (MissionDefinition mission in MissionCatalogue.All)
            {
                Assert.That(mission.EnemyFaction, Is.Not.Empty);
                Assert.That(mission.ProtectedSite, Is.Not.Empty);
                Assert.That(mission.Objective, Is.Not.Empty);
                Assert.That(mission.BaseCoinReward, Is.GreaterThan(0));
                Assert.That(mission.CinematicFileName, Does.EndWith(".mp4"));
            }
        }
    }
}
