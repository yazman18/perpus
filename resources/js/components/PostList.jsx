// PostList.jsx
import PostListItem from "./PostListItem";

const PostList = ({ newsList }) => {
    return (
        <div className="flex flex-col gap-12 mb-8">
            {newsList.map((news) => (
                <PostListItem key={news.id} news={news} />
            ))}
        </div>
    );
};

export default PostList;
