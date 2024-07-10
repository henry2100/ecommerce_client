import React from 'react'

export const ToCamelCase = (str) => {
    return str?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index == 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

export const ToTitleCase = (str) => {
    const result = str?.replace(/([A-Z])/g, " $1");
    const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
    return finalResult;
}

export const ToFirstLetters = (textData:any) => {
    const result = textData?.split(" ").map(item => item.slice(0,1).toString().toUpperCase());
    return result;
}

export const ToSnakeCase = (textData:any) => {
    const result = textData?.replaceAll(' ','_').toLowerCase();
    return result;
}

export const trimString = (textData:any) => {
    const result = textData?.trim().replace(/\s+/g, ' ');
    // const result = textData.trim();
    return result;
}