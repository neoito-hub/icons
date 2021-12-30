#  Figma plugin for icon search and adding

## Local development

1. Clone the repository

   ```shell
   git clone https://github.com/neoito-hub/icons.git
   cd icons
   ```

1. Install the dependencies

   ```shell
   yarn
   ```

1. Build the plugin

   ```
   yarn watch
   ```

1. Open the [Figma desktop app](https://www.figma.com/downloads/)

1. Go to `Menu > Plugins > Development > New Plugin...`

1. Choose `icons/manifest.json`

1. Run the plugin by going to `Menu > Plugins > Development > Feather`


For shipping we move a copy to build folder and change the ui and main pointer in the manifest.json