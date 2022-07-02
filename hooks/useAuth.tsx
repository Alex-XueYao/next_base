import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useRouter } from 'next/router'
import { auth } from '../firebase'
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
	User,
} from 'firebase/auth'

interface AuthProviderProps {
	children: React.ReactNode
}

interface IAuth {
	user: User | null
	signUp: (email: string, password: string) => Promise<void>
	signIn: (email: string, password: string) => Promise<void>
	logout: () => Promise<void>
	error: string | null
	loading: boolean
}

const AuthContext = createContext<IAuth>({
	user: null,
	signUp: async () => {},
	signIn: async () => {},
	logout: async () => {},
	error: null,
	loading: false,
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [loading, setLoading] = useState(false)
	const [user, setUser] = useState<User | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [initialLoading, setInitialLoading] = useState(true)
	const router = useRouter()

	//  注册
	const signUp = async (email: string, password: string) => {
		setLoading(true)
		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential.user)
				setUser(userCredential.user)
				router.push('/')
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false))
	}

	// 登录
	const signIn = async (email: string, password: string) => {
		setLoading(true)
		await signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				console.log(userCredential.user)
				setUser(userCredential.user)
				router.push('/')
			})
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false))
	}

	// 退出登录
	const logout = async () => {
		setLoading(true)
		signOut(auth)
			.then(() => setUser(null))
			.catch((error) => alert(error.message))
			.finally(() => setLoading(false))
	}

	const memoedValue = useMemo(
		() => ({ user, signUp, signIn, logout, error, loading }),
		[user, error, loading]
	)

  // Persisting the user
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// Logged in
				setUser(user)
				setLoading(false)
			} else {
				// Not Logged in
				setUser(null)
				setLoading(true)
				router.push('/login')
			}
			setInitialLoading(false)
		})
	}, [auth])

	return (
		<AuthContext.Provider value={memoedValue}>
			{!initialLoading && children}
		</AuthContext.Provider>
	)
}

export default function useAuth() {
	return useContext(AuthContext)
}
