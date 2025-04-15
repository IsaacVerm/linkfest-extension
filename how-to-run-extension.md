# How to run Linkfest extension

Installing the extension permanently involves signing it with Mozilla which I haven't done yet.
[permanent-installation-extension-firefox.md](./prompts/permanent-installation-extension-firefox.md) contains an explanation how to do it but haven't tried this yet.

Right now you have to open `about:debugging#/runtime/this-firefox` in Firefox and select the `manifest.json` file of the extension in `Load Temporary Add-on` to have access to the extension just during the current session.

For the extension to be able so save somewhere, the [weblog Flask app](https://github.com/IsaacVerm/weblog) must be running. This is explained in the [how-to section of the weblog repo](https://github.com/IsaacVerm/weblog/tree/main/doc/how-to). 