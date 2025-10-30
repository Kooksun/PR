# Data Model

This document defines the data structures for the Pirate Roulette game.

## Game

Represents the overall game state.

-   **players**: `Player[]` - An array of Player objects.
-   **slots**: `Slot[]` - An array of Slot objects.
-   **currentPlayerIndex**: `number` - The index of the current player in the `players` array.
-   **gameState**: `string` - The current state of the game. Can be one of: `setup`, `playing`, `ended`.

## Player

Represents a participant in the game.

-   **name**: `string` - The name of the player.

## Slot

Represents a single slot on the board.

-   **id**: `number` - A unique identifier for the slot (e.g., 1, 2, 3...).
-   **state**: `string` - The current state of the slot. Can be one of: `empty`, `full`, `pirate`.
