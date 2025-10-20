import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

const AuthContext = createContext({ user: null, userProfile: null, loading: true })

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    
    async function loadUserProfile(userId) {
      if (!userId) {
        setUserProfile(null)
        return
      }
      
      const { data, error } = await supabase
        .from('users')
        .select('role, barber_id')
        .eq('id', userId)
        .maybeSingle()
      
      if (mounted) {
        if (error) {
          console.error('Error loading user profile:', error)
          setUserProfile(null)
          return
        }

        if (!data) {
          // Create minimal profile safely using upsert on id
          const { data: sessionData } = await supabase.auth.getSession()
          const email = sessionData?.session?.user?.email || null
          const payload = { id: userId, role: 'barber' }
          if (email) payload.email = email
          const { error: upsertError } = await supabase
            .from('users')
            .upsert(payload, { onConflict: 'id' })
          if (upsertError) {
            console.error('Error creating user profile:', upsertError)
            setUserProfile({ role: 'barber', barber_id: null })
          } else {
            setUserProfile({ role: 'barber', barber_id: null })
          }
        } else {
          setUserProfile(data)
        }
      }
    }

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) return
      setUser(data.session?.user ?? null)
      if (data.session?.user) {
        await loadUserProfile(data.session.user.id)
      } else {
        setUserProfile(null)
      }
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await loadUserProfile(session.user.id)
      } else {
        setUserProfile(null)
      }
    })

    return () => {
      mounted = false
      listener.subscription.unsubscribe()
    }
  }, [])

  const value = { user, userProfile, loading }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}



