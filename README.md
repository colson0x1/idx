# iDX Code Editor/ IDE (colsidx)
## Version: 1.0.0
## Npm: https://www.npmjs.com/package/colsidx

ColsIDX Code Editor is a powerful online Integrated Development Environment (IDE) that supports JavaScript, JSX, and imports from npm, including popular libraries like React. Built with React, Redux, TypeScript, esbuild, and WebAssembly, this IDE provides a seamless coding experience with features like live preview and Markdown editing.

![idx/colsidx](https://i.imgur.com/bNgxGSz.png)

## Table of Contents
- [iDX Code Editor/ IDE (colsidx)](#idx-code-editor-ide-colsidx)
  - [Version: 1.0.0](#version-100)
  - [Npm: https://www.npmjs.com/package/colsidx](#npm-httpswwwnpmjscompackagecolsidx)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
  - [Usage](#usage)
  - [Project Structure](#project-structure)
  - [Technologies Used](#technologies-used)
  - [License](#license)
  - [Screenshots](#screenshots)

## Features

- **Language Support:** JavaScript, JSX, Markdown.
- **Import from npm:** Easily import and use npm packages like React and more.
- **Live Preview:** See your changes in real-time with the live preview feature.
- **Save and Share:** Save your coding documents, making it easy to revisit and share your work.

## Architecture

The ColsIDX Code Editor is designed with a modular and extensible architecture. Here's an overview of the key components:

- **Frontend:** Built with React and Redux, the frontend handles the user interface and state management.
- **Bundler:** Utilizes esbuild and WebAssembly for efficient bundling of code, including support for fetching npm packages.
- **Server:** Manages backend operations such as saving and fetching coding documents.

For a detailed breakdown of the project structure and how these components interact, refer to the [Project Structure](#project-structure) section.

## Getting Started

### Installation

To install the ColsIDX Code Editor, use the following command:

1. Execute with npx:

```bash
sudo npx colsidx serve
```

Visit `http://localhost:4004` in your browser to access the ColsIDX Code Editor.

## Usage

1. Open the code editor in your browser.
2. Start coding in JavaScript, JSX, or Markdown.
3. Utilize the live preview feature to see your changes instantly.
4. Save your coding documents for future reference or sharing.

## Project Structure

The project is structured using Lerna for managing multiple packages. The key packages include:

- `local-client`: Frontend code built with React and Redux.
- `bundler`: Code bundling functionality using esbuild and WebAssembly.
- `server`: Backend server handling document storage and retrieval.

For a more in-depth understanding, refer to the [Project Structure](./docs/project-structure.md) documentation.

## Technologies Used

- React
- Redux
- TypeScript
- esbuild
- WebAssembly
- Lerna

## License

This project is licensed under the [MIT License](LICENSE).

---

## Screenshots

![idx/colsidx](https://i.imgur.com/1VeRrAd.png)

![idx/colsidx](https://i.imgur.com/JtxruEN.png)

![idx/colsidx](https://i.imgur.com/Xa6gxvY.png)

![idx/colsidx](https://i.imgur.com/bNgxGSz.png)

![idx/colsidx](https://i.imgur.com/3d89Wdc.png)

![idx/colsidx](https://i.imgur.com/T3ObaM0.png)