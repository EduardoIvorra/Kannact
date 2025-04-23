## What testing strategy would you implement to prevent regressions?

To avoid regressions and keep everything working, I’d go for a mix of unit tests, integration tests, and E2E tests. The idea is to try to cover the important parts of the app.

This is what I've done for this app:

-   **Unit tests**: I used Vitest and @testing-library/react. I added tests for the components `CardActions` and `NoteCard`. I didn’t cover everything, but you can get the idea from the test names. Ideally, all the components and logic functions should have tests.

-   **Integration tests**: Also using Vitest and @testing-library/react. I added a small test to check error handling in the `EditPatient`. The idea here is to test a component together with the custom hook and how they handle data updates.

-   **E2E tests**: I didn’t add these, but for a full app test, I’d use Cypress. For example, testing adding a new patient, editing it, and deleting it — just to make sure the full flow works as expected.

## Which components or features would you prioritize for testing and why?

I’d start by testing the E2E flows for patients and notes, since they are the core of the app. Then I’d focus on the Dialogs and custom hooks, since they manage data and state. Later I’d go for simpler components like UI stuff or style validations.

Basically, start from the most critical parts and go down from there.

## What testing tools or libraries would you use with this stack?

Like I mentioned, I used **Vitest** and **@testing-library/react** for unit and integration tests. For E2E I’d go with **Cypress**.

I can also use Jest, but I prefer Vitest just because I’ve used it more recently and feel more comfortable with it.

Just to add: I’ve done TDD in some projects and I think it’s a great approach if the project is big enough, the team is experienced and time allow it.
