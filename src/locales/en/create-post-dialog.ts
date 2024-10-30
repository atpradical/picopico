export const createPostDialog = {
  altDescription: 'New post image',

  buttons: {
    backButton: 'Go Back',
    closeButton: 'Close',
    nextButton: 'Next',
    openDraftButton: 'Open Draft',
    publishButton: 'Publish',
    selectFilesButton: 'Select from Computer',
  },
  cropDialogStep: {
    accessibilityDescription: 'Popup with possibility to crop chosen photos',
    accessibilityTitle: 'Popup asking user to crop chosen photos',
  },
  dialogTitles: {
    crop: 'Cropping',
    filters: 'Filtering',
    publish: 'Publishing',
    start: 'Add Photo',
  },

  filtersDialogStep: {
    accessibilityDescription: 'Popup with possibility to apply filters to chosen photos',
    accessibilityTitle: 'Popup asking user to apply filters to chosen',
  },

  publishDialogStep: {
    accessibilityDescription: 'Popup with possibility to define post description ',
    accessibilityTitle: 'Popup with possibility to define post description',
    descriptionFieldLabel: 'Add publication description',
    descriptionFieldPlaceholder: 'Add publication description',
  },

  startDialogStep: {
    accessibilityDescription: 'Popup with possibility to choose files for new post',
    accessibilityTitle: 'Popup asking user to choose files for new post',
  },

  wrongFileFormat: 'The photo must be JPEG or PNG format',
  wrongFileSize: 'The photo must be less than 20 Mb',
}
