<?php

namespace App\Http\Controllers;

use App\Models\Peminjaman;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Book;
use App\Models\About;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function report(Request $request)
    {
        $aboutData = About::latest()->first(); // Ambil data terbaru dari tabel about

        // Get the search query from the request
        $search = $request->query('search');

        // Base query for Peminjaman with related models book and user
        $query = Peminjaman::with('book', 'user')
            ->where(function ($query) {
                // Only select peminjaman where status is approved
                $query->where('status_peminjaman', 'disetujui')
                    ->orWhere('status_pengembalian', 'disetujui');
            });

        // Apply the search filter if the search query exists
        if ($search) {
            $query->where(function ($q) use ($search) {
                // Search by book title or nama (borrower name)
                $q->whereHas('book', function ($q2) use ($search) {
                    $q2->where('title', 'like', "%{$search}%");
                })
                ->orWhere('nama', 'like', "%{$search}%");
            });
        }

        // Execute the query and paginate the results
        $data = $query->orderBy('created_at', 'desc')->paginate(10)->withQueryString();

        // Map the results to add calculated fields like 'denda'
            $transactions = $data->map(function ($item) {
                $expectedReturn = \Carbon\Carbon::parse($item->tanggal_kembali);
                $actualReturn = $item->tanggal_pengembalian
                    ? \Carbon\Carbon::parse($item->tanggal_pengembalian)
                    : now();

                $selisihHari = $actualReturn->gt($expectedReturn)
                    ? $actualReturn->diffInDays($expectedReturn)
                    : 0;

                $denda = $selisihHari * 1000;

            return [
                'uniqueId'=>$item->book->uniqueId,
                'id' => $item->id,
                'nama' => $item->nama,
                'buku' => $item->book->title,
                'jenis' => $item->tanggal_kembali ? 'Pengembalian' : 'Peminjaman',
                'durasi' => $item->durasi,
                'tanggal_pinjam' => $item->tanggal_pinjam,
                'tanggal_kembali' => $item->tanggal_kembali ?? '-',
                'tanggal_pengembalian' => $item->tanggal_pengembalian ?? '-',
                'denda' => $denda > 0 ? $denda : '-',
            ];
        });

        // Return the data to the Inertia view
        return Inertia::render('admin/ReportAdmin', [
            'transactions' => $transactions,
            'totalBorrowed' => Peminjaman::where('status_peminjaman', 'disetujui')->count(),
            'totalReturned' => Peminjaman::whereNotNull('tanggal_kembali')
                ->where('status_pengembalian', 'disetujui')
                ->count(),
            'links' => $data->toArray()['links'], // Pagination links
            'search' => $search,
            'aboutData' => $aboutData,
        ]);
    }

    public function dashboard()
    {
        $aboutData = About::first();
        // Paginate students and lecturers
        $students = User::where('role', 'siswa')->paginate(10); // Assuming 10 students per page
        $lecturers = User::where('role', 'guru')->paginate(10); // Assuming 10 lecturers per page

        // Other stats (already existing)
        $totalStaff = User::where('role', 'admin')->count();
        $totalStudents = User::where('role', 'siswa')->count();
        $totalLecturers = User::where('role', 'guru')->count();
        $totalCatalogs = Book::count();

        $totalLateReturns = Peminjaman::whereNotNull('tanggal_kembali')
            ->whereRaw('DATEDIFF(tanggal_pengembalian, tanggal_pinjam) > 7')
            ->count();

        $totalReturns = Peminjaman::whereNotNull('tanggal_pengembalian')->count();
        $latePercentage = $totalReturns > 0
            ? round(($totalLateReturns / $totalReturns) * 100)
            : 0;

        $avgPerMonth = Peminjaman::selectRaw('MONTH(tanggal_pinjam) as bulan, COUNT(*) as total')
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
            // Passing paginated data for students and lecturers
            'students' => $students,
            'lecturers' => $lecturers,
            'aboutData' => $aboutData,
        ]);
    }
    public function chartData($timeframe)
{
    switch ($timeframe) {
        case 'weekly':
            $startOfWeek = Carbon::now()->startOfWeek();
            $data = Peminjaman::selectRaw('DAYNAME(tanggal_pinjam) as day, COUNT(*) as total')
                ->where('tanggal_pinjam', '>=', $startOfWeek)
                ->groupBy('day')
                ->get();

            $labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            $counts = collect($labels)->map(function ($day) use ($data) {
                return $data->firstWhere('day', $day)?->total ?? 0;
            });
            break;

        case 'monthly':
            $data = Peminjaman::selectRaw('MONTH(tanggal_pinjam) as month, COUNT(*) as total')
                ->whereYear('tanggal_pinjam', Carbon::now()->year)
                ->groupBy('month')
                ->get();

            $labels = collect(range(1, 12))->map(fn($m) => Carbon::create()->month($m)->format('M'));
            $counts = $labels->map(function ($label, $index) use ($data) {
                return $data->firstWhere('month', $index + 1)?->total ?? 0;
            });
            break;

        case 'yearly':
            $data = Peminjaman::selectRaw('YEAR(tanggal_pinjam) as year, COUNT(*) as total')
                ->groupBy('year')
                ->orderBy('year')
                ->get();

            $labels = $data->pluck('year');
            $counts = $data->pluck('total');
            break;

        default:
            return response()->json(['labels' => [], 'data' => []]);
    }

    return response()->json([
        'labels' => $labels,
        'data' => $counts,
    ]);
}

}