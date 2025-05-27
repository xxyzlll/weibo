export class DatabaseService {
  private db: IDBDatabase | null = null
  private readonly DB_NAME = 'userDB'
  private readonly STORE_NAME = 'users'
  private readonly VERSION = 1

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.DB_NAME, this.VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(this.STORE_NAME)) {
          db.createObjectStore(this.STORE_NAME, { keyPath: 'id' })
        }
      }
    })
  }

  async getAllUsers(): Promise<User[]> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.STORE_NAME, 'readonly')
      const store = transaction.objectStore(this.STORE_NAME)
      const request = store.getAll()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)
    })
  }

  async addUsers(users: User[]): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    const transaction = this.db.transaction(this.STORE_NAME, 'readwrite')
    const store = transaction.objectStore(this.STORE_NAME)

    return Promise.all(users.map(user => {
      return new Promise<void>((resolve, reject) => {
        const request = store.put(user)
        request.onerror = () => reject(request.error)
        request.onsuccess = () => resolve()
      })
    })).then(() => undefined)
  }

  async updateUser(user: User): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.STORE_NAME, 'readwrite')
      const store = transaction.objectStore(this.STORE_NAME)
      const request = store.put(user)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async deleteUser(userId: string): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.STORE_NAME, 'readwrite')
      const store = transaction.objectStore(this.STORE_NAME)
      const request = store.delete(userId)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async clearAll(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized')

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(this.STORE_NAME, 'readwrite')
      const store = transaction.objectStore(this.STORE_NAME)
      const request = store.clear()

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }
}

export const db = new DatabaseService()