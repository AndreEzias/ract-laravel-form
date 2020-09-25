<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadPost;
use App\Lead;
use App\Mail\NewLead;
use App\Services\FileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Mail;

class LeadController extends Controller
{
    protected $fileService;

    /**
     * LeadController constructor.
     * @param FileService $fileService
     */
    public function __construct(
        FileService $fileService
    )
    {
        $this->fileService = $fileService;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param StoreLeadPost $request
     * @return JsonResponse
     */
    public function store(StoreLeadPost $request)
    {
        $data = $request->validated();

        if ($request->hasFile("file")) {
            $file = $this->fileService->store($request->file("file"));
            $data["file_id"] = $file->id;
        }

        $lead = Lead::query()->create($data);

        Mail::to(env("MAIL_RECEIVER","teste@teste.com"))->send(new NewLead($lead));

        return response()->json($lead)->setStatusCode(Response::HTTP_CREATED);
    }
}
