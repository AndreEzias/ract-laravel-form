<?php

namespace App\Mail;

use App\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class NewLead extends Mailable
{
    use Queueable, SerializesModels;

    protected $lead;

    /**
     * Create a new message instance.
     *
     * @param Lead $lead
     */
    public function __construct($lead)
    {
        $this->lead = $lead;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $build = $this->view('emails.new_lead')
            ->with(["lead" => $this->lead])
            ->subject("Novo cadastro");

        if ($this->lead->file) {
            $build->attach(
                $this->lead->file->path,
                [
                   "as" => $this->lead->file->original_name
                ]
            );
        }
        return $build;
    }
}
