/**
 * Project gestion-courrier-native
 * File Tools
 * Path src/utils
 * Created by BRICE ZELE
 * Date: 14/03/2022
 */
export const getErrorMsg = (error: any) =>
    error.error?.message?.hasOwnProperty('message')
        ? Array.isArray(error.error?.message?.message)
            ? error.error?.message?.message.join('\n')
            : error.error?.message?.message
        : error.error?.message;

export const getKeyByValue = (object:any, value:any) => {
    return Object.keys(object).find(key => object[key] === value);
}
