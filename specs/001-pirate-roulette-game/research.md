# Research: Testing Framework

**Decision**: Use built-in `console.assert()` for testing.

**Rationale**: The project's constitution emphasizes simplicity. Adding an external testing framework like Jest or Tape.js would introduce unnecessary dependencies and complexity for a small-scale project. `console.assert()` is a built-in browser feature that provides basic assertion capabilities without any setup, perfectly aligning with the "Be simple" principle. Tests can be written in a separate file and run in the browser console.

**Alternatives considered**:

*   **Jest**: A popular and feature-rich testing framework. Rejected due to the overhead of setting up a test runner and its numerous dependencies, which violates the simplicity principle.
*   **Tape.js**: A lightweight testing framework. While simpler than Jest, it still requires adding a dependency and a runner. Rejected in favor of the even simpler `console.assert()`.
