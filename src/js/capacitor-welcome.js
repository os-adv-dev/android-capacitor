import { SplashScreen } from '@capacitor/splash-screen';
import { Smartwatch } from 'capacitor-smartwatch-plugin';

window.customElements.define(
  'capacitor-welcome',
  class extends HTMLElement {
    constructor() {
      super();

      SplashScreen.hide();

      const root = this.attachShadow({ mode: 'open' });

      root.innerHTML = `
    <style>
      :host {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        display: block;
        width: 100%;
        height: 100%;
      }
      h1, h2, h3, h4, h5 {
        text-transform: uppercase;
      }
      .button {
        display: inline-block;
        padding: 10px;
        background-color: #73B5F6;
        color: #fff;
        font-size: 0.9em;
        border: 0;
        border-radius: 3px;
        text-decoration: none;
        cursor: pointer;
        margin: 5px 0;
      }
      main {
        padding: 15px;
      }
      main hr { height: 1px; background-color: #eee; border: 0; }
      main h1 {
        font-size: 1.4em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      main h2 {
        font-size: 1.1em;
      }
      main h3 {
        font-size: 0.9em;
      }
      main p {
        color: #333;
      }
      main pre {
        white-space: pre-line;
      }
    </style>
    <div>
      <capacitor-welcome-titlebar>
        <h1>Capacitor Sample App Smartwatch</h1>
      </capacitor-welcome-titlebar>
      <main>
        <h2>Capacitor Connect to Smartwatch Demo</h2>
        <p>
          This demo allows you to choose and send UI templates to the Smartwatch plugin.
        </p>
        <p>
          <button class="button" id="template1">Send Template 1</button>
          <button class="button" id="template2">Send Template 2</button>
          <button class="button" id="template3">Send Template 3</button>
          <button class="button" id="template4">Send Template 4</button>
        </p>
        <div class="qr-container" id="qr-container">
          <h3>QR Code Preview:</h3>
          <img id="qr-code" alt="QR Code will appear here">
        </div>
        <p id="status" style="color: green; font-weight: bold;"></p>
      </main>
    </div>
    `;
    }

    connectedCallback() {
      const self = this;

      // Define the templates
      const templates = {
        template1: [
          { type: "Text", content: "Welcome to Smartwatch!" },
          { type: "Button", label: "Click Me", action: "action_template1" },
        ],
        template2: [
          { type: "Text", content: "Template 2 Selected" },
          { type: "Button", label: "Confirm", action: "action_template2" },
        ],
        template3: [
          { type: "Text", content: "Third Template" },
          { type: "Button", label: "Proceed", action: "action_template3" },
        ],
        template4: [
          { type: "Text", content: "Join your event!" },
          { type: "Image", base64: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMYAAADGAQMAAACzVW0eAAAABlBMVEX///8AAABVwtN+AAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRYhe2X0Q3DIAxELTEAI2X1jJQBkFyfDyVp0u/6Pjgh2vDycTVgu2ZLS/+VQ3uMYdvoeBgyBJ99H33Hd846pPtIkq5pX4tYRyA1SQ6XI7nb7dgY0dc5qCS8Jafx1/2pJFPT+A8VkggknIKYH7n5SiSGBQdB8jMZwrQXliOiQfAoQ/JmZK2A5b25ELHuLGW0bNcNrieMJW5JvJGH0WRIhDOimMvBvd2zSzXhWsz5C7ZxnUQBcmYUlDK/VbN6QoVxrt1c15PZdcZWPzuUejK7Tptx5SsqhE3TQfsuSNh4hnAwxYjdSocQMbZOmL8zXz05M0qb/xGfHXEhWVr6lz72jBYhzmMW6wAAAABJRU5ErkJggg==" },
        ],
      };
      
      // Attach event listeners for each button
      self.shadowRoot.querySelector('#template1').addEventListener('click', async function () {
        await self.sendTemplate(templates.template1, "Template 1 sent!");
      });
    
      self.shadowRoot.querySelector('#template2').addEventListener('click', async function () {
        await self.sendTemplate(templates.template2, "Template 2 sent!");
      });
    
      self.shadowRoot.querySelector('#template3').addEventListener('click', async function () {
        await self.sendTemplate(templates.template3, "Template 3 sent!");
      });
      self.shadowRoot.querySelector('#template4').addEventListener('click', async function () {
        self.previewQRCode(templates.template4);
        await self.sendTemplate(templates.template4, "Template 4 sent!");
      });
    }

    // Helper function to send the template to the smartwatch
    async sendTemplate(template, successMessage) {
      const statusElement = this.shadowRoot.querySelector('#status');
      try {
        await Smartwatch.sendMessage({
          value: JSON.stringify(template), // Converte o template em string JSON
        });
        statusElement.textContent = successMessage;
        statusElement.style.color = 'green';
      } catch (error) {
        statusElement.textContent = 'Failed to send template!';
        statusElement.style.color = 'red';
        console.error('Error sending template:', error);
      }
    }

    previewQRCode(template) {
      const qrCodeData = template.find(item => item.type === "Image").base64;
      const qrCodeElement = this.shadowRoot.querySelector('#qr-code');
      qrCodeElement.src = qrCodeData;
    }
  },
);

// Title bar component
window.customElements.define(
  'capacitor-welcome-titlebar',
  class extends HTMLElement {
    constructor() {
      super();
      const root = this.attachShadow({ mode: 'open' });
      root.innerHTML = `
    <style>
      :host {
        position: relative;
        display: block;
        padding: 15px;
        text-align: center;
        background-color: #73B5F6;
      }
      ::slotted(h1) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        font-size: 0.9em;
        font-weight: 600;
        color: #fff;
      }
    </style>
    <slot></slot>
    `;
    }
  },
);