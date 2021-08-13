import React from 'react';
import { Route } from 'react-router-dom';
import Posts from './Posts';
import PostView from '../containers/PostView';

export default function Router() {
    return (
        <>
            <Route exact path='/' component={Posts} />
            <Route exact path='/:PostID' component={PostView} />
        </>
    )
} 
