import { LightningElement, api } from "lwc";

import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import Assets from "@salesforce/resourceUrl/adaptableinfinite";

import appCss from "./app.css";

export default class AdaptableInfinite extends LightningElement {
  @api name;

  static stylesheets = [appCss];

  connectedCallback() {
    Promise.all([
      loadScript(this, Assets + "/index.js"),
      loadStyle(this, Assets + "/index.css")
    ]).then(() => {
      // @ts-ignore
      const el = this.refs.root;

      console.log("el", el);

      window.mountElement(el);

      console.log("rendering app", window.renderApp);
      window.renderApp({
        adaptableId: "test2",
        defaultState: {
          dashboard: {
            top: {
              widgets: [
                {
                  id: "theme",
                  type: "theme"
                },
                {
                  id: "view",
                  type: "view"
                },

                {
                  id: "tabs-1",
                  type: "tabs",
                  value: {
                    tabs: [
                      {
                        name: "Tab 1",
                        widgets: [{ type: "view", id: "view" }]
                      }
                    ]
                  }
                }
              ]
            }
          },
          view: {
            currentViewId: "myView",
            views: [
              {
                id: "myView",
                label: "My First View"
              },
              {
                id: "myView2"
              }
            ]
          }
        }
      });
    });
  }
}
