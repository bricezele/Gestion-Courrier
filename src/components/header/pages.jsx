import {File, Film, Image} from "react-feather"

export const errorPages = [
    
            { path: `/pages/errors/error400`, title: 'Error 400', type: 'link' },
            { path: `/pages/errors/error401`, title: 'Error 401', type: 'link' },
            { path: `/pages/errors/error403`, title: 'Error 403', type: 'link' },
            { path: `/pages/errors/error404`, title: 'Error 404', type: 'link' },
            { path: `/pages/errors/error500`, title: 'Error 500', type: 'link' },
            { path: `/pages/errors/error503`, title: 'Error 503', type: 'link' }
]
export const authPages = [
            { path: `/pages/auth/login`, type: 'link', title: 'Login Simple' },
            { path: `/pages/auth/loginWithBgImg1`, type: 'link', title: 'Login with Bg Img 1' },
            { path: `/pages/auth/loginWithBgImg2`, type: 'link', title: 'Login with Bg Img 2' },
            { path: `/pages/auth/loginWithValidation`, type: 'link', title: 'Login With Validation' },
            { path: `/pages/auth/signup`, type: 'link', title: 'Register Simple' },
            { path: `/pages/auth/signupWithImg1`, type: 'link', title: 'Register With Bg Image 1' },
            { path: `/pages/auth/signupWithImg2`, type: 'link', title: 'Register With Bg Image 2' },
        
]
export const usefullPages = [
            { path: `/pages/auth/unlockUser`, type: 'link', title: 'Unlock User' },
            { path: `/pages/auth/forgetPwd`, type: 'link', title: 'Forget Password' },
            { path: `/pages/auth/resetPwd`, type: 'link', title: 'Reset Password' },
            { path: `/pages/maintenance`, type: 'link', title: 'Maintenance' }
]

export const comingsoonPages = [
            { path: `/pages/comingsoon/comingsoon`, title: 'Coming-soon',icon:File, type: 'link' },
            { path: `/pages/comingsoon/comingsoonVideo`, title: 'Coming-video',icon:Film, type: 'link' },
            { path: `/pages/comingsoon/comingsoonImg`, title: 'Coming-image',icon:Image, type: 'link' },
]