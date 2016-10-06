# NativeScriptLightBulb
Sample NativeScript and Angular mobile app to control a Magic Blue smart light bulb.
A more detailed guide about how this was made can be found [here](https://medium.com/@adrianfaciu/creating-a-mobile-app-for-a-smart-light-bulb-with-nativescript-angular-1a36b3f658#.nf67aiypo).

# Building & Running

This application was created using [NativeScript CLI](https://github.com/NativeScript/nativescript-cli).
In order to build the application, first clone the repo:

<pre><code>git clone https://github.com/adrianfaciu/NativeScriptLightBulb
cd NativeScriptLightBulb</code></pre>

Next install all the npm dependencies and Android/iOS runtime:

<code>tns install</code>

Start the application with:

<pre><code>tns run ios
tns run android</code></pre>

You will not be able to use an emulator since it needs the Bluetooth from a real device.