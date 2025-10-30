# Feature Specification: Pirate Roulette Game

**Feature Branch**: `001-pirate-roulette-game`
**Created**: 2025-10-30
**Status**: Draft
**Input**: User description: "1. Game logic 1.1 Setup stage - players can be 2~12, with comma separated names input - ready empty slots: if players < 4, 12 slots; if players 4~8, 16 slots; if players 9~12, 20 slots - make ONE random slot as "pirate" slot 1.2 Play stage - players take turns to select slots. seletion is random in slot's size - if selected slot is "pirate" slot, player loses and game ends - if selected slot is empty, set the slot as "full". and continue to next player's turn - if selected slot is already "full", the player must select again 1.3 End stage - when a player selects the "pirate" slot, show a message in modal popup style that the player has lost - if popup is closed, reset the game to setup stage 1.4 Turn order - players take turns in the order of their names input - after the last player, turn goes back to the first player - in each turn, wait 2 secs (think), rotate the slots (animation) to the selected slot be in 6 clock position for short time (< 1sec), then show selecting animation. 2. Screens - header : no title, input fields for player names, and start button - main : a big circle showing slots in a circular layout with slots numbered from 1 to total slots and following below design:, - empty slots as empty box - full slots as gray-blue box - pirate slot as red box (only revealed when selected) - footer : 참가자들의 이름이 적당한 간격으로 나열된다. 현재 턴인 참가자의 이름이 가운데 위치하며 다른 이름들보다 크게 강조 표시된다. 3. Animaions - 턴이 변경되면 footer의 참가자 이름들이 부드럽게 이동하여 현재 턴인 참가자의 이름이 가운데에 오도록 한다. - 잠시 생각하는 동안(2초) 참가자 이름 옆에 로딩 스피너가 표시된다. - 선택한 슬롯이 6시 위치에 오도록 슬롯을 회전시키는 애니메이션이 시작된다. - 만약 선택한 슬롯이 빈 슬롯인 경우, 참가자의 이름이 잠깐 상하로 흔들리고, 빈 슬롯은 full 슬롯으로 변경되는 애니메이션이 시작된다. - 만약 선택한 슬롯이 이미 채워진 슬롯인 경우, 다시 잠시 생각하고(1초, 로딩스피너 표시) 다른 슬롯을 선택하도록 한다. - 만약 선택한 슬롯이 해적 슬롯인 경우, 참가자의 이름이 좌우로 흔들리고, 해적 슬롯이 빨간색으로 변경되는 애니메이션이 시작된다. 그런 다음 모달 팝업이 표시된다."

## Clarifications

### Session 2025-10-30

- Q: How should the user be able to close the 'Game Over' popup? → A: Add a dedicated "close" button inside the popup.
- Q: What error message should be displayed if the user clicks "Start" without entering any player names? → A: "Please enter player names."
- Q: What specific error message should be displayed if the number of players is outside the 2-12 range? → A: "Number of players must be between 2 and 12."
- Q: How should the random slot selection work? → A: The system should select a random slot from all available slots, regardless of its state. The state of the selected slot will be checked afterwards.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Game Setup (Priority: P1)

As a user, I want to set up a new game by entering player names so that we can start playing.

**Why this priority**: This is the entry point of the game and is essential for starting a new session.

**Independent Test**: Can be tested by entering names, clicking "start", and verifying that the game board is created with the correct number of slots and players.

**Acceptance Scenarios**:

1.  **Given** the game is on the setup screen, **When** I enter 2 to 12 comma-separated player names and click "Start", **Then** the game board is displayed with the correct number of players and slots.
2.  **Given** the game is on the setup screen, **When** I enter fewer than 2 or more than 12 names, **Then** the error message "Number of players must be between 2 and 12." is shown.
3.  **Given** the game is on the setup screen, **When** I click "Start" without entering any names, **Then** the error message "Please enter player names." is shown.

### User Story 2 - Playing the Game (Priority: P1)

As a player, I want to take turns selecting slots to see who avoids the pirate.

**Why this priority**: This is the core gameplay loop.

**Independent Test**: Can be tested by having players select slots and verifying that the game state updates correctly.

**Acceptance Scenarios**:

1.  **Given** it is my turn, **When** a slot is automatically selected for me, **Then** the slot is revealed as either "full" or "pirate".
2.  **Given** the selected slot is empty, **When** it is my turn, **Then** the slot becomes "full", and the turn passes to the next player.
3.  **Given** the selected slot is already "full", **When** it is my turn, **Then** another slot is selected for me after a short delay.

### User Story 3 - Losing and Resetting (Priority: P1)

As a player, I want to see a clear message when I lose and be able to easily restart the game.

**Why this priority**: This defines the end condition of the game and allows for re-playability.

**Independent Test**: Can be tested by selecting the "pirate" slot and verifying the loss message and game reset functionality.

**Acceptance Scenarios**:

1.  **Given** it is my turn, **When** the selected slot is the "pirate" slot, **Then** a modal popup appears declaring me the loser.
2.  **Given** the loser popup is displayed, **When** I click the "close" button, **Then** the game resets to the setup stage.

## Requirements *(mandatory)*

### Functional Requirements

-   **FR-001**: The system MUST allow 2 to 12 players, with names entered as comma-separated values.
-   **FR-002**: The system MUST create a game board with a specific number of slots based on the number of players:
    -   < 4 players: 12 slots
    -   4-8 players: 16 slots
    -   9-12 players: 20 slots
-   **FR-003**: The system MUST designate exactly one slot as the "pirate" slot at random.
-   **FR-004**: Players MUST take turns in the order their names were entered.
-   **FR-005**: For each turn, the system MUST automatically select a random, unrevealed slot for the current player after a 2-second "thinking" animation.
-   **FR-006**: If an empty slot is selected, it MUST be marked as "full", and the turn proceeds to the next player.
-   **FR-007**: If a "full" slot is selected, the system MUST re-select another slot for the same player after a 1-second delay.
-   **FR-008**: If the "pirate" slot is selected, the game MUST end, and a modal popup MUST be displayed to indicate the losing player.
-   **FR-009**: Clicking the "close" button on the "loser" popup MUST reset the game to the initial setup screen.
-   **FR-010**: The UI MUST display slots in a circular layout.
-   **FR-011**: The footer MUST display the list of player names, highlighting the current player in the center with a larger font.
-   **FR-012**: The system MUST implement animations for turn changes, thinking, slot rotation, and revealing slots.
-   **FR-013**: The "loser" popup MUST contain a "close" button.
-   **FR-014**: The system MUST display the error message "Please enter player names." if the user clicks "Start" without entering any names.
-   **FR-015**: The system MUST display the error message "Number of players must be between 2 and 12." if the number of players is not between 2 and 12.

### Key Entities *(include if feature involves data)*

-   **Game**: Represents the overall game state, including the list of players, the slots, and the current turn.
-   **Player**: Represents a participant in the game, having a name.
-   **Slot**: Represents a single slot on the board, which can be in one of three states: "empty", "full", or "pirate".

## Success Criteria *(mandatory)*

### Measurable Outcomes

-   **SC-001**: A user can successfully start, play, and finish a game in under 5 minutes.
-   **SC-002**: 95% of users can understand the game rules and how to play without instructions.
-   **SC-003**: All animations must complete in under 2 seconds to maintain a fluid user experience.