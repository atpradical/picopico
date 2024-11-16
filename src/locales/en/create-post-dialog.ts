export const createPostDialog = {
  accessibilityDescription:
    'Popup with possibility to choose files for new post, define post description, apply filters to chosen photos, and crop chosen photos',
  accessibilityTitle:
    'Popup asking user to choose files for new post, define post description, apply filters, and crop chosen photos',
  altDescription: 'New post image',
  buttons: {
    backButton: 'Go Back',
    closeButton: 'Close',
    nextButton: 'Next',
    openDraftButton: 'Open Draft',
    publishButton: 'Publish',
    selectFilesButton: 'Select from Computer',
  },

  dialogTitles: {
    crop: 'Cropping',
    filters: 'Filtering',
    publish: 'Publishing',
    start: 'Add Photo',
  },

  interruptDialog: {
    accessibilityDescription: 'Popup with possibility to interrupt current dialog',
    accessibilityTitle: 'Popup asking user to interrupt current dialog',
    discardButtonText: 'Discard',
    saveButtonText: 'Save draft',
    title: 'Сlose',
    visibleBodyText:
      'Do you really want to close the creation of a publication?\n' +
      'If you close everything will be deleted',
    visibleTitle: 'Сlose',
  },

  publishDialogStep: {
    descriptionFieldLabel: 'Add publication description',
    descriptionFieldPlaceholder: 'Add publication description',
  },

  tooManyFilesForUploading: 'Only 10 files per 1 post allowed',
  wrongFileFormat: 'The photo must be JPEG or PNG format',
  wrongFileSize: 'The photo must be less than 20 Mb',
}
