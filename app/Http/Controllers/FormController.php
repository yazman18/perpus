<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\ResponseForm;
use Endroid\QrCode\Color\Color;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use RealRashid\SweetAlert\Facades\Alert;

class FormController extends Controller
{
    public function index()
    {
        $forms = Form::where('user_id', Auth::id())->paginate(5);

        // Pass the paginated data to the view
        return view('admin.form.index', ['forms' => $forms]);
    }

    public function create(Request $request)
    {

        // Validasi input
        $validated = $request->validate([
            'title' => 'required',
            'description' => 'nullable',
            'logo_instansi' => 'nullable|image|mimes:jpg,jpeg,png,svg|max:2048',
        ]);

        try {
            // Generate qr code
            $url = url('/forms/check-access-code?access_code=' . $request->code);

            $writer = new PngWriter();

            // QR code tanpa logo dan label
            $qrCode = new QrCode(
                data: $url, // Gunakan URL yang diterima
                encoding: new Encoding('UTF-8'),
                errorCorrectionLevel: ErrorCorrectionLevel::Low,
                size: 300,
                margin: 10,
                roundBlockSizeMode: RoundBlockSizeMode::Margin,
                foregroundColor: new Color(0, 0, 0),
                backgroundColor: new Color(255, 255, 255)
            );

            // Hasilkan QR code
            $result = $writer->write($qrCode);

            $qrFilename = 'qrcodes/' . time() . '_qr.png';
            Storage::disk('public')->put($qrFilename, $result->getString());

            $logoPath = null;
            if ($request->hasFile('logo_instansi')) {
                $logoFile = $request->file('logo_instansi');
                $logoFilename = time() . '_' . $logoFile->getClientOriginalName();
                $logoPath = $logoFile->storeAs('logo_instansi', $logoFilename, 'public');
            }

            // Simpan data ke database
            $data = Form::create([
                'user_id' => Auth::id(),
                'title' => $request->title,
                'description' => $request->description,
                'code' => $request->code,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'review_material' => $request->review_material,
                'event_date' => $request->event_date,
                'event_time' => $request->event_time,
                'effective_date' => $request->effective_date,
                'vanue' => $request->vanue,
                'nama_perusahaan' => $request->nama_perusahaan,
                'alamat_perusahaan' => $request->alamat_perusahaan,
                'qr_access' => $qrFilename,
                'logo_instansi' => $logoPath
            ]);

            Alert::success('Berhasil menambahkan data', 'Selamat berhasil menambahkan data');
            return back();
        } catch (\Exception $e) {
            Alert::error('Opss, gagal!', "Terjadi kesalahan, data tidak berhasil disimpan. $e");
            return back();
        }
    }

    public function update(Request $request, $id)
    {
        $form = Form::findOrFail($id);
    
        // Cek apakah file logo_instansi di-upload
        if ($request->hasFile('logo_instansi')) {
            // Hapus logo lama jika ada di storage
            if ($form->logo_instansi && file_exists(storage_path('public' . $form->logo_instansi))) {
                unlink(storage_path('public' . $form->logo_instansi));
            }
    
            // Ambil file yang di-upload dan buat nama file dengan timestamp
            $logoFile = $request->file('logo_instansi');
            $logoFilename = time() . '_' . $logoFile->getClientOriginalName();
    
            // Simpan file dengan nama baru di folder 'logo_instansi' dalam storage publik
            $logoPath = $logoFile->storeAs('logo_instansi', $logoFilename, 'public');
    
            // Perbarui kolom 'logo_instansi' dengan nama file yang baru
            $form->logo_instansi = $logoFilename;
        }
    
        // Update data lainnya di form
        $form->update([
            'title' => $request->title,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'review_material' => $request->review_material,
            'event_date' => $request->event_date,
            'event_time' => $request->event_time,
            'effective_date' => $request->effective_date,
            'vanue' => $request->vanue,
            'nama_perusahaan' => $request->nama_perusahaan,
            'alamat_perusahaan' => $request->alamat_perusahaan,
            // Pastikan logo_instansi terupdate jika ada
            'logo_instansi' => $form->logo_instansi,
        ]);
    
        return redirect()->back()->with('success', 'Form berhasil diperbarui');
    }

    
    public function show($id)
    {
        $form = Form::with(['responses'])->find($id);
        return view('admin.form.detail', ['form' => $form]);
    }

    public function destroy($id)
    {
        $form = Form::findOrFail($id);
        $form->delete();
        return redirect()->back()->with('success', 'Form berhasil dihapus');
    }

    public function printForm(int $id)
    {
        $form = Form::with(['responses' => function ($query) {
            $query->where('status', 'present');
        }])->where('id', $id)->firstOrFail();
        return view('form_attendence_pdf', compact('form'));
    }

    public function responseDestroy(int $id, int $responseId)
    {
        $response = ResponseForm::where('id', $responseId)->first();
        // hapus ttd
        Storage::disk('public')->delete($response->tanda_tangan);
        $response->delete();
        return back();
    }

    public function editAttandance(int $idForm, int $idAttendance)
    {

        $form = Form::where('id', $idForm)->firstOrFail();
        $attandance = ResponseForm::where('id', $idAttendance)->firstOrFail();

        return view('admin.form.edit-attandance', compact('form', 'attandance'));
    }

    public function updateAttandance(Request $request, int $idForm, int $idAttendance)
    {

        $form = Form::where('id', $idForm)->firstOrFail();

        // Validasi input
        $validated = $request->validate([
            'nip' => 'required|string|max:255',
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
            'instansi' => 'required|string|max:255',
            'status' => 'required|in:present,absence',
            'tanda_tangan' => 'nullable|string', // base64 image
        ]);

        // Cari data attendance yang mau di-update
        $attendance = ResponseForm::findOrFail($idAttendance);

        // Update field biasa
        $attendance->nip = $validated['nip'];
        $attendance->nama = $validated['nama'];
        $attendance->jabatan = $validated['jabatan'];
        $attendance->instansi = $validated['instansi'];
        $attendance->status = $validated['status'];

        // Jika tanda tangan dikirim, simpan file ke storage
        if ($request->filled('tanda_tangan')) {
            $signatureImage = str_replace('data:image/png;base64,', '', $request->tanda_tangan);
            $signatureImage = str_replace(' ', '+', $signatureImage);
            $imageName = 'signature_' . time() . '.png';

            Storage::disk('public')->put($imageName, base64_decode($signatureImage));

            // Hapus file tanda tangan lama (jika ada)
            if ($attendance->tanda_tangan && Storage::exists('public/' . $attendance->tanda_tangan)) {
                Storage::delete('public/' . $attendance->tanda_tangan);
            }

            // Simpan path relatif
            $attendance->tanda_tangan = $imageName;
        }

        // Simpan data
        $attendance->save();

        return redirect()->route('admin.form.show', $form->id)
            ->with('success', 'Data kehadiran berhasil diperbarui.');
    }
}
