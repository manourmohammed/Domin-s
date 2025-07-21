<?php

namespace App\Http\Controllers;

use App\Http\Requests\DomainsListRequest;
use Illuminate\Support\Facades\Http;

class DomainController extends Controller
{
    protected function validDate(?string $date): ?string
    {
        if (!$date) {
            return null;
        }
        return preg_match('/^\d{4}-\d{2}-\d{2}$/', $date) ? $date : null;
    }

    protected function validInt($value): int
    {
        if (is_numeric($value)) {
            return (int) $value;
        }
        return 0;
    }

    public function storeDomains(DomainsListRequest $request)
    {
        $validatedRequest = $request->validated();

        $response = Http::timeout(120)->post("http://localhost:8001/api/domains/check", [
            "domains" => $validatedRequest["domains"]
        ]);

        $domainsData = $response->json();

        $savedDomains = [];

        foreach ($domainsData as $domainData) {
            $domaine = \App\Models\Domaine::create([
                'nom' => $domainData['domain'],
                'en_ligne' => ($domainData['online'] ?? '') === '✅',
                'statut' => $domainData['status'] ?? null,
                'date_expiration' => $this->validDate($domainData['expiration'] ?? null),
                'cms' => $domainData['cms_simple'] ?? null,
            ]);

            if (!empty($domainData['cms_detail'])) {
                $domaine->cmsDetail()->create([
                    'cms' => $domainData['cms_detail']['cms'] ?? null,
                    'version' => $domainData['cms_detail']['version'] ?? null,
                    'theme' => $domainData['cms_detail']['theme'] ?? null,
                    'plugins_detectes' => $this->validInt($domainData['cms_detail']['plugins'] ?? 0),
                ]);
            }

            if (!empty($domainData['whois'])) {
                $domaine->whoisDetail()->create([
                    'date_creation' => $this->validDate($domainData['whois']['creation'] ?? null),
                    'registrar' => $domainData['whois']['registrar'] ?? null,
                    'dns' => $domainData['whois']['dns'] ?? null,
                ]);
            }

            if (!empty($domainData['network'])) {
                $domaine->networkDetail()->create([
                    'ping' => $domainData['network']['ping'] ?? null,
                    'http_status' => $domainData['network']['http_status'] ?? null,
                    'ssl_expiration' => $domainData['network']['ssl_expiration'] ?? null,
                ]);
            }

            $savedDomains[] = $domaine;
        }

        return response()->json([
            "message" => "Domaines analysés et enregistrés avec succès.",
            "saved" => $savedDomains
        ]);
    }
}
