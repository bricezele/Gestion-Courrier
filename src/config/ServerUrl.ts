/**
 * Project YooLearn
 * File ServerUrl
 * Path app/config
 * Created by BRICE ZELE
 * Date: 13/09/2021
 */

const ServerUrl = {
    base: 'http://localhost:3001/api/v1/',
    oauth: 'oauth/token',
    signin: 'oauth/signin',
    skills: 'skills',
    signup: 'users',
    findUserByMail: 'users/find-by-mail',
    checkUserExist: 'users/check-admin-exist',
    resendValidationCode: 'users/resend-validation-code',
    validateAccount: 'users/validate-account',
    singleFile: 'files/single-file',
    multipleFile: 'files/multiple-file',
    workshop: 'workshop',
    training: 'trainings',
    getAmount: 'payment/get-amount',
    createStripePayment: 'payment/create-stripe-payment',
    doStripePayment: 'payment/do-stripe-payment',
    updateOneSignal: 'update-onesignal',
};

export default ServerUrl;
