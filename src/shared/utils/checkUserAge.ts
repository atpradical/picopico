import { MIN_USER_AGE } from '@/features/profile/config'

export function checkUserAge(dateOfBirth: Date) {
  const today = new Date()

  // Вычисляем разницу в годах
  let age = today.getFullYear() - dateOfBirth.getFullYear()

  // Проверяем, был ли уже день рождения в этом году
  const monthDifference = today.getMonth() - dateOfBirth.getMonth()
  const dayDifference = today.getDate() - dateOfBirth.getDate()

  // Если день рождения еще не наступил, уменьшаем возраст на 1
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--
  }

  //  true, если возраст 13 или больше, иначе false
  return age >= MIN_USER_AGE
}
