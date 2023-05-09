import { Button, Image } from 'antd';

import { ID_SIGNINDIV } from './Constants'

import { AuthContext } from './Contexts';
import { useEffect, useContext } from 'react';

import jwtDecode, { JwtPayload } from 'jwt-decode';


export interface UserProfile {
    name: string
    email: string
    imageUrl: string
};

interface GoogleJWTPayload extends JwtPayload {
    name: string
    email: string
    picture: string
};

const Login = () => {
    
    const { profile, setProfile } = useContext(AuthContext);
    //const [profile, setProfile] = useState<UserProfile>();

    const googleButtonConfiguration: google.accounts.id.GsiButtonConfiguration = {
        type: 'standard',
        theme: "outline",
        size: "large"
    };

    const onSuccess = (res: google.accounts.id.CredentialResponse) => {
        console.log("Response", res);
        let decoded = jwtDecode<GoogleJWTPayload>(res.credential as string);
        console.log("DecodedJWT ID token:", decoded);
        setProfile({
            name: decoded.name,
            email: decoded.email,
            imageUrl: decoded.picture
        } as UserProfile);
    }
    
    const logOut = () => {
        setProfile(undefined);
        console.log("Logging out........")
        localStorage.clear();
    }    

    let didInit = false;
    const init = () => {
        google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID as string,
            callback: onSuccess
        });
        didInit = true;
    }

    const renderAndPrompt = () => {
        google.accounts.id.renderButton(
            document.getElementById(ID_SIGNINDIV) as HTMLElement,
            googleButtonConfiguration
        );
        google.accounts.id.prompt();
    }

    useEffect(() => {
        /* 
            React.StrictMode renders components twice
            (on dev but not production) in order to
            detect any problems with your code and
            warn you about them (which can be quite useful).
         */
        if(!didInit) init(); //renderAndPrompt();

        let loggedInUser = localStorage.getItem("user");
        console.log(loggedInUser);
        if(loggedInUser == "undefined") loggedInUser = null;
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setProfile(foundUser);
        }

    }, [])

    useEffect(() => {
        if(!profile) {
            renderAndPrompt()
        } else {
            console.log(profile);
            console.log(JSON.stringify(profile));
            localStorage.setItem("user", JSON.stringify(profile));
        };
    }, [profile])

    const mockAction = () => {
        console.log("MockAction in", profile, JSON.stringify(profile));
    }

    // Will run on every render
    /* useEffect(() => {
        
    }) */


    return(
        <div className='login'>
            {profile ? (
                <div>
                    <h1>Usuario logueado:</h1>
                    <Image src={profile.imageUrl} alt={"Foto de perfil del usuario. Error al cargar"} referrerPolicy="no-referrer" />
                    <p>Nombre: {profile.name}</p>
                    <p>Email: {profile.email}</p>
                    <Button onClick={logOut}>Cerrar Sesión</Button>

                    <Button onClick={mockAction}>Mock action</Button>

                </div>
            ) : (
                <div>
                    <h1>Bienvenido, inicie sesion con Google</h1>
                    <div id={ID_SIGNINDIV}></div>
                </div>
            )}
        </div>
    )
}

export default Login 