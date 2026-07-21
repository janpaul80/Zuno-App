# Meshy AI Integration

Version: 2.0
Status: Official Text-to-3D Preview/Refine Adapter Implemented

Meshy is an offline production provider for ZUNO characters, enemy creatures,
weapons, armor, gadgets, and environment props. It is never a runtime APK
dependency and never mutates player state.

The server-side `meshyClient` implements Meshy's official Text-to-3D v2 flow:

1. `POST /openapi/v2/text-to-3d` with `mode: preview`
2. poll `GET /openapi/v2/text-to-3d/:id`
3. submit `mode: refine` with the approved preview task id and PBR enabled
4. poll the refine task and return GLB/FBX asset URLs

Configuration:

- `MESHY_AI_API` — server-only key
- `MESHY_BASE_URL` — defaults to `https://api.meshy.ai`
- legacy `MESHI_AI_API` remains temporarily readable for migration

Calling `generateAsset` consumes provider credits. Unit tests mock all network
traffic and never spend credits. Returned URLs must be downloaded immediately
to controlled storage because provider delivery URLs may expire.

No generated asset becomes final automatically. It must pass identity,
provenance/license, topology, UV/PBR, rig, animation, scale, collider, LOD,
texture memory, draw-call, and Android frame-time review.

Official API: https://docs.meshy.ai/en/api/text-to-3d
