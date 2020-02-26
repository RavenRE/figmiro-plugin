![Figmiro logo](/images/cover.png)

# Figmiro plugin

*Figma Integration with Miro (Plugin)*

## About plugin

Exporting and synchronizing frames from Figma to Miro will allow you to quickly update layouts and deliver new versions.
With Figmiro, you and your team members will reduce the amount of manual frame export work.

## Contribution

*Any ideas, issues and pull requests are welcome!*

For local work on the plugin you need to follow the steps described in
[server's](https://github.com/smth/readme) contribution readme block.

Then execute
```shell script
npm run dev
```

After that you should link plugin's manifest file with figma as shown below.

![Manifest linking](/images/how-to-install.gif)

And now you are ready to work on the plugin.

Unfortunately, every time you want to check the result after changing a file in the project,
you will need to manually indicate for figma that the new version of the plugin was compiled:

![Work with changes](/images/changes.gif)

Made by [Redmadrobot](https://www.redmadrobot.com/) 🤖
