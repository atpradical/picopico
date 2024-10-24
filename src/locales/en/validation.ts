export const validation = {
  aboutMe: {
    allowedSymbols:
      'About me may contain symbols: 0-9, A-Z, a-z, А-Я, а-я or ! " # $ % & \'( ) * + , - . : ; < = > ? @ [ \\ ] ^ _ ` { |}~ ',
    maxLength: 'Maximum number of characters 200',
  },
  agreeToTerms: 'Please agree to the terms and conditions',
  email: 'The email must match the format example@example.com',
  name: {
    allowedSymbols: 'Username may contain symbols: 0-9, A-Z, a-z, А-Я or а-я',
    maxLength: 'Maximum number of characters 50',
    minLength: 'Minimum number of characters 1',
  },
  password: {
    maxLength: 'Maximum number of characters 20',
    minLength: 'Minimum number of characters 6',
    mustContain:
      'Password must contain 0-9, a-z, A-Z, ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^\n' +
      '_` { | } ~',
    noWhiteSpace: 'Whitespace characters are not allowed',
  },
  passwordsMatch: 'Passwords must match',
  recaptcha: 'Please complete the reCAPTCHA',
  requiredField: 'Required field',
  userName: {
    allowedSymbols: 'Username may contain symbols: 0-9, A-Z, a-z, _ or -',
    maxLength: 'Maximum number of characters 30',
    minLength: 'Minimum number of characters 6',
  },
}
