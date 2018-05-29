import React, { Component } from 'react';
import Axios from '../../../axios';
// import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount() {
        Axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Janusz',
                    }
                })
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
            });
    }

    postSelected = (id) => {
        this.props.history.push({ pathname: `/posts/${id}` })
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={`/${post.id}`} key={post.id}>
                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={this.postSelected.bind(this, post.id)} />
                    // </Link>
                )
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={`${this.props.match.url}/:id`} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;
