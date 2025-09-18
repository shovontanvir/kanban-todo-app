import React from 'react';
export default interface RouteType {
    id: number;
    name: string;
    path: string;
    element: React.ComponentType;
}