# Six-Button Habit Jar

This is an MVP design for a gamified habit tracker built with **React Native**.

## Concept
- 6 buttons: 3 good habits (+5, +3, +1) on the left, 3 bad habits (−5, −3, −1) on the right.
- A **glass jar** in the center collects coins.
- **Level system**:
  - +1 level per 100 coins gained.
  - −1 level if the day ends negative.
- Users define the 6 habits (labels up to 16 chars, optional descriptions) on first run.

## Features
- Simple UI: Jar + 6 buttons + Level display.
- Single animation: coins move in (good) or out (bad).
- Unlimited taps; user decides granularity (per page read, per workout, etc.).
- Local persistence only (AsyncStorage).

## Repository Structure
```
project-root/
├── memory-bank/            # Design and architecture docs
│   └── notes/              # Feature-specific and contextual notes
└── .cursor/rules/          # Cursor AI rules for memory bank usage
```

## Usage
- Import the **memory bank** into Cursor AI to keep context while coding.
- Follow `.cursor/rules/core.mdc` for implementation rules.
- See `memory-bank/01-architecture.md` for stack and data model details.

## License
For personal learning and prototyping use.
