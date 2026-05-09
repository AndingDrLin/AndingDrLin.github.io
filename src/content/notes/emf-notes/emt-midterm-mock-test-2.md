---
title: "EMT Midterm Mock Test 2（含参考答案）"
description: "电磁场与波期中模拟试卷（第二套），覆盖第2-5章：矢量分析、静电场、镜像法、恒定电流。附完整参考答案。"
date: 2026-05-09
tags: [electromagnetics, fields]
category: "课程学习"
docGroup: "emf-notes"
order: 7
draft: false
---

本卷参照期中模拟卷（Mock Test）的难度和题型编写，覆盖第 2–5 章，共 4 题，建议用时 90 分钟。简答题参考答案使用简短英语。

---

## Question 1 (25 marks) — Vector Analysis and Boundary Conditions

**(a) (5 marks)** Describe the concepts of flux and divergence of a vector field. State the mathematical definition of each and explain their physical relationship.

**(b) (5 marks)** Describe the concepts of circulation and curl of a vector field. State the mathematical definition of each and explain their physical relationship.

**(c) (5 marks)** Given the scalar field $\varphi = 2x^2y + y^3 - z^2$, find the gradient $\nabla\varphi$ at the point $P(1, 2, 3)$ in Cartesian coordinates.

**(d) (10 marks)** Two dielectric media meet at the XOZ plane ($y = 0$). Medium 1 ($y > 0$): $\varepsilon_1 = 3\varepsilon_0$; Medium 2 ($y < 0$): $\varepsilon_2 = 9\varepsilon_0$. There is no free charge on the interface. The electric field in Medium 1 is $\vec{E}_1 = \vec{e}_x \cdot 3 + \vec{e}_y \cdot 12 + \vec{e}_z \cdot 6$ (V/m). Find $\vec{E}_2$ in Medium 2.

---

## Question 2 (25 marks) — Electrostatic Field Fundamentals

**(a) (12 marks)** The electric potential in a region is $\varphi = 3x^2y - y^3 + 2z$ (SI units). Find:
1. The electric field $\vec{E}$ at the point $(1, 2, 3)$;
2. The volume charge density $\rho_v$ at the point $(1, 2, 3)$.

Use $\varepsilon_0 = 8.854 \times 10^{-12}$ F/m.

**(b) (8 marks)** Prove that for a linear, homogeneous, isotropic dielectric with permittivity $\varepsilon$, the polarization volume charge density is:

$$\rho_p = -\left(1 - \frac{\varepsilon_0}{\varepsilon}\right)\rho_f$$

where $\rho_f$ is the free volume charge density. State the key assumptions used in the proof.

**(c) (5 marks)** Given four electrostatic field line diagrams (labeled 1–4), identify the type of source near the centre for each:

1. Field lines radiate radially outward in all directions from a point, with equal spacing at equal distances.
2. Field lines form closed curves emerging from one point and returning to a nearby point, resembling a "figure-eight" pattern in the plane.
3. Field lines radiate outward uniformly in all radial directions from a central axis (cylindrical symmetry).
4. Field lines converge radially inward toward a point from all directions.

---

## Question 3 (25 marks) — Method of Images

**(a) (8 marks)** A point charge $q$ is placed at distance $d$ from the centre of a grounded conducting sphere of radius $a$ ($d > a$). Determine the image charge $q'$ and its position $b$. Using these results, derive the induced surface charge density $\sigma(\theta)$ on the sphere, where $\theta$ is the polar angle measured from the line connecting the sphere centre to $q$.

**(b) (8 marks)** Two semi-infinite grounded conducting planes meet at an angle of $60°$ ($\pi/3$) along the $z$-axis. A point charge $+q$ is placed at position $(x_0, y_0) = (\sqrt{3}, 1)$ in the $xy$-plane (inside the wedge). Determine the number of image charges required, and give the positions and magnitudes of all image charges.

**(c) (5 marks)** A grounded conducting plane ($z = 0$) has a conducting hemispherical boss of radius $a$ on it (hemisphere in $z > 0$, centred at the origin). A point charge $q$ is placed at $(0, 0, d)$ on the $z$-axis ($d > a$). Find all image charges needed to solve for the potential in the region $z > 0$, $r > a$.

**(d) (4 marks)** Describe one practical engineering application of the method of images. Explain how the technique is applied and what it simplifies.

---

## Question 4 (25 marks) — Steady Current in Lossy Dielectrics

A parallel-plate capacitor has two flat electrodes of area $S$ separated by distance $d$. The space between the electrodes is filled with two lossy dielectric layers, each of thickness $d/2$, stacked vertically (series configuration):

- **Layer 1** (top, $0 < y < d/2$): permittivity $\varepsilon_1$, conductivity $\sigma_1$
- **Layer 2** (bottom, $d/2 < y < d$): permittivity $\varepsilon_2$, conductivity $\sigma_2$

The top electrode ($y = 0$) is at potential $V_0$; the bottom electrode ($y = d$) is grounded ($\varphi = 0$). Assume steady-state DC conditions.

**(a) (6 marks)** State the boundary conditions at the dielectric–dielectric interface ($y = d/2$) and at the electrode–dielectric surfaces.

**(b) (8 marks)** Find the electric field $\vec{E}$ in each layer.

**(c) (5 marks)** Calculate the leakage resistance $R$ of this structure.

**(d) (6 marks)** Determine if there is free charge on the dielectric interface at $y = d/2$. If yes, calculate the surface charge density $\rho_s$.

---

---

# Reference Solutions

---

## Question 1 — Solutions

### (a) Flux and Divergence

**Flux** is the net flow of a vector field through a surface, defined as $\Phi = \oint_S \vec{F} \cdot d\vec{S}$. For a closed surface, positive net flux indicates a net source enclosed (more field lines exit than enter); negative net flux indicates a net sink.

**Divergence** is a scalar quantity at each point measuring the local outward flow per unit volume: $\text{div}\,\vec{F} = \nabla \cdot \vec{F}$. Positive divergence means the point acts as a source; negative means a sink; zero means the field is solenoidal (divergence-free).

The **divergence theorem** connects them:

$$\oint_S \vec{F} \cdot d\vec{S} = \int_V (\nabla \cdot \vec{F})\, dV$$

The total flux through any closed surface equals the volume integral of divergence inside. In electrostatics, $\nabla \cdot \vec{D} = \rho_f$ (Gauss's law) — electric flux originates from free charges.

### (b) Circulation and Curl

**Circulation** is the line integral of a vector field around a closed contour: $C = \oint_C \vec{F} \cdot d\vec{l}$. Nonzero circulation indicates the field has a rotational component along that path.

**Curl** is a vector quantity at each point measuring the local tendency to rotate: $\text{curl}\,\vec{F} = \nabla \times \vec{F}$. Its direction gives the axis of maximum rotation (right-hand rule), and its magnitude gives the maximum circulation per unit area.

**Stokes' theorem** connects them:

$$\oint_C \vec{F} \cdot d\vec{l} = \int_S (\nabla \times \vec{F}) \cdot d\vec{S}$$

The circulation around any closed contour equals the flux of the curl through any surface bounded by that contour. In electrostatics, $\nabla \times \vec{E} = 0$ (conservative field) — the circulation around any closed loop is zero, which is why we can define a scalar potential $\varphi$ via $\vec{E} = -\nabla\varphi$.

### (c) Gradient

The gradient in Cartesian coordinates:

$$\nabla\varphi = \vec{e}_x \frac{\partial\varphi}{\partial x} + \vec{e}_y \frac{\partial\varphi}{\partial y} + \vec{e}_z \frac{\partial\varphi}{\partial z}$$

Computing each partial derivative of $\varphi = 2x^2y + y^3 - z^2$:

$$\frac{\partial\varphi}{\partial x} = 4xy, \quad \frac{\partial\varphi}{\partial y} = 2x^2 + 3y^2, \quad \frac{\partial\varphi}{\partial z} = -2z$$

At $P(1, 2, 3)$:

$$\nabla\varphi\big|_P = \vec{e}_x(4 \cdot 1 \cdot 2) + \vec{e}_y(2 \cdot 1^2 + 3 \cdot 2^2) + \vec{e}_z(-2 \cdot 3)$$

$$\boxed{\nabla\varphi\big|_P = 8\vec{e}_x + 14\vec{e}_y - 6\vec{e}_z}$$

### (d) Boundary Conditions at Dielectric Interface

The interface is the plane $y = 0$, so the unit normal is $\vec{n} = \vec{e}_y$.

**Tangential components** ($x$ and $z$ directions): From $E_{1t} = E_{2t}$ (tangential $\vec{E}$ is continuous):

$$E_{2x} = E_{1x} = 3 \text{ V/m}, \quad E_{2z} = E_{1z} = 6 \text{ V/m}$$

**Normal component** ($y$ direction): With $\rho_s = 0$, $D_{1n} = D_{2n}$, i.e. $\varepsilon_1 E_{1y} = \varepsilon_2 E_{2y}$:

$$E_{2y} = \frac{\varepsilon_1}{\varepsilon_2} E_{1y} = \frac{3\varepsilon_0}{9\varepsilon_0} \cdot 12 = 4 \text{ V/m}$$

$$\boxed{\vec{E}_2 = 3\vec{e}_x + 4\vec{e}_y + 6\vec{e}_z \text{ (V/m)}}$$

**Discussion:** The normal component of $\vec{E}$ decreased (from 12 to 4 V/m) because $\vec{D}$ is continuous but $\varepsilon_2 > \varepsilon_1$. Going from a low-$\varepsilon$ to a high-$\varepsilon$ medium, the normal $\vec{E}$ component is reduced (the field "refracts" away from the normal).

---

## Question 2 — Solutions

### (a) Electric Field and Volume Charge Density

**Electric field** from $\vec{E} = -\nabla\varphi$:

$$E_x = -\frac{\partial\varphi}{\partial x} = -6xy$$

$$E_y = -\frac{\partial\varphi}{\partial y} = -(3x^2 - 3y^2) = -3x^2 + 3y^2$$

$$E_z = -\frac{\partial\varphi}{\partial z} = -2$$

At $(1, 2, 3)$:

$$\vec{E} = (-6 \cdot 1 \cdot 2)\vec{e}_x + (-3 \cdot 1 + 3 \cdot 4)\vec{e}_y + (-2)\vec{e}_z$$

$$\boxed{\vec{E} = -12\vec{e}_x + 9\vec{e}_y - 2\vec{e}_z \text{ (V/m)}}$$

**Volume charge density** from Poisson's equation $\nabla^2\varphi = -\rho_v/\varepsilon_0$:

$$\frac{\partial^2\varphi}{\partial x^2} = 6y, \quad \frac{\partial^2\varphi}{\partial y^2} = -6y, \quad \frac{\partial^2\varphi}{\partial z^2} = 0$$

$$\nabla^2\varphi = 6y + (-6y) + 0 = 0$$

The $y$-dependent terms cancel exactly: $\nabla^2\varphi = 0$ everywhere. The potential satisfies Laplace's equation, so the region is source-free. However, note that this only holds inside the charge-free region — charges must exist on the boundaries to maintain this potential distribution.

$$\boxed{\rho_v = 0 \text{ everywhere (charge-free region)}}$$

**Remark:** If the potential had been $\varphi = 3x^2y + y^3 + 2z$ (note the sign change on $y^3$), then $\nabla^2\varphi = 6y + 6y + 0 = 12y$, giving $\rho_v = -12y\varepsilon_0$, and at $(1,2,3)$: $\rho_v = -24\varepsilon_0 \approx -2.13 \times 10^{-10}$ C/m$^3$. Always check whether the Laplacian actually vanishes.

### (b) Proof: Polarization Volume Charge Density

In a linear, homogeneous, isotropic dielectric:

- Constitutive relation: $\vec{D} = \varepsilon\vec{E}$
- Polarization: $\vec{P} = \vec{D} - \varepsilon_0\vec{E} = (\varepsilon - \varepsilon_0)\vec{E}$

From Gauss's law: $\nabla \cdot \vec{D} = \rho_f$

The polarization charge density is: $\rho_p = -\nabla \cdot \vec{P}$

$$\rho_p = -\nabla \cdot [(\varepsilon - \varepsilon_0)\vec{E}] = -(\varepsilon - \varepsilon_0)\nabla \cdot \vec{E}$$

Here $\varepsilon$ is pulled out because the dielectric is **homogeneous** (spatially uniform), so it is not affected by the divergence operator.

Since $\nabla \cdot \vec{E} = \nabla \cdot (\vec{D}/\varepsilon) = \rho_f/\varepsilon$:

$$\rho_p = -(\varepsilon - \varepsilon_0)\frac{\rho_f}{\varepsilon}$$

$$\boxed{\rho_p = -\left(1 - \frac{\varepsilon_0}{\varepsilon}\right)\rho_f}$$

**Key assumptions:** (1) linear ($\vec{P}$ proportional to $\vec{E}$); (2) homogeneous ($\varepsilon$ independent of position); (3) isotropic ($\varepsilon$ is a scalar, not a tensor).

### (c) Field Line Identification

1. **Diverging radial lines from a point** → **Positive point charge (source).** Field lines originate from the charge and extend radially outward; field decays as $1/r^2$.

2. **Closed curved lines emerging from one point and returning to a nearby point** → **Electric dipole.** Field lines start at the positive charge and end at the negative charge; far-field decays as $1/r^3$.

3. **Radially outward lines from a central axis, uniform along the axis** → **Infinite line of charge.** Cylindrical symmetry; field decays as $1/\rho$ (cylindrical coordinate).

4. **Converging radial lines toward a point from all directions** → **Negative point charge (sink).** Field lines come from infinity and terminate on the charge; field decays as $1/r^2$.

**Identification criteria:** Symmetry (spherical/cylindrical/axial), direction (outward = positive source, inward = negative sink), and density decay rate ($1/r^2$, $1/r$, or $1/r^3$) reveal the source type.

---

## Question 3 — Solutions

### (a) Point Charge + Grounded Conducting Sphere

**Image charge:** To make the sphere surface an equipotential ($\varphi = 0$), place a single image charge inside the sphere:

$$\boxed{q' = -\frac{a}{d}q, \quad b = \frac{a^2}{d}}$$

The image $q'$ is on the line from the centre to $q$, at distance $b$ from the centre ($b < a$ since $d > a$).

**Derivation of surface charge density:** At a point on the sphere with polar angle $\theta$, the distances to $q$ (at distance $d$) and $q'$ (at distance $b$) are:

$$R_1 = \sqrt{a^2 + d^2 - 2ad\cos\theta}, \quad R_2 = \sqrt{a^2 + b^2 - 2ab\cos\theta}$$

Substituting $b = a^2/d$:

$$R_2 = \sqrt{a^2 + \frac{a^4}{d^2} - \frac{2a^3}{d}\cos\theta} = \frac{a}{d}\sqrt{d^2 + a^2 - 2ad\cos\theta} = \frac{a}{d}R_1$$

The surface charge density is $\sigma = -\varepsilon_0 \dfrac{\partial\varphi}{\partial r}\bigg|_{r=a}$. For two point charges, the radial derivative at $r = a$ gives:

$$\sigma(\theta) = \frac{q}{4\pi}\left[\frac{a - d\cos\theta}{R_1^3}\right] + \frac{q'}{4\pi}\left[\frac{a - b\cos\theta}{R_2^3}\right]$$

Substituting $q' = -aq/d$ and $R_2 = (a/d)R_1$:

$$\frac{q'}{R_2^3} = \frac{-aq/d}{(a/d)^3 R_1^3} = \frac{-qd^2}{a^2 R_1^3}$$

$$\sigma(\theta) = \frac{q}{4\pi R_1^3}\left[(a - d\cos\theta) - \frac{d^2}{a^2}\left(a - \frac{a^2}{d}\cos\theta)\right)\right]$$

$$= \frac{q}{4\pi R_1^3}\left[(a - d\cos\theta) - \frac{d^2}{a} + d\cos\theta\right]$$

$$= \frac{q}{4\pi R_1^3}\left[a - \frac{d^2}{a}\right] = \frac{q(a^2 - d^2)}{4\pi a R_1^3}$$

$$\boxed{\sigma(\theta) = -\frac{q(d^2 - a^2)}{4\pi a(a^2 + d^2 - 2ad\cos\theta)^{3/2}}}$$

The induced charge is negative (opposite sign to $q$), as expected. The total induced charge equals $q' = -aq/d$.

### (b) Two Semi-Infinite Grounded Conducting Planes at $\pi/3$

**Number of image charges:** The general rule for two planes meeting at angle $\alpha = \pi/n$ ($n$ integer) requires $2n - 1$ image charges.

For $\alpha = 60° = \pi/3$: $n = 3$, so we need $\boxed{5}$ image charges.

**Setup:** The charge $q_0$ at $(\sqrt{3}, 1)$ has polar coordinates $(r, \phi) = (2, 30°)$.

- Plane 1: $\phi = 0°$ (positive $x$-axis, $y = 0$, $x > 0$)
- Plane 2: $\phi = 60°$ ($y = x\tan 60° = x\sqrt{3}$)

All 6 charges (original + 5 images) lie on a circle of radius 2, arranged as a regular hexagon with alternating signs:

| Charge | Polar coords | Cartesian coords | Magnitude | How obtained |
|--------|-------------|-------------------|-----------|--------------|
| $q_0$ (original) | $(2, 30°)$ | $(\sqrt{3},\, 1)$ | $+q$ | Original charge |
| $q_1$ | $(2, -30°)$ | $(\sqrt{3},\, -1)$ | $-q$ | Reflection of $q_0$ across Plane 1 |
| $q_2$ | $(2, 90°)$ | $(0,\, 2)$ | $-q$ | Reflection of $q_0$ across Plane 2 |
| $q_3$ | $(2, 150°)$ | $(-\sqrt{3},\, 1)$ | $+q$ | Reflection of $q_1$ across Plane 2 |
| $q_4$ | $(2, -90°)$ | $(0,\, -2)$ | $+q$ | Reflection of $q_2$ across Plane 1 |
| $q_5$ | $(2, 210°)$ | $(-\sqrt{3},\, -1)$ | $-q$ | Cross-reflection (same point reached from either plane) |

**Sign pattern:** Alternating $+q, -q$ around the hexagon.

**Verification:** On Plane 1 ($y = 0$): every charge at $(r, \phi)$ with magnitude $Q$ has a mirror at $(r, -\phi)$ with magnitude $-Q$; these cancel on the plane. On Plane 2 ($\phi = 60°$): every charge at $(r, 60° + \delta)$ has a mirror at $(r, 60° - \delta)$ with magnitude $-Q$; these also cancel. Both boundary conditions ($\varphi = 0$) are satisfied simultaneously.

### (c) Hemisphere on Grounded Plane

Two boundary conditions must be satisfied simultaneously:

1. **Plane** ($z = 0$): $\varphi = 0$
2. **Hemisphere** ($r = a$, $z > 0$): $\varphi = 0$

Three image charges are needed:

| Image | Charge | Position | Purpose |
|-------|--------|----------|---------|
| $q_1$ | $-q$ | $(0,\, 0,\, -d)$ | Image of $q$ w.r.t. plane $z = 0$ |
| $q_2$ | $-\dfrac{a}{d}q$ | $(0,\, 0,\, a^2/d)$ | Image of $q$ w.r.t. sphere $r = a$ |
| $q_3$ | $+\dfrac{a}{d}q$ | $(0,\, 0,\, -a^2/d)$ | Image of $q_2$ w.r.t. plane $z = 0$ |

**Verification:**

- *Plane condition* ($z = 0$): $(q, q_1)$ are a mirror pair with equal and opposite charges; $(q_2, q_3)$ likewise. Each pair creates zero potential on the plane. Check.
- *Hemisphere condition* ($r = a$): $(q, q_2)$ form a standard grounded sphere image pair — their combined potential is zero on $r = a$. $(q_1, q_3)$: since $q_1 = -q$ at distance $d$ and $q_3 = +(a/d)q$ at distance $a^2/d$, we have $q_3 = -(a/d)q_1$ at distance $a^2/d$ — also a valid sphere image pair for $q_1$. Check.

**Valid region:** $z > 0$ and $r > a$ (outside the hemisphere, above the plane).

### (d) Practical Application

**Overhead power transmission line capacitance calculation.**

An overhead transmission line (conductor at height $h$ above ground) forms a capacitor with the earth. The earth, being a reasonably good conductor, can be approximated as a grounded infinite conducting plane. By the method of images, the effect of the earth is replaced by an imaginary conductor carrying line charge density $-\rho_l$ at depth $h$ below the surface.

This transforms the problem into calculating the capacitance between two parallel line charges separated by distance $2h$, which has the analytical solution:

$$C_{\text{unit length}} = \frac{\pi\varepsilon_0}{\ln(2h/a)}$$

where $a$ is the conductor radius. Without the method of images, one would need to solve Laplace's equation with the irregular boundary of the ground surface — far more complex.

**Other applications:** (1) EMC/shielding analysis — modeling ground plane effects on electromagnetic interference; (2) IC interconnect parasitic capacitance — computing wire-to-substrate capacitance; (3) Lightning protection — estimating field enhancement near a lightning rod above ground.

---

## Question 4 — Solutions

### (a) Boundary Conditions

**At the dielectric–dielectric interface ($y = d/2$):**

The interface normal is $\vec{n} = \vec{e}_y$ (pointing from Layer 2 toward Layer 1).

1. **Normal $\vec{J}$ continuous:** From $\nabla \cdot \vec{J} = 0$ in steady state (pillbox across the interface):

$$J_{1y} = J_{2y} \quad \Longrightarrow \quad \sigma_1 E_1 = \sigma_2 E_2$$

2. **Tangential $\vec{E}$ continuous:** From $\nabla \times \vec{E} = 0$ (rectangular contour across the interface):

$$E_{1t} = E_{2t}$$

For this parallel-plate geometry, $\vec{E}$ is purely in the $y$-direction, so there are no tangential components — this condition is automatically satisfied.

3. **Normal $\vec{D}$ discontinuity:** $D_{1y} - D_{2y} = \rho_s$ (free surface charge exists at the interface):

$$\varepsilon_1 E_1 - \varepsilon_2 E_2 = \rho_s$$

**At the electrode surfaces:**

- Top electrode ($y = 0$, $\varphi = V_0$): surface charge $\rho_s(0) = \varepsilon_1 E_1$
- Bottom electrode ($y = d$, $\varphi = 0$): surface charge $\rho_s(d) = \varepsilon_2 E_2$

### (b) Electric Field in Each Layer

Let $E_1$ and $E_2$ denote the magnitudes of $\vec{E}$ in Layers 1 and 2 (both pointing in the $-\vec{e}_y$ direction, from high to low potential).

**From $\vec{J}$ continuity:**

$$\sigma_1 E_1 = \sigma_2 E_2 \quad \Rightarrow \quad E_2 = \frac{\sigma_1}{\sigma_2} E_1 \tag{1}$$

**From the voltage constraint:**

$$E_1 \cdot \frac{d}{2} + E_2 \cdot \frac{d}{2} = V_0 \tag{2}$$

Substituting (1) into (2):

$$E_1 \cdot \frac{d}{2}\left(1 + \frac{\sigma_1}{\sigma_2}\right) = V_0$$

$$\boxed{E_1 = \frac{2V_0}{d} \cdot \frac{\sigma_2}{\sigma_1 + \sigma_2}, \quad E_2 = \frac{2V_0}{d} \cdot \frac{\sigma_1}{\sigma_1 + \sigma_2}}$$

In vector form: $\vec{E}_1 = -E_1\vec{e}_y$ and $\vec{E}_2 = -E_2\vec{e}_y$.

**Discussion:** The field is stronger in the layer with lower conductivity (higher resistivity). This is analogous to resistive voltage division: the higher-resistance layer drops more voltage per unit thickness.

### (c) Leakage Resistance

The current density in steady state:

$$J = \sigma_1 E_1 = \frac{2V_0}{d} \cdot \frac{\sigma_1\sigma_2}{\sigma_1 + \sigma_2}$$

Total leakage current: $I = J \cdot S$

$$R = \frac{V_0}{I} = \frac{d}{2S} \cdot \frac{\sigma_1 + \sigma_2}{\sigma_1\sigma_2} = \frac{d}{2S}\left(\frac{1}{\sigma_1} + \frac{1}{\sigma_2}\right)$$

$$\boxed{R = \frac{d}{2S\sigma_1} + \frac{d}{2S\sigma_2}}$$

This is the series combination of two resistors: $R_1 = (d/2)/(\sigma_1 S)$ and $R_2 = (d/2)/(\sigma_2 S)$, as expected for a series geometry.

### (d) Free Surface Charge Density at the Interface

From the normal $\vec{D}$ boundary condition:

$$\rho_s = D_{1y} - D_{2y} = \varepsilon_1 E_1 - \varepsilon_2 E_2$$

Substituting the electric fields from part (b):

$$\rho_s = \varepsilon_1 \cdot \frac{2V_0}{d} \cdot \frac{\sigma_2}{\sigma_1 + \sigma_2} - \varepsilon_2 \cdot \frac{2V_0}{d} \cdot \frac{\sigma_1}{\sigma_1 + \sigma_2}$$

$$\boxed{\rho_s = \frac{2V_0}{d(\sigma_1 + \sigma_2)}\left(\varepsilon_1\sigma_2 - \varepsilon_2\sigma_1\right)}$$

**Discussion:**

- $\rho_s = 0$ when $\varepsilon_1/\sigma_1 = \varepsilon_2/\sigma_2$ (both materials have the same relaxation time $\tau = \varepsilon/\sigma$).
- $\rho_s > 0$ when $\varepsilon_1/\sigma_1 > \varepsilon_2/\sigma_2$ (Layer 1 has a longer relaxation time).
- Physically, even in DC steady state, free charge accumulates at the dielectric interface because the different $\varepsilon/\sigma$ ratios cause unequal charge flux into the interface region. This is a key distinction from the purely electrostatic (no conduction) case, where interface charge is zero when there is no externally applied surface charge.

---

---

# Appendix: Reference Formulas

## Coordinate Systems

| | Cartesian $(x, y, z)$ | Cylindrical $(\rho, \phi, z)$ | Spherical $(r, \theta, \phi)$ |
|---|---|---|---|
| $\nabla f$ | $\vec{e}_x\dfrac{\partial f}{\partial x} + \vec{e}_y\dfrac{\partial f}{\partial y} + \vec{e}_z\dfrac{\partial f}{\partial z}$ | $\vec{e}_\rho\dfrac{\partial f}{\partial \rho} + \vec{e}_\phi\dfrac{1}{\rho}\dfrac{\partial f}{\partial \phi} + \vec{e}_z\dfrac{\partial f}{\partial z}$ | $\vec{e}_r\dfrac{\partial f}{\partial r} + \vec{e}_\theta\dfrac{1}{r}\dfrac{\partial f}{\partial \theta} + \vec{e}_\phi\dfrac{1}{r\sin\theta}\dfrac{\partial f}{\partial \phi}$ |

## Divergence

$$\nabla \cdot \vec{A} = \frac{\partial A_x}{\partial x} + \frac{\partial A_y}{\partial y} + \frac{\partial A_z}{\partial z}$$

$$\nabla \cdot \vec{A} = \frac{1}{\rho}\frac{\partial(\rho A_\rho)}{\partial \rho} + \frac{1}{\rho}\frac{\partial A_\phi}{\partial \phi} + \frac{\partial A_z}{\partial z}$$

$$\nabla \cdot \vec{A} = \frac{1}{r^2}\frac{\partial(r^2 A_r)}{\partial r} + \frac{1}{r\sin\theta}\frac{\partial(\sin\theta\, A_\theta)}{\partial \theta} + \frac{1}{r\sin\theta}\frac{\partial A_\phi}{\partial \phi}$$

## Curl

$$\nabla \times \vec{A} = \begin{vmatrix} \vec{e}_x & \vec{e}_y & \vec{e}_z \\ \dfrac{\partial}{\partial x} & \dfrac{\partial}{\partial y} & \dfrac{\partial}{\partial z} \\ A_x & A_y & A_z \end{vmatrix}$$

$$\nabla \times \vec{A} = \frac{1}{\rho}\begin{vmatrix} \vec{e}_\rho & \rho\vec{e}_\phi & \vec{e}_z \\ \dfrac{\partial}{\partial \rho} & \dfrac{\partial}{\partial \phi} & \dfrac{\partial}{\partial z} \\ A_\rho & \rho A_\phi & A_z \end{vmatrix}$$

$$\nabla \times \vec{A} = \frac{1}{r^2\sin\theta}\begin{vmatrix} \vec{e}_r & r\vec{e}_\theta & r\sin\theta\,\vec{e}_\phi \\ \dfrac{\partial}{\partial r} & \dfrac{\partial}{\partial \theta} & \dfrac{\partial}{\partial \phi} \\ A_r & rA_\theta & r\sin\theta\, A_\phi \end{vmatrix}$$

## Laplacian

$$\nabla^2 f = \frac{\partial^2 f}{\partial x^2} + \frac{\partial^2 f}{\partial y^2} + \frac{\partial^2 f}{\partial z^2}$$

$$\nabla^2 f = \frac{1}{\rho}\frac{\partial}{\partial \rho}\left(\rho\frac{\partial f}{\partial \rho}\right) + \frac{1}{\rho^2}\frac{\partial^2 f}{\partial \phi^2} + \frac{\partial^2 f}{\partial z^2}$$

$$\nabla^2 f = \frac{1}{r^2}\frac{\partial}{\partial r}\left(r^2\frac{\partial f}{\partial r}\right) + \frac{1}{r^2\sin\theta}\frac{\partial}{\partial \theta}\left(\sin\theta\frac{\partial f}{\partial \theta}\right) + \frac{1}{r^2\sin^2\theta}\frac{\partial^2 f}{\partial \phi^2}$$
