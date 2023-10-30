import { getAuth, onAuthStateChanged } from "firebase/auth";


export function useAuth() {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = getAuth();
    
    useEffect(() => {
        setLoading(true)
        auth.onAuthStateChanged(function handleAuth(user) {
            if (user) {
                setUser(user);
                setLoading(false);
            } else {
                setUser(null);
                setLoading(false)
            }
        });
    }, [user]);

    return {user, loading};
}