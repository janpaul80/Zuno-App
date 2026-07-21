using NUnit.Framework;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay.Tests
{
    public sealed class GuardianLoadoutTests
    {
        [Test]
        public void PlayerCanCycleEveryVisibleLoadoutSlot()
        {
            GuardianLoadout loadout = new();

            loadout.CycleWeapon();
            loadout.CycleAmmo();
            loadout.CycleArmor();
            loadout.CycleGadget();

            Assert.That(loadout.Weapon, Is.EqualTo(GuardianWeapon.BluePulseBlaster));
            Assert.That(loadout.Ammo, Is.EqualTo(GuardianAmmo.ArcCells));
            Assert.That(loadout.Armor, Is.EqualTo(GuardianArmor.Windweave));
            Assert.That(loadout.Gadget, Is.EqualTo(GuardianGadget.CoinMagnet));
        }

        [Test]
        public void RangedAmmoCannotBecomeNegative()
        {
            GuardianLoadout loadout = new(1);

            Assert.That(loadout.TryConsumeRangedAmmo(), Is.True);
            Assert.That(loadout.TryConsumeRangedAmmo(), Is.False);
            Assert.That(loadout.RangedAmmo, Is.Zero);
        }
    }
}
