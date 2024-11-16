export const createPostDialog = {
  accessibilityDescription:
    'Всплывающее окно с возможностью выбора файлов для нового поста, определения описания поста, применения фильтров к выбранным фотографиям и обрезки выбранных фотографий',

  accessibilityTitle:
    'Всплывающее окно, предлагающее пользователю выбрать файлы для нового поста, определить описание поста, применить фильтры и обрезать выбранные фотографии',

  alertDialog: {
    accessibilityDescription: 'Всплывающее окно с возможностью прервать текущий диалог',
    accessibilityTitle: 'Всплывающее окно, запрашивающее пользователя прервать текущий диалог',
    closeButton: 'закрыть',
    confirmButton: 'Сохранить',
    rejectButton: 'Отменить',
    visibleBody:
      'Вы действительно хотите закрыть создание публикации?\n' +
      'Если вы закроете, все будет удалено',
    visibleTitle: 'Закрыть',
  },

  altDescription: 'Изображение нового поста',

  buttons: {
    backButton: 'Назад',
    closeButton: 'Закрыть',
    nextButton: 'Далее',
    openDraftButton: 'Открыть черновик',
    publishButton: 'Опубликовать',
    selectFilesButton: 'Выбрать с компьютера',
  },

  dialogTitles: {
    crop: 'Обрезка',
    filters: 'Фильтрация',
    publish: 'Публикация',
    start: 'Добавить фото',
  },
  publishDialogStep: {
    descriptionFieldLabel: 'Добавить описание публикации',
    descriptionFieldPlaceholder: 'Добавьте описание публикации',
  },

  tooManyFilesForUploading: 'Пост не может содержать более 10 файлов',

  wrongFileFormat: 'Фото должно быть в формате JPEG или PNG',
  wrongFileSize: 'Размер фото должен быть менее 20 Мб',
}
