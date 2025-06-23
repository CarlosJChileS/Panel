import { useEffect, useState } from 'react';
import { supabase } from '../../infrastructure/supabaseClient';

export function useSupabaseStatus() {
  const [status, setStatus] = useState('checking');
  useEffect(() => {
    async function check() {
      try {
        const { error } = await supabase.from('cities').select('id').limit(1);
        if (error) throw error;
        setStatus('connected');
      } catch (e) {
        setStatus('error');
      }
    }
    check();
  }, []);
  return status;
}
