import {useEffect} from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import {useAuthContext} from '../hooks/useAuthContext'

// components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'

function Home() {
    const {workouts, dispatch} = useWorkoutsContext()
    const {user} = useAuthContext()

    useEffect(() => {

        const fetchWorkouts = async() => {
            const res = await fetch('/api/workouts', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await res.json()

            if (res.ok) {
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }
        }

        if (user) {
            fetchWorkouts()
        }

    }, [dispatch, user])

    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails key={workout._id} workout={workout}/>
                ))}
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home