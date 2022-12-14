import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Raleway', 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
      font-size: 1rem;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }
  li {
    list-style-type: none;
  }
  a {
    text-decoration: none;
    height: inherit;
    color: black;
  }
  a:hover {
    color: black;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Custom container for the app */
  .c-container {
    --bs-gutter-x: 1.5rem;
    --bs-gutter-y: 0;
    width: 100%;
    padding-right: calc(var(--bs-gutter-x) * 0.5);
    padding-left: calc(var(--bs-gutter-x) * 0.5);
    margin-right: auto;
    margin-left: auto;
  }
  
  /* Media Queries */
  @media (min-width: 576px) {
    .c-container {
        max-width: 672px;
    }
  }
  @media (min-width: 768px) {
    .c-container {
        max-width: 872px;
    }
  }
  @media (min-width: 992px) {
    .c-container {
        max-width: 990px;
    }
  }
  @media (min-width: 1200px) {
    .c-container {
      max-width: 1238px;
    }
  }
  @media (min-width: 1500px) {
    .c-container {
      max-width: 1440px;
    }
  }
`;
