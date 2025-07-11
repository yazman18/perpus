<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\About;

class AboutController extends Controller
{
    public function aboutAdmin()
    {
        $aboutData = About::latest()->first();
        return Inertia::render('admin/AboutAdmin', [
            'aboutData' => $aboutData,
        ]);
    }

    public function about()
    {
        $aboutData = About::latest()->first();
        return Inertia::render('About',  [
            'aboutData' => $aboutData,
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'nama_sekolah' => 'nullable|string',
            'judul' => 'nullable|string',
            'sub_judul' => 'nullable|string',
            'about' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string',
            'website' => 'nullable|string',
            'email' => 'nullable|email',
            'instagram' => 'nullable|string',
            'jam_operasional_1' => 'nullable|string',
            'jam_operasional_2' => 'nullable|string',
            'maps' => 'nullable|string',
            'copyright' => 'nullable|string',
            'logo_sekolah' => 'nullable|image',
            'gambar' => 'nullable|image',
            'gambar_struktur' => 'nullable|image',
            'barcode' => 'nullable|image',
        ]);

        if ($request->hasFile('logo_sekolah')) {
            $data['logo_sekolah'] = $request->file('logo_sekolah')->store('logo_sekolah', 'public');
        }

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('images', 'public');
        }

        if ($request->hasFile('gambar_struktur')) {
            $data['gambar_struktur'] = $request->file('gambar_struktur')->store('struktur', 'public');
        }

        if ($request->hasFile('barcode')) {
            $data['barcode'] = $request->file('barcode')->store('barcodes', 'public');
        }

        About::create($data); // Ganti About sesuai modelmu

        return redirect()->back()->with('success', 'Data berhasil disimpan');
    }

    public function update(Request $request, $id)
    {
        $about = About::findOrFail($id);

        $data = $request->validate([
            'nama_sekolah' => 'nullable|string',
            'judul' => 'nullable|string',
            'sub_judul' => 'nullable|string',
            'about' => 'nullable|string',
            'deskripsi' => 'nullable|string',
            'alamat' => 'nullable|string',
            'no_hp' => 'nullable|string',
            'website' => 'nullable|string',
            'email' => 'nullable|email',
            'instagram' => 'nullable|string',
            'jam_operasional_1' => 'nullable|string',
            'jam_operasional_2' => 'nullable|string',
            'maps' => 'nullable|string',
            'copyright' => 'nullable|string',
            'gambar' => 'nullable|image',
            'gambar_struktur' => 'nullable|image',
            'barcode' => 'nullable|image',
        ]);

        // Simpan file baru jika ada
        if ($request->hasFile('logo_sekolah')) {
            $data['logo_sekolah'] = $request->file('logo_sekolah')->store('logo_sekolah', 'public');
        } else {
            $data['logo_sekolah'] = $about->logo_sekolah; // pertahankan gambar lama
        }

        if ($request->hasFile('gambar')) {
            $data['gambar'] = $request->file('gambar')->store('images', 'public');
        } else {
            $data['gambar'] = $about->gambar; // pertahankan gambar lama
        }

        if ($request->hasFile('gambar_struktur')) {
            $data['gambar_struktur'] = $request->file('gambar_struktur')->store('struktur', 'public');
        } else {
            $data['gambar_struktur'] = $about->gambar_struktur; // pertahankan gambar lama
        }

        if ($request->hasFile('barcode')) {
            $data['barcode'] = $request->file('barcode')->store('barcodes', 'public');
        } else {
            $data['barcode'] = $about->barcode; // pertahankan barcode lama
        }

        $about->update($data);

        return redirect()->back()->with('success', 'Data berhasil diperbarui');
    }

    public function destroy($id)
    {
        $about = About::findOrFail($id);

        if ($about->logo_sekolah) {
            \Storage::disk('public')->delete($about->logo_sekolah);
        }
        if ($about->gambar) {
            \Storage::disk('public')->delete($about->gambar);
        }
        if ($about->gambar_struktur) {
            \Storage::disk('public')->delete($about->gambar_struktur);
        }
        if ($about->barcode) {
            \Storage::disk('public')->delete($about->barcode);
        }

        $about->delete();

        return redirect()->back()->with('success', 'Data berhasil dihapus');
    }

}
