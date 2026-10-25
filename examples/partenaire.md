---
register: Registre des risques — partenaire logistique (fictif)
as_at: 2026-10-15
scale: 5x5
---

# Registre des risques

Registre d’un partenaire, rédigé en français. Même format que risks.md ; les `slugs` relient chaque risque à son équivalent dans un autre registre.

## P-01 · Défaillance du transporteur principal
- slugs: carrier-insolvency
- kind: risk
- status: open
- category: Tiers
- impact: 5
- likelihood: 4
- inherent: 5x4
- target: 4x2
- appetite: 12
- driver: M. Laurent (Directeur des opérations)
- approver: H. Bernard (Directeur général)
- contributors: A. Petit (Directrice financière)
- informed: Comité des risques

Le transporteur principal fait faillite et la plupart des livraisons restent sans prestataire sous contrat.

**Cause:** Marges compressées, rupture de covenants bancaires.
**Consequence:** Retards de livraison, pénalités contractuelles, surcoûts de transport.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Suivi trimestriel de la santé financière des fournisseurs | Detective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| PE-031 | Alerte de notation financière | Report | 2026-07-04 | 90 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Qualifier un second transporteur | M. Laurent (Directeur des opérations) | 2026-12-01 | |

## P-02 · Violation de données personnelles
- slugs: personal-data-breach
- kind: risk
- status: open
- category: Conformité
- impact: 4
- likelihood: 4
- inherent: 5x4
- target: 4x2
- appetite: 10
- driver: C. Dubois (Déléguée à la protection des données)
- approver: H. Bernard (Directeur général)
- contributors: S. Roux (RSSI)
- informed: Comité d’audit

Des données personnelles de clients sont exposées lors d’exports ou d’échanges de fichiers non maîtrisés.

**Cause:** Droits d’export trop larges, partage de fichiers par courriel.
**Consequence:** Sanctions de la CNIL, notification aux personnes concernées, perte de clients.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Revue annuelle des habilitations | Detective | Partial |
| Chiffrement des exports | Preventive | Effective |
| Formation RGPD des équipes | Directive | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| PE-044 | Audit RGPD externe | Audit | 2026-05-12 | 365 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-03 · Cyberattaque majeure : rançongiciel ou chaîne logicielle
- slugs: ransomware-core-systems; software-supply-chain
- kind: risk
- status: open
- category: Cyber
- impact: 5
- likelihood: 4
- inherent: 5x5
- target: 5x2
- appetite: 10
- driver: S. Roux (RSSI)
- approver: H. Bernard (Directeur général)
- contributors: A. Petit (Directrice financière)
- informed: Conseil d’administration

Un rançongiciel ou un composant logiciel compromis paralyse les systèmes de gestion d’entrepôt et de transport.

**Cause:** Hameçonnage, dépendances logicielles non vérifiées, accès fournisseurs.
**Consequence:** Arrêt des opérations pendant plusieurs jours, rançon, coûts de reconstruction.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Sauvegardes hors ligne | Corrective | Partial |
| EDR sur les postes | Preventive | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| PE-052 | Test de restauration | Test result | 2026-06-20 | 180 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Inventaire des dépendances logicielles | S. Roux (RSSI) | 2026-11-30 | |

## P-05 · Panne d’une région cloud
- slugs: cloud-region-outage
- kind: risk
- status: open
- category: Technologie
- impact: 4
- likelihood: 3
- inherent: 4x4
- target: 3x2
- appetite: 9
- driver: J. Moreau (DSI)
- approver: H. Bernard (Directeur général)
- contributors: M. Laurent (Directeur des opérations)
- informed: Comité des risques

L’indisponibilité prolongée de la région cloud principale interrompt le suivi des expéditions.

**Cause:** Incident chez le fournisseur, erreur de configuration.
**Consequence:** Expéditions bloquées, pénalités de service.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Plan de reprise documenté, non testé | Corrective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Exercice de bascule multi-région | J. Moreau (DSI) | 2027-01-31 | |

## P-06 · Volatilité des changes EUR/USD
- slugs: fx-volatility
- kind: risk
- status: open
- category: Finance
- impact: 3
- likelihood: 3
- inherent: 3x4
- target: 3x2
- appetite: 9
- driver: A. Petit (Directrice financière)
- approver: A. Petit (Directrice financière)
- contributors: M. Laurent (Directeur des opérations)
- informed: Comité d’audit

La baisse de l’euro face au dollar renchérit les contrats de fret libellés en dollars.

**Cause:** Chocs macroéconomiques, écart de taux d’intérêt.
**Consequence:** Érosion des marges.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Couverture de change à six mois | Preventive | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-07 · Fraude au faux fournisseur
- slugs: invoice-fraud
- kind: risk
- status: open
- category: Fraude
- impact: 4
- likelihood: 3
- inherent: 4x5
- target: 3x2
- appetite: 9
- driver: A. Petit (Directrice financière)
- approver: A. Petit (Directrice financière)
- contributors: S. Roux (RSSI)
- informed: Comité d’audit

Des escrocs se font passer pour un fournisseur et obtiennent un changement de coordonnées bancaires.

**Cause:** Courriels usurpés, contrôle insuffisant des changements de RIB.
**Consequence:** Perte financière directe.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Contre-appel sur tout changement de RIB | Preventive | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-08 · Grève des dockers au Havre
- slugs: dockworker-strike
- kind: risk
- status: open
- category: Opérations
- impact: 4
- likelihood: 3
- inherent: 4x4
- target: 3x3
- appetite: 9
- driver: M. Laurent (Directeur des opérations)
- approver: H. Bernard (Directeur général)
- contributors: A. Petit (Directrice financière)
- informed: Comité des risques

Un mouvement social prolongé au port du Havre bloque les conteneurs à l’import.

**Cause:** Réforme des retraites portuaires, négociations salariales.
**Consequence:** Ruptures de stock, détournement coûteux vers Anvers.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Accord de repli sur le port d’Anvers | Corrective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-09 · Dérive du programme ERP
- slugs: erp-migration-overrun
- kind: risk
- status: open
- category: Projets
- impact: 4
- likelihood: 3
- inherent: 4x4
- target: 3x2
- appetite: 12
- driver: J. Moreau (DSI)
- approver: H. Bernard (Directeur général)
- contributors: A. Petit (Directrice financière)
- informed: Conseil d’administration

Le déploiement du nouvel ERP prend du retard et dépasse son budget.

**Cause:** Reprise de données complexe, changements de périmètre.
**Consequence:** Double exploitation, bénéfices attendus repoussés.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Comité de pilotage mensuel | Detective | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-10 · Perte de compétences clés
- slugs: key-staff-loss
- kind: risk
- status: open
- category: RH
- impact: 4
- likelihood: 2
- inherent: 4x3
- target: 3x2
- appetite: 9
- driver: L. Garnier (DRH)
- approver: H. Bernard (Directeur général)
- contributors: J. Moreau (DSI)
- informed: Comité des risques

Le départ de quelques experts techniques laisse des systèmes critiques sans relève.

**Cause:** Marché de l’emploi tendu, faible mobilité interne.
**Consequence:** Retards de projets, dépendance à des prestataires.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Plan de succession pour les postes critiques | Preventive | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-11 · Pénurie de palettes
- slugs: pallet-shortage
- kind: risk
- status: open
- category: Approvisionnement
- impact: 3
- likelihood: 2
- inherent: 3x3
- target: 2x2
- appetite: 6
- driver: M. Laurent (Directeur des opérations)
- approver: M. Laurent (Directeur des opérations)
- contributors: A. Petit (Directrice financière)
- informed: Comité des risques

Le manque de palettes certifiées ralentit les expéditions en haute saison.

**Cause:** Prix du bois, forte demande saisonnière.
**Consequence:** Expéditions retardées, surcoûts d’achat.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Stock tampon de palettes | Preventive | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-12 · Atteinte à la réputation sur les réseaux sociaux
- slugs: online-reputation
- kind: risk
- status: open
- category: Réputation
- impact: 4
- likelihood: 3
- inherent: 4x3
- target: 3x2
- appetite: 8
- driver: N. Fontaine (Directrice de la communication)
- approver: H. Bernard (Directeur général)
- contributors: C. Dubois (Déléguée à la protection des données)
- informed: Conseil d’administration

Une plainte de client ou une publication de salarié devient virale et nuit à la confiance dans la marque.

**Cause:** Défaut de service, réponse tardive, comportement d’un salarié.
**Consequence:** Perte de clients, couverture médiatique négative.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Veille des réseaux sociaux | Detective | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## P-13 · Non-conformité au nouveau reporting réglementaire CSRD
- slugs: csrd-reporting
- kind: risk
- status: open
- category: Réglementaire
- impact: 3
- likelihood: 5
- inherent: 3x5
- target: 2x2
- appetite: 9
- driver: A. Petit (Directrice financière)
- approver: H. Bernard (Directeur général)
- contributors: J. Moreau (DSI)
- informed: Conseil d’administration

Le nouveau reporting réglementaire de durabilité entre en vigueur avant que nos données et processus soient prêts.

**Cause:** Calendrier serré, données dispersées, consignes encore floues.
**Consequence:** Déclarations tardives ou inexactes, sanctions du régulateur.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Veille réglementaire | Detective | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## PO-01 · Optimisation des tournées de livraison
- slugs: route-optimisation
- kind: opportunity
- status: open
- category: Opérations
- value: 4
- effort: 3
- target: 4x2
- target_value: 12
- cost: 90 k€ la première année
- realisation: 2027-06-30
- driver: J. Moreau (DSI)
- approver: M. Laurent (Directeur des opérations)
- contributors: A. Petit (Directrice financière)
- informed: Comité des risques

Planifier les tournées avec un moteur d’optimisation plutôt qu’avec des tournées fixes.

**Rationale:** Le carburant et les heures de conduite pèsent lourd dans nos coûts variables.
**Benefit:** Moins de kilomètres par livraison et une meilleure ponctualité.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Données d’adresses fiabilisées | Dependency | Blocked |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## PO-02 · Louer les surfaces d’entrepôt inutilisées
- slugs: entrepot-partage
- kind: opportunity
- status: open
- category: Commercial
- value: 3
- effort: 2
- target: 3x2
- target_value: 9
- cost: 10 k€
- realisation: 2027-03-31
- driver: M. Laurent (Directeur des opérations)
- approver: H. Bernard (Directeur général)
- contributors: A. Petit (Directrice financière)
- informed: Comité des risques

Proposer aux entreprises locales la capacité de stockage inutilisée en dehors de la haute saison.

**Rationale:** Le taux d’occupation reste faible de janvier à août.
**Benefit:** Un revenu nouveau sur un coût fixe déjà supporté.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Assurance des marchandises de tiers | Dependency | In progress |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## PO-03 · Achats de carburant mutualisés
- slugs: fuel-pooling
- kind: opportunity
- status: open
- category: Achats
- value: 2
- effort: 2
- target: 3x2
- target_value: 9
- cost: Effort interne uniquement
- realisation: 2027-01-31
- driver: A. Petit (Directrice financière)
- approver: A. Petit (Directrice financière)
- contributors: M. Laurent (Directeur des opérations)
- informed: Comité d’audit

Grouper les achats de carburant avec d’autres transporteurs régionaux pour obtenir de meilleurs prix.

**Rationale:** Nos volumes seuls ne donnent pas accès aux tarifs des grands comptes.
**Benefit:** Une baisse modeste du prix au litre.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Accord avec deux transporteurs partenaires | Approval | In progress |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
