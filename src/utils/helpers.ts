import { clsx } from "clsx"
import { Children } from "react"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: unknown[]) {
    return twMerge(clsx(inputs))
}


export const Each = ({ render, of }: { render: any, of: unknown[] }) =>
    Children.toArray(of.map((item: unknown, index: number) => render(item, index)));

/**
 *
 * @param object
 * @param filesName how we are calling the files on our formdata
 * @returns
 */
export const __convertObjectToFormData = (object: Object, filesName = 'images'): FormData => {
    const objectAsFormData = new FormData();
    Object.entries(object).forEach(entry => {
        const [key, value] = entry;
        if (key !== filesName && typeof (value) !== 'object') {
            objectAsFormData.append(key, String(value))
        } else {
            for (let fileValue of value) {
                objectAsFormData.append(filesName, fileValue);
            }
        }
    })

    return objectAsFormData;
}

/**
 * Convert an object to FormData
 * @param object Object to be converted
 * @param filesName File name for the object
 * @returns FormData containing the converted object
 */
export const convertAnObjectToFormData = (object: Object): FormData => {
    const objectAsFormData = new FormData();

    Object.entries(object).forEach(([key, value]) => {
        if(typeof(value) !== 'object' && !Array.isArray(value) && !(value instanceof File)) {
            objectAsFormData.append(key, String(value));
        } else if (value instanceof File){
            objectAsFormData.append(key, value);
        } else if(Array.isArray(value)){
            for (let fileValue of value) {
                objectAsFormData.append(key, fileValue);
            }
        }
    });

    return objectAsFormData;
};