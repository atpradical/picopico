export const postDialog = {
  accessibilityDescription: 'Popup with with post image and data display',
  accessibilityTitle: 'Popup showing post image description comments likes and etc. post data',

  actionsDropdown: {
    deletePostButton: 'Delete Post',
    editPostButton: 'Edit Post',
  },

  alertDeleteDialog: {
    accessibilityDescription: 'Popup asking to confirm post deletion',
    accessibilityTitle: 'Popup asking to confirm post deletion',
    closeButton: 'close',
    confirmButton: 'Yes',
    rejectButton: 'No',
    visibleBody: 'Are you sure you want to delete this post?',
    visibleTitle: 'Delete Post',
  },

  editPostDialog: {
    accessibilityDescription: 'Popup with possibility change post description',
    accessibilityTitle: 'Edit post description popup',

    alertDeleteDialog: {
      accessibilityDescription: 'Popup asking to confirm cancel post edit',
      accessibilityTitle: 'Popup asking to confirm cancel post edit',
      closeButton: 'close',
      confirmButton: 'Yes',
      rejectButton: 'No',
      visibleBody:
        'Do you really want to close the edition of the publication? If you close changes won’t be saved',
      visibleTitle: 'Close Post',
    },
    closeIconTitle: 'Close',
    descriptionFieldLabel: 'Add publication description',
    descriptionFieldPlaceholder: 'Add publication description',
    descriptionTooLongError: 'Post description must not be more than 500 characters',
    saveButton: 'Save changes',

    visibleTitle: 'Edit Post',
  },
}
