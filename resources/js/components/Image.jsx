const Image = ({ src, className, w, h, alt }) => {
    return (
        <img
            src={`/storage/${src}`} // Pastikan symlink sudah dibuat: php artisan storage:link
            alt={alt || "image"}
            className={className}
            width={w}
            height={h}
            loading="lazy"
        />
    );
};

export default Image;
