import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  onDeleteClick() {
    this.props.deletePost(this.props.params.id)
      .then( () => {
        this.context.router.push('/');
      });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to='/' className='btn btn-primary'>Back</Link>
        <button className='btn btn-danger pull-xs-right'
          onClick={this.onDeleteClick.bind(this)}>
          Delete
        </button>
        <h3 className='center'>{ post.title }</h3>
        <p>{ post.content }</p>
        <h5>Categories: { post.categories }</h5>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);
