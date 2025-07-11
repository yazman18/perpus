<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Form;
use App\Models\ResponseForm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FormController extends Controller
{
    public function index(Request $request)
    {
        $forms = Form::paginate(5);
        // $this->attachUserFormStatus($forms, Auth::id());

        return view('dosen.form.index', ['forms' => $forms]);
    }

    public function fillResponse(Request $request, $formId)
    {

        $request->validate($this->validationRules());

        $signaturePath = $this->saveSignature($request->input('tanda_tangan'));

        ResponseForm::create([
            'form_id' => $formId,
            'nip' => $request->nip,
            'nama' => $request->nama,
            'jabatan' => $request->jabatan,
            'instansi' => $request->instansi,
            'tanda_tangan' => $signaturePath,
            'status' => $request->status,
        ]);

        return redirect('/')->with('success', 'Form berhasil diisi.');
    }

    private function validationRules()
    {
        return [
            'nip' => 'required|string',
            'nama' => 'required|string',
            'tanda_tangan' => 'required|string',
            'status' => 'required|string',
        ];
    }

    public function checkAccessCode(Request $request)
    {
        $form = Form::where('code', $request->access_code)->first(); // Temukan form berdasarkan Kode Akses

        if (!$form) {
            return redirect()->back()->with('error', 'Form tidak ditemukan, pastikan kode akses benar!');
        }

        if ($form->start_date != null && $form->end_date != null) {
            // Cek apakah form sudah kadaluarsa
            if ($this->isExpiredForm($form->end_date)) {
                return redirect()->back()->with('error', 'Form sudah tidak menerima jawaban!');
            };

            // Cek apakah form belum aktif
            if ($this->isNotActiveForm($form->start_date)) {
                return redirect()->back()->with('error', 'Form belum bisa menerima jawaban!');
            };
        }

        return view('fill_form', compact('form'));
    }

    private function saveSignature($signatureData)
    {
        $signatureImage = str_replace('data:image/png;base64,', '', $signatureData);
        $signatureImage = str_replace(' ', '+', $signatureImage);
        $imageName = 'signature_' . time() . '.png';

        Storage::disk('public')->put($imageName, base64_decode($signatureImage));

        return $imageName;
    }

    public function hasUserFilledForm($formId, $userId)
    {
        return ResponseForm::where('form_id', $formId)->where('user_id', $userId)->exists();
    }


    private function isExpiredForm($endDate)
    {
        return time() > strtotime($endDate);
    }

    private function isNotActiveForm($startDate)
    {
        return time() < strtotime($startDate);
    }
}
