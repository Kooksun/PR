# Tasks: Pirate Roulette Game

**Input**: Design documents from `/Users/kooksun/PythonProjects/PirateRoulette/specs/001-pirate-roulette-game/`
**Prerequisites**: plan.md, spec.md, data-model.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the basic file structure for the application.

- [X] T001 [P] Create the main HTML file `index.html`
- [X] T002 [P] Create the CSS file `style.css`
- [X] T003 [P] Create the JavaScript file for game logic `game.js`
- [X] T004 [P] Create the JavaScript file for UI logic `ui.js`

---

## Phase 2: User Story 1 - Game Setup (Priority: P1) 🎯 MVP

**Goal**: Allow users to set up a new game by entering player names.

**Independent Test**: Can be tested by entering names, clicking "start", and verifying that the game board is created with the correct number of slots and players.

### Implementation for User Story 1

- [X] T005 [US1] Implement the header section in `index.html` with an input field for player names and a "Start" button.
- [X] T006 [US1] Implement the main section in `index.html` which will contain the game board.
- [X] T007 [US1] Implement the footer section in `index.html` which will display player names.
- [X] T008 [US1] Style the setup screen elements (header, input, button) in `style.css`.
- [X] T009 [US1] In `game.js`, implement the `Game` class and initialization logic based on `data-model.md`.
- [X] T010 [US1] In `game.js`, implement the logic to handle player name input and create `Player` objects.
- [X] T011 [US1] In `game.js`, implement the logic to determine the number of slots and create the `Slot` objects, including one "pirate" slot.
- [X] T012 [US1] In `ui.js`, implement the function to render the initial game board with empty slots.
- [X] T013 [US1] In `ui.js`, add an event listener to the "Start" button to trigger the game setup logic in `game.js` and render the board.
- [X] T014 [US1] In `game.js`, implement the validation for player count (2-12 players) and empty input.
- [X] T015 [US1] In `ui.js`, implement the logic to display the error messages defined in the spec.

---

## Phase 3: User Story 2 - Playing the Game (Priority: P1)

**Goal**: Allow players to take turns selecting slots.

**Independent Test**: Can be tested by having players select slots and verifying that the game state updates correctly.

### Implementation for User Story 2

- [X] T016 [US2] In `game.js`, implement the turn management logic, including advancing to the next player.
- [X] T017 [US2] In `game.js`, implement the logic for automatic random slot selection for the current player.
- [X] T018 [US2] In `game.js`, implement the logic to handle the re-selection of a slot if a "full" slot is chosen.
- [X] T019 [US2] In `style.css`, implement the circular layout for the slots.
- [X] T020 [US2] In `ui.js`, implement the "thinking" animation (e.g., a spinner next to the player's name) for 2 seconds.
- [X] T021 [US2] In `ui.js`, implement the slot rotation animation.
- [X] T022 [US2] In `ui.js`, implement the animation for a selected slot being revealed as "full".
- [X] T023 [US2] In `ui.js`, update the footer to highlight the current player's name.
- [X] T024 [US2] In `ui.js`, implement the animation for the player name shaking when a safe slot is chosen.

---

## Phase 4: User Story 3 - Losing and Resetting (Priority: P1)

**Goal**: Display a loss message and allow the game to be reset.

**Independent Test**: Can be tested by selecting the "pirate" slot and verifying the loss message and game reset functionality.

### Implementation for User Story 3

- [X] T025 [US3] In `game.js`, implement the logic to check if the selected slot is the "pirate" slot.
- [X] T026 [US3] In `index.html` and `style.css`, create the modal popup for the "loser" message, including the "close" button.
- [X] T027 [US3] In `ui.js`, implement the logic to show the "loser" popup.
- [X] T028 [US3] In `ui.js`, implement the animation for the pirate slot being revealed (changing to red).
- [X] T029 [US3] In `ui.js`, implement the animation for the player name shaking when the pirate slot is chosen.
- [X] T030 [US3] In `game.js`, implement the game reset logic.
- [X] T031 [US3] In `ui.js`, add an event listener to the "close" button on the popup to trigger the game reset logic.

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Add final touches and ensure all constitutional requirements are met.

- [X] T032 [P] Add Korean comments to `game.js` explaining the core logic.
- [X] T033 [P] Add Korean comments to `ui.js` explaining the UI manipulation logic.
- [X] T034 Add Korean console log messages for key game events (e.g., game start, turn change, slot selection, game end).
- [ ] T035 Review and refine all animations for smoothness.
- [ ] T036 Manually test the application against all acceptance criteria in `spec.md`.
