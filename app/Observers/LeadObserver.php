<?php

namespace App\Observers;

use App\Lead;
use App\Mail\NewLead;
use Illuminate\Support\Facades\Mail;

class LeadObserver
{
    /**
     * Handle the lead "created" event.
     *
     * @param Lead $lead
     * @return void
     */
    public function created(Lead $lead): void
    {
        Mail::to(env("MAIL_RECEIVER","teste@teste.com"))->send(new NewLead($lead));
    }
}
