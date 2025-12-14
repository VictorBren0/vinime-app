import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/config/firebase';
import { setUser } from '@/store/slices/authSlice';
import { AppDispatch } from '@/store';

export function useAuthListener() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Usuário logado - serializar para Redux
        const serializedUser = JSON.parse(JSON.stringify(user));
        dispatch(setUser(serializedUser));
      } else {
        // Usuário não logado
        dispatch(setUser(null));
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [dispatch]);
}
