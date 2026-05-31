const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const api = {
  async getPosts() {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) throw new Error('Failed to fetch posts');
    return response.json();
  },

  async getPostById(id) {
    const response = await fetch(`${API_BASE_URL}/posts/${id}`);
    if (!response.ok) throw new Error('Failed to fetch post');
    return response.json();
  },

  async getCommentsByPost(postId) {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}/comments`);
    if (!response.ok) throw new Error('Failed to fetch comments');
    return response.json();
  }
};