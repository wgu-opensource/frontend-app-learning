import React from 'react';
import { MasqueradeStatus, Payload } from './data/api';
interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onSubmit' | 'onError'> {
    onError: (error: string) => void;
    onSubmit: (payload: Payload) => Promise<MasqueradeStatus>;
}
export declare const MasqueradeUserNameInput: React.FC<Props>;
export {};
