# Approved mission cinematics

The Unity runtime resolves production cinematics from this folder by the stable
filenames in `MissionCatalogue.cs`.

Runtime master contract:

- 16:9 landscape, 1920x1080 master (1280x720 mobile delivery allowed)
- H.264 video with AAC stereo audio in an MP4 container
- narration, music, and final mix reviewed separately before muxing
- subtitles delivered as a reviewed sidecar during the localization milestone
- 24 or 30 FPS; no variable-frame-rate delivery files
- normalized dialogue and music ducking; no clipping
- production provenance record required before the MP4 is committed or uploaded

No placeholder video is committed. Missing packages display the written mission
briefing and never block gameplay.
