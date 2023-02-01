import React, { createContext } from 'react';
import { UserProfile } from './Login';

type AuthContextType = {
    profile?: UserProfile | undefined,
    setProfile: React.Dispatch<React.SetStateAction<UserProfile | undefined>>
}

export const AuthContext: React.Context<AuthContextType> = createContext({} as AuthContextType);