import { Button, Image } from 'antd';
import { useState } from 'react';
import { GoogleLogin, googleLogout, CredentialResponse } from '@react-oauth/google';
import jwtDecode, { JwtPayload } from 'jwt-decode';


//https://morioh.com/p/bdc9c986c423

interface UserProfile {
    name: string
    email: string
    imageUrl: string
}

interface GoogleJWTPayload extends JwtPayload {
    name: string
    email: string
    picture: string
}

const Login = () => {
    const [profile, setProfile] = useState<UserProfile>();

    const onSuccess = (res: CredentialResponse) => {
        console.log(`success:`, res)
        let decoded = jwtDecode<GoogleJWTPayload>(res.credential as string)
        setProfile({
            name: decoded.name,
            email: decoded.email,
            imageUrl: decoded.picture
        } as UserProfile)
        console.log("decoded:", decoded)
    }

    const onError = () => {
        console.log(`Login error`)
    }

    const logOut = () => {
        googleLogout() 
        setProfile(undefined)
    }

    return(
        <div className='login'>
            {profile ? (
                <div>
                    <h1>Usuario logueado:</h1>
                    <Image src={profile.imageUrl} alt={"Foto de perfil del usuario: " + profile.imageUrl} />
                    <p>Nombre: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <Button onClick={logOut} >
                        Cerrar Sesión de Google
                    </Button>
                </div>
            ) : (
                <div>
                    <h1>Bienvenido, inicie sesion con Google</h1>
                    <GoogleLogin
                        onSuccess={onSuccess}
                        onError={onError}
                    />

                </div>
            )}
        </div>
    )
}

export default Login 