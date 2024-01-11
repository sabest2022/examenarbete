import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { useUserContext } from '../../context/UserContext'


const clientId =
    '152826738328-2gschac9945q44ilfue2n9c6d19nt296.apps.googleusercontent.com'

function Login() {
    const { isSignedIn, login } = useUserContext()

    const onSuccess = async (res) => {
        console.log('onSuccess triggers',)
        await login(res.tokenId)
    }

    return (
        <div id="signinbutton">
            {!isSignedIn && (
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Google Login"
                    onSuccess={onSuccess}
                    cookiePolicy={'single_host_origin'}
                />
            )}
        </div>
    )
}

export default Login
