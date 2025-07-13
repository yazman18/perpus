import Image from "./Image";

const Footer = ({ aboutData }) => {
    return (
        <footer className="bg-[#2693CE]  md:px-16 py-10 text-sm text-white rounded-md">
            <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-x-10 gap-y-8">
                {/* KIRI: Logo & Info */}
                <div className="flex-1 min-w-[280px] break-words">
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={`/storage/${aboutData?.logo_sekolah ?? "images/logo.png"}`}
                            alt="Logo SMAN 1 Baleendah"
                            style={{ maxWidth: "80px", height: "80px" }}
                        />
                        <h2 className="text-lg font-semibold">
                            {aboutData?.nama_sekolah ?? "Nama sekolah belum ada"}
                        </h2>
                    </div>
                    <p className="mb-3 text-justify">
                        {aboutData?.deskripsi ?? "Deskripsi belum tersedia."}
                    </p>

                    <p className="border-t border-black pt-4 text-sm mt-4">
                        📍Alamat: {aboutData?.alamat ?? "Alamat belum tersedia"}
                        <br />
                        📞 Telepon: {aboutData?.no_hp ?? "-"}
                        <br />
                        🌐 Website: {aboutData?.website ?? "-"}
                        <br />
                        📩 Email: {aboutData?.email ?? "-"}
                        <br />
                        📷 Instagram: {aboutData?.instagram ?? "-"}
                    </p>
                </div>

                {/* KANAN: Map + Jam + QR */}
                <div className="flex-1 min-w-[280px] flex flex-col gap-4">
                    {aboutData?.maps ? (
                        <iframe
                            src={aboutData.maps}
                            width="100%"
                            height="200"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    ) : (
                        <div className="text-center text-gray-500 italic py-10">
                            Peta lokasi sekolah akan ditampilkan di sini.
                        </div>
                    )}

                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        {/* Jam Operasional */}
                        <div className="flex-1">
                            <h3 className="text-base font-semibold mb-1">
                                Jam Operasional:
                            </h3>
                            <p>
                                {aboutData?.jam_operasional_1 ?? "Jam operasional belum tersedia"}
                            </p>
                            <p>
                                {aboutData?.jam_operasional_2 ?? "Jam operasional belum tersedia"}
                            </p>
                        </div>
                        {/* QR Code */}
                        <div className="flex-1">
                            <img
                            src={`/storage/${aboutData?.barcode ?? "images/qr.png"}`}
                            alt="Logo SMAN 1 Baleendah"
                            style={{ maxWidth: "150px", height: "150px" }}
                        />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm mt-10 pt-4 border-t border-black">
                {aboutData?.copyright ?? "© 2025 SMAN 1 Baleendah. All rights reserved"}
            </div>
        </footer>
    );
};

export default Footer;
