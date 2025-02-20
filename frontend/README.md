# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Security Considerations

To ensure the security of the application, avoid using the following methods for evaluating strings:

- `eval()`
- `new Function()`
- `setTimeout([string], ...)`
- `setInterval([string], ...)`

These methods can introduce security vulnerabilities and should be avoided.
