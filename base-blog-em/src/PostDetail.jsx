import { useQuery, useMutation } from 'react-query';

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'DELETE' }
  );
  return response.json();
}

async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: 'PATCH', data: { title: 'REACT QUERY FOREVER!!!!' } }
  );
  return response.json();
}

export function PostDetail({ post }) {
  // replace with useQuery
  const { data, isLoading, isError } = useQuery(['comments', post.id], () =>
    fetchComments(post.id)
  );

  const deleteMutation = useMutation((id) => deletePost(id));
  const updateMutation = useMutation((id) => updatePost(id));

  if (isLoading) return <h3>Loading...</h3>;
  if (isError) return <h3>Error!</h3>;

  return (
    <>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      <button
        onClick={() => {
          updateMutation.mutate(post.id);
          console.log(updateMutation.data);
        }}
      >
        Update title
      </button>
      {deleteMutation.isError && <p style={{ color: 'red' }}>Error</p>}
      {deleteMutation.isLoading && <p style={{ color: 'blue' }}>Loading...</p>}
      {deleteMutation.isSuccess && <p style={{ color: 'green' }}>Deleted</p>}
      {updateMutation.isError && <p style={{ color: 'red' }}>Error</p>}
      {updateMutation.isLoading && <p style={{ color: 'blue' }}>Loading...</p>}
      {updateMutation.isSuccess && <p style={{ color: 'green' }}>Updated</p>}
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((data) => (
        <li key={data.id}>
          {data.email}: {data.body}
        </li>
      ))}
    </>
  );
}
