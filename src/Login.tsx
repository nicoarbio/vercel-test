import { Button, Image } from 'antd';
import { useState, useEffect } from 'react';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { ID_SIGNINDIV } from './Constants'

const Login = () => {

    interface UserProfile {
        name: string
        email: string
        imageUrl: string
    };
    
    interface GoogleJWTPayload extends JwtPayload {
        name: string
        email: string
        picture: string
    };
    
    const googleButtonConfiguration: google.accounts.id.GsiButtonConfiguration = {
        type: 'standard',
        theme: "outline",
        size: "large"
    };

    const [profile, setProfile] = useState<UserProfile>();

    let didInit = false;

    const init = () => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
            callback: onSuccess
        });
        google.accounts.id.renderButton(
            document.getElementById(ID_SIGNINDIV) as HTMLElement,
            googleButtonConfiguration
        );
        google.accounts.id.prompt();
        didInit = true;
    }

    const onSuccess = (res: google.accounts.id.CredentialResponse) => {
        console.log("Response", res);
        console.log("EncodedJWT ID token", res.credential);
        let decoded = jwtDecode<GoogleJWTPayload>(res.credential as string);
        console.log("DecodedJWT ID token:", decoded);
        setProfile({
            name: decoded.name,
            email: decoded.email,
            imageUrl: decoded.picture
        } as UserProfile);
        (document.getElementById(ID_SIGNINDIV) as HTMLElement).hidden = true;
    }
    
    const logOut = () => {
        setProfile(undefined);
        (document.getElementById(ID_SIGNINDIV) as HTMLElement).hidden = false;
    }

    useEffect(() => {
        /* 
            React.StrictMode renders components twice
            (on dev but not production) in order to
            detect any problems with your code and
            warn you about them (which can be quite useful).
         */
        if(!didInit) init();
    }, [])

    return(
        <div className='login'>
            {profile ? (
                <div>
                    <h1>Usuario logueado:</h1>
                    <Image src={profile.imageUrl} alt={"Foto de perfil del usuario. Error al cargar"} referrerPolicy="no-referrer" />
                    <p>Nombre: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <Button onClick={logOut}>Cerrar Sesión</Button>
                </div>
            ) : (
                <div>
                    <h1>Bienvenido, inicie sesion con Google</h1>
                </div>
            )}
            <div id={ID_SIGNINDIV}></div>
        </div>
    )
}

export default Login 