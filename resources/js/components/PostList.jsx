// PostList.jsx
import PostListItem from "./PostListItem";

const PostList = ({ newsList }) => {
    return (
        <div className="grid grid-cols-2 gap-12 mb-8">
            {newsList.map((news) => (
                <PostListItem key={news.id} news={news} />
            ))}
        </div>
    );
};

export default PostList;
