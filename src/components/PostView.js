import React from 'react';
import PostCard from '../components/PostCard';
import ErrorCard from '../components/ErrorCard';


export default class PostView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    componentDidMount(prevProps) {

    }

    render() {
        var post = (this.state.post !== null) ? <PostCard inputData={this.state.post} key={this.state.post.PostID} /> : <ErrorCard />;
        return (
            <>
                {post}
            </>
        )
    }
}