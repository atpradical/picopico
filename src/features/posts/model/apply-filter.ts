import { PostFilter } from '@/features/posts/config'

export const applyFilter = (imageUrl: string, filter: PostFilter): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!imageUrl) {
      reject('No image URL provided')

      return
    }

    if (filter === PostFilter.original) {
      resolve(imageUrl)

      return
    }

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0, img.width, img.height)

      const imageData = ctx?.getImageData(0, 0, img.width, img.height)

      if (!imageData) {
        reject('Failed to get image data')

        return
      }

      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const avg = (r + g + b) / 3

        switch (filter) {
          case PostFilter.clarendon:
            data[i] = Math.min(255, r * 1.35)
            data[i + 1] = Math.min(255, g * 1.25)
            data[i + 2] = Math.min(255, b * 1.25)
            break
          case PostFilter.gingham:
            data[i] = Math.min(255, r * 1.05)
            data[i + 1] = Math.min(255, g * 1.25)
            data[i + 2] = Math.min(255, b * 1.25)
            break
          case PostFilter.lark:
            data[i] = Math.min(255, r * 1.35)
            data[i + 1] = Math.min(255, g * 1.15)
            data[i + 2] = Math.min(255, b * 1.15)
            break
          case PostFilter.sepia:
            data[i] = r * 0.393 + g * 0.769 + b * 0.189
            data[i + 1] = r * 0.349 + g * 0.686 + b * 0.168
            data[i + 2] = r * 0.272 + g * 0.534 + b * 0.131
            break
          case PostFilter.moon:
            data[i] = avg
            data[i + 1] = avg
            data[i + 2] = avg
            data[i + 3] = Math.min(255, data[i + 3] * 1) // Уменьшаем яркость
            break
        }
      }

      ctx?.putImageData(imageData, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }

    img.onerror = () => {
      reject('Failed to load image')
    }

    img.src = imageUrl
  })
}
