using System;
using System.Collections.Generic;
using System.Linq;

namespace Zuno.Gameplay.Domain
{
    public static class MissionCatalogue
    {
        private static readonly MissionDefinition[] Definitions =
        {
            new(
                "grasslands-01", 1, "Grasslands", MissionDifficulty.Scout,
                "the Heartwood Beacon", "Corrupted Constructs", "Cleanse the path and restore the beacon",
                "Aelis enters the western Grasslands where corrupted constructs are closing on the Heartwood Beacon, one of Zunlandia's oldest warning lights.",
                300, "grasslands-01-intro.mp4", true),
            new(
                "crystal-river-02", 2, "Crystal River", MissionDifficulty.Scout,
                "the Watersong Springs", "Rift Stalkers", "Drive the stalkers from the river crossings",
                "The Watersong Springs carry life across Zunlandia. Rift Stalkers are poisoning the crossings and must be forced back.",
                450, "crystal-river-02-intro.mp4", false),
            new(
                "sky-canyon-03", 3, "Sky Canyon", MissionDifficulty.Scout,
                "the Wind Shrine", "Talon Raiders", "Reach the shrine and break the aerial siege",
                "Talon Raiders have surrounded the Wind Shrine. The Guardians must reopen the high road before the skies fall silent.",
                600, "sky-canyon-03-intro.mp4", false),
            new(
                "ember-volcano-04", 4, "Ember Volcano", MissionDifficulty.Guardian,
                "the Sunforge Core", "Magma Beasts", "Stabilize the forge before it erupts",
                "Magma Beasts are feeding on the Sunforge Core. Hold the forge chambers and prevent a chain eruption beneath Zunlandia.",
                850, "ember-volcano-04-intro.mp4", false),
            new(
                "shadow-temple-05", 5, "Shadow Temple", MissionDifficulty.Guardian,
                "the Memory Archive", "the Shade Clan", "Recover the archive seals",
                "The Shade Clan has breached the Memory Archive. Recover its seals before Zunlandia's history is erased.",
                1000, "shadow-temple-05-intro.mp4", false),
            new(
                "frozen-rift-06", 6, "Frozen Rift", MissionDifficulty.Guardian,
                "the Northlight Gate", "Ice Ravagers", "Hold the gate through the whiteout",
                "Ice Ravagers are massing beyond the Northlight Gate. The Guardians must keep the northern passage from collapsing.",
                1200, "frozen-rift-06-intro.mp4", false),
            new(
                "chaos-dimension-07", 7, "Chaos Dimension", MissionDifficulty.Legend,
                "the Reality Anchor", "the Chaosborn", "Repair the anchor and escape the fracture",
                "The Reality Anchor is breaking apart. Defeat the Chaosborn and reconnect Zunlandia to stable ground.",
                1600, "chaos-dimension-07-intro.mp4", false),
            new(
                "neon-abyss-08", 8, "Neon Abyss", MissionDifficulty.Legend,
                "the Lumen Conduit", "Abyss Hunters", "Restart the conduit beneath the city",
                "Abyss Hunters have cut power to the Lumen Conduit. Descend, restore the current, and bring Zunlandia's defenses online.",
                2000, "neon-abyss-08-intro.mp4", false),
            new(
                "titan-arena-09", 9, "Titan Arena", MissionDifficulty.Legend,
                "the Crown of Zunlandia", "the Corrupted Armies", "Defeat the siege commanders",
                "The Corrupted Armies have reached the final arena. Every Guardian stands between them and the Crown of Zunlandia.",
                2500, "titan-arena-09-intro.mp4", false)
        };

        public static IReadOnlyList<MissionDefinition> All { get; } = Array.AsReadOnly(Definitions);

        public static MissionDefinition Grasslands => Definitions[0];

        public static MissionDefinition GetRequired(string id)
        {
            MissionDefinition definition = Definitions.FirstOrDefault(candidate => candidate.Id == id);
            return definition ?? throw new KeyNotFoundException($"Unknown ZUNO mission: {id}");
        }
    }
}
