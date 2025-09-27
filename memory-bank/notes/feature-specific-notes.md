# Feature-Specific Notes

## Labels Input (SetupScreen)
- Enforce single-word labels: `/^\S{1,16}$/`
- Show live character count and validation message.
- Persist habits immediately after Save.

## Rollover Detection
- On app resume and every 15 minutes, check if `day.date !== today`.
- If device crosses midnight while app foregrounded, run rollover then.

## Animation Budget
- Keep coin sprite lightweight (vector or small PNG). Duration ~300ms.
- Avoid heavy particle effects; aim for <16ms per frame on mid devices.
