import { ChangeEvent, useCallback } from 'react'

import { useDebounceCallback } from 'usehooks-ts'

import { usePagesRouterQueryUpdate } from './usePagesRouterQueryUpdate'

const INITIAL_SEARCH_TERM = ''
const DEFAULT_CURSOR = 0

type HookParams = { delay?: number }

type HookReturn = {
  clearSearchHandler: () => void
  searchChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

/**
 * Кастомный хук для управления поисковыми запросами с использованием дебаунса и обновления URL-параметров.
 *
 * @remarks
 * Хук предоставляет функционал для управления поисковым полем с отложенной обработкой ввода (дебаунс),
 * автоматически обновляя URL-параметры и сбрасывая номер страницы при каждом поиске.
 * Используется для реализации поиска в компонентах, где результаты зависят от URL-параметров.
 *
 * @example
 * ```tsx
 *   //Внутри компонента
 *   const { searchChangeHandler, clearSearchHandler } = UseSearch();
 *
 *   return (
 *        <TextField
 *           label={'some label text'}
 *           onChange={searchChangeHandler}
 *           onClear={clearSearchHandler}
 *           placeholder={'some placeholder text'}
 *           value={search}
 *           variant={'search'}
 *         />
 * ```
 *
 * @returns Объект:
 * @returns {clearSearchHandler - Функция очистки }
 * @returns {searchChangeHandler - Обработчик события изменения для поля поиска }
 *
 * @public
 */
export const useSearch = (params?: HookParams): HookReturn => {
  const { addRouterQueryParamShallow } = usePagesRouterQueryUpdate()

  /**
   * Дебаунсированная функция обновления URL-параметров для поискового запроса.
   * При каждом вызове сбрасывает номер страницы на начальное значение и
   * устанавливает поисковый термин в URL.
   *
   * @param value - Строка поискового запроса
   * @internal
   */
  const debouncedSearch = useDebounceCallback((value: string) => {
    addRouterQueryParamShallow({ search: value })
  }, params?.delay ?? 800)

  /**
   * Обрабатывает изменения в поле ввода поиска.
   * Извлекает текущее значение из события и передает его в дебаунсированную
   * функцию поиска для отложенного обновления URL.
   *
   * @param event - Событие изменения в текстовом поле ввода
   */
  const searchChangeHandler = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debouncedSearch(event.currentTarget.value)
    },
    [debouncedSearch]
  )

  /**
   * Очищает поисковый запрос, устанавливая пустую строку в качестве
   * значения параметра search в URL.
   * Используется для реализации кнопки очистки поискового поля.
   */
  const clearSearchHandler = useCallback(() => {
    addRouterQueryParamShallow({
      cursor: DEFAULT_CURSOR.toString(),
      search: INITIAL_SEARCH_TERM,
    })
  }, [addRouterQueryParamShallow])

  return {
    clearSearchHandler,
    searchChangeHandler,
  }
}
