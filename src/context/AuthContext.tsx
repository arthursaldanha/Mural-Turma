import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react'
import Router from 'next/router'
import jwt_decode from 'jwt-decode'

import { setCookie, destroyCookie } from 'nookies'
import { User } from '../types/user'
import { api } from 'services/api'
import { toast } from 'react-toastify'

type SignInCredentials = {
  username: string
  password: string
}

type AuthContextData = {
  isAuthenticated: boolean
  user: User | null
  isLoadingFetch: boolean
  signIn: (credentials: SignInCredentials) => Promise<void>
  signOut: () => void
  setUser: Dispatch<SetStateAction<User | null>>
}

type tokenDecodedTypes = User & {
  userId: number
  sub: string
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

// let authChannel: BroadcastChannel

export function signOut() {
  destroyCookie(undefined, 'muralturma-token')
  destroyCookie(undefined, 'muralturma-user_id')

  // authChannel.postMessage('signOut')

  Router.push('/')
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingFetch, setIsLoadingFetch] = useState(false)
  const isAuthenticated = !!user

  /* useEffect(() => {
    authChannel = new BroadcastChannel('auth')

    authChannel.onmessage = (message) => {
      if (message.data === 'signOut') {
        return signOut()
      } else if (message.data) {
        return Router.push('/dashboard')
      }
    }
  }, []) */

  async function signIn({ username, password }: SignInCredentials) {
    setIsLoadingFetch(true)
    try {
      const { data } = await api.post(
        'login',
        JSON.stringify({
          username,
          password
        })
      )

      const { userId }: tokenDecodedTypes = jwt_decode(data)

      setCookie(null, 'muralturma-token', data, {
        maxAge: 60 * 60 * 1, // 1 hour
        path: '/'
      })

      setCookie(null, 'muralturma-user_id', `${userId}`, {
        maxAge: 60 * 60 * 1, // 1 hour
        path: '/'
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${data}`

      // authChannel.postMessage('signInt')

      Router.push('/dashboard')
      setIsLoadingFetch(false)
    } catch (error) {
      toast.error(
        'Algo de inesperado aconteceu! Por favor, verifique seu usu??rio e senha!',
        {
          theme: 'colored'
        }
      )
      setIsLoadingFetch(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoadingFetch,
        signIn,
        signOut,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
