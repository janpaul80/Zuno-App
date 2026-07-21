using System.IO;
using UnityEngine;
using UnityEngine.UI;
using UnityEngine.Video;
using Zuno.Gameplay.Domain;

namespace Zuno.Gameplay.Presentation
{
    [DisallowMultipleComponent]
    public sealed class MissionCinematicPlayer : MonoBehaviour
    {
        private GameObject _panel;
        private RawImage _surface;
        private Text _title;
        private Text _fallback;
        private VideoPlayer _player;
        private RenderTexture _target;

        public void Initialize(GameObject panel, RawImage surface, Text title, Text fallback)
        {
            _panel = panel;
            _surface = surface;
            _title = title;
            _fallback = fallback;

            _target = new RenderTexture(1280, 720, 0, RenderTextureFormat.ARGB32)
            {
                name = "ZUNO Mission Cinematic Target"
            };
            _target.Create();
            _surface.texture = _target;

            _player = gameObject.AddComponent<VideoPlayer>();
            _player.playOnAwake = false;
            _player.isLooping = false;
            _player.renderMode = VideoRenderMode.RenderTexture;
            _player.targetTexture = _target;
            _player.audioOutputMode = VideoAudioOutputMode.Direct;
            _player.prepareCompleted += OnPrepared;
            _player.errorReceived += OnError;
            _player.loopPointReached += OnFinished;
            _panel.SetActive(false);
        }

        public void Play(MissionDefinition definition)
        {
            if (definition == null || _player == null) return;

            _title.text = $"{definition.Name.ToUpperInvariant()} // CINEMATIC BRIEFING";
            _fallback.text =
                $"Preparing the cinematic package...\n\n" +
                $"Protect {definition.ProtectedSite}.\n" +
                $"Enemy force: {definition.EnemyFaction}.";
            _fallback.gameObject.SetActive(true);
            _surface.gameObject.SetActive(false);
            _panel.SetActive(true);

            string path = Path.Combine(
                Application.streamingAssetsPath,
                "Zuno",
                "Cinematics",
                definition.CinematicFileName);

#if UNITY_EDITOR
            if (!File.Exists(path))
            {
                ShowMissingPackage(definition);
                return;
            }
#endif

            _player.Stop();
            _player.url = path;
            _player.Prepare();
        }

        public void Close()
        {
            if (_player != null) _player.Stop();
            if (_panel != null) _panel.SetActive(false);
        }

        private void OnPrepared(VideoPlayer source)
        {
            _fallback.gameObject.SetActive(false);
            _surface.gameObject.SetActive(true);
            source.Play();
        }

        private void OnError(VideoPlayer source, string message)
        {
            _surface.gameObject.SetActive(false);
            _fallback.gameObject.SetActive(true);
            _fallback.text =
                "The approved cinematic package is not installed in this build.\n\n" +
                "Use the written mission briefing, or tap SKIP to return to loadout preparation.";
        }

        private void OnFinished(VideoPlayer source)
        {
            _fallback.text = "CINEMATIC COMPLETE\n\nTap SKIP to return to mission preparation.";
            _fallback.gameObject.SetActive(true);
        }

        private void ShowMissingPackage(MissionDefinition definition)
        {
            _surface.gameObject.SetActive(false);
            _fallback.gameObject.SetActive(true);
            _fallback.text =
                "CINEMATIC ASSET PENDING PRODUCTION\n\n" +
                definition.Briefing + "\n\n" +
                "The runtime player is ready; this development build contains no unapproved placeholder video.";
        }

        private void OnDestroy()
        {
            if (_player != null)
            {
                _player.prepareCompleted -= OnPrepared;
                _player.errorReceived -= OnError;
                _player.loopPointReached -= OnFinished;
            }

            if (_target != null)
            {
                _target.Release();
                Destroy(_target);
            }
        }
    }
}
