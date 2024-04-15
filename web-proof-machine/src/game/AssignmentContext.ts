import { createContext } from 'react';
import { Term } from './Term';

export const AssignmentContext = createContext<(t : Term) => string>((t : Term) => "y");
