import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import { useAuthContext } from "../hooks/useAuthContext"

const WorkoutForm = () => {
    const {dispatch} = useWorkoutsContext()
    const [title, setTitle] = useState('')
    const [load, setLoad ] = useState('')
    const [reps, setReps] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {user} = useAuthContext()

    const handleSubmit = async(e) => {
        e.preventDefault()
        if (!user) {
            setError('You must be logged in')
            return
        }

        const workout = {title, load, reps}

        const res = await fetch('api/workouts/', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await res.json()

        if (!res.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (res.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setEmptyFields([])
            dispatch({type: 'CREATE_WORKOUT', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label htmlFor="title">Exercise title:</label>
            <input 
            type="text" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            className={emptyFields.includes('title') ? 'error' : ''}
            />

            <label htmlFor="load">Load (in kg):</label>
            <input 
            type="number" 
            onChange={(e) => setLoad(e.target.value)}
            value={load}
            name="load"
            className={emptyFields.includes('load') ? 'error' : ''}
            />

            <label htmlFor="reps">Reps:</label>
            <input 
            type="number" 
            onChange={(e) => setReps(e.target.value)}
            value={reps}
            name="reps"
            className={emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
)
}

export default WorkoutForm