export const getStaticPaths = async () => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
  const data = await res.json();
  const paths = data.map((posts) => {
    return {
      params: { id: posts.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
    const id=context.params.id
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const data = await res.json();
    return{
        props:{post:data}
    }
}
const PostDetails = ({post}) => {
  return (
    <>
    <div className="p-16 flex flex-col gap-4">
      <h1 className="text-center font-bold text-5xl">Post no. {post.id}</h1>
      <table className=" table-auto w-2/3 place-self-center">
        <tbody>
            <tr className="border border-black divide-x divide-black">
                <td className="font-semibold text-xl px-3">UserId</td>
                <td className=" text-lg px-3">{post.userId}</td>
            </tr>
            <tr className="border border-black divide-x divide-black">
                <td className="font-semibold text-xl px-3">Title</td>
                <td className=" text-lg px-3">{post.title}</td>
            </tr>
            <tr className="border border-black divide-x divide-black">
                <td className="font-semibold text-xl px-3">Body</td>
                <td className=" text-lg px-3">{post.body}</td>
            </tr>
        </tbody>
      </table>
      </div>

    </>
  );
};

export default PostDetails;
