# Installing Extensions Permanently in Firefox

To permanently install an extension in Firefox:

1. Open Firefox and navigate to the extension's page on the Mozilla Add-ons website (addons.mozilla.org)
2. Click the "Add to Firefox" button
3. When prompted, click "Add" in the confirmation dialog
4. The extension will install and remain in your browser until you manually remove it

For extensions not on the official store:

1. If the extension is distributed as an .xpi file:
   - Open Firefox and go to Add-ons Manager (Menu > Add-ons and themes)
   - Click the gear icon and select "Install Add-on From File"
   - Select the .xpi file and confirm installation

Once installed, extensions remain in your browser across sessions and survive browser restarts. They'll only be removed if you manually uninstall them, reset Firefox, or perform a clean install of the browser.

To verify an extension is permanently installed, check the Add-ons Manager (Menu > Add-ons and themes > Extensions).

I understand your extension is just code in your repository and not in the Mozilla store. Let me clarify your options:

# Installing Your Custom Extension in Firefox

## Reality Check
In standard Firefox releases, permanently installing an extension that isn't signed by Mozilla is not officially supported. You have these options:

## Option 1: Use Developer Edition or Nightly
1. Download [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/) or [Firefox Nightly](https://www.mozilla.org/en-US/firefox/channel/desktop/#nightly)
2. Go to `about:config` and set `xpinstall.signatures.required` to `false`
3. Package your code as a ZIP file
4. Go to Add-ons Manager → Extensions → Settings (gear icon) → "Install Add-on From File"
5. Select your ZIP file

## Option 2: Sign Your Extension (Recommended)
You can sign your extension with Mozilla without publishing it publicly:
1. Create an account on [Mozilla Add-ons](https://addons.mozilla.org)
2. Install the web-ext tool: `npm install --global web-ext`
3. Generate API credentials in your developer hub account
4. Sign your extension:
   ```
   web-ext sign --api-key=your_api_key --api-secret=your_api_secret --channel=unlisted
   ```
5. Install the signed .xpi file using Add-ons Manager

## Option 3: Use Temporary Installation (Development Only)
For development purposes, you can temporarily load the extension:
1. Go to `about:debugging` → "This Firefox"
2. Click "Load Temporary Add-on"
3. Select any file in your extension directory
4. Note: This installation will be removed when Firefox is closed

The only way to truly permanently install your custom extension in regular Firefox is to sign it using Option 2.
