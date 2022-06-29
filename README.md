# Space Burger
A menu for ordering a custom burger

## Public URL
Poject is available by URL: https://bimimot.github.io/burger/

## Based on
Languages: TypeScript, JavaScript, HTML, CSS. \
Tools: React, React Hooks, react-dnd, Redux, CSS modules, WebSocket, Ject, Cypress, ESLint.

## Project's tasks:
- responsive design,
- navigation with the custom scrollbar
- routing with protected routes,
- page 404,
- authorization - (login, register, reset  & restore methods),
- getting items and sending the order via API,
- personal account with the order’s history,
- DnD functionality for making an order,
- the state saves with Redux,
- a middleware for WebSocket,
- Jest tests for the buisness logic,
- Cypress tests for general actions,
- ErrorBoundary component for cathcing errs

## Available Scripts
### `npm start`
Runs the app in the development mode with hot reload. \
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm test`
Launches the test runner in the interactive watch mode.\

### `npm run cypress:open`
Launches the cypress test

### `npm run predeploy`
Call build script and make bundle for deploying

### `npm run deploy`
Deploy project at gh-pages

### `npm run eject`
If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time.\
This command will remove the single build dependency from your project.