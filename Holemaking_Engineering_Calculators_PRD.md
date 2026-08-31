# Product Requirements Document (PRD)
## Premium Holemaking Engineering Calculator Suite

**Version:** 1.0  
**Status:** Implementation-ready specification  
**Product type:** New calculator page inside an existing website  
**Primary reference:** Kennametal Holemaking Engineering Calculators  
**Implementation principle:** Recreate the engineering functionality independently; do not copy Kennametal source code, branding, layout, or proprietary assets.

---

# 1. Product Summary

Build a premium, highly interactive **Holemaking Engineering Calculator Suite** as a new page inside the existing website.

The page must feel like a native extension of the current site. It must automatically inherit the existing website’s:

- header and footer
- typography
- brand colors
- button styles
- border radius language
- spacing system
- dark/light background language
- content width
- hover/focus behavior

The calculator suite must not look like a third-party embed or a copy of Kennametal. It should feel like a modern engineering workbench built specifically for the existing brand.

The suite contains five primary calculators:

1. Cutting Fluid Calculator
2. Tap Drill Size Calculator
3. D/H Limits for Standard Taps
4. Tapping Torque & Power Calculator
5. Drilling Torque, Thrust & Power Calculator

The system must support **Metric and Imperial units**, live conversions, deterministic calculations, validation, formula transparency, comparison, and mobile-first usability.

---

# 2. Product Goals

## 2.1 Primary goals

- Give engineers, machinists, tool buyers, production teams, and technical sales teams a fast way to calculate common holemaking parameters.
- Match the useful engineering scope of the Kennametal holemaking calculator collection.
- Improve on the reference experience with a more premium, modern, responsive interface.
- Keep all transparent physics and thread calculations deterministic and testable.
- Make every result explainable through a “How this was calculated” panel.
- Make the tool useful on mobile devices on a shop floor.
- Keep calculations client-side whenever possible so results are instant.

## 2.2 Secondary goals

- Increase time on site.
- Create a high-value engineering resource that can rank organically.
- Allow result comparison and quick recalculation.
- Create natural paths from calculator results to relevant products or enquiry/contact actions.
- Make the page shareable without requiring login.

## 2.3 Non-goals

- Do not clone Kennametal visual design.
- Do not copy Kennametal JavaScript.
- Do not claim proprietary Kennametal drill-force coefficients are known if they have not been independently verified.
- Do not present theoretical planning values as guaranteed machine settings.
- Do not require a paid API to perform calculations.

---

# 3. Reference Scope

The current Kennametal holemaking calculator hub exposes five tools:

- Cutting Fluid Formulas
- D/H Limits for Standard Taps
- Tap Drill Size
- Tapping Torque and Horsepower
- Torque, Thrust, and Power

The new page must include equivalent engineering categories while using original code and original UI.

Reference URLs:

- https://www.kennametal.com/in/en/resources/engineering-calculators/holemaking-calculators.html
- https://www.kennametal.com/us/en/resources/engineering-calculators/holemaking-calculators/cutting-fluid-formulas.html
- https://www.kennametal.com/us/en/resources/engineering-calculators/holemaking-calculators/d-h-limits-for-standard-taps.html
- https://www.kennametal.com/us/en/resources/engineering-calculators/holemaking-calculators/tap-drill-size.html
- https://www.kennametal.com/in/en/resources/engineering-calculators/holemaking-calculators/tapping-torque-and-horsepower.html
- https://www.kennametal.com/us/en/resources/engineering-calculators/holemaking-calculators/torque--thrust--and-power.html

Published Kennametal tap technical-data reference used for thread formulas, H/D limits, tap-drill rules, and tapping torque/material factors:

- https://www1.mscdirect.com/images/solutions/kennametal/tap_die_tech_data.pdf

---

# 4. Core UX Concept — “Precision Engineering Workbench”

The page should feel like an engineering instrument, not a normal web form.

## 4.1 Desktop layout

Recommended structure:

**Top**
- Existing website header
- Breadcrumb
- Compact title: “Holemaking Engineering Calculators”
- One-line disclaimer: theoretical planning calculations

**Main workspace**
- Left: calculator navigator
- Center: input workspace
- Right: live results / engineering visualization

Suggested desktop ratio:
- navigation: 18–22%
- input workspace: 36–40%
- result workspace: 38–44%

The main calculator area may become a two-column layout at medium widths.

## 4.2 Mobile layout

- Calculator selector becomes a horizontally scrollable tab row or select sheet.
- Input fields appear first.
- Results appear immediately below.
- “Calculate” button is sticky at the bottom only when useful and must not cover content.
- Unit selector stays visible near the top.
- No desktop-only interaction.
- All touch targets >= 44 px.

## 4.3 Premium interaction ideas

Use subtle engineering interactions, not gimmicks:

### A. Live mechanical visual
Depending on the selected calculator:

- Cutting Fluid: animated coolant jet/orifice graphic
- Tap Drill: simplified thread cross-section showing major diameter and hole diameter
- D/H Limits: tolerance ladder / pitch-diameter band
- Tapping Torque: torque gauge
- Drilling: rotating drill silhouette with torque/thrust indicators

These can be SVG/CSS, not heavy WebGL.

### B. Result cards
Primary result uses large numeric typography.

Secondary results appear in a compact engineering grid.

### C. Formula Drawer
Button:
**“Show calculation”**

Drawer displays:
- formula
- substituted values
- units
- final result
- assumptions

### D. Compare Mode
User can “Pin result” and compare up to three calculations.

Examples:
- compare 65% vs 70% thread
- compare 100 PSI vs 150 PSI coolant
- compare drilling feed rates

### E. Recommended-range indicator
For thread percentage, efficiency, or data-supported fields, show:

- “Within recommended planning range”
- “Higher tapping load”
- “Outside published range”

Do not use alarmist language.

### F. Shareable state
Optional but recommended:
serialize calculator + inputs into URL query parameters.

Example:

`/calculators/holemaking?tool=tap-drill&unit=metric&d=8&p=1.25&thread=70`

No account required.

---

# 5. Design System and Existing Website Theme Integration

## 5.1 Critical rule

**Do not invent a new color palette.**

The calculator must inherit the design language from the existing website.

During implementation, inspect the website’s global CSS/theme and map existing values into calculator semantic tokens.

Example:

```css
:root {
  --calc-bg: var(--site-background);
  --calc-surface: var(--site-surface);
  --calc-text: var(--site-text);
  --calc-muted: var(--site-muted);
  --calc-border: var(--site-border);
  --calc-accent: var(--site-primary);
  --calc-accent-contrast: var(--site-primary-contrast);
  --calc-success: var(--site-success);
  --calc-warning: var(--site-warning);
}
```

If existing variable names differ, map them once in the calculator page stylesheet.

## 5.2 Typography

- `font-family: inherit`
- preserve existing heading scale
- numerical results may use `font-variant-numeric: tabular-nums`
- do not introduce a different display font

## 5.3 Visual language

Preferred:
- subtle metal/technical visual cues
- fine grids and dimension lines
- restrained motion
- strong hierarchy
- real engineering labels

Avoid:
- neon cyberpunk styling
- excessive gradients
- glowing cards
- fake 3D UI
- random industrial textures
- copying Kennametal yellow/black branding unless those are already the website’s own brand colors

---

# 6. Global Functional Requirements

## 6.1 Unit mode

Global unit toggle:

- Metric
- Imperial

Changing unit mode must **convert existing physical values**, not clear them.

Example:
25.4 mm -> 1.000 in

Canonical calculations should use a consistent internal unit system.

Recommended:
- internally use SI where practical
- convert at input/output boundaries

## 6.2 Precision

Keep full precision internally.

Display defaults:

- mm: 3 decimals
- inch: 4 decimals
- bar: 2–3 decimals
- PSI: 1 decimal
- L/min: 2 decimals
- GPM: 3 decimals
- Nm: 3 decimals
- in-lb: 2 decimals
- N: whole number or 1 decimal
- rpm: whole number unless low-speed case
- kW: 3 decimals
- hp: 3 decimals
- percent: 1 decimal

Never use displayed rounded values as the input for downstream formulas.

## 6.3 Validation

Every numeric field must reject:

- NaN
- Infinity
- negative values where physically invalid
- zero where divisor or physical dimension must be positive
- non-numeric text

Validation must be inline.

Do not silently change obviously invalid user inputs.

## 6.4 Result state

Before calculation:
- use clear placeholder values such as “—”
- never show `0` as if it were a calculated result

After calculation:
- animate number change subtly
- announce result via accessible live region

## 6.5 Reset

Each calculator has:
- Reset
- Calculate
- Pin result

Reset only affects the selected calculator.

## 6.6 Disclaimer

Persistent but unobtrusive:

> Engineering calculations are theoretical planning estimates. Actual machining results depend on tooling, geometry, material condition, machine rigidity, coolant, setup, and operating conditions.

---

# 7. Shared Engineering Constants

Use the following conversion constants centrally.

```ts
MM_PER_INCH = 25.4

BAR_PER_PSI = 0.0689475729
PSI_PER_BAR = 14.5037738

LPM_PER_GPM = 3.785411784
GPM_PER_LPM = 0.264172052

M_PER_FOOT = 0.3048

KW_PER_HP = 0.745699872
HP_PER_KW = 1.34102209

NM_PER_IN_LB = 0.112984829
IN_LB_PER_NM = 8.85074579

NM_PER_FT_LB = 1.355817948

N_PER_LBF = 4.4482216153

M_MIN_PER_SFM = 0.3048
```

---

# 8. Calculator 1 — Cutting Fluid

## 8.1 Purpose

Calculate:

- jet velocity
- hydraulic power
- flow or orifice diameter
- total system efficiency
- minimum motor power

## 8.2 Inputs

### Required

1. Coolant pressure
   - PSI or bar

2. Solve mode
   - “I know orifice diameter”
   - “I know flow rate”

3. Depending on mode:
   - Orifice diameter: inch or mm
   - Flow: GPM or L/min

4. Impeller efficiency %
5. Electric motor efficiency %

Default motor efficiency can be **85%** when user chooses “Use typical value”.

Do not silently apply a default; show it visibly.

## 8.3 Mutual exclusivity

Flow and orifice cannot both be active inputs.

The UI should use a segmented control so only one is editable.

## 8.4 Assumption

The reference page does not expose a fluid-density input.

For parity with a theoretical coolant/water calculation, use:

```text
rho = 1000 kg/m³
```

Display this in “Assumptions”.

Optional future enhancement:
allow fluid density/specific gravity under “Advanced”.

## 8.5 Metric formulas

Pressure:

```text
P_pa = pressure_bar × 100000
```

Jet velocity:

```text
v_m_s = sqrt((2 × P_pa) / rho)
```

Velocity in m/min:

```text
v_m_min = v_m_s × 60
```

If orifice diameter is known:

```text
d_m = d_mm / 1000
A = π × d_m² / 4
Q_m3_s = A × v_m_s
Q_L_min = Q_m3_s × 60000
```

If flow is known:

```text
Q_m3_s = Q_L_min / 60000
A = Q_m3_s / v_m_s
d_m = sqrt((4 × A) / π)
d_mm = d_m × 1000
```

Hydraulic power:

```text
P_hydraulic_kW = (pressure_bar × flow_L_min) / 600
```

Efficiency:

```text
eta_impeller = impeller_percent / 100
eta_motor = motor_percent / 100

eta_total = eta_impeller × eta_motor
```

Minimum motor size:

```text
P_motor_kW = P_hydraulic_kW / eta_total
```

## 8.6 Imperial formulas

Ideal water jet velocity:

```text
v_ft_s ≈ 12.15 × sqrt(pressure_psi)
v_ft_min = v_ft_s × 60
```

Orifice area:

```text
A_in2 = π × d_in² / 4
```

Flow:

```text
Q_gpm = v_ft_s × A_in2 × 3.11688
```

Hydraulic horsepower:

```text
P_hydraulic_hp = pressure_psi × flow_gpm / 1714
```

Minimum motor horsepower:

```text
P_motor_hp = P_hydraulic_hp / eta_total
```

## 8.7 Outputs

Primary:
- Minimum Motor Size

Secondary:
- Velocity
- Hydraulic Power
- Flow
- Orifice Diameter
- Total Efficiency

## 8.8 Validation

- pressure > 0
- selected flow > 0 or orifice > 0
- impeller efficiency: 1–100%
- motor efficiency: 1–100%

## 8.9 Visual

Show:
- pressure source
- orifice
- animated jet
- numeric flow/velocity labels

Animation intensity should respond to velocity but remain subtle.

---

# 9. Calculator 2 — Tap Drill Size

This calculator contains three modes:

1. Cutting Tap
2. Forming Tap
3. Machine Screw Major Diameter

Use tabs inside the calculator.

---

## 9A. Cutting Tap

### Inputs

- Major diameter D
- TPI (Imperial) OR Pitch P in mm (Metric)
- Desired percentage of full thread

Default recommendation:
70%, visibly editable.

Reference documentation recommends approximately 68–70% for cutting taps.

### Formula

For a standard 60° thread:

Metric:

```text
hole_mm = D_mm - ((thread_percent × pitch_mm) / 76.98)
```

Imperial:

```text
pitch_in = 1 / TPI
hole_in = D_in - ((thread_percent × pitch_in) / 76.98)
```

Equivalent:

```text
hole_in = D_in - (thread_percent / (76.98 × TPI))
```

### Reverse formula

Actual percentage of thread from a drilled hole:

Metric:

```text
thread_percent =
(76.98 / pitch_mm) × (D_mm - hole_mm)
```

Imperial:

```text
thread_percent =
76.98 × TPI × (D_in - hole_in)
```

### Results

- Calculated hole diameter
- closest standard drill
- actual percentage using selected standard drill
- dimensional difference between ideal and standard drill

### Example test

M8 × 1.25, 70%:

```text
8 - ((70 × 1.25) / 76.98)
≈ 6.863 mm
```

---

## 9B. Forming Tap

Form taps displace material rather than cut chips.

The published Kennametal technical data gives the following 60° forming-tap limits.

### Unified inch

```text
Maximum drill size (lower thread engagement):
D - 3/(8N)

Minimum drill size (higher thread engagement):
D - 1/(2N)

N = TPI
```

### Metric

```text
Maximum drill size:
D - 0.375P

Minimum drill size:
D - 0.5P
```

where P is pitch.

These boundaries represent approximately the published 55–75% planning range.

### Recommended implementation

Provide a thread-percentage slider from **55% to 75%**.

For common published sizes:
- prefer lookup values from the forming-tap reference table
- return published recommended drill when available

For arbitrary custom size:
interpolate between the published 55% and 75% boundaries.

Define:

```text
k = 0.375 + ((thread_percent - 55) / 20) × 0.125

hole = D - kP
```

This produces:
- 55% -> D - 0.375P
- 65% -> D - 0.4375P
- 75% -> D - 0.5P

**Important UI label:** for arbitrary custom sizes this is a planning interpolation derived from the published boundary rules, not a manufacturer-specific certified drill recommendation.

### Results

- recommended hole
- published min/max hole range
- closest standard drill
- actual location inside 55–75% range

---

## 9C. Machine Screw Major Diameter

Use a lookup table matching the standard values used in the reference calculator.

```json
{
  "#0": 0.060,
  "#1": 0.073,
  "#2": 0.086,
  "#3": 0.099,
  "#4": 0.112,
  "#5": 0.125,
  "#6": 0.138,
  "#8": 0.164,
  "#10": 0.190,
  "#12": 0.216,
  "#14": 0.242
}
```

Units above are inches.

The arithmetic relationship is:

```text
diameter_in = 0.060 + (number × 0.013)
```

but use the explicit lookup table for reference parity.

---

# 10. Standard Drill Database

Create:

`standardDrills.json`

Include:

- Number drills #80 through #1
- Letter drills A through Z
- fractional drills
- common metric drills

Schema:

```json
{
  "id": "number-16",
  "system": "number",
  "label": "#16",
  "diameterIn": 0.1770,
  "diameterMm": 4.4958
}
```

## 10.1 Closest drill algorithm

```ts
closest = drills
  .filter(isAllowedForCurrentMode)
  .sort((a, b) =>
    abs(a.diameter - target) - abs(b.diameter - target)
  )[0]
```

Tie rule:
if two drills are equally close, prefer the slightly larger hole diameter to reduce tapping load.

Always calculate and show the resulting actual thread percentage.

---

# 11. Calculator 3 — D/H Limits for Standard Taps

## 11.1 Purpose

Calculate standard cutting-tap limits and related drill data.

## 11.2 Inputs

- Thread system:
  - Unified / Inch
  - Metric
- Major diameter D
- Pitch:
  - TPI for inch
  - mm pitch for metric
- Tolerance class:
  - H-series for Unified
  - D-series for metric
- Desired percentage of thread

## 11.3 Outputs

- Basic Pitch Diameter
- Selected tolerance minimum
- Selected tolerance maximum
- Tap Drill Size
- Closest Standard Drill
- Decimal Equivalent
- Metric Equivalent
- Actual % thread using the closest standard drill

## 11.4 Basic pitch diameter

For a standard 60° thread:

```text
E_basic = D - 0.6495190528 × P
```

where:
- D = major diameter
- P = pitch

For inch threads:

```text
P = 1 / TPI
```

### Example

1/4-20:

```text
D = 0.250
P = 0.050

E_basic =
0.250 - (0.6495190528 × 0.050)
≈ 0.217524 in
```

Published tables round this to approximately 0.2175 in.

## 11.5 Unified H limits

Do not generate every supported H limit using a guessed universal formula.

Use a table-driven implementation based on published tap-limit data.

Reason:
- successive H limits for taps through 1 inch, 8 TPI and finer are arranged in 0.0005 in bands
- larger tap ranges have different tolerance-width behavior
- not every H class is available for every thread

Data file:

`unifiedTapLimits.json`

Schema:

```json
{
  "size": "1/4",
  "tpi": 20,
  "majorDiameterIn": 0.25,
  "basicPitchDiameterIn": 0.2175,
  "limits": {
    "H1": {"min": 0.2175, "max": 0.2180},
    "H2": {"min": 0.2180, "max": 0.2185},
    "H3": {"min": 0.2185, "max": 0.2190},
    "H5": {"min": 0.2195, "max": 0.2200}
  }
}
```

If requested class is not available:
- do not fabricate the value
- show “No published limit for this size/class”
- suggest available classes from the dataset

## 11.6 Metric D limits

Use published metric tap-limit lookup values.

Classes include:
- D3
- D4
- D5
- D6
- D7
- D8
- D9

Data file:

`metricTapLimits.json`

Schema:

```json
{
  "sizeMm": 8,
  "pitchMm": 1.25,
  "basicPitchDiameterIn": "...",
  "limits": {
    "D3": {"min": "...", "max": "..."},
    "D4": {"min": "...", "max": "..."}
  }
}
```

Store source values at full published precision.

Convert for display only.

## 11.7 Tap drill

Use cutting-tap equation:

```text
hole = D - ((thread_percent × pitch) / 76.98)
```

## 11.8 Closest drill

Search standard drill database.

## 11.9 Actual percentage

```text
actual_percent =
(76.98 / P) × (D - selected_drill_diameter)
```

## 11.10 Visual

Show a vertical tolerance ladder:

- Basic P.D.
- Selected H/D band
- min
- max
- current class

This is a strong premium visual and helps users understand what an H or D class means.

---

# 12. Calculator 4 — Tapping Torque & Power

## 12.1 Purpose

Calculate planning torque and machine power for cutting-tap applications using published HSS straight-flute plug-tap reference data plus material multipliers.

## 12.2 Inputs

### Torque section

- Tap size/pitch
- Material category
- Material hardness where applicable

### Power section

- Tap size/pitch
- Surface speed
- Material category
- Material hardness where applicable

## 12.3 Published reference data

Build:

`tappingTorqueTable.json`

Each row should preserve:

- tap size/pitch
- minimum tapping torque
- maximum tapping torque
- low-strength tap breaking torque
- high-strength tap breaking torque
- minimum required horsepower reference
- tap-holder normal setting
- tap-holder minimum setting
- tap-holder maximum setting
- source torque unit

**Important:** Published values for larger taps use foot-pounds in bold in the source table while most smaller entries use inch-pounds. Preserve the unit explicitly in the dataset before normalizing.

Example:

```json
{
  "tap": "1/4-20",
  "diameterIn": 0.25,
  "tpi": 20,
  "torqueUnit": "in-lb",
  "minTappingTorque": 40,
  "maxTappingTorque": 80,
  "breakingLow": 50,
  "breakingHigh": 100,
  "referenceMinHp": 0.5,
  "holderNormal": 50,
  "holderMin": 40,
  "holderMax": 80
}
```

## 12.4 Material multipliers

Simple materials:

```json
{
  "aluminum": 0.2,
  "brass": 0.4,
  "bronze": 0.4,
  "castIron": 0.6,
  "copper": 0.5,
  "magnesium": 0.5,
  "malleableIron": 0.7,
  "zinc": 0.4,
  "titanium": 1.4
}
```

Hardness-sensitive groups:

### Carbon / mild steel 1008–1095

- 90 HB -> 1.0
- 130 HB -> 1.1
- 170 HB -> 1.2
- 190 HB -> 1.3
- 250 HB -> 1.4

### Free-cutting steel 1111–1213

- 140 HB -> 0.7
- 170 HB -> 0.8
- 230 HB -> 0.9

### Alloy steel 1330–8642, lower hardness range

- 175 HB -> 0.9
- 190 HB -> 1.0
- 200 HB -> 1.1
- 205 HB -> 1.2
- 210 HB -> 1.3

### Alloy steel 1330–8642, higher hardness range

- 240 HB -> 1.5
- 250 HB -> 1.6
- 330 HB -> 2.1
- 390 HB -> 2.5
- 470 HB -> 2.9

For hardness values between published points:
- default behavior should be discrete selection from published values
- optional “advanced interpolation” may linearly interpolate and must be labelled as interpolation

## 12.5 Torque calculation

Normalize source torque into in-lb and Nm.

```text
T_min = base_min_torque × material_factor
T_max = base_max_torque × material_factor
```

Recommended UI:

Primary:
**Operating torque range**

Secondary:
- conservative sizing torque = T_max
- breaking torque range
- holder-setting range, if applicable

This gives more useful engineering context than hiding the published torque range behind a single number.

## 12.6 RPM from surface speed

Imperial:

```text
RPM = (SFM × 12) / (π × diameter_in)
```

Equivalent approximate:

```text
RPM ≈ (SFM × 3.8197186) / diameter_in
```

Metric:

```text
RPM = (Vc_m_min × 1000) / (π × diameter_mm)
```

## 12.7 Power from torque

Imperial:

```text
HP = torque_in_lb × RPM / 63025
```

Metric:

```text
kW = torque_Nm × RPM / 9549.2966
```

Show:
- minimum operating power
- maximum/conservative operating power

Recommended machine-sizing number:
use the conservative/max torque result and clearly label it as planning power.

## 12.8 Example test

1/4-20:
- base torque 40–80 in-lb
- titanium factor 1.4

Expected:

```text
56–112 in-lb
≈ 6.33–12.65 Nm
```

---

# 13. Calculator 5 — Drilling Torque, Thrust & Power

## 13.1 Purpose

Calculate:

- spindle speed
- metal removal rate
- feed per minute
- time in cut
- torque
- thrust/feed force
- cutting power

Reference tool categories include:
- KSEM
- SE Drill
- Drill Fix
- HTS
- HTS-C

## 13.2 Inputs

- Workpiece material
- Drill diameter Dm
- Cutting speed Vc
- Hole depth ap
- Feed fn
- Drilling option / drill family
- Unit system

## 13.3 Outputs

- n spindle speed
- Qz metal removal rate
- Vf feed per minute
- Tc time in cut
- Mc/Md torque
- Ff thrust/feed force
- Pc cutting power

## 13.4 Transparent kinematic formulas

### Spindle speed

Metric:

```text
n_rpm = (1000 × Vc_m_min) / (π × D_mm)
```

Imperial:

```text
n_rpm = (12 × Vc_sfm) / (π × D_in)
```

### Feed per minute

```text
Vf = fn × n
```

Metric:
- fn = mm/rev
- Vf = mm/min

Imperial:
- fn = in/rev
- Vf = in/min

### Time in cut

```text
Tc_min = depth / Vf
Tc_sec = Tc_min × 60
```

### Metal removal rate

Metric:

```text
Q_mm3_min = (π × D_mm² / 4) × Vf_mm_min
Q_cm3_min = Q_mm3_min / 1000
```

Imperial:

```text
Q_in3_min = (π × D_in² / 4) × Vf_in_min
```

### Power from torque

```text
P_kW = torque_Nm × rpm / 9549.2966
```

or

```text
HP = torque_in_lb × rpm / 63025
```

## 13.5 Critical implementation rule for torque and thrust

The reference calculator’s torque and thrust vary by:

- workpiece material
- drill family
- diameter
- feed
- tool geometry / application assumptions

The public calculator page exposes the input/output interface but not the complete internal empirical coefficient matrix.

Therefore:

### Do NOT
- invent a coefficient table
- label generic drilling-force formulas as “exact Kennametal logic”
- hardcode arbitrary factors merely to make results look similar

### Required architecture

Implement a coefficient/data layer:

`drillingForceModels.json`

Example structure:

```json
{
  "drillFix": {
    "P1_lowCarbonSteel": {
      "modelVersion": "validated-v1",
      "torque": {
        "type": "empirical",
        "coefficients": {}
      },
      "thrust": {
        "type": "empirical",
        "coefficients": {}
      }
    }
  }
}
```

Calculation API:

```ts
calculateDrillingForces({
  material,
  drillFamily,
  diameter,
  feed,
  speed
})
```

Return:

```ts
{
  torque,
  thrust,
  power,
  modelSource,
  modelConfidence
}
```

## 13.6 Compatibility strategy

Use a three-stage approach.

### Stage 1 — fully implement all deterministic outputs
Immediately implement:
- spindle speed
- feed/min
- MRR
- time
- unit conversions
- power once torque is available

### Stage 2 — populate independently documented engineering coefficients
Use public technical references or original company test data.

### Stage 3 — benchmark/calibrate
Compare the output against known reference cases.

One historically published screenshot of the Kennametal calculator gives a useful benchmark:

- Material: low carbon steel, long chip, approx. 60,000 PSI / 125 HBN
- D = 14 mm
- Vc = 2 m/min
- depth = 30 mm
- feed = 0.2 mm/rev
- Drill Fix

Published screenshot results approximately:

- spindle speed: 45.4728 rpm
- MRR: 1.4 cm³/min
- feed/min: 9.09 mm/min
- time: 198.02 sec
- torque: 8.743 Nm
- thrust: 1154 N
- power: 0.04 kW

Use this as one benchmark only, not as enough data to derive a full coefficient matrix.

## 13.7 Model confidence UI

For drilling-force outputs add a tiny source badge:

- “Verified formula”
- “Published table”
- “Calibrated estimate”

Never display “exact” unless the coefficient set has actually been validated.

---

# 14. Material Dataset

Create a normalized material dataset.

`materials.json`

Suggested structure:

```json
{
  "id": "p1-low-carbon-long-chip",
  "name": "Low Carbon Steel — Long Chip",
  "isoGroup": "P",
  "hardnessHb": 125,
  "utsMpa": 414,
  "tappingFactor": 1.0,
  "drillingModels": {
    "drillFix": "p1-df-v1"
  }
}
```

Do not conflate:
- tapping multiplier
- drilling specific-force coefficient

They represent different models.

---

# 15. State Model

Example TypeScript state:

```ts
type UnitSystem = "metric" | "imperial";

type CalculatorId =
  | "cutting-fluid"
  | "tap-drill"
  | "tap-limits"
  | "tapping-torque"
  | "drilling-forces";

interface CalculatorPageState {
  unitSystem: UnitSystem;
  activeCalculator: CalculatorId;
  pinnedResults: PinnedResult[];
}
```

Calculator inputs must maintain values in canonical units.

---

# 16. Calculation Engine Architecture

Recommended folder layout:

```text
src/
  calculators/
    holemaking/
      engine/
        cuttingFluid.ts
        tapDrill.ts
        tapLimits.ts
        tappingTorque.ts
        drillingForces.ts

      data/
        standardDrills.json
        machineScrews.json
        unifiedTapLimits.json
        metricTapLimits.json
        tappingTorqueTable.json
        tappingMaterialFactors.json
        drillingForceModels.json
        materials.json

      components/
        CalculatorShell
        UnitToggle
        EngineeringInput
        ResultsPanel
        FormulaDrawer
        ResultGauge
        ToleranceLadder
        ThreadPreview
        CalculationHistory
```

Each engine function must be:

- pure
- deterministic
- UI-independent
- unit-tested

Example:

```ts
const result = calculateTapDrill({
  majorDiameterMm: 8,
  pitchMm: 1.25,
  threadPercent: 70,
  tapType: "cutting"
});
```

---

# 17. Formula Transparency

Every calculation result must provide a calculation trace.

Example result:

```ts
{
  value: 6.863,
  unit: "mm",
  trace: {
    formula: "D - ((% × P) / 76.98)",
    substituted:
      "8 - ((70 × 1.25) / 76.98)",
    assumptions: [
      "60° thread form"
    ]
  }
}
```

The UI can then render “How this was calculated” without duplicating formulas in components.

---

# 18. Result Comparison

Users may pin up to 3 results.

Comparison card example:

| Scenario | Thread % | Hole | Closest Drill |
|---|---:|---:|---|
| A | 65% | 6.944 mm | 6.9 mm |
| B | 70% | 6.863 mm | 6.8/6.9 mm |
| C | 75% | 6.782 mm | 6.8 mm |

Use exact database output rather than this illustrative table when implemented.

---

# 19. Accessibility

Must meet WCAG-friendly interaction patterns.

- labels connected to controls
- keyboard operable
- visible focus
- no information only on hover
- result updates use `aria-live="polite"`
- charts/graphics have textual result equivalents
- do not rely solely on color for status
- input error has text message
- 16 px minimum input text on mobile

---

# 20. Performance

Targets:

- calculator engine JS should load quickly
- no calculation API request required
- first calculator interactive almost immediately
- SVG animations disabled/reduced when `prefers-reduced-motion`
- no heavy 3D libraries for the core page
- lazy-load only optional visuals

---

# 21. SEO

Suggested page title:

**Holemaking Engineering Calculators | Tap Drill, Torque, Thrust & Coolant**

Suggested H1:

**Holemaking Engineering Calculators**

Intro copy should naturally mention:
- tap drill size calculator
- tapping torque calculator
- drilling torque calculator
- thrust force calculator
- coolant flow calculator
- holemaking calculator
- metric and imperial machining calculations

Each calculator should have:
- unique H2
- short explanatory text
- FAQ section where useful

Use structured FAQ data only for real FAQ content visible on page.

---

# 22. Analytics

Track without storing sensitive engineering data unnecessarily.

Events:

```text
calculator_view
calculator_calculate
unit_toggle
result_pin
formula_open
calculator_reset
share_state
contact_from_calculator
```

Useful properties:
- calculator type
- unit system
- success/error
- selected drill family
- selected material group

Do not send every numeric input unless there is a clear analytics requirement.

---

# 23. Error and Edge Cases

## Cutting fluid
- zero pressure
- efficiency 0
- efficiency >100
- no flow/orifice selected
- both modes somehow active

## Tap drill
- thread percentage <=0
- thread percentage >=100
- pitch <=0
- TPI <=0
- hole result <=0

## Form tap
- percentage outside 55–75
  - show warning
  - do not extrapolate by default

## Tap limits
- unsupported size
- unsupported H/D class
- custom diameter not in published table

For a custom thread:
- calculate basic pitch diameter and tap drill
- do not invent tolerance lookup

## Tapping torque
- tap not in dataset
- material/hardness not in dataset
- preserve source unit correctly

## Drilling
- feed <=0
- depth <=0
- diameter <=0
- unsupported material/drill-family force model

If torque/thrust model is unavailable:
still show deterministic RPM/MRR/feed/time and display:
“Torque/thrust model is not yet validated for this combination.”

---

# 24. QA / Acceptance Tests

## 24.1 Tap drill

Input:
- Metric
- D = 8 mm
- P = 1.25 mm
- thread = 70%

Expected:
- hole ≈ 6.863 mm

Tolerance:
±0.001 mm

## 24.2 Basic pitch diameter

Input:
- 1/4-20
- D = 0.25 in
- pitch = 0.05 in

Expected mathematical:
≈ 0.217524 in

Published-display value:
≈ 0.2175 in

## 24.3 H limit

Input:
- 1/4-20
- H2

Expected from table:
- min 0.2180 in
- max 0.2185 in

## 24.4 Tapping torque

Input:
- 1/4-20
- titanium

Published base:
- 40–80 in-lb

Factor:
- 1.4

Expected:
- 56–112 in-lb
- ≈ 6.33–12.65 Nm

## 24.5 Drilling kinematics benchmark

Input:
- D 14 mm
- Vc 2 m/min
- depth 30 mm
- feed 0.2 mm/rev

Expected:
- RPM ≈ 45.473
- Vf ≈ 9.095 mm/min
- MRR ≈ 1.4 cm³/min
- time ≈ 197.9–198.0 sec depending display rounding

## 24.6 Unit round-trip

25.4 mm:
- switch to Imperial -> 1.0000 in
- switch back -> 25.4 mm

No cumulative conversion drift.

---

# 25. Data Integrity Rules

Every table-driven dataset should include metadata:

```json
{
  "_meta": {
    "source": "...",
    "version": "1.0",
    "verifiedOn": "YYYY-MM-DD",
    "notes": "..."
  }
}
```

Do not put data tables directly inside UI components.

Maintain source units separately from display units.

---

# 26. Security

The calculator itself requires no authentication.

Rules:
- no `eval`
- no arbitrary formula execution from URL parameters
- parse all query state
- clamp reasonable ranges
- sanitize any share-label/user-note text
- calculations should remain local

---

# 27. Recommended Product CTA Integration

The tool should not become an aggressive sales page.

After the result, use one restrained CTA area:

Possible:
- “Need help selecting the correct drill?”
- “View compatible drilling tools”
- “Talk to a technical specialist”

CTA styling must match existing website.

The primary engineering result must remain the visual priority.

---

# 28. Premium Microcopy

Examples:

Instead of:
“Submit”

Use:
**Calculate**

Instead of:
“Result”

Use:
**Calculated Hole Size**

Instead of:
“Error”

Use:
**Check this input**

Instead of:
“Learn more”

Use:
**Show calculation**

Use symbols carefully:
- Dm — drill diameter
- Vc — cutting speed
- fn — feed/rev
- n — spindle speed
- Vf — feed/min
- Qz — MRR
- Tc — time in cut
- Mc — torque
- Ff — feed force
- Pc — cutting power

Show plain-English labels alongside symbols.

---

# 29. Development Priority

## Phase 1 — Must ship

- Calculator shell
- Theme inheritance
- Metric/Imperial
- Cutting Fluid
- Cutting Tap Drill
- Form Tap Drill using published boundaries
- Machine Screw lookup
- D/H table logic
- closest standard drill
- Tapping Torque table + factors
- deterministic drilling RPM/feed/MRR/time
- formula drawer
- validation
- mobile responsive
- unit tests

## Phase 2 — Force-model validation

- verified drilling torque coefficients
- verified thrust coefficients
- material/drill-family matrix
- benchmark suite

## Phase 3 — Enhancements

- compare mode
- URL sharing
- print-friendly result
- product recommendations
- recently used calculations
- downloadable calculation sheet

---

# 30. Definition of Done

The page is complete when:

1. It visually belongs to the existing website.
2. All five calculators are accessible from one page.
3. Unit switching preserves values.
4. Cutting-fluid calculations pass unit tests.
5. Cutting-tap drill formula matches published 76.98 logic.
6. Form-tap calculator respects published min/max boundary rules.
7. Unified H limits come from verified lookup data.
8. Metric D limits come from verified lookup data.
9. Closest drill uses a real standard-drill database.
10. Tapping torque uses published tap torque rows and material factors.
11. Tapping power is derived from torque and RPM using standard mechanical power formulas.
12. Drilling RPM, feed/min, MRR, and time are deterministic and tested.
13. Drilling torque/thrust are only enabled for combinations with a validated coefficient model.
14. Formula transparency is available for every result.
15. No NaN/Infinity/undefined is ever shown.
16. Mobile experience is fully usable.
17. Calculation logic is separate from UI.
18. Automated tests cover all primary formulas and unit conversions.
19. A planning-value disclaimer is visible.
20. No Kennametal branding/source code/layout is copied.

---

# 31. Implementation Notes for Antigravity / AI Coding Agent

Give the coding agent the following instruction with this PRD:

> Build this as a new route inside the existing project. First inspect the current project’s global styles, layout components, header/footer, typography, colors, buttons, cards, breakpoints, and CSS variables. Reuse them. Do not create a new visual theme. Implement the calculation engine as pure TypeScript/JavaScript modules with unit tests. Keep reference lookup data in JSON/data modules. Build the premium engineering workbench UI described in this PRD. Do not fabricate missing drilling-force coefficients. If a force model is unavailable, calculate and show the deterministic kinematic outputs and label torque/thrust as unavailable until validated.

Recommended implementation order:

1. inspect current site
2. create route
3. create design-token adapter
4. create shared UnitToggle + Input components
5. implement pure calculation engine
6. add data tables
7. unit test engine
8. build each calculator panel
9. add formula drawer
10. add responsive engineering visuals
11. run benchmark tests
12. audit accessibility
13. audit mobile UI
14. verify no hardcoded foreign branding

---

# 32. Source-Confidence Matrix

| Logic area | Implementation confidence |
|---|---|
| Unit conversions | Verified standard physics |
| Cutting-fluid hydraulic power | Verified standard fluid-power relation |
| Cutting-fluid ideal velocity | Verified Bernoulli-based theoretical relation |
| Cutting-tap drill size | Published Kennametal formula |
| Reverse thread percentage | Published Kennametal formula |
| Form-tap min/max hole boundaries | Published Kennametal technical data |
| Form-tap arbitrary % interpolation | Derived planning interpolation; label accordingly |
| Machine screw major diameters | Published table / standard relationship |
| Basic pitch diameter | Standard 60° thread geometry |
| Unified H limits | Published table-driven |
| Metric D limits | Published table-driven |
| Tapping torque base values | Published Kennametal table |
| Tapping material multipliers | Published Kennametal table |
| Tapping power from torque/RPM | Standard mechanical power formula |
| Drilling RPM/feed/MRR/time | Standard machining formulas |
| Drilling torque/thrust by drill family | Requires validated empirical dataset |
| Power from drilling torque | Standard mechanical power formula |

---

# 33. Important Engineering Principle

The finished page should be **more trustworthy than a visual clone**.

Where the engineering relationship is transparent and published, calculate it directly.

Where the result depends on a manufacturer/tool-specific empirical model, use validated reference data or clearly label the result as an engineering estimate.

Never sacrifice calculation integrity just to make a number resemble another website.
