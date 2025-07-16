import { Link, router, usePage } from "@inertiajs/react";
import AdminLayout from "../../Layouts/AdminLayout";
import Swal from 'sweetalert2';

const NewsIndex = ({ news }) => {
    const { aboutData } = usePage().props;

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Yakin ingin menghapus Berita ini?',
            text: "Tindakan ini tidak bisa dibatalkan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/news/${id}`, {
                    onSuccess: () => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Berita berhasil dihapus!',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    };

    return (
        <div className="p-6 md:px-8 md:py-4 bg-white rounded-lg shadow-sm ">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Daftar Berita</h1>

            <div className="space-y-3 pr-2">
                {news.data.map((item) => (
                    <div key={item.id} className="border p-4 bg-white rounded shadow">
                        <h2 className="text-xl font-bold">{item.title}</h2>
                        <p className="text-sm text-gray-600">Kategori: {item.category}</p>
                        <p className="mt-2">{item.short_description}</p>
                        <div className="mt-4 flex gap-2">
                            <Link href={`/news/edit/${item.id}`} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Links */}
            <div className="mt-4 flex justify-center gap-2">
                {news.links.map((link, index) => (
                    <button
                        key={index}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        disabled={!link.url}
                        onClick={() => link.url && router.get(link.url)}
                        className={`px-3 py-1 border rounded ${link.active ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                    />
                ))}
            </div>
        </div>
    );
};

NewsIndex.layout = (page) => (
    <AdminLayout aboutData={page.props.aboutData}>
        {page}
    </AdminLayout>
);

export default NewsIndex;
