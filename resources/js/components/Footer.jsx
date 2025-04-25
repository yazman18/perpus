import Image from "./Image";

const Footer = () => {
    return (
        <footer className="bg-[#A8ACC2] px-6 md:px-16 py-10 text-sm text-black rounded-md">
            <div className="max-w-screen-xl mx-auto flex flex-wrap justify-between gap-x-10 gap-y-8">
                {/* KIRI: Logo & Info */}
                <div className="flex-1 min-w-[280px] break-words">
                    <div className="flex items-center gap-3 mb-4">
                        <Image
                            src="/images/logo.png"
                            alt="Logo SMAN 2 Bandung"
                            w={80}
                            h={80}
                        />
                        <h2 className="text-lg font-semibold">
                            SMAN 2 Bandung
                        </h2>
                    </div>
                    <p className="mb-3 text-justify">
                        SMAN 2 Bandung adalah sekolah unggulan yang berorientasi
                        pada pendidikan karakter. Website ini merupakan portal
                        resmi perpustakaan SMAN 2 Bandung yang bertujuan
                        memfasilitasi akses informasi bagi siswa dan masyarakat.
                    </p>

                    <p className="border-t border-black pt-4 text-sm mt-4">
                        📍 Alamat: Jl. Cihampelas No. 173, Cipaganti, Kec.
                        Coblong, Kota Bandung, Jawa Barat 40131
                        <br />
                        📞 Telepon: (022) 2032462
                        <br />
                        🌐 Website: www.sman2bdg.sch.id
                        <br />
                        📩 Email: contact@sman2bdg.sch.id
                        <br />
                        📷 Instagram: @smandabandung
                        <br />
                        🔗 LinkedIn: SMAN 2 Bandung
                    </p>
                </div>

                {/* KANAN: Map + Jam + QR */}
                <div className="flex-1 min-w-[280px] flex flex-col gap-4">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63355.27029722567!2d107.5607544108726!3d-6.902479243695683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e65f35b36b23%3A0xb17b5749465aa9ae!2sSMAN%202%20Bandung!5e0!3m2!1sen!2sid!4v1647265845837!5m2!1sen!2sid"
                        width="100%"
                        height="200"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>

                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                        {/* Jam Operasional */}
                        <div className="flex-1">
                            <h3 className="text-base font-semibold mb-1">
                                Jam Operasional:
                            </h3>
                            <p>
                                Senin - Jumat: 07.00 - 15.00 WIB
                                <br />
                                Sabtu - Minggu: Libur
                            </p>
                        </div>

                        {/* QR Code */}
                        <div className="flex-1">
                            <Image
                                src="/images/qr.png"
                                alt="QR Code"
                                w={150}
                                h={150}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm mt-10 pt-4 border-t border-black">
                Copyright © 2025 SMAN 2 Bandung. All rights reserved
            </div>
        </footer>
    );
};

export default Footer;
