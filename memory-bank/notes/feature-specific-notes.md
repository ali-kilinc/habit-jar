# Feature-Specific Notes

## Labels Input (SetupScreen)
- **Current**: Enforce single-word labels: `/^\S{1,16}$/`
- **MVP-3 Change**: Remove single-word restriction, allow spaces (max 16 chars)
- Show live character count and validation message.
- Persist habits immediately after Save.

## Rollover Detection
- On app resume and every 15 minutes, check if `day.date !== today`.
- If device crosses midnight while app foregrounded, run rollover then.

## Animation Budget
- Keep coin sprite lightweight (vector or small PNG). Duration ~300ms.
- Avoid heavy particle effects; aim for <16ms per frame on mid devices.

## MVP-3 Specific Issues
- **Keyboard Covering**: Setup screen habits hidden by keyboard on mobile
- **Input Validation**: Change from single-word to character count (max 16 chars)
- **Mobile UX**: Improve keyboard experience and screen layout

## MVP-4 Visual Assets
- **Coin Image**: User will provide coin image for buttons
- **Fancy Graphics**: Generate +5, -5, +3, -3, +1, -1 value graphics
- **Button Enhancement**: Replace 'coin' text with coin image

## MVP-5 Jar Enhancement
- **Jar Image**: Replace jar with visual jar image
- **Coin Filling**: Fill jar with coins based on daily total (0-100 ratio)
- **Visual Feedback**: Empty when 0 or negative, full when 100+
