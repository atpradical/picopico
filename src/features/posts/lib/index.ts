import { DBSchema, openDB } from 'idb'

interface CreatePostDB extends DBSchema {
  posts: {
    key: string
    value: File
  }
}

export async function addToPostsDB(file: File) {
  try {
    const db = await openDB<CreatePostDB>('createPostDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('posts')) {
          db.createObjectStore('posts', { autoIncrement: true })
        }
      },
    })

    const tx = db.transaction('posts', 'readwrite')

    await tx.store.add(file)
    await tx.done
    db.close()
  } catch (e) {
    console.error('addToPostsDB error: ', e)
  }
}

export async function clearPostsDB() {
  try {
    const db = await openDB<CreatePostDB>('createPostDB', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('posts')) {
          db.createObjectStore('posts', { keyPath: 'name' })
        }
      },
    })

    const tx = db.transaction('posts', 'readwrite')

    await tx.store.clear()
    db.close()
    await tx.done
  } catch (e) {
    console.error('clearPostsDB error: ', e)
  }
}
