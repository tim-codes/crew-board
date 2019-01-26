# crew-board
Kanban board for managing the hiring process of personnel applications.

An example React application that makes use of MobX for state management and is bundled with **ParcelJS**.

#### Usage:
Development environment:
`npm run dev`

Create production bundle:
`npm run bundle`

Hit 'Load candidates' button to fetch new data which is appended to the store.

State is maintained using browser `localStorage` API, with synchronisation across windows/tabs.

#### Todos:
1. add Jest/Enzyme to package for unit tests on core components
2. complete UI setup with drag/drop functionalities to move cards between columns
3. add filter controls to UI
4. author Dockerfile
5. add some *"css-in-JS"* framework which will keep the atomicity of components
 