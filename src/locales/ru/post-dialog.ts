export const postDialog = {
  accessibilityDescription: 'Всплывающее окно с изображением поста и отображением данных',
  accessibilityTitle:
    'Всплывающее окно, показывающее описание изображения поста, комментарии, лайки и т.д.',

  actionsDropdown: {
    deletePostButton: 'Удалить пост',
    editPostButton: 'Редактировать пост',
  },

  alertDeleteDialog: {
    accessibilityDescription: 'Всплывающее окно с запросом на подтверждение удаления поста',
    accessibilityTitle: 'Всплывающее окно с запросом на подтверждение удаления поста',
    closeButton: 'закрыть',
    confirmButton: 'Да',
    rejectButton: 'Нет',
    visibleBody: 'Вы уверены, что хотите удалить этот пост?',
    visibleTitle: 'Удалить пост',
  },

  editPostDialog: {
    accessibilityDescription: 'Всплывающее окно с возможностью изменения описания поста',
    accessibilityTitle: 'Всплывающее окно редактирования описания поста',

    alertDeleteDialog: {
      accessibilityDescription:
        'Всплывающее окно с просьбой подтвердить отмену редактирования поста',
      accessibilityTitle: 'Всплывающее окно с просьбой подтвердить отмену редактирования поста',
      closeButton: 'закрыть',
      confirmButton: 'Да',
      rejectButton: 'Нет',
      visibleBody:
        'Вы действительно хотите закрыть редактирование публикации? Если вы закроете, изменения не будут сохранены',
      visibleTitle: 'Закрытие поста',
    },

    closeIconTitle: 'Закрыть',
    descriptionFieldLabel: 'Добавьте описание поста',
    descriptionFieldPlaceholder: 'Добавьте описание поста',
    descriptionTooLongError: 'Описание поста должно быть не более 500 символов',
    saveButton: 'Сохранить изменения',

    visibleTitle: 'Изменить пост',
  },
  notFoundPostDialog: 'Ууупс, такого поста не существует!',
}
