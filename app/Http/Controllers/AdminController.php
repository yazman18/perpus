<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function report(Request $request)
{
    $search = $request->query('search');
    $query = Peminjaman::with('book', 'user')
        ->where('status_peminjaman', 'disetujui')
        ->orWhere('status_pengembalian', 'disetujui');

    if ($search) {
        $query->where(function ($q) use ($search) {
            $q->whereHas('book', fn ($q2) => $q2->where('title', 'like', "%{$search}%"))
              ->orWhere('nama', 'like', "%{$search}%");
        });
    }

    $data = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

    $transactions = $data->map(function ($item) {

        $expectedReturn = \Carbon\Carbon::parse($item->tanggal_pinjam)->addDays($item->durasi);

        if ($item->tanggal_kembali) {
            $actualReturn = \Carbon\Carbon::parse($item->tanggal_kembali);
        } else {
            $actualReturn = now();
        }

        $selisihHari = $actualReturn->diffInDays($expectedReturn, false);
        $denda = $selisihHari < 0 ? abs((int) $selisihHari) * 1000 : 0;

        return [
            'id' => $item->id,
            'nama' => $item->nama,
            'buku' => $item->book->title,
            'jenis' => $item->tanggal_kembali ? 'Pengembalian' : 'Peminjaman',
            'durasi' => $item->durasi,
            'tanggal_pinjam' => $item->tanggal_pinjam,
            'tanggal_kembali' => $item->tanggal_kembali ?? '-',
            'denda' => $denda,
        ];
    });


    return Inertia::render('admin/ReportAdmin', [
        'transactions' => $transactions,
        'totalBorrowed' => Peminjaman::where('status_peminjaman', 'disetujui')->count(),
        'totalReturned' => Peminjaman::whereNotNull('tanggal_kembali')
        ->where('status_pengembalian', 'disetujui')
        ->count(),
        'links' => $data->toArray()['links'],
        'search' => $search,
    ]);
}



    public function dashboard()
    {
        $totalStaff = \App\Models\User::where('role', 'admin')->count();
        $totalStudents = \App\Models\User::where('role', 'siswa')->count();
        $totalLecturers = \App\Models\User::where('role', 'guru')->count();
        $totalCatalogs = \App\Models\Book::count();

        $totalLateReturns = \App\Models\Peminjaman::whereNotNull('tanggal_kembali')
            ->whereRaw('DATEDIFF(tanggal_kembali, tanggal_pinjam) > durasi')
            ->count();

        $totalReturns = \App\Models\Peminjaman::whereNotNull('tanggal_kembali')->count();
        $latePercentage = $totalReturns > 0
            ? round(($totalLateReturns / $totalReturns) * 100)
            : 0;

        $avgPerMonth = \App\Models\Peminjaman::selectRaw('MONTH(tanggal_pinjam) as bulan, COUNT(*) as total')
            ->groupBy('bulan')
            ->orderBy('bulan')
            ->get();

        $labels = $avgPerMonth->map(fn($item) => \Carbon\Carbon::create()->month($item->bulan)->format('M'));
        $data = $avgPerMonth->pluck('total');

        return Inertia::render('admin/HomeAdmin', [
            'stats' => [
                'staff' => $totalStaff,
                'students' => $totalStudents,
                'lecturers' => $totalLecturers,
                'catalogs' => $totalCatalogs,
                'latePercentage' => $latePercentage,
            ],
            'chartData' => [
                'labels' => $labels,
                'data' => $data,
            ],
        ]);
    }
}
