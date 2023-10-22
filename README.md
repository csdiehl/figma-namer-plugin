# Figma Re-namer Plugin

## Approach

This plugin allows a designer to replace names of specific components in a Figma document. The user can enter text to allow for any naming scheme.

I use key-value pairs to store the original and new names. I track the form values through a React ref. On submit, the form posts a message to the controller with the type of action and the key-value pairs for changing the names.

There are several target nodes to change. I traverse the nodes, maintaining high performance using the `findAllWithCriteria` method and the `skipInvisibleInstanceChildren` option to check only visible nodes that are instances of a component. I iterate through these and check if they are in the list of nodes to change.

I designed the actions to be non-destructive and easy to undo. If the user changes the names accidentally, there is an undo button. To implement this I used Figma's `setPluginData` method to attach a status to the changed text nodes, showing that they were modified. This allows me to avoid modifying nodes that were changed to the same text by some method other than the plugin. The user must undo before entering new input - this ensures that the mapping of original names to new names is not lost through the user modifying the form again after they've already changed the names.

### Future Iterations

For future iterations, I would provide more robust form validation. The form currently handles empty input, but the team may want to restrict the inputs further - for example, to not allow unreasonably long names, or names of other important components in the design system.

I also might provide the option to select all instances of a certain type of component to change.

## Quickstart

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).

## Toolings

This repo is using:

- React + Webpack
- TypeScript
- Prettier precommit hook
