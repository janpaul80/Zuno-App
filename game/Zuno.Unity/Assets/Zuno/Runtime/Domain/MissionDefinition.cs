using System;

namespace Zuno.Gameplay.Domain
{
    public enum MissionDifficulty
    {
        Scout,
        Guardian,
        Legend
    }

    public sealed class MissionDefinition
    {
        public MissionDefinition(
            string id,
            int sequence,
            string name,
            MissionDifficulty difficulty,
            string protectedSite,
            string enemyFaction,
            string objective,
            string briefing,
            int baseCoinReward,
            string cinematicFileName,
            bool playable)
        {
            if (string.IsNullOrWhiteSpace(id)) throw new ArgumentException("A mission id is required.", nameof(id));
            if (sequence <= 0) throw new ArgumentOutOfRangeException(nameof(sequence));
            if (string.IsNullOrWhiteSpace(name)) throw new ArgumentException("A mission name is required.", nameof(name));
            if (string.IsNullOrWhiteSpace(protectedSite)) throw new ArgumentException("Every mission must identify what the Guardians protect.", nameof(protectedSite));
            if (string.IsNullOrWhiteSpace(enemyFaction)) throw new ArgumentException("Every mission must identify its enemies.", nameof(enemyFaction));
            if (string.IsNullOrWhiteSpace(objective)) throw new ArgumentException("Every mission needs an objective.", nameof(objective));
            if (baseCoinReward < 0) throw new ArgumentOutOfRangeException(nameof(baseCoinReward));
            if (string.IsNullOrWhiteSpace(cinematicFileName)) throw new ArgumentException("Every mission needs a cinematic asset name.", nameof(cinematicFileName));

            Id = id;
            Sequence = sequence;
            Name = name;
            Difficulty = difficulty;
            ProtectedSite = protectedSite;
            EnemyFaction = enemyFaction;
            Objective = objective;
            Briefing = briefing ?? string.Empty;
            BaseCoinReward = baseCoinReward;
            CinematicFileName = cinematicFileName;
            Playable = playable;
        }

        public string Id { get; }
        public int Sequence { get; }
        public string Name { get; }
        public MissionDifficulty Difficulty { get; }
        public string ProtectedSite { get; }
        public string EnemyFaction { get; }
        public string Objective { get; }
        public string Briefing { get; }
        public int BaseCoinReward { get; }
        public string CinematicFileName { get; }
        public bool Playable { get; }

        public string DifficultyLabel => Difficulty switch
        {
            MissionDifficulty.Scout => "SCOUT // EASY",
            MissionDifficulty.Guardian => "GUARDIAN // MEDIUM",
            MissionDifficulty.Legend => "LEGEND // HARD",
            _ => Difficulty.ToString().ToUpperInvariant()
        };
    }
}
