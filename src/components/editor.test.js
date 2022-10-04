/** @jest-environment jsdom */
import * as React from "react";
import { act } from "react-dom/test-utils";
import EditorDocs from "./editor";
import '@testing-library/jest-dom/extend-expect';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';



let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  container.remove();
  container = null;
});


describe ('Test render component', () => {

  it('test render field/text', async () => {
    await act(async () => {
          ReactDOM.createRoot(container).render(
              <Router>
                  <EditorDocs />
              </Router>
          );
      })
      ;
    expect(container.querySelector("fieldset").textContent).toBe("Välj dokument att updatera");
    expect(container.querySelector("h1").textContent).toBe("jsramverk");
    expect(container.querySelector("trix-editor")).toBeInTheDocument();
  });

});

