# JIAN TOOLS — GEMINI VIDEO GENERATION MASTER SPECIFICATION

**Project:** jiantools.in hero sequence — *Precision Tube-Sheet Drilling*
**Deliverable:** Video generation prompt package for Google Gemini (not the videos, not the site code)
**Status:** Ready to generate Scene 01 now. Scenes 02–07 use product/tube-sheet descriptions built only from the text of your brief — see §3 for exactly what to attach to sharpen them before you generate those.

---

## 1. Creative Direction

The hero is one cinematic idea told across seven independent scenes: **a JIAN TOOLS modular drill, fitted with its crown drill head, precision-drilling an industrial tube sheet.**

The story moves from context → product → action → proof:

1. The viewer sees the application first — a heavy, precisely-holed tube sheet — with no tool in frame yet.
2. The modular drill is revealed as the instrument built for this job.
3. The crown drill head is examined in macro, because it's the part that actually touches the material.
4. The drill engages the tube sheet: rotation, contact, and progressive, physically credible material removal.
5. The finished hole is revealed as the payoff.
6. The camera pulls back to show the pattern repeated across the sheet — the visual argument for repeatability and mass-production suitability.
7. The drill is presented alone as a hero product shot, closing on the brand rather than the application.

**One creative refinement beyond your original scene list:** Scene 01 doesn't show a blank plate — it shows a tube sheet that *already* carries a wide grid of precisely finished holes, with camera settling on the *one position still un-drilled*. Scene 04 drills exactly that position. Scene 05 reveals it's now indistinguishable from its neighbors. Scene 06 pulls back to show the completed grid. This turns "repeatability" from an abstract idea into something the viewer literally watches happen, and gives all seven scenes a single through-line instead of seven loosely related vignettes.

Visually: premium industrial engineering visualization crossed with luxury automotive commercial cinematography. Near-black graphite environments, the product as the single brightest thing in frame, physically believable metal and chip behavior, deliberate unhurried camera movement. Nothing should read as an instructional machining video, a CGI showreel, or stock B-roll. No on-screen typography, logos, specs, or HUD in any clip — every scene is composed to leave a describable negative-space region for your own HTML/CSS type.

---

## 2. Visual Consistency Rules (apply to every single generation, no exceptions)

**Product**
- Only three things may ever appear on screen: the JIAN TOOLS modular drill body, the crown drill head/tip, and the industrial tube sheet. No other tool, brand, or invented product, ever.
- The drill's geometry, proportions, diameter, flute count/direction, crown-head geometry, insert geometry, connection interface, shank, and finish must not change between scenes. Scene 02 is the canonical reference for every scene after it.
- The crown head is one continuous design across the whole sequence — Gemini must never "redesign" the insert or cutting geometry between scenes.

**Physics**
- The drill meets the tube sheet perpendicular to its surface; the hole is coaxial with the drill axis.
- Material removal is gradual and mechanically plausible: rotation → engagement → small chip formation → progressive hole. No sparks, explosions, laser-like cutting, melting, or material vanishing.
- No coolant system unless a client reference confirms one — never invent dramatic coolant jets or mist.

**Camera & lighting**
- Cinema-camera movement only: slow dolly, controlled orbit, macro tracking, subtle push/pull, controlled tilt. No handheld shake, whip pans, fisheye, or fast cuts.
- Controlled, cool-neutral, rim-lit lighting against a near-black graphite backdrop. No cyberpunk color, no teal-and-orange grade, no glass-and-neon "futuristic factory" styling.

**Text & UI**
- No captions, titles, logos, callouts, measurements, or fake certifications generated in any clip — that layer is added later in HTML/CSS. Every prompt below states exactly where the safe negative space is.

**Continuity**
- From Scene 02 onward, every prompt attaches the previous scene's final frame (or the master product reference, where noted) and explicitly instructs Gemini to preserve that reference's geometry, material, and orientation.

**Claims**
- This is a cinematic representation of the application, not a documentary claim about JIAN TOOLS' actual manufacturing or inspection process. Nothing in these prompts or the suggested on-site copy asserts a specific certification, tolerance figure, or inspection method that hasn't been confirmed by the client.

**Output hygiene**
- Generate at the cleanest legitimate output setting your Gemini/Veo setup offers. Don't crop, upscale, or otherwise doctor footage to hide a watermark — that's a generation-settings decision (see §4), not a post-production one.

---

## 3. Product Identity

### What may appear

| # | Element | Description (from your brief) |
|---|---|---|
| 1 | **JIAN TOOLS Modular Drill** | Metallic silver/gray precision-ground drill body: cylindrical shank, shoulder/collar, helical flutes, modular connection interface where the head assembles to the body. Available 1D–12D. |
| 2 | **Crown Drill Head / Crown Drill Tip** | The separate, indexable cutting head at the drill's leading end — visually a faceted, crown-profile cluster of cutting edges. Gold/copper-toned coated carbide insert(s), precision-ground edges, seated in the body's insert pocket. |
| 3 | **Industrial Tube Sheet** | A heavy, thick, precision-machined metal plate carrying a regular grid of circular tube holes — the recognizable workpiece type wherever tube sheets are used (e.g., heat-exchanger/boiler tube sheets). |

Nothing else appears — no twist drills, end mills, ball-nose cutters, reamers, thread mills, turning tools, other JIAN TOOLS catalogue items, other brands, or invented geometry.

### Missing visual information — flagged as instructed

No reference images or source documents came through in this conversation — only the text of the brief itself. Everything in the table above, and in every prompt below, is built from that text, not from an actual photo. Before generating Scene 02 for real, these will sharpen the result substantially:

- The modular-drill modeling reference image itself, so the prompts can lock to its exact proportions instead of the generic "silver body, gold insert" language above
- A macro/product photo of the crown drill head alone
- A real tube-sheet photo or CAD reference — hole diameter-to-pitch ratio, plate thickness relative to hole diameter, edge chamfer, surface finish
- Which body length (1D–12D) should represent the hero. The prompts below assume a mid-length body (roughly a 4D–5D visual proportion) purely because it frames well on camera — long enough to read as a drill, short enough not to look thin or unstable. **This is a creative recommendation, not a spec — confirm or correct it.**
- Any brand-specific finish note (exact insert coating color, reserved surface texture, etc.)

Once those arrive, only Scene 02 and Scene 03's prompts need rewriting — every later scene just says "match the previous frame," so the correction propagates automatically.

---

## 4. Gemini / Veo Workflow Notes *(added — not in your original spec)*

Your brief was written around "Google Gemini video generation" generically. Google's actual tooling has moved fast enough that it's worth a short, current-as-of-today note so the reference-image instructions below actually map onto what you'll see on screen.

**Two models currently sit under the Gemini umbrella:** Veo 3.1, and the newer Gemini Omni Flash, which is now positioned as the default in the Gemini app. Google's own developer documentation recommends Omni Flash for product/character consistency and multi-turn conversational editing, and recommends Veo 3.1 specifically when you need scene extension, last-frame control, or native audio. Given this project is built entirely around "carry the previous frame forward," **Veo 3.1 is the better fit if your interface lets you pick a model** — its reference-image system (branded "Ingredients to Video") explicitly supports attaching a *subject/product* image and a separate *environment/background* image, which lines up directly with the "attach the drill" + "attach the tube sheet" instructions in Scene 04 below. If your interface only offers Omni Flash, the same approach still works — attach the reference image, restate the preservation instruction in text, and use its conversational follow-up to correct any drift on the spot rather than starting a scene over.

Practical notes that shaped the prompts and durations below:
- Base generations run about 8 seconds; the recommended 5–7s durations below assume a light trim in your editor. If your interface lets you request a shorter length directly, use that instead.
- Both current models generate synchronized audio by default. Since these will run as muted background hero videos on the site, either add "minimal ambient tone, no dialogue, no music" to each prompt, or simply strip audio on export — it won't affect the visual generation.
- Vertical (9:16) output is natively supported, so a "dedicated mobile version" (flagged for Scenes 01 and 06 below) is a same-prompt re-run with the aspect ratio switched, not a separate creative effort.
- Whichever model you use, **treat reference-image adherence as something to verify, not assume.** Open each finished clip next to the reference it was built from before you use its final frame as the next prompt's input. If the drill has drifted — a flute count changed, the insert color shifted — regenerate that scene before moving on. A drift caught at Scene 03 is a five-minute fix; the same drift caught at Scene 07 means redoing the whole chain.
- Source: Google AI for Developers, *Video generation in the Gemini API* (ai.google.dev/gemini-api/docs/video).

---

## 5. Scene Architecture

| Scene | Purpose | Main Product | Application | Approx Duration | Reference Image | Camera | Main Action | End Frame |
|---|---|---|---|---|---|---|---|---|
| **01 — Tube Sheet / Application Intro** | Establish the application before any tool appears | Tube sheet only | Tube-sheet drilling context | 5s | No | Slow lateral dolly across the plate | Camera reveals the hole grid and finds one un-drilled position | Un-drilled position, centered, headroom above |
| **02 — Modular Drill Reveal** | Introduce the modular drill in isolation | Modular drill (full body) | Product reveal | 6s | Yes — product reference | Slow orbit reveal | Drill turns into light out of darkness | Drill vertical, crown head low in frame |
| **03 — Crown Drill Head Macro** | Showcase the cutting geometry before contact | Crown drill head | Feature macro | 5s | Yes — Scene 02 end frame | Macro push-in + slow tilt | Extreme macro reveals insert facets | Tip centered, razor-sharp focus |
| **04 — Precision Drilling** | Show the drill engaging and cutting the tube sheet | Drill + crown head + tube sheet | Drilling / material removal | 7s | Yes — Scene 03 (subject) + Scene 01 (environment) end frames | Parallel tracking + push-in at contact | Drill descends, rotates, engages, cuts | Hole mid-formation, drill paused in cut |
| **05 — Precision Cut / Hole Reveal** | Reveal the finished hole as the payoff | Tube sheet + retracting drill | Result / quality | 5s | Yes — Scene 04 end frame | Slow pull-back / crane | Drill retracts; camera settles on the hole | Clean finished hole, generous space around |
| **06 — Repeatability / Multiple Holes** | Prove consistency across the full pattern | Tube sheet, full hole grid | Repeatability / scale | 6s | Yes — Scene 05 end frame | Wide slow dolly-back / orbit | Camera pulls back to reveal the complete grid | Wide grid composition, clear top band |
| **07 — Final JIAN TOOLS Hero** | Close on the brand via a standalone hero shot | Drill + crown head, standalone | Brand hero | 6s | Yes — product reference + Scene 06 end frame | Slow orbit settling to a hero angle | Product presented alone, lit turn to rest pose | Static hero frame, large clear field for logo |

**Total: ~40 seconds of source footage across seven independently-loading files** — not one continuous video.

**Mobile:** Scenes 02, 03, 04, 05 and 07 are tightly framed on the product and center-crop safely from a single 16:9 generation. Scenes 01 and 06 are wide establishing/reveal shots where a center crop loses the sense of scale — generate a dedicated native 9:16 version for these two (same prompt, aspect ratio switched, camera direction adjusted from lateral to a vertical dolly).

---

## 6. Scene-by-Scene Storyboard

### Scene 01 — Tube Sheet / Application Intro

**PURPOSE:** Establish the application and the tube sheet's scale and precision before any tool appears.
**STORY:** We open in near-darkness. Light rakes across a large steel tube sheet, revealing rows of perfectly round tube holes — proof this is a precision-manufactured part, not an abstract plate. The camera finds one position in the grid that hasn't been drilled yet.
**CAMERA:** Slow lateral dolly, low raking angle, moving parallel to the plate.
**LIGHTING:** Single controlled rim light from one side, grazing the machined surface so each hole casts interior shadow. Near-black background.
**PRODUCT:** Tube sheet only.
**ACTION:** The dolly move is the entire action — nothing else moves.
**ENDING FRAME:** Settled on the single un-drilled position, centered, headroom above for text.
**TEXT OVERLAY:** `01 / APPLICATION — TUBE-SHEET DRILLING — Precision where every hole matters.`
**NEGATIVE SPACE:** Upper third of frame, plus a vertical column left-of-center.
**REFERENCE IMAGE:** No — first generation. *(If you have an actual tube-sheet photo or CAD reference, attach it and add: "match the hole diameter, spacing, plate thickness and surface finish exactly.")*
**MOBILE CONSIDERATION:** This is the widest shot in the sequence. Recommend a dedicated vertical (9:16) generation with a vertical dolly down the plate rather than across it — a center-crop of the landscape version would lose the sense of scale the grid provides.

**GEMINI PROMPT**

```
SCENE TITLE: JIAN TOOLS — Scene 01 — Tube-Sheet Application Intro

CONTEXT: Opening shot of a seven-part cinematic product sequence for a
precision cutting-tool brand (JIAN TOOLS). This scene establishes the
industrial application — tube-sheet drilling — before any tool is shown.
No drill, insert, or hand tool appears anywhere in this scene.

REFERENCE IMAGE INSTRUCTIONS: None required — this is the first generation
in the sequence. If a genuine JIAN TOOLS tube-sheet reference photo or CAD
render is available, attach it as the environment/background reference and
add: "Match the hole diameter, hole spacing, plate thickness, edge chamfer,
and surface finish of the attached reference exactly." Without a real
reference, use the material description below.

SUBJECT: A large, heavy industrial tube sheet — a thick, precision-machined
steel plate carrying a wide, regular grid of perfectly round tube holes
across most of its surface, with one clearly visible position within the
grid left un-drilled: a flat, un-holed gap in an otherwise complete
pattern. The plate reads as genuinely thick (visible depth at each hole's
edge) and heavy, with a machined, slightly matte — not mirror-polished —
metal surface.

PRODUCT CONSISTENCY: Not applicable to this scene — no drill or crown head
is present.

ENVIRONMENT: A minimal, near-black graphite studio space. No visible
walls, floor seams, machinery, human figures, or clutter — only the plate
and controlled light. Neutral, cool-neutral color temperature; no colored
gels, no futuristic glass or HUD backdrop.

CAMERA: Slow, steady lateral dolly, moving parallel to the plate's surface
at a low, slightly raking angle, drifting across the hole grid toward the
un-drilled position. Shallow depth of field: the two or three holes
nearest camera stay sharp while the grid softens into the background. No
handheld motion, no shake, no zoom, no whip pans, no fisheye distortion.

LIGHTING: A single controlled rim/raking light from one side grazes across
the machined surface so each hole casts a soft interior shadow and the
grid reads with real depth. Deep, soft shadows elsewhere. No blue or
orange color cast, no lens flares, no sparks, no visible light fixtures.

ACTION: The dolly move across the plate is the only action. The plate
itself is completely static.

PHYSICAL BEHAVIOR: Not applicable — no cutting or material interaction
occurs in this scene.

COMPOSITION: Keep the upper third of the frame, and a vertical band
left-of-center, free of strong highlights or busy geometry — this space is
reserved for website text added later. The hole grid occupies the lower
two-thirds and center of frame.

ENDING FRAME: The dolly settles and holds on the single un-drilled
position on the plate, centered horizontally, in sharp focus, everything
else softly defocused. This exact frame will be used as the reference
image for Scene 02 and Scene 04.

CONTINUITY: First scene in the sequence — no prior reference exists.

STRICT NEGATIVE INSTRUCTIONS: No drill, no cutting tool of any kind, no
human hands or figures, no on-screen text, logos, captions, subtitles, or
UI, no sparks, no coolant, no saturated or colored lighting, no handheld
camera shake, no fisheye distortion, no fast or jump cuts, no cyberpunk or
futuristic styling, no HUD graphics, no visible brand names.
```

---

### Scene 02 — Modular Drill Reveal

**PURPOSE:** Introduce the JIAN TOOLS modular drill alone, before it ever touches the workpiece.
**STORY:** Out of the darkness that closed Scene 01, the drill turns into light — shank, flutes, then the crown head.
**CAMERA:** Slow ~90–120° orbit around the drill's vertical axis, starting close and easing outward.
**LIGHTING:** Two-point rim light — cool on the shank, slightly warmer on the gold/copper crown head.
**PRODUCT:** Modular drill, full body, vertical, tip low in frame.
**ACTION:** Slow orbit reveal; the drill may rotate very slowly about its own axis, as if being examined — not spinning fast.
**ENDING FRAME:** Full body visible, vertical, crown head low, sharp focus, negative space right and above.
**TEXT OVERLAY:** `02 / TOOLING — MODULAR DRILL — Engineered for the cut ahead.`
**NEGATIVE SPACE:** Right third of frame, plus a footer band.
**REFERENCE IMAGE:** Yes — attach the approved JIAN TOOLS modular drill product reference image (subject/product reference). Optionally also attach Scene 01's final frame purely for lighting-mood continuity — the tube sheet itself must not appear here.
**MOBILE CONSIDERATION:** Vertical product orientation suits a portrait crop well — one landscape generation reframes safely; no dedicated vertical needed.

**GEMINI PROMPT**

```
SCENE TITLE: JIAN TOOLS — Scene 02 — Modular Drill Reveal

CONTEXT: Second shot of the sequence. The JIAN TOOLS modular drill is
introduced for the first time, alone, before it ever touches the tube
sheet. This is a pure product-reveal shot.

REFERENCE IMAGE INSTRUCTIONS: Attach the approved JIAN TOOLS modular drill
product reference image as the subject/product reference — this becomes
the canonical look for the drill in every later scene. If available, also
attach Scene 01's final frame as the environment/background reference,
purely to match studio lighting mood; the tube sheet itself must NOT
appear in this scene. Instruct: "Preserve the exact geometry, proportions,
material, flute pattern, connection interface, and crown-head design of
the subject reference image. Do not redesign or reinterpret the product."

SUBJECT: The JIAN TOOLS modular drill, full body, oriented vertically with
the crown-head tip toward the lower part of frame: a metallic silver/gray
precision-ground cylindrical shank, a visible shoulder/collar, helical
flutes running along the body, and a gold/copper-toned crown drill head
assembled at the tip. Use a mid-length body proportion (roughly a 4D–5D
visual ratio) unless the reference image specifies otherwise.

PRODUCT CONSISTENCY: This exact drill — geometry, proportions, flute
direction, crown-head shape, connection interface, shank finish — is the
reference every later scene must match. Nothing about it changes from this
point forward.

ENVIRONMENT: The same near-black graphite studio as Scene 01 — minimal, no
walls or clutter, neutral cool-neutral lighting. No tube sheet, no other
objects.

CAMERA: Slow rotate/orbit reveal, roughly 90–120° around the drill's
vertical axis, starting close on the shank and easing outward to show the
full body. Shallow depth of field. No handheld movement, no shake, no fast
rotation.

LIGHTING: Two-point cinematic rim lighting: one cool-neutral highlight
tracing the length of the cylindrical shank, one slightly warmer highlight
catching the gold/copper crown head at the tip. Deep shadow elsewhere;
product is the single brightest element in frame.

ACTION: The drill turns slowly into light out of near-darkness as the
camera orbits; the drill itself may rotate very slowly about its own long
axis, as if being examined, but should not spin fast or appear to be
"drilling" yet.

PHYSICAL BEHAVIOR: Not applicable — no material contact in this scene.

COMPOSITION: Keep the right third of the frame, plus a footer band, clear
of strong highlights for website text. The drill occupies the center-left
two-thirds, oriented vertically.

ENDING FRAME: Full body visible, vertical, crown head in the lower portion
of frame, sharp focus, ample negative space to the right and above. This
frame becomes the subject reference for Scene 03.

CONTINUITY: Follows the darkness/mood established at the end of Scene 01.
Its final frame is the subject/product reference for Scene 03, and —
together with the master product reference — for Scene 07.

STRICT NEGATIVE INSTRUCTIONS: No tube sheet, no other tools, no other
brands, no human hands or figures, no on-screen text, logos, captions, or
UI, no sparks, no coolant, no saturated or colored lighting, no handheld
shake, no fisheye, no fast cuts, no futuristic HUD styling.
```

---

### Scene 03 — Crown Drill Head Macro

**PURPOSE:** Focus on the cutting head specifically — the part that actually touches the material.
**STORY:** Continuing Scene 02's reveal, the camera pushes into extreme macro on the crown head, revealing insert facets and edges.
**CAMERA:** Macro push-in with a slow tilt/orbit around the tip, extremely shallow depth of field.
**LIGHTING:** Tight specular highlights along each cutting facet; warm gold/copper tones against the cool rim light on the shank behind it.
**PRODUCT:** Crown drill head, body softly defocused behind it.
**ACTION:** Slow macro orbit as light sweeps across each facet.
**ENDING FRAME:** Tip centered, razor-sharp focus on the leading edge, top third clear.
**TEXT OVERLAY:** `03 / CUTTING HEAD — CROWN GEOMETRY — Where the geometry meets the material.`
**NEGATIVE SPACE:** Top third of frame.
**REFERENCE IMAGE:** Yes — attach Scene 02's final frame as the subject/product reference.
**MOBILE CONSIDERATION:** Already a tight macro composition — reframes safely for vertical.

**GEMINI PROMPT**

```
SCENE TITLE: JIAN TOOLS — Scene 03 — Crown Drill Head Macro

CONTEXT: Third shot. The camera moves into extreme macro on the crown
drill head specifically — the part of the tool that actually contacts the
material — before any drilling begins.

REFERENCE IMAGE INSTRUCTIONS: Attach Scene 02's final frame as the
subject/product reference. Instruct: "Preserve the exact crown-head
geometry, insert facets, coating color, and edge condition shown in the
reference image. Do not alter or reinterpret the cutting geometry."

SUBJECT: Extreme macro of the crown drill head / tip: the gold/copper-
toned indexable carbide insert(s) with their faceted, crown-profile
cutting geometry, precision-ground edges, seated in the body's insert
pocket. A small portion of the shank remains visible, softly defocused
behind the tip.

PRODUCT CONSISTENCY: Must be the identical crown head established in Scene
02 — same facet count, same coating tone, same seating/pocket geometry. No
redesign.

ENVIRONMENT: The same near-black graphite studio. No tube sheet, no other
objects, no visible walls.

CAMERA: Macro push-in combined with a slow tilt/orbit around the tip,
extremely shallow depth of field so only the leading cutting edge is
razor-sharp. No handheld shake, no fast movement.

LIGHTING: Tight, controlled specular highlights tracing each cutting edge
and facet to communicate sharpness and precision grinding. The gold/copper
coating catches warm highlights against the same cool-neutral rim light
used on the body. Deep shadow everywhere else.

ACTION: The tip rotates slowly (or the camera orbits it slowly) so light
sweeps across each facet in turn, revealing the geometry without motion
blur.

PHYSICAL BEHAVIOR: Not applicable — no material contact yet.

COMPOSITION: Keep the top third of the frame clear of strong highlights
for website text. The tip sits centered in the lower two-thirds, in sharp
focus.

ENDING FRAME: Tip centered, razor-sharp focus on the leading cutting edge,
everything behind it softly defocused, top third clear. This frame becomes
the subject reference for Scene 04.

CONTINUITY: Continues directly from Scene 02's reveal, pushing from "whole
product" to "the part that matters." Its final frame carries the
crown-head reference into Scene 04.

STRICT NEGATIVE INSTRUCTIONS: No tube sheet, no material contact, no
sparks, no chips yet, no other tools, no human hands, no on-screen text,
logos, or UI, no saturated or colored lighting, no handheld shake, no
fisheye, no futuristic HUD styling.
```

---

### Scene 04 — Precision Drilling

**PURPOSE:** The core action — the drill engages the tube sheet and cuts, believably.
**STORY:** The drill, carrying the exact geometry from Scenes 02–03, descends onto the un-drilled position established in Scene 01.
**CAMERA:** Slow tracking parallel to the drill's descent, easing into a subtle push-in at contact.
**LIGHTING:** Consistent rim lighting; a small, realistic warm glow at the cutting interface only — no glow effects, no sparks.
**PRODUCT:** Drill + crown head + tube sheet together for the first time.
**ACTION:** Rotation → contact → engagement → small curling chips → progressive hole formation, tool axis stays aligned throughout.
**ENDING FRAME:** Drill paused mid-cut, hole visibly forming, tube sheet clearly recognizable.
**TEXT OVERLAY:** `04 / MACHINING — CONTROLLED REMOVAL — Material removed. Nothing left to chance.`
**NEGATIVE SPACE:** Right third of frame.
**REFERENCE IMAGE:** Yes — attach Scene 03's final frame as the subject/product reference (drill + crown head) and Scene 01's final frame as the environment/background reference (tube sheet + target position). If your tool only accepts one reference image, prioritize the drill/crown-head reference and describe the tube sheet in text using Scene 01's material language.
**MOBILE CONSIDERATION:** Keep the drill and forming hole within the center 60% of frame throughout the tracking move so a single landscape generation reframes safely for mobile.

**GEMINI PROMPT**

```
SCENE TITLE: JIAN TOOLS — Scene 04 — Precision Drilling

CONTEXT: Fourth shot — the core action of the sequence. The modular drill,
carrying the exact geometry established in Scenes 02–03, descends onto the
tube sheet's un-drilled position (established in Scene 01) and begins
cutting.

REFERENCE IMAGE INSTRUCTIONS: Attach Scene 03's final frame as the
subject/product reference (drill + crown head). Attach Scene 01's final
frame as the environment/background reference (the tube sheet and its
un-drilled target position). Instruct: "Preserve the exact drill and
crown-head geometry from the subject reference, and the exact tube-sheet
material, hole grid, and target position from the environment reference.
Do not alter either." If your generation tool only accepts a single
reference image, prioritize the drill/crown-head reference and describe
the tube sheet using the material language from Scene 01 in the prompt
text instead.

SUBJECT: The JIAN TOOLS modular drill and crown head descending onto the
industrial tube sheet, aligned perpendicular to the plate's surface,
directly over the un-drilled position in the hole grid.

PRODUCT CONSISTENCY: Drill and crown head must exactly match Scenes 02–03.
Tube sheet must exactly match Scene 01's material, hole grid, and target
position.

ENVIRONMENT: The same near-black graphite studio; the tube sheet is the
only surface in frame.

CAMERA: Slow tracking movement parallel to the drill's axis of descent,
easing into a subtle push-in at the moment of contact. Shallow depth of
field keeping the point of cut sharp. No handheld shake, no whip pans, no
fast cuts.

LIGHTING: Consistent rim lighting from the previous scenes; a small,
realistic warm glow may appear at the cutting interface to suggest
friction, without any glow, spark, or flame effect.

ACTION: The drill rotates continuously as it descends; the crown head
makes contact with the tube-sheet surface; the tool engages the material
and begins cutting; a small number of realistic metal chips curl away from
the cutting edge; the hole progressively forms; the tool remains perfectly
aligned with its axis throughout.

PHYSICAL BEHAVIOR: Rotation, gradual engagement, small curling metal
chips, progressive and physically plausible material removal. No sparks,
no explosions, no laser-like cutting, no melting, no material vanishing,
no visible tool deformation or wobble. No coolant system unless a client
reference confirms one.

COMPOSITION: Keep the right third of the frame clear of strong detail for
website text. Drill and forming hole stay within the center 60% of frame
so a mobile crop remains safe.

ENDING FRAME: The drill paused mid-cut, still engaged and rotating, the
hole visibly partway formed around it, tube sheet clearly recognizable,
side of frame clear.

CONTINUITY: Brings together the product established in Scenes 02–03 and
the application established in Scene 01. Its final frame is the reference
for Scene 05.

STRICT NEGATIVE INSTRUCTIONS: No sparks, no explosions, no laser cutting,
no melting metal, no material disappearing instantly, no unrealistic tool
bending, no coolant jets unless confirmed by client reference, no other
tools, no human hands, no on-screen text, logos, or UI, no handheld shake,
no fisheye, no futuristic HUD styling.
```

---

### Scene 05 — Precision Cut / Hole Reveal

**PURPOSE:** The payoff — reveal the finished, precise hole.
**STORY:** The drill retracts; the camera settles on the new hole, clean and indistinguishable from its neighbors.
**CAMERA:** Slow pull-back or gentle crane-up.
**LIGHTING:** Same rim-light language, slightly calmer/cleaner to signal resolution.
**PRODUCT:** Tube sheet with the finished hole + drill retracting out of frame.
**ACTION:** Retraction, then a settled reveal.
**ENDING FRAME:** Clean finished hole, sharp edges, generous space around it, drill mostly or fully out of frame.
**TEXT OVERLAY:** `05 / RESULT — PRECISION IN EVERY HOLE — Consistent, hole after hole.`
**NEGATIVE SPACE:** Bottom band and one side of frame.
**REFERENCE IMAGE:** Yes — attach Scene 04's final frame (both drill and tube-sheet state).
**MOBILE CONSIDERATION:** Tight, centered on a single hole — reframes safely for vertical.

**GEMINI PROMPT**

```
SCENE TITLE: JIAN TOOLS — Scene 05 — Precision Cut / Hole Reveal

CONTEXT: Fifth shot — the payoff of the drilling action. The drill
retracts and the camera settles on the newly finished hole, presented as
proof of precision.

REFERENCE IMAGE INSTRUCTIONS: Attach Scene 04's final frame as the
reference image (both drill and tube-sheet state). Instruct: "Continue
directly from this frame: preserve the exact drill and crown-head
geometry and the exact tube-sheet material and hole grid shown."

SUBJECT: The tube sheet with its newly finished hole — clean, crisp-edged,
indistinguishable in quality from the neighboring holes already in the
grid — and the modular drill retracting up and out of the cut.

PRODUCT CONSISTENCY: Drill, crown head, and tube sheet must exactly match
Scene 04's final frame.

ENVIRONMENT: The same near-black graphite studio; the tube sheet remains
the only surface.

CAMERA: Slow pull-back or gentle crane-up, easing from the point of
contact to a considered, settled composition of the finished hole. No
handheld shake, no fast movement.

LIGHTING: The same rim-light language as previous scenes, slightly calmer
and cleaner to signal resolution rather than active cutting.

ACTION: The drill retracts smoothly upward and out of frame (or to the
very top edge of frame, clearly disengaged); the camera settles and holds
on the finished hole.

PHYSICAL BEHAVIOR: No further cutting — this is a reveal, not an action
shot. No residual sparks, smoke, or debris.

COMPOSITION: Generous open negative space around the finished hole —
bottom band and one side clear for website text.

ENDING FRAME: A clean, considered shot of the finished hole with sharp,
precise edges, drill fully or almost fully out of frame, generous space
around it.

CONTINUITY: Follows directly from Scene 04's mid-cut moment. Its final
frame is the reference for Scene 06.

STRICT NEGATIVE INSTRUCTIONS: No sparks, no coolant, no debris scattered
across the plate, no other tools, no human hands, no on-screen text,
logos, or UI, no handheld shake, no fisheye, no futuristic HUD styling.
```

---

### Scene 06 — Repeatability / Multiple Holes

**PURPOSE:** Prove the precision is repeatable across the pattern.
**STORY:** Camera pulls back from the single new hole to reveal the tube sheet's complete grid — the new hole now indistinguishable from every other one.
**CAMERA:** Wide, slow dolly-back or gentle orbit.
**LIGHTING:** Same language as Scene 01, now revealing a complete pattern.
**PRODUCT:** Tube sheet with the full, finished hole grid; drill optionally small in frame near the newest hole.
**ACTION:** Camera opens the frame from one hole to the entire pattern.
**ENDING FRAME:** Wide, elegant composition of the full grid, clear top band.
**TEXT OVERLAY:** `06 / REPEATABILITY — BUILT TO PERFORM — Every hole, the same as the first.` *(Kept deliberately free of any specific count or number — see §2 on unsupported claims.)*
**NEGATIVE SPACE:** Top or bottom horizontal band across the wide shot.
**REFERENCE IMAGE:** Yes — attach Scene 05's final frame as the environment/background reference.
**MOBILE CONSIDERATION:** Second of the two wide "establishing" shots — recommend a dedicated vertical (9:16) generation for the same reason as Scene 01.

**GEMINI PROMPT**

```
SCENE TITLE: JIAN TOOLS — Scene 06 — Repeatability / Multiple Holes

CONTEXT: Sixth shot. The camera pulls back from the single finished hole
to reveal the tube sheet's complete grid — every hole, including the one
just cut, equally precise. This is a visual argument for repeatability,
not a claim about a specific test or count.

REFERENCE IMAGE INSTRUCTIONS: Attach Scene 05's final frame as the
environment/background reference. Instruct: "Preserve the exact tube-sheet
material and hole finish shown, now extended across the full grid pattern
established in Scene 01."

SUBJECT: The industrial tube sheet, now showing its complete, regular grid
of finished holes — the one just cut now visually indistinguishable from
its neighbors. The modular drill may appear small in frame, near the most
recently cut hole, as the camera pulls away from it.

PRODUCT CONSISTENCY: Tube-sheet material and hole finish must match Scene
05 exactly. If the drill is visible, it must match the geometry
established in Scenes 02–04.

ENVIRONMENT: The same near-black graphite studio; wide view of the full
plate.

CAMERA: Wide, slow dolly-back or gentle orbit that widens the field of
view, moving from the single hole to the full pattern. No handheld shake,
no fast movement, no whip pan.

LIGHTING: The same lighting language as Scene 01's establishing shot, now
revealing a complete hole pattern rather than a partial one.

ACTION: The camera pulls back and/or rises, opening the frame from one
hole to the entire grid.

PHYSICAL BEHAVIOR: Not applicable — no cutting in this scene.

COMPOSITION: Keep a horizontal band (top or bottom third) clear of busy
detail for website text. The hole grid should read as elegant and evenly
spaced, not cluttered.

ENDING FRAME: A wide, elegant composition of the full, evenly precise hole
grid, ample negative space in the reserved band.

CONTINUITY: Completes the tube-sheet narrative that opened in Scene 01.
Its final frame provides lighting/mood continuity for Scene 07.

STRICT NEGATIVE INSTRUCTIONS: No other tools, no human hands or figures,
no on-screen text, logos, or UI, no sparks, no coolant, no saturated or
colored lighting, no handheld shake, no fisheye, no futuristic HUD
styling.
```

---

### Scene 07 — Final JIAN TOOLS Hero

**PURPOSE:** Close on the brand with a standalone product hero shot.
**STORY:** The drill and crown head are presented alone, closing the film on "who makes it" after Scene 01 opened on "why it matters."
**CAMERA:** Slow orbit that decelerates and settles on a considered final angle.
**LIGHTING:** The most refined, highest-contrast rim lighting of the sequence.
**PRODUCT:** Drill + crown head, standalone — no tube sheet, no other objects.
**ACTION:** Orbit slows and settles; one final slow self-rotation to the best angle.
**ENDING FRAME:** Static hero frame, large clear field for logo and tagline.
**TEXT OVERLAY:** `JIAN TOOLS — PRECISION. PERFORMANCE.`
**NEGATIVE SPACE:** Lower third or one full side of frame.
**REFERENCE IMAGE:** Yes — attach the master JIAN TOOLS modular drill product reference image (or Scene 02's final frame if no separate master exists) as the subject/product reference; optionally Scene 06's final frame as environment/style reference for lighting continuity only.
**MOBILE CONSIDERATION:** Centered hero framing reframes safely for vertical.

**GEMINI PROMPT**

```
SCENE TITLE: JIAN TOOLS — Scene 07 — Final JIAN TOOLS Hero

CONTEXT: Closing shot of the sequence. The modular drill and crown head
are presented alone, as a standalone brand hero object, closing on the
product rather than the application.

REFERENCE IMAGE INSTRUCTIONS: Attach the master JIAN TOOLS modular drill
product reference image (or Scene 02's final frame if no separate master
reference exists) as the subject/product reference. If available, attach
Scene 06's final frame as the environment/style reference purely for
lighting/mood continuity — the tube sheet itself must not appear. Instruct:
"Preserve the exact geometry, proportions, material, and crown-head design
from the subject reference. This is the same product shown throughout the
sequence — do not reinterpret it."

SUBJECT: The JIAN TOOLS modular drill and crown head, alone, presented as
a hero product — no tube sheet, no other objects.

PRODUCT CONSISTENCY: Must be visually identical to the drill and crown
head established in Scenes 02–05 — this is the closing statement, and any
visible drift from the established geometry undermines the whole sequence.

ENVIRONMENT: The same near-black graphite studio, now with the most
refined, dramatic lighting treatment in the sequence — this is the closing
statement shot.

CAMERA: Slow orbit that gradually decelerates and comes to rest on a
considered final angle — a "hero turntable" stop rather than a continuous
loop.

LIGHTING: Crisp, high-contrast rim lighting fully modeling the product's
form — the brightest, most polished treatment of the sequence. The product
remains the single brightest element in frame.

ACTION: The orbit slows and settles; the product may complete one final,
slow self-rotation to present its most flattering angle before coming to
rest.

PHYSICAL BEHAVIOR: Not applicable.

COMPOSITION: Reserve a large, clean field — roughly the lower third or one
full side — for the JIAN TOOLS logo and tagline to be added later. Place
the product off-center per the rule of thirds rather than dead-center.

ENDING FRAME: A static or near-static hero frame, product sharply lit and
in focus, large clean negative space reserved for logo and tagline. This
is the final frame of the entire sequence.

CONTINUITY: Closes the sequence that began with Scene 01's application
shot — bookending "why this matters" (Scene 01) with "who makes it"
(Scene 07).

STRICT NEGATIVE INSTRUCTIONS: No tube sheet, no other tools, no other
brands, no human hands or figures, no on-screen text, logos, captions, or
UI generated by the model, no sparks, no coolant, no saturated or colored
lighting, no handheld shake, no fisheye, no futuristic HUD styling.
```

---

## 7. Quality Control Checklist

- ✅ Only the modular drill and crown drill head are used in the hero — no other tool appears in any prompt.
- ✅ Tube sheet is clearly identifiable — Scene 01 explicitly establishes a full grid of precision holes before anything else happens.
- ✅ No generic endmills or unrelated drills appear — explicitly excluded in §2, §3, and every scene's negative instructions.
- ⚠️ Product geometry remains consistent — enforced *procedurally* through the reference-image chain (§4). Actual fidelity depends on the model's real-world adherence — verify each clip against its reference before chaining it forward (see §4).
- ⚠️ Crown head remains consistent — same mechanism and same caveat as above.
- ✅ Drilling axis is physically correct — Scene 04 specifies perpendicular alignment and an axis-coaxial hole.
- ✅ Material removal looks believable — Scene 04's physical-behavior block specifies gradual, chip-based removal and explicitly bans sparks, explosions, and lasers.
- ✅ No unsupported manufacturing claims — no prompt or overlay line asserts a specific JIAN TOOLS process.
- ✅ No fake certifications — none appear anywhere.
- ✅ No fake measurements — the only length reference (4D–5D) is flagged as a creative recommendation pending confirmation, not a stated spec; Scene 06's copy was deliberately written to avoid a specific number.
- ✅ No generated typography — every prompt's negative-instructions block bans on-screen text, logos, and UI.
- ✅ Negative space exists for website text — specified per scene in the COMPOSITION / NEGATIVE SPACE fields.
- ✅ Each scene can function independently — every prompt is fully self-contained.
- ✅ Scene transitions can be crossfaded — consistent environment/lighting language plus the explicit end-frame → next-scene reference chain support this.
- ✅ Scenes are short enough for web delivery — 5–7 seconds each, ~40s total across seven files.
- ✅ Mobile cropping is considered — per-scene guidance given, with Scenes 01 and 06 flagged for a dedicated vertical generation.
- ✅ The visual language remains premium and cinematic — enforced by the shared camera/lighting/environment rules in §2.
- ✅ The entire hero tells one coherent story — via the un-drilled-position thread running from Scene 01 through Scene 06 (see §1).

---

**Suggested next step:** generate Scene 01 first — it needs no reference image and is the cheapest way to test the tube-sheet look before committing to the rest of the chain. Review it, then move to Scene 02 once you've attached (or substituted for) the real product reference image described in §3.
