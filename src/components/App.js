import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      apiUrl: 'https://practiceapi.devmountain.com/api'
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get(`${this.state.apiUrl}/posts`)
    .then(res => {
      // console.log(res.data);
      this.setState({posts: res.data});
    })
    .catch(err => alert('Failed to get posts'))
  }

  updatePost(id, text) {
    // console.log(`id ${id} text ${text}`)
    axios.put(`${this.state.apiUrl}/posts?id=${id}`, { text })
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => alert('Failed to update post'))
  }

  deletePost(id) {
    axios.delete(`${this.state.apiUrl}/posts?id=${id}`)
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => 'Failed to delete post')
  }

  createPost(text) {
    // console.log(text);
    axios.post(`${this.state.apiUrl}/posts`, {text})
    .then(res => {
      this.setState({posts: res.data})
    })
    .catch(err => 'Failed to create post')
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          {
            // console.log(posts),
            posts.map(post => (
              <Post key={post.id} 
                    text={post.text} 
                    date={post.date} 
                    id={post.id}
                    updatePostFn={this.updatePost} 
                    deletePostFn={this.deletePost}
                     />
            ))
          }
          
        </section>
      </div>
    );
  }
}

export default App;
