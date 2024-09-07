export const categories = {
    "Indoor Cameras": {
      DomeCameras: [
        { name: "resolution", label: "Resolution", type: "text" },
        { name: "connectivity", label: "Connectivity", type: "text" },
        { name: "storage", label: "Storage", type: "text" },
        { name: "opticalZoom", label: "Optical Zoom", type: "text" },
        { name: "nightVisionRange", label: "Night Vision Range", type: "text" },
        { name: "formFactor", label: "Form Factor", type: "text", defaultValue: "Dome" },
        { name: "audio", label: "Audio", type: "text" },
        { name: "fieldOfView", label: "Field of View", type: "text" },
        { name: "photoSensorTechnology", label: "Photo Sensor Technology", type: "text" },
        { name: "waterResistance", label: "Water Resistance", type: "checkbox" },
        { name: "operatingSystem", label: "Operating System", type: "text" },
        { name: "mountingType", label: "Mounting Type", type: "text" },
        { name: "videoCaptureResolution", label: "Video Capture Resolution", type: "text" },
        { name: "colour", label: "Colour", type: "text" },
        { name: "numberOfItems", label: "Number of Items", type: "number" },
        { name: "includedComponents", label: "Included Components", type: "text" },
      ],
      BulletCameras: [
        { name: "resolution", label: "Resolution", type: "text" },
        { name: "connectivity", label: "Connectivity", type: "text" },
        { name: "storage", label: "Storage", type: "text" },
        { name: "opticalZoom", label: "Optical Zoom", type: "text" },
        { name: "nightVisionRange", label: "Night Vision Range", type: "text" },
        { name: "formFactor", label: "Form Factor", type: "text", defaultValue: "Bullet" },
        { name: "audio", label: "Audio", type: "text" },
        { name: "fieldOfView", label: "Field of View", type: "text" },
        { name: "photoSensorTechnology", label: "Photo Sensor Technology", type: "text" },
        { name: "waterResistance", label: "Water Resistance", type: "checkbox" },
        { name: "operatingSystem", label: "Operating System", type: "text" },
        { name: "mountingType", label: "Mounting Type", type: "text" },
        { name: "videoCaptureResolution", label: "Video Capture Resolution", type: "text" },
        { name: "colour", label: "Colour", type: "text" },
        { name: "numberOfItems", label: "Number of Items", type: "number" },
        { name: "includedComponents", label: "Included Components", type: "text" },
      ],
    },
    "Outdoor Cameras": {
      WeatherproofCameras: [
        { name: "resolution", label: "Resolution", type: "text" },
        { name: "connectivity", label: "Connectivity", type: "text" },
        { name: "storage", label: "Storage", type: "text" },
        { name: "opticalZoom", label: "Optical Zoom", type: "text" },
        { name: "nightVisionRange", label: "Night Vision Range", type: "text" },
        { name: "formFactor", label: "Form Factor", type: "text", defaultValue: "Weatherproof" },
        { name: "audio", label: "Audio", type: "text" },
        { name: "fieldOfView", label: "Field of View", type: "text" },
        { name: "photoSensorTechnology", label: "Photo Sensor Technology", type: "text" },
        { name: "waterResistance", label: "Water Resistance", type: "checkbox" },
        { name: "operatingSystem", label: "Operating System", type: "text" },
        { name: "mountingType", label: "Mounting Type", type: "text" },
        { name: "videoCaptureResolution", label: "Video Capture Resolution", type: "text" },
        { name: "colour", label: "Colour", type: "text" },
        { name: "numberOfItems", label: "Number of Items", type: "number" },
        { name: "includedComponents", label: "Included Components", type: "text" },
      ],
      PTZCameras: [
        { name: "resolution", label: "Resolution", type: "text" },
        { name: "connectivity", label: "Connectivity", type: "text" },
        { name: "storage", label: "Storage", type: "text" },
        { name: "opticalZoom", label: "Optical Zoom", type: "text" },
        { name: "nightVisionRange", label: "Night Vision Range", type: "text" },
        { name: "formFactor", label: "Form Factor", type: "text", defaultValue: "PTZ" },
        { name: "audio", label: "Audio", type: "text" },
        { name: "fieldOfView", label: "Field of View", type: "text" },
        { name: "photoSensorTechnology", label: "Photo Sensor Technology", type: "text" },
        { name: "waterResistance", label: "Water Resistance", type: "checkbox" },
        { name: "operatingSystem", label: "Operating System", type: "text" },
        { name: "mountingType", label: "Mounting Type", type: "text" },
        { name: "videoCaptureResolution", label: "Video Capture Resolution", type: "text" },
        { name: "colour", label: "Colour", type: "text" },
        { name: "numberOfItems", label: "Number of Items", type: "number" },
        { name: "includedComponents", label: "Included Components", type: "text" },
      ],
    },
    "NVR/DVR Systems": {
      NVRSystems: [
        { name: "resolution", label: "Resolution", type: "text" },
        { name: "numberOfChannels", label: "Number of Channels", type: "number" },
        { name: "storage", label: "Storage", type: "text" },
        { name: "remoteAccess", label: "Remote Access", type: "text" },
        { name: "recordingModes", label: "Recording Modes", type: "text" },
        { name: "compressionFormats", label: "Compression Formats", type: "text" },
        { name: "integration", label: "Integration", type: "text" },
        { name: "audioSupport", label: "Audio Support", type: "checkbox" },
        { name: "alarmInputsOutputs", label: "Alarm Inputs/Outputs", type: "text" },
      ],
      DVRSystems: [
        { name: "resolution", label: "Resolution", type: "text" },
        { name: "numberOfChannels", label: "Number of Channels", type: "number" },
        { name: "storage", label: "Storage", type: "text" },
        { name: "recordingModes", label: "Recording Modes", type: "text" },
        { name: "playbackFeatures", label: "Playback Features", type: "text" },
        { name: "compressionFormats", label: "Compression Formats", type: "text" },
        { name: "remoteAccess", label: "Remote Access", type: "text" },
        { name: "integration", label: "Integration", type: "text" },
        { name: "audioSupport", label: "Audio Support", type: "checkbox" },
      ],
    },
    "Camera Accessories": {
      MountsBrackets: [
        { name: "material", label: "Material", type: "text" },
        { name: "adjustability", label: "Adjustability", type: "text" },
        { name: "compatibility", label: "Compatibility", type: "text" },
        { name: "weightCapacity", label: "Weight Capacity", type: "number" },
        { name: "installationEase", label: "Installation Ease", type: "text" },
      ],
      CablesConnectors: [
        { name: "type", label: "Type", type: "text" },
        { name: "length", label: "Length", type: "text" },
        { name: "material", label: "Material", type: "text" },
        { name: "compatibility", label: "Compatibility", type: "text" },
        { name: "shielding", label: "Shielding", type: "text" },
      ],
    },
    "Security Kits": {
      CompleteSurveillanceKits: [
        { name: "numberOfCameras", label: "Number of Cameras", type: "number" },
        { name: "storageCapacity", label: "Storage Capacity", type: "text" },
        { name: "accessoriesIncluded", label: "Accessories Included", type: "text" },
        { name: "installationType", label: "Installation Type", type: "text" },
        { name: "cameraTypes", label: "Camera Types", type: "text" },
      ],
      DIYKits: [
        { name: "numberOfCameras", label: "Number of Cameras", type: "number" },
        { name: "accessoriesIncluded", label: "Accessories Included", type: "text" },
        { name: "customizationOptions", label: "Customization Options", type: "text" },
        { name: "installationInstructions", label: "Installation Instructions", type: "text" },
      ],
    },
  };
  