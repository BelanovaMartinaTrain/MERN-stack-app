import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
    const   [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password)
    }


    return (
        <form className="login" onSubmit={handleSubmit}>
            <h3>Log in:</h3>
            <label htmlFor="email">Email:</label>
            <input 
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <label htmlFor="password">Password:</label>
            <input 
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />
            <button disable={isLoading}>Log in</button>
            {error && <div className="error">{error}</div>}
        </form>
        )
    }

export default Login