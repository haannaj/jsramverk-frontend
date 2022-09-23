/** @jest-environment jsdom */
import React from "react";
import { act } from "react-dom/test-utils";
import EditorDocs from "./editor";
// import { docsModel } from '../models/docs';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';


let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  jest.restoreAllMocks();
  document.body.removeChild(container);
  container = null;
});

it("renders user data", async () => {
  const fakeUser = {
    name: "Joni Baez",
    age: "32",
  };
  


  global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(fakeUser)
      }));

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    ReactDOM.createRoot(container).render(
        <Router>
            <EditorDocs />
        </Router>
    );
  });


  console.log(container)


  expect(container.querySelector("h1").textContent).toBe("jsramverk");
  expect(container.querySelector("h1").textContent).toBe("jsramverk");


  global.fetch.mockClear();
  delete global.fetch;
});