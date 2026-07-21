using System;

namespace Zuno.Gameplay.Domain
{
    public enum GuardianWeapon
    {
        EnergyBlade,
        BluePulseBlaster
    }

    public enum GuardianAmmo
    {
        BluePulseCells,
        ArcCells
    }

    public enum GuardianArmor
    {
        Sunplate,
        Windweave
    }

    public enum GuardianGadget
    {
        GuardianShield,
        CoinMagnet
    }

    public sealed class GuardianLoadout
    {
        public GuardianLoadout(int rangedAmmo = 36)
        {
            if (rangedAmmo < 0) throw new ArgumentOutOfRangeException(nameof(rangedAmmo));
            RangedAmmo = rangedAmmo;
        }

        public event Action Changed;

        public GuardianWeapon Weapon { get; private set; } = GuardianWeapon.EnergyBlade;
        public GuardianAmmo Ammo { get; private set; } = GuardianAmmo.BluePulseCells;
        public GuardianArmor Armor { get; private set; } = GuardianArmor.Sunplate;
        public GuardianGadget Gadget { get; private set; } = GuardianGadget.GuardianShield;
        public int RangedAmmo { get; private set; }

        public int RangedDamage => Ammo == GuardianAmmo.ArcCells ? 25 : 21;

        public void CycleWeapon()
        {
            Weapon = Weapon == GuardianWeapon.EnergyBlade
                ? GuardianWeapon.BluePulseBlaster
                : GuardianWeapon.EnergyBlade;
            Changed?.Invoke();
        }

        public void CycleAmmo()
        {
            Ammo = Ammo == GuardianAmmo.BluePulseCells
                ? GuardianAmmo.ArcCells
                : GuardianAmmo.BluePulseCells;
            Changed?.Invoke();
        }

        public void CycleArmor()
        {
            Armor = Armor == GuardianArmor.Sunplate
                ? GuardianArmor.Windweave
                : GuardianArmor.Sunplate;
            Changed?.Invoke();
        }

        public void CycleGadget()
        {
            Gadget = Gadget == GuardianGadget.GuardianShield
                ? GuardianGadget.CoinMagnet
                : GuardianGadget.GuardianShield;
            Changed?.Invoke();
        }

        public bool TryConsumeRangedAmmo()
        {
            if (RangedAmmo <= 0) return false;
            RangedAmmo--;
            Changed?.Invoke();
            return true;
        }

        public string WeaponLabel => Weapon == GuardianWeapon.EnergyBlade ? "ENERGY BLADE" : "BLUE PULSE BLASTER";
        public string AmmoLabel => Ammo == GuardianAmmo.BluePulseCells ? "BLUE PULSE CELLS" : "ARC CELLS";
        public string ArmorLabel => Armor == GuardianArmor.Sunplate ? "SUNPLATE" : "WINDWEAVE";
        public string GadgetLabel => Gadget == GuardianGadget.GuardianShield ? "GUARDIAN SHIELD" : "COIN MAGNET";
    }
}
