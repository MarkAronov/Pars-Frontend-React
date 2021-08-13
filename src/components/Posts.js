import React from 'react';
import PostCard from './PostCard';


export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount(prevProps) {
        // Typical usage (don't forget to compare props):

    }

    render() {
        //const [, set] = React.useState();
        const posts = this.state.posts.map((data, index) => <PostCard inputData={data} key={index} />)
        return (
            <>
                {posts}
            </>
        )
    }
}