import { LightningElement, api } from "lwc";

import { loadScript, loadStyle } from "lightning/platformResourceLoader";
import Assets from "@salesforce/resourceUrl/assets";

export default class Infinite extends LightningElement {
  @api name;

  connectedCallback() {
    Promise.all([
      loadScript(this, Assets + "/index.js"),
      loadStyle(this, Assets + "/index.css")
    ]).then(() => {
      // @ts-ignore
      const el = this.refs.root;

      console.log("mounting infinite!");
      mountApp(el);
    });
  }
}
