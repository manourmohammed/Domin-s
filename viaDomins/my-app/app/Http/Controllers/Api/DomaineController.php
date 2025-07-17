<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Domaine;


class DomaineController extends Controller
{
    public function storeFull(Request $request)
    {
        // ✅ Étape 1 : Valider les données entrantes
        $validated = $request->validate([
            'nom' => 'required|string',
            'en_ligne' => 'nullable|boolean',
            'statut' => 'nullable|string',
            'date_expiration' => 'nullable|date',
            'cms' => 'nullable|string',
            'cms_details' => 'nullable|array',
            'whois' => 'nullable|array',
            'network' => 'nullable|array',
        ]);

        // ✅ Étape 2 : Créer le domaine
        $domaine = Domaine::create([
            'nom' => $request->nom,
            'en_ligne' => $request->en_ligne,
            'statut' => $request->statut,
            'date_expiration' => $request->date_expiration,
            'cms' => $request->cms,
        ]);

        // ✅ Étape 3 : Enregistrer les CMS details
        if ($request->has('cms_details')) {
            $domaine->cmsDetail()->create([
                'cms' => $request->cms_details['cms'] ?? null,
                'version' => $request->cms_details['version'] ?? null,
                'theme' => $request->cms_details['theme'] ?? null,
                'plugins_detectes' => $request->cms_details['plugins_detectes'] ?? 0,
            ]);
        }

        // ✅ Étape 4 : Enregistrer les Whois details
        if ($request->has('whois')) {
            $domaine->whoisDetail()->create([
                'date_creation' => $request->whois['date_creation'] ?? null,
                'registrar' => $request->whois['registrar'] ?? null,
                'dns' => $request->whois['dns'] ?? null,
            ]);
        }

        // ✅ Étape 5 : Enregistrer les Network details
        if ($request->has('resaux')) {
            $domaine->networkDetail()->create([
                'ping' => $request->network['ping'] ?? null,
                'http_status' => $request->network['http_status'] ?? null,
                'ssl_expiration' => $request->network['ssl_expiration'] ?? null,
            ]);
        }

        // ✅ Réponse finale
        return response()->json(['message' => '✅ Domaine enregistré avec succès !']);
    }
}
