# Video and Image Generation Pipeline

Version: 2.0
Status: Blackbox Media Adapter Implemented; Production Generation Approval-Gated

Blackbox AI is ZUNO's configured image/video generation provider for concept
frames, storyboards, backgrounds, and selected cinematic candidates. The
server-side adapter implements the official `POST /chat/completions` contract:

- image model default: `flux-pro`
- video model default: `veo-2`
- response contract: HTTPS asset URL in `choices[0].message.content`

Configuration:

- `BLACKBOX_API_KEY`
- `BLACKBOX_BASE_URL` (default `https://api.blackbox.ai`)
- `BLACKBOX_IMAGE_MODEL`
- `BLACKBOX_VIDEO_MODEL`

Prompts and provider responses are not logged. Audit records contain only
provider/model metadata, character counts, correlation ids, and latency.

The existing MuAPI/Higgsfield adapter remains a legacy optional provider while
current assets are migrated. Blackbox is the production direction requested for
new image/video work.

Generation does not equal approval. A candidate cannot ship if the Guardian's
face, species, armor, proportions, weapon, or art direction drifts from the
approved Unity/Meshy asset. Complex final character action may be rendered from
the approved rig inside Unity when generative video cannot hold continuity.

In-game delivery is 16:9 landscape. Optional 9:16 versions are marketing cuts.
Every final movie includes approved narration, commercially cleared music,
sound design, subtitles, checksum, provenance, and a mobile playback test.

Official APIs:

- https://docs.blackbox.ai/api-reference/image
- https://docs.blackbox.ai/api-reference/video
