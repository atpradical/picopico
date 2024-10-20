export const validation = {
  agreeToTerms: 'Пожалуйста, согласитесь с правилами и условиями',
  email: 'Email должен соответствовать формату example@example.com',
  password: {
    maxLength: 'Максимальное количество символов 20',
    minLength: 'Минимальное количество символов 6',
    mustContain:
      'Пароль должен состоять из символов: 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^\n' +
      '_` { | } ~',
    noWhiteSpace: 'Использование пробелов запрещено',
  },
  passwordsMatch: 'Пароли должны совпадать',
  recaptcha: 'Выполните проверку reCAPTCHA',
  requiredField: 'Обязательное поле',
  userName: {
    allowedSymbols: 'Имя пользователя может содержать символы: 0-9, A-Z, a-z, _ или -.',
    maxLength: 'Максимальное количество символов 30',
    minLength: 'Минимальное количество символов 6',
  },
}
