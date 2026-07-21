using System;
using NUnit.Framework;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay.Tests
{
    public sealed class VitalityTests
    {
        [Test]
        public void DamageClampsAtZeroAndReportsSingleDepletion()
        {
            Vitality vitality = new(50);

            DamageResult result = vitality.ApplyDamage(80);

            Assert.That(result.Applied, Is.EqualTo(50));
            Assert.That(result.BecameDepleted, Is.True);
            Assert.That(vitality.Current, Is.Zero);
            Assert.That(vitality.ApplyDamage(10).BecameDepleted, Is.False);
        }

        [Test]
        public void RestoreCannotExceedMaximum()
        {
            Vitality vitality = new(100);
            vitality.ApplyDamage(30);

            int restored = vitality.Restore(50);

            Assert.That(restored, Is.EqualTo(30));
            Assert.That(vitality.Current, Is.EqualTo(100));
        }

        [TestCase(0)]
        [TestCase(-1)]
        public void MaximumMustBePositive(int maximum)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => _ = new Vitality(maximum));
        }

        [Test]
        public void NegativeDamageIsRejected()
        {
            Vitality vitality = new(25);
            Assert.Throws<ArgumentOutOfRangeException>(() => vitality.ApplyDamage(-1));
        }
    }
}
