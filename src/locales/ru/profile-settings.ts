export const profileSettings = {
  accountManagementTab: {
    accountTypes: 'Тип подписки',
    autoRenewal: 'Авто продление',
    changeSubscription: 'Изменить подписку',
    currentSubscription: 'Текуща подписка',
    paymentType: {
      business: 'Бизнес',
      personal: 'Индивидуальная',
    },
    subscriptionDates: {
      expireAt: 'Действует до',
      nextPayment: 'Следующее списание',
    },
    subscriptionDescriptions: {
      dollars_10: '$10 за 1 день',
      dollars_50: '$50 за 7 дней',
      dollars_100: '$100 в месяц',
    },
  },

  devicesTab: {
    activeSessions: 'Активные сессии',
    currentDevices: 'Текущее устройство',
    lastVisit: 'Последний визит',
    logout: 'Выйти',
    noActiveSessions: 'Вы еще не вошли в систему с других устройств',
    terminateAllOtherSessions: 'Завершить все другие сессии',
  },

  paymentAlert: {
    fail: {
      accessibilityDescription: 'Ошибка процесса оплаты',
      accessibilityTitle: 'Ошибка оплаты',
      closeButton: 'Закрыть',
      confirmButton: 'Понятно',
      visibleBody:
        'Что-то пошло не так во время процесса оплаты. Пожалуйста, попробуйте снова или обратитесь в службу поддержки.',
      visibleTitle: 'Ошибка',
    },
    success: {
      accessibilityDescription: 'Оплата успешно завершена',
      accessibilityTitle: 'Успешная оплата',
      closeButton: 'Закрыть',
      confirmButton: 'Продолжить',
      visibleBody: 'Ваш платеж успешно обработан.',
      visibleTitle: 'Успешно',
    },
  },

  paymentsTab: {
    noPayments: 'Вы еще не совершили никаких платежей',
    pagination: {
      textPerPage: 'на странице',
      textShow: 'Показать',
    },
    paymentsTable: {
      header: {
        dateEndOfSubscription: 'Дата окончания подписки',
        dateOfPayment: 'Дата платежа',
        paymentSystem: 'Платежная система',
        price: 'Цена',
        subscriptionDescription: 'Тип подписки',
      },
    },
  },

  profileDataTab: {
    addProfilePhotoButton: 'Добавить аватар',
    deleteProfileButton: 'Удалить аккаунт',
    formSubmitButton: 'Сохранить изменения',
    labels: {
      aboutMe: 'О себе',
      city: 'Выберите ваш город',
      country: 'Выберите вашу страну',
      dateOfBirth: 'Дата рождения',
      firstName: 'Имя',
      lastName: 'Фамилия',
      userName: 'Никнейм',
    },
    placeholders: {
      aboutMe: 'Расскажите о себе',
      city: 'добавьте город',
      country: 'добавьте страну',
      firstName: 'добавьте имя',
      lastName: 'добавьте фамилию',
      userName: 'добавьте имя пользователя',
    },
    successSettingsChangeMessage: 'Ваши настройки сохранены!',
  },
  tabNames: {
    accountManagement: 'Управление аккаунтом',
    devices: 'Устройства',
    generalInformation: 'Общая информация',
    payments: 'Мои платежи',
  },
}
