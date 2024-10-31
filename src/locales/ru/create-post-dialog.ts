export const createPostDialog = {
  altDescription: 'Изображение нового поста',

  buttons: {
    backButton: 'Назад',
    closeButton: 'Закрыть',
    nextButton: 'Далее',
    openDraftButton: 'Открыть черновик',
    publishButton: 'Опубликовать',
    selectFilesButton: 'Выбрать с компьютера',
  },
  cropDialogStep: {
    accessibilityDescription: 'Всплывающее окно с возможностью обрезки выбранных фотографий',
    accessibilityTitle: 'Всплывающее окно с предложением обрезать выбранные фотографии',
  },
  dialogTitles: {
    crop: 'Обрезка',
    filters: 'Фильтрация',
    publish: 'Публикация',
    start: 'Добавить фото',
  },

  filtersDialogStep: {
    accessibilityDescription:
      'Всплывающее окно с возможностью применения фильтров к выбранным фотографиям',
    accessibilityTitle: 'Всплывающее окно с предложением применить фильтры к выбранным фотографиям',
  },

  interruptDialog: {
    accessibilityDescription: 'Всплывающее окно с возможностью прервать текущий диалог',
    accessibilityTitle: 'Всплывающее окно, запрашивающее пользователя прервать текущий диалог',
    discardButtonText: 'Отменить',
    saveButtonText: 'Сохранить',
    title: 'Закрыть',
    visibleBodyText:
      'Вы действительно хотите закрыть создание публикации?\n' +
      'Если вы закроете, все будет удалено',
    visibleTitle: 'Закрыть',
  },

  publishDialogStep: {
    accessibilityDescription: 'Всплывающее окно с возможностью добавления описания к посту',
    accessibilityTitle: 'Всплывающее окно с возможностью добавления описания к посту',
    descriptionFieldLabel: 'Добавить описание публикации',
    descriptionFieldPlaceholder: 'Добавьте описание публикации',
  },

  startDialogStep: {
    accessibilityDescription: 'Всплывающее окно с возможностью выбора файлов для нового поста',
    accessibilityTitle: 'Всплывающее окно с предложением выбрать файлы для нового поста',
  },
  tooManyFilesForUploading: 'Пост не может содержать более 10 файлов',
  wrongFileFormat: 'Фото должно быть в формате JPEG или PNG',

  wrongFileSize: 'Размер фото должен быть менее 20 Мб',
}
