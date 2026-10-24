---
register: Sample register (fictional organisation)
as_at: 2026-10-20
scale: 5x5
---

# Risk register

Source of truth for the register. One `##` section per entry. Field lines are `- key: value`.
`kind` is `risk` or `opportunity`; each kind has its own scoring fields and tables.
People are written `Name (Role)`; several people are separated by `; `.
Risks: `impact` and `likelihood` are 1–5 (score = impact × likelihood); `inherent` and `target` are `IxL`; `appetite` is the highest acceptable score. Sections: **Cause:**, **Consequence:**, ### Controls.
Opportunities: `value` and `effort` are 1–5 (score = value × (6 − effort), so 25 = most value for least effort); `target` is `VxE`; `target_value` is the lowest acceptable score; `cost` is free text; `realisation` is the date the value should land. Sections: **Rationale:**, **Benefit:**, ### Enablers.
`status` is `open` or `closed` (a closed risk also carries `closed: YYYY-MM-DD`).
`slugs` are stable kebab-case tags that identify the same risk across documents, whatever its wording or language; separate several with `; `, or write `[]` for none.
Snapshots are dated copies of this file named `risks-YYYY-MM-DD.md`, listed under `snapshots` above.

## R01 · Ransomware compromise of core systems
- slugs: ransomware-core-systems
- kind: risk
- status: open
- category: Cyber
- owner: A. Okafor (CISO)
- impact: 5
- likelihood: 3
- inherent: 5x5
- target: 5x2
- appetite: 10
- responsible: D. Mensah (Head of SRE)
- accountable: A. Okafor (CISO)
- consulted: J. Patel (CTO); E. Walsh (General Counsel)
- informed: Risk Committee; Board

Encryption or exfiltration of core operational systems by a ransomware actor, halting order processing.

**Cause:** Phishing, unpatched edge devices, compromised third-party credentials.
**Consequence:** Multi-day outage, regulatory notification, recovery cost.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| EDR on all endpoints and servers | Preventive | Effective |
| Immutable offline backups with restore tests | Corrective | Partial |
| Phishing-resistant MFA | Preventive | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0112 | Restore test — ERP and warehouse systems | Test result | 2026-03-12 | 90 |
| EV-0201 | External penetration test summary | Audit | 2026-06-08 | 365 |
| EV-0187 | EDR coverage report | Report | 2026-09-30 | 30 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Extend MFA to service accounts | D. Mensah (Head of SRE) | 2026-08-31 | |
| Re-run restore test after backup re-architecture | D. Mensah (Head of SRE) | 2026-10-31 | |

## R02 · Insolvency of principal delivery carrier
- slugs: carrier-insolvency
- kind: risk
- status: open
- category: Third party
- owner: F. Grant (Procurement Lead)
- impact: 5
- likelihood: 4
- inherent: 5x4
- target: 4x2
- appetite: 12
- responsible: F. Grant (Procurement Lead)
- accountable: T. Byrne (COO)
- consulted: M. Lindqvist (CFO); E. Walsh (General Counsel)
- informed: Risk Committee

Our principal last-mile carrier fails financially, leaving most deliveries without a contracted provider.

**Cause:** Margin squeeze, covenant breach, loss of a major customer.
**Consequence:** Delivery backlog, SLA penalties, emergency spot-rate costs.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Quarterly supplier financial-health monitoring | Detective | Partial |
| Secondary carrier on standby contract | Corrective | Ineffective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0144 | Credit-rating alert — carrier downgraded | Report | 2026-07-02 | 90 |
| EV-0190 | Standby carrier capacity test | Test result | 2026-09-22 | 180 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Sign second carrier on committed volumes | F. Grant (Procurement Lead) | 2026-11-15 | |
| Brief the Board on carrier exposure | T. Byrne (COO) | 2026-10-10 | 2026-10-08 |

## R03 · Prolonged cloud region outage
- slugs: cloud-region-outage
- kind: risk
- status: open
- category: Technology
- owner: J. Patel (CTO)
- impact: 3
- likelihood: 2
- inherent: 4x4
- target: 3x2
- appetite: 9
- responsible: D. Mensah (Head of SRE)
- accountable: J. Patel (CTO)
- consulted: T. Byrne (COO)
- informed: Risk Committee

Extended loss of our primary cloud region takes customer-facing services offline.

**Cause:** Provider incident, misconfiguration, regional network failure.
**Consequence:** Lost orders, SLA credits, reputational damage.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Active–passive multi-region failover | Corrective | Effective |
| Quarterly failover game day | Detective | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0131 | Failover game day — RTO 22 min | Test result | 2026-05-14 | 120 |
| EV-0196 | Failover game day — RTO 14 min | Test result | 2026-09-10 | 120 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Automate DNS cut-over | D. Mensah (Head of SRE) | 2026-07-31 | 2026-07-24 |

## R04 · Personal-data breach via report exports
- slugs: personal-data-breach
- kind: risk
- status: open
- category: Privacy
- owner: S. Moreau (Data Protection Officer)
- impact: 4
- likelihood: 2
- inherent: 5x4
- target: 4x2
- appetite: 8
- responsible: S. Moreau (Data Protection Officer)
- accountable: E. Walsh (General Counsel)
- consulted: A. Okafor (CISO); K. Novak (Head of Product)
- informed: Audit Committee

Customer personal data leaves the organisation through uncontrolled report exports.

**Cause:** Broad export permissions, unmanaged spreadsheets, weak data-loss prevention.
**Consequence:** Regulatory fines, notification duties, customer churn.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Role-based export permissions | Preventive | Effective |
| DLP on email and cloud storage | Detective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0122 | Internal audit finding IA-26-07 | Audit | 2026-04-28 | 365 |
| EV-0168 | Access recertification Q2 | Attestation | 2026-07-15 | 90 |
| EV-0199 | DLP rule coverage report | Report | 2026-09-18 | 60 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Remove bulk export from non-essential roles | S. Moreau (Data Protection Officer) | 2026-08-15 | 2026-08-11 |
| Close audit finding IA-26-07 | S. Moreau (Data Protection Officer) | 2026-10-15 | |

## R05 · Loss of key engineering staff
- slugs: key-staff-loss
- kind: risk
- status: open
- category: People
- owner: R. Chen (Chief People Officer)
- impact: 4
- likelihood: 3
- inherent: 4x4
- target: 3x2
- appetite: 9
- responsible: R. Chen (Chief People Officer)
- accountable: J. Patel (CTO)
- consulted: M. Lindqvist (CFO)
- informed: Risk Committee

Departure of a small number of engineers who hold critical platform knowledge.

**Cause:** Market pay pressure, burnout, limited progression.
**Consequence:** Delivery delays, single points of knowledge, slower incident recovery.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Retention packages for critical roles | Preventive | Partial |
| Runbooks and pairing rota | Corrective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0158 | Engagement survey — platform team | Report | 2026-06-30 | 180 |
| EV-0181 | Knowledge-concentration map | Report | 2026-08-20 | 90 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Approve retention budget for critical roles | M. Lindqvist (CFO) | 2026-09-30 | 2026-09-26 |
| Cross-train a second engineer per critical system | J. Patel (CTO) | 2026-12-15 | |

## R06 · FX volatility on USD supplier contracts
- slugs: fx-volatility
- kind: risk
- status: open
- category: Financial
- owner: M. Lindqvist (CFO)
- impact: 3
- likelihood: 2
- inherent: 3x4
- target: 3x2
- appetite: 9
- responsible: M. Lindqvist (CFO)
- accountable: M. Lindqvist (CFO)
- consulted: F. Grant (Procurement Lead)
- informed: Audit Committee

Sterling weakens against the dollar, raising the cost of USD-denominated supplier contracts.

**Cause:** Macroeconomic shocks, interest-rate divergence.
**Consequence:** Margin erosion, budget overrun.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Rolling hedging programme | Preventive | Effective |
| Monthly treasury exposure report | Detective | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0127 | Hedge effectiveness test H1 | Test result | 2026-07-10 | 180 |
| EV-0193 | Treasury exposure report — September | Report | 2026-10-05 | 45 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Extend hedge cover to 18 months | M. Lindqvist (CFO) | 2026-08-01 | 2026-07-29 |

## R07 · ERP migration overruns legacy support
- slugs: erp-migration-overrun
- kind: risk
- status: open
- category: Change
- owner: L. Haddad (ERP Programme Director)
- impact: 5
- likelihood: 4
- inherent: 4x4
- target: 3x2
- appetite: 12
- responsible: L. Haddad (ERP Programme Director)
- accountable: T. Byrne (COO)
- consulted: J. Patel (CTO); M. Lindqvist (CFO)
- informed: Board; Risk Committee

The ERP migration slips past the legacy system’s end-of-support date.

**Cause:** Data-migration defects, scope creep, vendor resourcing.
**Consequence:** Running unsupported software, double running costs, delayed benefits.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Stage-gate assurance reviews | Detective | Partial |
| Fixed-scope change board | Preventive | Ineffective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0150 | Independent assurance review — rated red | Audit | 2026-06-12 | 120 |
| EV-0185 | Mock cut-over 2 defect log | Log extract | 2026-08-28 | 60 |
| EV-0203 | Re-baselined programme plan | Report | 2026-10-02 | 90 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Negotiate extended legacy support | F. Grant (Procurement Lead) | 2026-09-30 | |
| Freeze scope for release 1 | L. Haddad (ERP Programme Director) | 2026-08-15 | 2026-09-02 |

## R08 · Customer assistant gives harmful guidance
- slugs: ai-assistant-harm
- kind: risk
- status: open
- category: Product
- owner: K. Novak (Head of Product)
- impact: 4
- likelihood: 2
- inherent: 4x4
- target: 4x1
- appetite: 8
- responsible: K. Novak (Head of Product)
- accountable: K. Novak (Head of Product)
- consulted: E. Walsh (General Counsel); A. Okafor (CISO)
- informed: Risk Committee

The AI customer assistant gives incorrect or harmful guidance on shipments and claims.

**Cause:** Model errors, prompt injection, gaps in evaluation.
**Consequence:** Customer harm, complaints, conduct scrutiny.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Pre-release evaluation suite | Preventive | Effective |
| Human review of escalated conversations | Detective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0139 | Red-team exercise report | Audit | 2026-05-20 | 180 |
| EV-0189 | Evaluation suite results v3 | Test result | 2026-09-03 | 60 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Add prompt-injection test pack | K. Novak (Head of Product) | 2026-07-31 | 2026-07-30 |

## R09 · Invoice-redirection fraud
- slugs: invoice-fraud
- kind: risk
- status: open
- category: Financial crime
- owner: M. Lindqvist (CFO)
- impact: 3
- likelihood: 4
- inherent: 3x5
- target: 3x2
- appetite: 9
- responsible: M. Lindqvist (CFO)
- accountable: M. Lindqvist (CFO)
- consulted: A. Okafor (CISO)
- informed: Audit Committee

Fraudsters impersonate suppliers and redirect payments to accounts they control.

**Cause:** Spoofed emails, weak bank-detail change process.
**Consequence:** Direct financial loss and recovery costs.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Call-back verification on bank-detail changes | Preventive | Effective |
| Payment anomaly monitoring | Detective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0118 | Call-back control sample test | Test result | 2026-03-30 | 180 |
| EV-0204 | Alert — supplier-spoofing campaign | Log extract | 2026-10-12 | 30 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Refresh call-back control test | M. Lindqvist (CFO) | 2026-10-31 | |

## R10 · Unready for new regulatory reporting regime
- slugs: regulatory-reporting
- kind: risk
- status: open
- category: Regulatory
- owner: E. Walsh (General Counsel)
- impact: 3
- likelihood: 5
- inherent: 3x5
- target: 2x2
- appetite: 9
- responsible: E. Walsh (General Counsel)
- accountable: T. Byrne (COO)
- consulted: M. Lindqvist (CFO); J. Patel (CTO)
- informed: Board

A new sector reporting requirement takes effect before our data and processes can meet it.

**Cause:** Short implementation window, unclear guidance, fragmented data.
**Consequence:** Late or inaccurate filings, supervisory action.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Regulatory horizon scanning | Detective | Effective |
| Reporting readiness programme | Preventive | Ineffective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0135 | Gap analysis against draft rules | Report | 2026-04-30 | 180 |
| EV-0186 | Readiness dry-run — partial returns produced | Test result | 2026-08-25 | 90 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Fund readiness programme phase 2 | T. Byrne (COO) | 2026-09-15 | 2026-09-14 |
| Second dry-run of all returns | E. Walsh (General Counsel) | 2026-11-30 | |

## R11 · Data-centre lease expires before exit
- slugs: data-centre-exit
- kind: risk
- status: closed
- closed: 2026-08-18
- category: Property
- owner: T. Byrne (COO)
- impact: 2
- likelihood: 1
- inherent: 4x4
- target: 2x1
- appetite: 8
- responsible: J. Patel (CTO)
- accountable: T. Byrne (COO)
- consulted: E. Walsh (General Counsel)
- informed: Risk Committee

Our remaining co-location lease ends before workloads have moved out.

**Cause:** Migration delays, landlord refusing an extension.
**Consequence:** Forced, rushed migration and service disruption.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Migration plan with monthly tracking | Preventive | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0109 | Lease extension letter | Attestation | 2026-02-26 | 365 |
| EV-0172 | Final workload exit confirmation | Attestation | 2026-07-18 | 365 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Decommission remaining racks | D. Mensah (Head of SRE) | 2026-07-15 | 2026-07-10 |

## R12 · On-call depends on single engineers
- slugs: on-call-spof
- kind: risk
- status: open
- category: Operations
- owner: D. Mensah (Head of SRE)
- impact: 2
- likelihood: 2
- inherent: 3x4
- target: 2x2
- appetite: 6
- responsible: D. Mensah (Head of SRE)
- accountable: J. Patel (CTO)
- consulted: R. Chen (Chief People Officer)
- informed: Risk Committee

Out-of-hours incidents depend on one engineer per critical system.

**Cause:** Small team, uneven skills.
**Consequence:** Slow incident response and burnout.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Two-tier on-call rota | Preventive | Effective |
| Incident runbooks | Corrective | Effective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0160 | On-call rota coverage review | Report | 2026-07-01 | 90 |
| EV-0198 | Incident response drill | Test result | 2026-09-16 | 180 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Hire two site-reliability engineers | R. Chen (Chief People Officer) | 2026-06-30 | 2026-06-20 |

## R13 · Social-media reputational incident
- slugs: social-media-reputation
- kind: risk
- status: open
- category: Reputation
- owner: P. Ito (Communications Director)
- impact: 4
- likelihood: 2
- inherent: 4x3
- target: 3x2
- appetite: 8
- responsible: P. Ito (Communications Director)
- accountable: T. Byrne (COO)
- consulted: E. Walsh (General Counsel); K. Novak (Head of Product)
- informed: Board

A customer complaint or staff post spreads widely and damages trust in the brand.

**Cause:** Service failure, poor response, employee conduct.
**Consequence:** Customer loss and media scrutiny.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Social listening and escalation | Detective | Effective |
| Crisis communications playbook | Corrective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0163 | Crisis simulation debrief | Test result | 2026-07-08 | 365 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Update playbook from simulation lessons | P. Ito (Communications Director) | 2026-09-30 | |

## R14 · Open-source licence non-compliance
- slugs: oss-licence
- kind: risk
- status: open
- category: Legal
- owner: E. Walsh (General Counsel)
- impact: 3
- likelihood: 2
- inherent: 3x3
- target: 2x1
- appetite: 6
- responsible: J. Patel (CTO)
- accountable: E. Walsh (General Counsel)
- consulted: K. Novak (Head of Product)
- informed: Risk Committee

Shipped software includes components whose licence terms we do not meet.

**Cause:** No licence scanning in the build pipeline.
**Consequence:** Legal claims, forced source release, rework.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Licence scanning in CI | Detective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0166 | Software bill of materials audit | Audit | 2026-06-25 | 180 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Block builds on licence violations | J. Patel (CTO) | 2026-11-30 | |

## R15 · Software supply-chain compromise
- slugs: software-supply-chain
- kind: risk
- status: open
- category: Cyber
- owner: A. Okafor (CISO)
- impact: 5
- likelihood: 4
- inherent: 5x4
- target: 5x2
- appetite: 10
- responsible: J. Patel (CTO)
- accountable: A. Okafor (CISO)
- consulted: K. Novak (Head of Product)
- informed: Board; Risk Committee

A compromised third-party package or build tool inserts malicious code into our releases.

**Cause:** Dependency hijack, compromised maintainer, unsigned artefacts.
**Consequence:** Customer compromise, product recall, regulatory exposure.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Dependency pinning and provenance checks | Preventive | Partial |
| Signed build artefacts | Preventive | Ineffective |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0142 | Threat intelligence — sector campaign | Report | 2026-05-06 | 90 |
| EV-0195 | Dependency provenance coverage | Report | 2026-09-29 | 30 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Sign all release artefacts | J. Patel (CTO) | 2026-10-31 | |
| Isolate build runners | D. Mensah (Head of SRE) | 2026-09-15 | |

## R16 · Flooding at main warehouse
- slugs: warehouse-flood
- kind: risk
- status: open
- category: Physical
- owner: T. Byrne (COO)
- impact: 4
- likelihood: 3
- inherent: 4x3
- target: 4x1
- appetite: 8
- responsible: T. Byrne (COO)
- accountable: T. Byrne (COO)
- consulted: M. Lindqvist (CFO)
- informed: Risk Committee

Heavy rainfall floods the main warehouse, damaging stock and halting dispatch.

**Cause:** Changing rainfall patterns, site drainage, river-level rise.
**Consequence:** Stock write-off, dispatch outage, insurance claims.

### Controls
| Control | Type | Effectiveness |
|---|---|---|
| Flood barriers at loading bays | Preventive | Partial |
| Alternate dispatch site agreement | Corrective | Partial |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0182 | Insurance cover confirmation | Attestation | 2026-07-12 | 365 |
| EV-0177 | Flood-risk reassessment | Report | 2026-08-30 | 365 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Raise loading-bay floor level | T. Byrne (COO) | 2027-03-31 | |

## O01 · Route-optimisation for last-mile deliveries
- slugs: route-optimisation
- kind: opportunity
- status: open
- category: Operations
- owner: T. Byrne (COO)
- value: 5
- effort: 2
- target: 5x2
- target_value: 16
- cost: £140k one-off, £30k a year
- realisation: 2027-03-31
- responsible: D. Mensah (Head of SRE)
- accountable: T. Byrne (COO)
- consulted: F. Grant (Procurement Lead); M. Lindqvist (CFO)
- informed: Risk Committee

Plan delivery routes with an optimisation engine instead of fixed rounds, cutting mileage and missed slots.

**Rationale:** Fuel and driver hours are our largest variable cost, and fixed rounds ignore daily demand.
**Benefit:** Fewer miles per drop, more drops per shift, better on-time performance.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Clean address and time-window data | Dependency | In progress |
| Routing engine licence | Funding | Ready |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0210 | Pilot depot results — mileage per drop | Test result | 2026-08-14 | 180 |
| EV-0214 | Vendor shortlist and pricing | Report | 2026-09-26 | 90 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Extend pilot to three depots | T. Byrne (COO) | 2026-12-15 | |

## O02 · Lower rates from a second committed carrier
- slugs: second-carrier; carrier-insolvency
- kind: opportunity
- status: open
- category: Third party
- owner: F. Grant (Procurement Lead)
- value: 4
- effort: 2
- target: 4x2
- target_value: 12
- cost: £20k legal and onboarding
- realisation: 2027-01-31
- responsible: F. Grant (Procurement Lead)
- accountable: T. Byrne (COO)
- consulted: M. Lindqvist (CFO); E. Walsh (General Counsel)
- informed: Risk Committee

Contract a second carrier on committed volumes, using competition to lower rates as well as reduce dependence on one provider.

**Rationale:** The carrier-insolvency work already requires a second carrier; committed volumes earn a discount.
**Benefit:** Lower cost per parcel and a credible fallback if the principal carrier fails.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Volume forecast by region | Capability | Ready |
| Board approval of dual-sourcing | Approval | Ready |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0205 | Indicative quotes from two carriers | Report | 2026-09-08 | 60 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Run tender with committed volumes | F. Grant (Procurement Lead) | 2026-11-30 | |

## O03 · Sell spare warehouse capacity
- slugs: spare-capacity
- kind: opportunity
- status: open
- category: Commercial
- owner: T. Byrne (COO)
- value: 3
- effort: 2
- target: 3x2
- target_value: 9
- cost: £15k marketing and contracts
- realisation: 2026-12-31
- responsible: T. Byrne (COO)
- accountable: T. Byrne (COO)
- consulted: M. Lindqvist (CFO)
- informed: Risk Committee

Rent unused racking at the main warehouse to local businesses outside our peak season.

**Rationale:** Occupancy averages well below capacity from January to August.
**Benefit:** New revenue from a fixed cost we already carry.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Insurance cover for third-party stock | Dependency | In progress |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0198A | Occupancy report by month | Report | 2026-06-30 | 180 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Sign first two storage customers | T. Byrne (COO) | 2026-10-15 | |

## O04 · Automate customs paperwork
- slugs: customs-automation
- kind: opportunity
- status: open
- category: Technology
- owner: J. Patel (CTO)
- value: 3
- effort: 4
- target: 4x2
- target_value: 12
- cost: £260k build, £40k a year
- realisation: 2027-09-30
- responsible: J. Patel (CTO)
- accountable: T. Byrne (COO)
- consulted: E. Walsh (General Counsel)
- informed: Risk Committee

Generate customs declarations automatically from order data instead of re-keying them.

**Rationale:** Manual declarations cause clearance delays and rework on cross-border orders.
**Benefit:** Faster clearance and less clerical effort.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Access to the customs authority's API | Dependency | Blocked |
| Product classification data | Capability | In progress |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0179 | Feasibility study — API access delayed | Report | 2026-07-30 | 120 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Escalate API access request | J. Patel (CTO) | 2026-09-30 | |

## O05 · EV van conversion grant
- slugs: ev-fleet-grant
- kind: opportunity
- status: closed
- closed: 2026-09-15
- category: Sustainability
- owner: M. Lindqvist (CFO)
- value: 2
- effort: 3
- target: 4x2
- target_value: 12
- cost: £10k application costs
- realisation: 2026-09-01
- responsible: M. Lindqvist (CFO)
- accountable: M. Lindqvist (CFO)
- consulted: T. Byrne (COO)
- informed: Board

Apply for a government grant towards converting the delivery fleet to electric vans.

**Rationale:** A grant scheme part-funded fleet conversion until it closed to new applications.
**Benefit:** Lower capital cost of electrification and lower running costs.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Depot charging capacity survey | Capability | Ready |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0161 | Grant eligibility check | Attestation | 2026-04-02 | 180 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Submit grant application | M. Lindqvist (CFO) | 2026-06-30 | 2026-06-24 |

## O06 · Shipment-insights data product for customers
- slugs: shipment-insights; personal-data-breach
- kind: opportunity
- status: open
- category: Product
- owner: K. Novak (Head of Product)
- value: 5
- effort: 4
- target: 5x3
- target_value: 12
- cost: £420k build, £90k a year
- realisation: 2027-12-31
- responsible: K. Novak (Head of Product)
- accountable: J. Patel (CTO)
- consulted: S. Moreau (Data Protection Officer); E. Walsh (General Counsel)
- informed: Board

Sell customers a dashboard of their own shipment performance and delivery trends.

**Rationale:** Customers already ask for this data and we hold it; competitors charge for similar reports.
**Benefit:** A new recurring revenue line and stickier customer relationships.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Data-protection impact assessment | Approval | In progress |
| Analytics platform | Technology | Ready |
| Product team capacity | Capability | Blocked |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0192 | Customer interviews — willingness to pay | Report | 2026-09-12 | 180 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Complete data-protection impact assessment | S. Moreau (Data Protection Officer) | 2026-11-30 | |

## O07 · Consolidate cloud contracts
- slugs: cloud-consolidation; cloud-region-outage
- kind: opportunity
- status: open
- category: Technology
- owner: J. Patel (CTO)
- value: 3
- effort: 2
- target: 3x1
- target_value: 9
- cost: Internal effort only
- realisation: 2027-02-28
- responsible: D. Mensah (Head of SRE)
- accountable: J. Patel (CTO)
- consulted: F. Grant (Procurement Lead)
- informed: Audit Committee

Move to a single committed-spend cloud agreement while redesigning for multi-region resilience.

**Rationale:** Spend is split across overlapping contracts at list price.
**Benefit:** Committed-use discount on cloud spend, and simpler failover.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Twelve-month usage forecast | Capability | Ready |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0207 | Cloud spend analysis | Report | 2026-09-20 | 90 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Negotiate committed-spend terms | F. Grant (Procurement Lead) | 2026-12-31 | |

## O08 · Price USD contracts with hedging built in
- slugs: fx-pricing; fx-volatility
- kind: opportunity
- status: open
- category: Financial
- owner: M. Lindqvist (CFO)
- value: 2
- effort: 2
- target: 3x2
- target_value: 9
- cost: Internal effort only
- realisation: 2027-04-30
- responsible: M. Lindqvist (CFO)
- accountable: M. Lindqvist (CFO)
- consulted: F. Grant (Procurement Lead)
- informed: Audit Committee

Quote customer contracts in dollars with a hedged margin, turning currency exposure into a priced service.

**Rationale:** Our hedging programme already locks rates that customers would pay a premium for.
**Benefit:** Modest extra margin on dollar-denominated contracts.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Pricing model sign-off | Approval | In progress |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## O09 · Supplier self-service portal on the new ERP
- slugs: supplier-portal; erp-migration-overrun
- kind: opportunity
- status: open
- category: Change
- owner: L. Haddad (ERP Programme Director)
- value: 2
- effort: 5
- target: 4x3
- target_value: 9
- cost: £310k, unfunded
- realisation: 2028-03-31
- responsible: L. Haddad (ERP Programme Director)
- accountable: T. Byrne (COO)
- consulted: F. Grant (Procurement Lead)
- informed: Risk Committee

Let suppliers manage orders, invoices and bank details themselves through an ERP portal.

**Rationale:** Supplier queries and manual invoice matching take significant finance time.
**Benefit:** Less manual processing, once the delayed ERP migration completes.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| ERP release 1 live | Dependency | Blocked |
| Portal budget | Funding | Blocked |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0203B | ERP re-baseline — portal descoped from release 1 | Report | 2026-10-02 | 90 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|

## O10 · Engineering apprenticeship programme
- slugs: engineering-apprenticeships; key-staff-loss
- kind: opportunity
- status: open
- category: People
- owner: R. Chen (Chief People Officer)
- value: 4
- effort: 2
- target: 4x2
- target_value: 12
- cost: £95k a year
- realisation: 2027-09-30
- responsible: R. Chen (Chief People Officer)
- accountable: J. Patel (CTO)
- consulted: M. Lindqvist (CFO)
- informed: Risk Committee

Grow our own platform engineers through a funded apprenticeship scheme.

**Rationale:** Hiring experienced engineers is slow and costly; the apprenticeship levy is largely unspent.
**Benefit:** A pipeline of engineers who know our systems, and less key-person dependency.

### Enablers
| Enabler | Type | Status |
|---|---|---|
| Training provider contract | Dependency | Ready |
| Mentor time from senior engineers | Capability | In progress |

### Evidence
| Ref | Title | Kind | Date | Valid days |
|---|---|---|---|---|
| EV-0209 | Levy balance statement | Report | 2026-08-31 | 365 |

### Actions
| Action | Owner | Due | Done |
|---|---|---|---|
| Recruit first cohort of four | R. Chen (Chief People Officer) | 2027-01-31 | |
