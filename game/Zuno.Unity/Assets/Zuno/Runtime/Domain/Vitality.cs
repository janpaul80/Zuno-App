using System;

namespace Zuno.Gameplay.Domain
{
    public readonly struct DamageResult
    {
        public DamageResult(int previous, int current, int applied)
        {
            Previous = previous;
            Current = current;
            Applied = applied;
        }

        public int Previous { get; }
        public int Current { get; }
        public int Applied { get; }
        public bool BecameDepleted => Previous > 0 && Current == 0;
    }

    public sealed class Vitality
    {
        public Vitality(int maximum)
        {
            if (maximum <= 0)
            {
                throw new ArgumentOutOfRangeException(nameof(maximum), "Maximum vitality must be positive.");
            }

            Maximum = maximum;
            Current = maximum;
        }

        public int Maximum { get; }
        public int Current { get; private set; }
        public bool IsDepleted => Current == 0;
        public float Normalized => (float)Current / Maximum;

        public DamageResult ApplyDamage(int amount)
        {
            if (amount < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Damage cannot be negative.");
            }

            int previous = Current;
            Current = Math.Max(0, Current - amount);
            return new DamageResult(previous, Current, previous - Current);
        }

        public int Restore(int amount)
        {
            if (amount < 0)
            {
                throw new ArgumentOutOfRangeException(nameof(amount), "Restore amount cannot be negative.");
            }

            int previous = Current;
            Current = Math.Min(Maximum, Current + amount);
            return Current - previous;
        }
    }
}
