import {createLngLat} from './factory'

export const isLngLat = obj => obj.lng && obj.lat;
export const checkType = val => Object.prototype.toString.call(val).slice(8, -1);
export const toKebabCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`).replace(/^-/, '');

export const getPosition = (T, point) => isLngLat(point) ? createLngLat(T, point) : point;
