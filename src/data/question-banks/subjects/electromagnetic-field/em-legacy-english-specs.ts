import type { Difficulty, LegacyQuestion } from "../../../../components/quiz/types";
import { rotate } from "../../../../components/quiz/utils/questionUtils";

interface EnglishSpec {
  title: string;
  correct: string;
  traps: string[];
  applicationQuestion: string;
  applicationCorrect: string;
  applicationTraps: string[];
  scopeCorrect: string;
  scopeTraps: string[];
}

const specs: EnglishSpec[] = [
  {
    title: "flux and divergence",
    correct: "Flux is a surface integral through a surface, while divergence is the local net outflow per unit volume.",
    traps: ["Zero divergence means the vector field itself must be zero.", "Flux is defined only for closed surfaces.", "Divergence describes only the rotational strength of field lines."],
    applicationQuestion: "If field lines spread outward near a point, what should be inferred first?",
    applicationCorrect: "There is a positive divergence source near that point.",
    applicationTraps: ["There is a negative divergence source.", "There must be a vortex source.", "The field strength must be zero."],
    scopeCorrect: "The divergence theorem relates the flux through a closed surface to the volume integral of divergence.",
    scopeTraps: ["The divergence theorem applies to any non-closed curve.", "The divergence theorem needs no smoothness condition in the region.", "The divergence theorem directly gives the circulation around a closed curve."]
  },
  {
    title: "circulation and curl",
    correct: "Circulation is a line integral around a closed curve, while curl is the maximum circulation density per unit area.",
    traps: ["Curl describes the net outflow per unit volume.", "Circulation can be used only for electric fields.", "The direction of curl is unrelated to the right-hand rule."],
    applicationQuestion: "If field lines locally circulate around a point, what is the most suitable conclusion?",
    applicationCorrect: "The curl near that point may be nonzero.",
    applicationTraps: ["There must be a positive divergence source.", "There must be a negative divergence source.", "The potential at that point must be zero."],
    scopeCorrect: "Stokes' theorem relates circulation around a closed curve to the flux of curl through a spanning surface.",
    scopeTraps: ["Stokes' theorem requires the surface itself to be closed.", "Stokes' theorem says divergence equals circulation.", "Stokes' theorem applies only to scalar fields."]
  },
  {
    title: "irrotational electrostatic field",
    correct: "An electrostatic field satisfies curl E = 0, so it can be written as E = -grad phi.",
    traps: ["Irrotational electrostatic field means div D must also be zero.", "Electrostatic field lines may form closed loops.", "An irrotational field cannot have charge sources."],
    applicationQuestion: "What is the key reason that potential can be introduced from the condition integral E dot dl = 0?",
    applicationCorrect: "The electrostatic field is conservative because its closed-loop integral is zero.",
    applicationTraps: ["A conductor surface must have no charge.", "Polarization cannot exist in dielectrics.", "The electric field is zero everywhere."],
    scopeCorrect: "E = -grad phi holds in electrostatics; a time-varying electromagnetic field is generally not curl-free.",
    scopeTraps: ["Every electric field can always be fully described by a scalar potential only.", "Any moving charge distribution is still electrostatic.", "A time-varying magnetic field does not affect curl E."]
  },
  {
    title: "Helmholtz theorem",
    correct: "In a finite region, a vector field is determined by its divergence, its curl, and boundary conditions.",
    traps: ["Knowing only the divergence uniquely determines any vector field.", "Knowing only the curl uniquely determines any vector field.", "Boundary conditions are irrelevant for uniqueness."],
    applicationQuestion: "Why must electrostatic field equations be used together with boundary conditions?",
    applicationCorrect: "Divergence and curl information must be combined with boundary data to determine the field uniquely.",
    applicationTraps: ["Boundary conditions can replace all source distributions.", "curl E = 0 already contains all boundary information.", "The reference potential cannot be chosen arbitrarily."],
    scopeCorrect: "In electrostatics, curl E = 0 allows E to be represented by a scalar potential, but the solution still depends on boundary conditions.",
    scopeTraps: ["Helmholtz theorem means every irrotational field is source-free.", "Helmholtz theorem applies only to dielectrics.", "Helmholtz theorem forbids vector-field decomposition."]
  },
  {
    title: "far field of an electric dipole",
    correct: "In the far field, the dipole potential decays as 1/r^2 and the electric field decays as 1/r^3.",
    traps: ["The far-field dipole electric field decays as 1/r^2.", "If the potential is zero on the equatorial plane, the electric field there must also be zero.", "The dipole moment points from positive charge to negative charge."],
    applicationQuestion: "When judging the angular dependence of a far-field dipole, what does theta usually denote?",
    applicationCorrect: "The angle between the observation direction and the dipole moment p.",
    applicationTraps: ["The angle between the observation direction and the velocity of the negative charge.", "The angle between a conductor normal and current density.", "The angle of potential difference across an interface."],
    scopeCorrect: "The far-field approximation requires r to be much larger than the dipole separation.",
    scopeTraps: ["The far-field formula can be used directly in the near region between the charges.", "The dipole formula does not require the direction of p.", "The far-field approximation removes the dipole effect completely."]
  },
  {
    title: "electric field inside a conductor in electrostatic equilibrium",
    correct: "In electrostatic equilibrium, E inside a conductor is zero; otherwise free charges would keep moving.",
    traps: ["E inside a conductor is zero because there are no free charges inside.", "The potential inside a conductor must be zero.", "The surface free-charge density of a conductor must be zero."],
    applicationQuestion: "What is the key internal field condition for judging electrostatic equilibrium of a conductor?",
    applicationCorrect: "The electric field inside the conductor is zero.",
    applicationTraps: ["The external electric field is zero.", "All surface charge is zero.", "The conductor potential reference must be zero."],
    scopeCorrect: "This conclusion applies to an ideal conductor in electrostatic equilibrium.",
    scopeTraps: ["Any current-carrying conductor must have zero internal electric field.", "A dielectric must also have E = 0 in electrostatic equilibrium.", "E = 0 inside the conductor means no field can exist outside it."]
  },
  {
    title: "equipotential conductor",
    correct: "A conductor in electrostatic equilibrium is an equipotential body, and the external electric field is normal to its surface.",
    traps: ["Equipotential means the conductor potential must be zero.", "A tangential electric field can persist on a conductor surface.", "The external electric field must be tangential to the conductor surface."],
    applicationQuestion: "If a tangential electric field exists on a conductor surface, what does it directly imply?",
    applicationCorrect: "Free charges would still move along the surface, so electrostatic equilibrium has not been reached.",
    applicationTraps: ["There is no normal electric field on the surface.", "Polarization charge must exist inside the conductor.", "The conductor capacitance must be zero."],
    scopeCorrect: "The equipotential conductor surface is an important boundary condition in electrostatic boundary-value problems.",
    scopeTraps: ["The electric field must be zero everywhere on an equipotential surface.", "The equipotential surface result applies only to spherical conductors.", "Equipotential behavior is unrelated to free-charge motion."]
  },
  {
    title: "definition of capacitance",
    correct: "Capacitance C = Q/U depends only on geometry and medium, not on the applied charge or voltage in a linear system.",
    traps: ["Capacitance increases whenever the applied voltage increases.", "The Q in capacitance must include the total polarization charge.", "An isolated conductor has no capacitance concept."],
    applicationQuestion: "For an isolated conductor, which point is usually taken as the zero-potential reference?",
    applicationCorrect: "Infinity.",
    applicationTraps: ["The center of the sphere.", "Any fixed point outside the sphere with no freedom of choice.", "A dielectric interface."],
    scopeCorrect: "For an isolated conducting sphere of radius a in a uniform medium with permittivity epsilon, C = 4 pi epsilon a.",
    scopeTraps: ["The capacitance of an isolated sphere is independent of radius.", "The isolated-sphere capacitance is meaningful only in vacuum.", "The isolated-sphere capacitance is defined by total polarization charge."]
  },
  {
    title: "dielectric polarization",
    correct: "Dielectric polarization is the small relative displacement or orientation rearrangement of bound positive and negative charges.",
    traps: ["Dielectric polarization is macroscopic motion of free electrons.", "After polarization, molecular total charge is no longer conserved.", "In a linear dielectric, P must be opposite to E."],
    applicationQuestion: "Which macroscopic field describes the strength of dielectric polarization?",
    applicationCorrect: "The polarization vector P.",
    applicationTraps: ["The current density J.", "The magnetic flux density B.", "The conductor surface free charge sigma_f."],
    scopeCorrect: "P = chi_e epsilon_0 E applies only to a linear isotropic dielectric.",
    scopeTraps: ["P = chi_e epsilon_0 E is a universal definition for every medium.", "In an anisotropic dielectric, P must be parallel to E.", "The polarization vector can be defined only in conductors."]
  },
  {
    title: "free charge and polarization charge",
    correct: "Free charge appears in div D = rho_f, while polarization charge is determined by the divergence or normal component of P.",
    traps: ["Polarization charge should be added directly to the right side of div D.", "Free charge and polarization charge have the same physical origin.", "Polarization surface charge is independent of the normal direction."],
    applicationQuestion: "If P is given, which relation should be used to find bound volume charge?",
    applicationCorrect: "rho_p = -div P.",
    applicationTraps: ["rho_p = div D.", "rho_p = sigma_c E.", "rho_p = Q/U."],
    scopeCorrect: "rho_p = -div P and rho_ps = P dot n are general criteria for polarization charge.",
    scopeTraps: ["rho_p = -(epsilon_r - 1)rho_f/epsilon_r holds in every medium.", "Polarization surface charge appears only on conductor surfaces.", "Free charge can never exist inside a dielectric."]
  },
  {
    title: "relationship among D, E, and P",
    correct: "D = epsilon_0 E + P is a general definition, and D is an auxiliary field that incorporates polarization effects.",
    traps: ["D = epsilon E is the universal definition in every medium.", "D is more fundamental than E because it depends only on free charge.", "P has no relation to bound charge."],
    applicationQuestion: "What is the main purpose of introducing D?",
    applicationCorrect: "To absorb bound-charge effects into the left side so that Gauss' law contains only free charge on the right side.",
    applicationTraps: ["To eliminate all electric fields in a dielectric.", "To make D parallel to E in every medium.", "To turn polarization charge into free charge."],
    scopeCorrect: "In an anisotropic linear medium, D = epsilon tensor times E and D need not be parallel to E.",
    scopeTraps: ["In an anisotropic medium, D must still equal scalar epsilon times E and be parallel to E.", "D cannot be defined in nonlinear media.", "P = D - epsilon_0 E holds only in vacuum."]
  },
  {
    title: "Poisson equation",
    correct: "In a uniform linear medium, electrostatic potential satisfies nabla squared phi = -rho_f/epsilon.",
    traps: ["Poisson equation applies only to source-free regions.", "rho_f can be freely replaced by polarization charge density.", "Even in a nonuniform medium, epsilon can always be pulled outside the divergence."],
    applicationQuestion: "In deriving the electrostatic potential equation, which step allows E to be written as -grad phi?",
    applicationCorrect: "The electrostatic field is irrotational.",
    applicationTraps: ["Current density is continuous.", "The medium conductivity is zero.", "The conductor surface charge is zero."],
    scopeCorrect: "nabla squared phi = -rho_f/epsilon applies only when epsilon is a constant scalar in a uniform linear isotropic medium.",
    scopeTraps: ["This equation applies to any spatially varying epsilon.", "This equation gives a unique solution without boundary conditions.", "The right side must be total charge density."]
  },
  {
    title: "Laplace equation",
    correct: "In a source-free region, electrostatic potential satisfies nabla squared phi = 0, but source-free does not mean field-free.",
    traps: ["nabla squared phi = 0 means phi is zero everywhere.", "The electric field must be zero in a source-free region.", "Laplace equation describes regions containing free volume charge."],
    applicationQuestion: "Separation of variables is commonly used for which kind of electrostatic problem?",
    applicationCorrect: "Laplace or Poisson equations in regular regions with separable boundary conditions.",
    applicationTraps: ["Any nonlinear equation without boundary conditions.", "Only the algebraic condition E = 0 inside a conductor.", "A random guessed solution that does not need uniqueness."],
    scopeCorrect: "A solution of Laplace equation still needs boundary conditions to be determined.",
    scopeTraps: ["Laplace equation is unique even without boundary conditions.", "If nabla squared phi = 0, then phi must be constant.", "Laplace equation cannot have nonzero normal-derivative boundary data."]
  },
  {
    title: "potential boundary conditions at a dielectric interface",
    correct: "At a charge-free interface between two dielectrics, potential is continuous and normal D is continuous.",
    traps: ["Potential can jump arbitrarily at the interface.", "When there is no free surface charge, normal E must be continuous.", "Tangential D must be continuous."],
    applicationQuestion: "At an interface with no free surface charge, which normal component is continuous?",
    applicationCorrect: "The normal component of electric flux density D.",
    applicationTraps: ["The normal component of electric field E.", "The tangential component of electric flux density D.", "The normal current density J in a lossless electrostatic dielectric."],
    scopeCorrect: "If free surface charge exists, the boundary condition becomes D_2n - D_1n = sigma_f.",
    scopeTraps: ["With free surface charge, D_n is still necessarily continuous.", "Interface conditions are independent of the chosen normal direction.", "A dielectric interface can only use the conductor equipotential condition."]
  },
  {
    title: "boundary-condition models",
    correct: "Normal boundary conditions are often derived from a thin Gaussian pillbox, while tangential conditions are derived from a small loop.",
    traps: ["Normal conditions come from a small loop and tangential conditions from a pillbox.", "Boundary-condition derivations do not require the limit of vanishing thickness.", "Pillbox and loop models can be used only for magnetic fields."],
    applicationQuestion: "What integration path should be used to derive continuity of tangential E?",
    applicationCorrect: "A narrow rectangular loop crossing the interface.",
    applicationTraps: ["A closed Gaussian surface entirely on one side.", "A spherical surface around the entire conductor.", "An infinitely long line along current flow."],
    scopeCorrect: "The continuous quantity depends on the governing equation; in electrostatics it is usually E_t and D_n.",
    scopeTraps: ["All field components are continuous at every boundary.", "At any interface, both E_n and E_t must be continuous.", "Normal boundary conditions are unrelated to source terms."]
  },
  {
    title: "three types of boundary-value problems",
    correct: "Dirichlet specifies potential, Neumann specifies normal derivative, and mixed conditions specify a linear combination.",
    traps: ["Dirichlet specifies the normal derivative of potential.", "Neumann specifies the boundary potential value.", "Mixed boundary conditions cannot be used in electrostatics."],
    applicationQuestion: "The condition phi = 0 on a grounded conductor is which type of boundary condition?",
    applicationCorrect: "Dirichlet boundary condition.",
    applicationTraps: ["Neumann boundary condition.", "Mixed boundary condition.", "Continuity equation."],
    scopeCorrect: "With all-Neumann boundary data, the potential is usually determined only up to an additive constant.",
    scopeTraps: ["All-Neumann data automatically fix the absolute zero of potential.", "Dirichlet data do not affect uniqueness.", "Boundary-value problems apply only inside conductors."]
  },
  {
    title: "uniqueness theorem",
    correct: "Once the equation in a region and suitable boundary conditions are given, the electrostatic potential is unique.",
    traps: ["Any guessed function must be the solution of the original problem.", "The uniqueness theorem does not apply to Laplace equation.", "Different boundary conditions can still be judged as the same solution by uniqueness."],
    applicationQuestion: "Why can the method of images replace a conductor boundary with virtual charges?",
    applicationCorrect: "Because the constructed solution satisfies the same equation and boundary conditions in the solution region.",
    applicationTraps: ["Because image charges are real free charges.", "Because the field inside the conductor can be directly represented by image charges.", "Because the original charge no longer needs to be considered."],
    scopeCorrect: "For a Neumann problem, uniqueness usually allows an arbitrary additive constant.",
    scopeTraps: ["A Neumann problem always fixes the absolute potential uniquely.", "Uniqueness allows image charges to be placed inside the solution region.", "Uniqueness depends only on sources and not on boundaries."]
  },
  {
    title: "volume polarization charge in a uniform linear dielectric",
    correct: "In a uniform linear dielectric, rho_p = -(epsilon_r - 1)rho_f/epsilon_r, so polarization charge has the opposite sign to free volume charge.",
    traps: ["This proportional relation applies to any nonuniform dielectric.", "If epsilon_r > 1, rho_p has the same sign as rho_f.", "Whenever a dielectric exists, rho_p inside it must be nonzero."],
    applicationQuestion: "If no free volume charge is specified inside a uniform linear dielectric, how should volume polarization charge be judged?",
    applicationCorrect: "It is zero in the volume, although surface or interface polarization charge may still exist.",
    applicationTraps: ["It must be very large.", "The surface polarization charge must also be zero.", "rho_p must be placed on the right side of div D."],
    scopeCorrect: "rho_p = -(epsilon_r - 1)rho_f/epsilon_r holds only inside a uniform linear isotropic dielectric.",
    scopeTraps: ["This formula can replace all calculations using rho_p = -div P.", "This formula applies to polarization inside an ideal conductor.", "This formula shows that total polarization charge is not conserved."]
  },
  {
    title: "conservation of total polarization charge",
    correct: "For an isolated dielectric body, total volume polarization charge plus total surface polarization charge is zero.",
    traps: ["Polarization creates net charge from nothing.", "Polarization surface charge is not included in total polarization charge.", "Total polarization charge is zero only for spherical dielectrics."],
    applicationQuestion: "If the calculated volume polarization charge of a dielectric sphere is nonzero, what should usually be checked next?",
    applicationCorrect: "Whether the surface polarization charge has been omitted.",
    applicationTraps: ["Whether capacitance has been redefined as U/Q.", "Whether E inside a conductor has been forced to be nonzero.", "Whether electrostatics has been replaced by a time-varying magnetic field."],
    scopeCorrect: "Conservation of total polarization charge reflects internal rearrangement of bound charges.",
    scopeTraps: ["It means rho_p is zero everywhere.", "Polarization surface charge is real free charge.", "Polarization-charge conservation applies only in vacuum."]
  },
  {
    title: "charge types in conductors and dielectrics",
    correct: "In electrostatic equilibrium, free charge on an ideal conductor resides on the surface, while a dielectric may have polarization charge on surfaces or interfaces.",
    traps: ["An ideal conductor contains a large amount of polarization charge inside.", "A uniform dielectric with no free volume charge must have volume polarization charge.", "Image charge is a real free charge."],
    applicationQuestion: "When a problem asks for the total induced charge on a grounded conducting plane, what does it refer to?",
    applicationCorrect: "The total real free charge on the conductor surface.",
    applicationTraps: ["The virtual image charge itself outside the solution region.", "The bound charge on a dielectric surface.", "The polarization vector in a capacitor."],
    scopeCorrect: "A conductor-dielectric interface may involve conductor-side sigma_f and dielectric-side rho_ps simultaneously.",
    scopeTraps: ["Only one type of charge can appear at a conductor-dielectric interface.", "Induced charge on a dielectric must be free charge.", "Induced charge inside a conductor is nonzero in electrostatic equilibrium."]
  },
  {
    title: "capacitance-conductance duality",
    correct: "For the same geometry and a uniform medium, electrostatic and steady-current problems have the duality D <-> J, epsilon <-> sigma_c, and C <-> G.",
    traps: ["The capacitance-conductance duality does not require the same geometry.", "In the duality, epsilon corresponds to resistance R.", "A leaky dielectric changes the definition of geometrical capacitance."],
    applicationQuestion: "If the capacitance C of a geometry is known, how can the resistance R be obtained for the same uniform lossy medium?",
    applicationCorrect: "R = epsilon/(sigma_c C).",
    applicationTraps: ["R = sigma_c C/epsilon.", "R = C/epsilon.", "R has no relation to C."],
    scopeCorrect: "In a single uniform layer, RC = epsilon/sigma_c is independent of geometrical size.",
    scopeTraps: ["Any multilayer medium has local RC = epsilon/sigma_c everywhere.", "Once conductivity exists, capacitance disappears.", "The C <-> G duality applies to arbitrary transient processes."]
  },
  {
    title: "basic equations of a steady current field",
    correct: "A steady current field satisfies div J = 0, curl E = 0, and J = sigma_c E.",
    traps: ["In steady state, div J must equal rho_f.", "In a steady current field, E must have curl.", "The differential form of Ohm's law is D = sigma_c E."],
    applicationQuestion: "Why can scalar potential still be used in a steady-current problem?",
    applicationCorrect: "Because curl E = 0 and E = -grad phi.",
    applicationTraps: ["Because div D must be zero.", "Because current density must be zero.", "Because the medium must be vacuum."],
    scopeCorrect: "In a uniform lossy medium, div(sigma_c grad phi) = 0 reduces to nabla squared phi = 0.",
    scopeTraps: ["If sigma_c varies in space, nabla squared phi = 0 can still be used directly.", "A steady current field does not need the continuity equation.", "A steady current field can exist only on conductor surfaces."]
  },
  {
    title: "interface conditions for a steady current field",
    correct: "At a steady lossy-medium interface, normal J is continuous and tangential E is continuous.",
    traps: ["At a steady interface, normal D must be continuous.", "At a steady interface, tangential J must be continuous.", "At a steady interface, normal E must be continuous."],
    applicationQuestion: "If normal current density J_n is known at a steady conducting interface, what determines the free surface charge there?",
    applicationCorrect: "The difference between epsilon/sigma_c on the two sides.",
    applicationTraps: ["Only the permeability on the two sides.", "Only the chosen zero of potential.", "It is unrelated to J_n."],
    scopeCorrect: "If epsilon/sigma_c is the same on both sides, the steady interfacial free surface charge can be zero.",
    scopeTraps: ["Whenever steady current exists, the interfacial free surface charge must be zero.", "Steady-current interface conditions are identical to electrostatic dielectric-interface conditions.", "Continuity of E_t implies continuity of J_t."]
  },
  {
    title: "continuity equation",
    correct: "The local form of charge conservation is div J = -partial rho/partial t; in steady state it becomes div J = 0.",
    traps: ["The continuity equation is curl J = 0.", "In steady state, current density J must be zero.", "div J = 0 means no current flows locally."],
    applicationQuestion: "If div J is positive in a small volume, how does the local free charge density change?",
    applicationCorrect: "It decreases with time.",
    applicationTraps: ["It increases with time.", "It stays unchanged and J must be zero.", "It becomes polarization charge."],
    scopeCorrect: "The continuity equation expresses charge conservation and is the basis of conduction and relaxation analysis.",
    scopeTraps: ["The continuity equation applies only to stationary charges.", "The continuity equation can be replaced directly by the definition of capacitance.", "Steady state may violate charge conservation."]
  },
  {
    title: "conduction current and convection current",
    correct: "Conduction current is field-driven drift of free charges, while convection current is caused by bulk motion of charged matter.",
    traps: ["The constitutive relation for conduction current is J = rho v.", "Convection current must satisfy J = sigma_c E.", "The Joule-loss formula applies to all convection currents."],
    applicationQuestion: "An electron beam or charged particle stream is more typically which type of current?",
    applicationCorrect: "Convection current.",
    applicationTraps: ["Dielectric polarization current.", "Electrostatic induced charge.", "Capacitive displacement current."],
    scopeCorrect: "In this course range, J in steady-current-field problems usually means conduction current.",
    scopeTraps: ["Every problem involving J must use J = rho v.", "Electron drift in a conductor is not conduction current.", "The integral form of Ohm's law is independent of geometry and conductivity."]
  },
  {
    title: "Joule loss",
    correct: "For conduction current, the Joule-loss volume density can be written as p_v = J dot E = sigma_c E^2 = J^2/sigma_c.",
    traps: ["Joule-loss density must equal E/D.", "For fixed E, larger sigma_c gives smaller loss.", "The Joule-loss formula is mainly for convection current."],
    applicationQuestion: "If J and sigma_c are known for conduction current, which expression is convenient for volume loss?",
    applicationCorrect: "p_v = J^2/sigma_c.",
    applicationTraps: ["p_v = rho_v/epsilon.", "p_v = C/U.", "p_v = curl E."],
    scopeCorrect: "The Joule-loss formula applies to conduction current in an Ohmic medium.",
    scopeTraps: ["It can be directly applied to every electron beam in vacuum.", "Joule loss is unrelated to field direction and is always zero.", "Conduction current has no energy dissipation."]
  },
  {
    title: "idea of the method of images",
    correct: "The method of images places virtual charges outside the solution region so that the original boundary conditions are satisfied.",
    traps: ["Image charges must be placed inside the solution region.", "Image charges are real free charges inside the conductor.", "The method of images does not need to satisfy the original boundary conditions."],
    applicationQuestion: "For a point charge near a grounded conducting plane, what boundary is the image construction mainly designed to satisfy?",
    applicationCorrect: "phi = 0 on the conducting plane.",
    applicationTraps: ["rho_p is nonzero inside the conductor.", "J_t is continuous at the interface.", "Current density is maximum at infinity."],
    scopeCorrect: "The method of images is suited to simple geometries such as infinite planes, spheres, and pi/n wedges.",
    scopeTraps: ["Any irregular conductor can be solved directly by one image charge.", "The method of images gives a nonzero field inside the conductor.", "The method of images does not rely on uniqueness."]
  },
  {
    title: "image charge and induced charge",
    correct: "An image charge is a virtual tool; the induced charge on a conductor surface is the real free charge.",
    traps: ["The image charge is the real charge at every point of the conductor surface.", "The total induced charge cannot be obtained by integrating surface charge density.", "Image charges change the Poisson sources inside the solution region."],
    applicationQuestion: "To find induced surface charge density on a grounded plane, what is usually found first?",
    applicationCorrect: "The potential in the solution region constructed from the real charge and the image charge, then its normal derivative.",
    applicationTraps: ["Place the image charge uniformly over the plane.", "Let the potential inside the conductor decay as 1/r.", "Put polarization charge into the right side of div D = rho_f."],
    scopeCorrect: "The image-method potential is equivalent to the original problem only in the original solution region.",
    scopeTraps: ["The method of images describes the real charge distribution inside the conductor material.", "Image charges can be counted as newly added real charges in the solution region.", "Induced charge is not constrained by boundary conditions."]
  },
  {
    title: "grounded and isolated conductors",
    correct: "A grounded conductor has fixed potential, while an isolated conductor also requires a total-charge constraint.",
    traps: ["A grounded conductor and an isolated neutral conductor have exactly the same boundary conditions.", "An isolated conductor does not require total charge to be considered.", "A grounded conductor cannot exchange charge with the earth."],
    applicationQuestion: "Compared with a grounded conducting sphere, what extra condition is usually needed for an isolated neutral conducting sphere?",
    applicationCorrect: "The constraint that the total charge of the conductor is zero.",
    applicationTraps: ["The electric field inside the conductor must have curl.", "The polarization vector P must be continuous.", "Normal current density J_n must be discontinuous."],
    scopeCorrect: "The image construction must satisfy both the boundary-potential condition and the charge constraint stated in the problem.",
    scopeTraps: ["If the shape is the same, grounded and isolated problems must have the same answer.", "The potential of an isolated conductor must be zero.", "A grounded problem must keep the conductor total charge unchanged."]
  },
  {
    title: "charge relaxation",
    correct: "In a uniform lossy medium, free volume charge decays as rho_v(t) = rho_v(0) exp(-t/tau), with tau = epsilon/sigma_c.",
    traps: ["Larger sigma_c gives a longer relaxation time.", "tau = sigma_c/epsilon.", "Relaxation is unrelated to the continuity equation."],
    applicationQuestion: "Why is free volume charge hard to maintain for a long time in a good conductor?",
    applicationCorrect: "Because the relaxation time tau is very small.",
    applicationTraps: ["Because the permittivity must be zero.", "Because the electric-field curl must be large.", "Because capacitance cannot exist."],
    scopeCorrect: "tau = epsilon/sigma_c applies to volume free-charge relaxation in a uniform linear lossy medium.",
    scopeTraps: ["The formula applies to any strongly nonlinear medium without sigma_c.", "Relaxation time is determined only by conductor shape.", "If sigma_c = 0, free charge disappears instantly."]
  },
  {
    title: "average-power factor",
    correct: "The factor 1/2 in sinusoidal steady-state average power comes from time averaging cos^2 or from the peak-value phasor convention.",
    traps: ["The factor 1/2 appears because only half the charge remains.", "The factor 1/2 means only half of the spatial region is counted.", "The 1/2 factor is unrelated to sinusoidal time averaging."],
    applicationQuestion: "If RMS phasors are used to compute average power, how is the explicit 1/2 factor usually handled?",
    applicationCorrect: "It is usually not written again.",
    applicationTraps: ["It must be multiplied twice more.", "The permittivity must also be divided by 2.", "The electric field must be set to zero."],
    scopeCorrect: "Whether 1/2 appears depends on whether peak-value phasors or RMS phasors are used.",
    scopeTraps: ["Every power formula must contain 1/2.", "No power formula can ever contain 1/2.", "The 1/2 factor is only related to grounding a conductor."]
  },
  {
    title: "analogy between electrostatic and steady current fields",
    correct: "Both fields may satisfy Laplace-type potential equations in uniform media, but their source quantities and boundary-continuity quantities differ.",
    traps: ["Electrostatic and steady-current fields have exactly the same boundary conditions.", "A steady-current field cannot use potential.", "D in electrostatics corresponds exactly to E in steady current."],
    applicationQuestion: "What is the key difference between normal interface conditions in electrostatics and steady conduction?",
    applicationCorrect: "Electrostatics often uses D_n, while steady conduction often uses J_n.",
    applicationTraps: ["Electrostatics uses J_n and steady conduction uses D_n.", "Both only use the normal magnetic field.", "Neither has a normal condition."],
    scopeCorrect: "The analogy requires the same geometry, linear uniform media, and corresponding boundary conditions.",
    scopeTraps: ["The analogy allows spatial variation of material parameters to be ignored.", "The analogy means capacitance and resistance are the same physical quantity.", "The analogy does not require electrode voltage."]
  },
  {
    title: "nonuniform dielectric medium",
    correct: "In a nonuniform dielectric, use div(epsilon grad phi) = -rho_f and do not pull epsilon out as a constant.",
    traps: ["Any linear medium allows nabla squared phi = -rho_f/epsilon.", "A nonuniform dielectric cannot have volume polarization charge.", "Spatial variation of epsilon does not affect the potential equation."],
    applicationQuestion: "If epsilon varies in space, what is the safest formula for judging volume polarization charge?",
    applicationCorrect: "rho_p = -div P.",
    applicationTraps: ["rho_p is always zero.", "rho_p = Q/U.", "rho_p = curl E."],
    scopeCorrect: "Simplified proportional relations from uniform media cannot be extended unconditionally to nonuniform media.",
    scopeTraps: ["All uniform-medium conclusions can be copied to nonuniform media.", "Nonuniformity affects conductors but not dielectrics.", "D = epsilon_0 E + P fails when epsilon varies."]
  },
  {
    title: "anisotropic dielectric",
    correct: "In an anisotropic linear dielectric, epsilon is a tensor and D need not be parallel to E.",
    traps: ["In an anisotropic dielectric, D must be parallel to E.", "P cannot be defined in an anisotropic dielectric.", "D = epsilon_0 E + P fails in anisotropic media."],
    applicationQuestion: "If a problem states that the dielectric is anisotropic, what should be noted in the constitutive relation?",
    applicationCorrect: "Permittivity should be treated as a tensor, and D should not be assumed parallel to E.",
    applicationTraps: ["Set P directly to zero.", "Set E directly to zero.", "Use conductivity sigma_c as the only material parameter."],
    scopeCorrect: "The scalar form D = epsilon E applies only to a linear isotropic dielectric.",
    scopeTraps: ["The scalar epsilon form applies to every linear medium.", "Anisotropy necessarily makes the electrostatic field rotational.", "An anisotropic dielectric has no boundary conditions."]
  },
  {
    title: "source of D in Gauss' law",
    correct: "The source in div D = rho_f is free charge, not polarization charge already included through P.",
    traps: ["The right side of div D should be free charge plus polarization charge.", "The flux of D equals total real charge divided by epsilon_0.", "D is meaningful only in vacuum."],
    applicationQuestion: "When free charge on capacitor plates is given, what is often the first step for finding the field in the dielectric?",
    applicationCorrect: "Use Gauss' law for D to find D, then use E = D/epsilon.",
    applicationTraps: ["Add polarization charge as free charge first.", "Set D = 0 first.", "Use J = rho v to find the electrostatic field."],
    scopeCorrect: "Gauss' law for D is the key equation for handling free charge in dielectric electrostatics.",
    scopeTraps: ["Gauss' law for D applies only to conductor surfaces.", "Gauss' law for D means E is not a physical field.", "The flux of D is always zero."]
  },
  {
    title: "zero potential versus constant potential",
    correct: "A conductor in electrostatic equilibrium has constant potential, but that constant need not be zero.",
    traps: ["An equipotential body must have zero potential.", "Grounded and ungrounded conductors have exactly the same potential boundary condition.", "The potential reference cannot be chosen."],
    applicationQuestion: "If a problem only says an isolated conductor is in electrostatic equilibrium, can its potential be set to zero directly?",
    applicationCorrect: "No, unless grounding or a compatible reference condition is specified.",
    applicationTraps: ["Yes, because all conductors have zero potential.", "Yes, because capacitance is zero.", "No potential can be defined."],
    scopeCorrect: "phi = 0 on a grounded conductor is a specific Dirichlet condition.",
    scopeTraps: ["Every equipotential boundary is a grounded boundary.", "phi = constant and phi = 0 have no distinction.", "Adding a constant potential changes the electric field distribution."]
  },
  {
    title: "surface free charge and normal field",
    correct: "The surface free charge on a conductor is determined by the jump of the normal component of D outside the surface.",
    traps: ["Conductor surface sigma_f is determined by the jump of tangential E.", "Conductor surface free charge must be zero.", "The choice of normal direction never affects the sign expression for sigma_f."],
    applicationQuestion: "When finding conductor surface charge density from potential, what derivative is usually needed?",
    applicationCorrect: "The normal derivative of potential in the external medium.",
    applicationTraps: ["Any tangential derivative inside the conductor.", "The curl of current density.", "The time derivative of polarization vector."],
    scopeCorrect: "On a conductor surface, tangential E is zero, while normal E may be nonzero and correspond to sigma_f.",
    scopeTraps: ["All components of E must be zero on the surface for sigma_f to exist.", "sigma_f is uniquely determined by the tangential component of P.", "Conductor surface boundary conditions are unrelated to electrostatic equilibrium."]
  },
  {
    title: "meaning of a source-free region",
    correct: "A source-free region has no free volume charge inside; it does not mean that the boundary cannot impose a nonzero potential.",
    traps: ["A source-free region is a region with no electric field.", "Potential cannot vary in a source-free region.", "Boundary conditions do not matter in a source-free region."],
    applicationQuestion: "Between two parallel plates with no free volume charge but with a voltage applied, why can the field be nonzero?",
    applicationCorrect: "The boundary potential difference determines a nontrivial solution of Laplace equation.",
    applicationTraps: ["A source-free region automatically creates free volume charge.", "curl E must be nonzero.", "The permittivity must be infinite."],
    scopeCorrect: "Source-free regions are commonly solved by Laplace equation together with boundary conditions.",
    scopeTraps: ["Separation of variables cannot be used in source-free regions.", "The solution in a source-free region must be uniquely zero.", "Source-free regions are unrelated to grounded-conductor conditions."]
  },
  {
    title: "scope of formulas",
    correct: "Before using a simplified formula, check whether the medium is linear, uniform, and isotropic.",
    traps: ["All formulas can be applied directly in any medium.", "Whenever epsilon appears, it must be a constant scalar.", "Using a formula outside its scope usually does not affect the result."],
    applicationQuestion: "When seeing D = epsilon E, what should be confirmed first?",
    applicationCorrect: "Whether the medium can be treated as linear isotropic, and whether epsilon is spatially constant.",
    applicationTraps: ["Whether the conductor is necessarily grounded.", "Whether potential must be zero.", "Whether the image charge is real."],
    scopeCorrect: "D = epsilon_0 E + P, div D = rho_f, and rho_p = -div P are more fundamental general relations.",
    scopeTraps: ["rho_p = -(epsilon_r - 1)rho_f/epsilon_r is more general than rho_p = -div P.", "nabla squared phi = -rho_f/epsilon is more general than div(epsilon grad phi) = -rho_f.", "P = chi_e epsilon_0 E is more general than P = D - epsilon_0 E."]
  },
  {
    title: "polarization surface charge at a dielectric interface",
    correct: "Polarization surface charge at a dielectric interface can be judged from the difference of the normal components of P on the two sides.",
    traps: ["If there is no free surface charge at a dielectric interface, polarization surface charge can never exist.", "Polarization surface charge is determined only by tangential P.", "Only conductor free charge can appear at an interface between two dielectrics."],
    applicationQuestion: "If two dielectrics have different permittivities and a normal D crosses the interface, what confusing situation may occur?",
    applicationCorrect: "Free surface charge may be zero, but polarization surface charge need not be zero.",
    applicationTraps: ["Tangential E must jump.", "Normal D must jump because there is no free charge.", "P must be exactly the same on both sides."],
    scopeCorrect: "The sign of interface polarization charge depends on the chosen normal direction and on how the difference of P is defined.",
    scopeTraps: ["The sign is independent of the normal direction.", "If D_n is continuous, the normal component of P must also be continuous.", "rho_ps must be placed in div D = rho_f."]
  },
  {
    title: "leaky dielectric and geometrical capacitance",
    correct: "A leaky dielectric introduces conductance and leakage current, but geometrical capacitance is still determined by geometry and permittivity.",
    traps: ["If leakage current exists, capacitance immediately becomes invalid and C = 0.", "Leakage current changes permittivity into conductivity.", "Conductance and capacitance cannot be compared in the same geometry."],
    applicationQuestion: "For the same parallel-plate structure filled with a lossy medium, what quantity describes leakage ability?",
    applicationCorrect: "Conductance G or resistance R.",
    applicationTraps: ["Total polarization volume charge.", "Image charge magnitude.", "The zero of potential."],
    scopeCorrect: "In a single uniform lossy dielectric, C, G, R, and tau = RC can be discussed together.",
    scopeTraps: ["An electric field cannot be discussed in a lossy dielectric.", "Leakage conductance is unrelated to sigma_c.", "Geometrical capacitance is determined only by leakage current."]
  },
  {
    title: "boundary understanding in separation of variables",
    correct: "The key in separation of variables is to satisfy both the differential equation and the boundary conditions.",
    traps: ["Any function satisfying Laplace equation must be the answer to the specified boundary problem.", "Boundary conditions can be changed arbitrarily after solving.", "The uniqueness theorem is unrelated to separation of variables."],
    applicationQuestion: "After separation of variables produces undetermined coefficients, what usually determines them?",
    applicationCorrect: "Boundary conditions.",
    applicationTraps: ["The arbitrary choice of potential zero alone.", "Whether the medium has Joule heat automatically.", "The total image charge automatically."],
    scopeCorrect: "Separation of variables usually requires the coordinate system and boundary shape to be compatible.",
    scopeTraps: ["Any complicated boundary can be solved directly by one-dimensional separation.", "Separation of variables does not need boundary-continuity checks.", "Separation of variables applies only inside conductors."]
  },
  {
    title: "physical fundamentality of electric field intensity",
    correct: "E is defined by the force on a unit positive test charge, so it is more physically fundamental than D.",
    traps: ["D is the fundamental force field and the test charge force is qD.", "E is related only to free charge and not to bound charge.", "After D is introduced, E can be ignored completely."],
    applicationQuestion: "If a problem asks for the force on a test charge, which field should be used?",
    applicationCorrect: "Electric field intensity E.",
    applicationTraps: ["Electric flux density D.", "Polarization vector P.", "Conductivity sigma_c."],
    scopeCorrect: "D simplifies Gauss' law for free charge but does not replace the force meaning of E.",
    scopeTraps: ["Introducing D means bound charge does not exist.", "E has no meaning in a dielectric.", "P is the direct field acting on a test charge."]
  },
  {
    title: "basic postulates of electrostatics",
    correct: "The basic electrostatic equations can be summarized as div D = rho_f and curl E = 0.",
    traps: ["The basic electrostatic equations are div J = 0 and J = sigma_c E.", "Electrostatics must satisfy curl E = -partial B/partial t.", "In electrostatics, div D must be zero."],
    applicationQuestion: "Electrostatic field is often called a sourceful but irrotational field. What mainly represents the source?",
    applicationCorrect: "The free charge rho_f in div D = rho_f.",
    applicationTraps: ["The vortex source in curl E = 0.", "The reference point of potential.", "Whether the conductor is grounded."],
    scopeCorrect: "An electrostatic field is produced by stationary, time-independent charges and does not vary with time.",
    scopeTraps: ["Any charge distribution is electrostatic even if it varies with time.", "Electrostatic fields cannot have potential difference.", "Electrostatic fields cannot have conductor surface charge."]
  },
  {
    title: "potential continuity and tangential electric field",
    correct: "Potential continuity at an electrostatic interface usually follows from continuity of tangential E.",
    traps: ["Potential continuity comes from normal D continuity and is unrelated to E_t.", "Potential continuity means normal E must be continuous.", "Potential must jump at every interface with surface charge."],
    applicationQuestion: "If potential were discontinuous across an ordinary interface, what unreasonable result would it imply?",
    applicationCorrect: "An infinite or singular field over an infinitesimal distance unless a special physical model is introduced.",
    applicationTraps: ["It means D_n must be continuous.", "It means the dielectric has no polarization.", "It means capacitance must be zero."],
    scopeCorrect: "A usual electrostatic dielectric interface requires phi_1 = phi_2, while surface charge is handled through the jump of normal derivative.",
    scopeTraps: ["Potential continuity can replace all boundary conditions.", "Potential continuity applies only to vacuum-vacuum interfaces.", "Potential continuity implies equal permittivities on both sides."]
  },
  {
    title: "free volume charge density inside a conductor",
    correct: "In an ideal conductor at electrostatic equilibrium, net free volume charge density inside is zero and net charge resides on the surface.",
    traps: ["A conductor in electrostatic equilibrium can maintain nonzero net free volume charge.", "A conductor surface cannot carry free charge.", "rho_f = 0 inside means there are no free electrons."],
    applicationQuestion: "In electrostatic shielding, where is the net free charge usually located while E inside the conductor material is zero?",
    applicationCorrect: "On the conductor surface.",
    applicationTraps: ["Uniformly throughout the conductor volume.", "Entirely converted into polarization surface charge.", "Entirely converted into image charge."],
    scopeCorrect: "This result is for an ideal conductor in electrostatic equilibrium.",
    scopeTraps: ["Whenever current flows, a conductor must have rho_f = 0 and E = 0 inside.", "Zero net charge density inside means the conductor cannot carry total charge.", "Conductor surface charge is unrelated to the external field."]
  },
  {
    title: "definition of current density",
    correct: "Current density J is the charge passing through unit area per unit time, directed along positive charge motion.",
    traps: ["The direction of J is defined as the direction of negative charge motion.", "Total current is unrelated to the surface integral of J.", "J can only be a scalar."],
    applicationQuestion: "How is the total current through an oriented surface S obtained from J?",
    applicationCorrect: "I = integral over S of J dot dS.",
    applicationTraps: ["I = curl J.", "I = C/U.", "I = integral over S of E cross D dS."],
    scopeCorrect: "J can describe conduction current and also convection current in the form J = rho v.",
    scopeTraps: ["J is defined only in electrostatic fields.", "J does not require a specified surface direction.", "The unit of J is the same as surface charge density."]
  },
  {
    title: "Gaussian surfaces and singularities",
    correct: "When applying the divergence theorem, fields should satisfy the needed smoothness in the region; point charges and surface charges require special handling.",
    traps: ["With a point-charge singularity, the divergence theorem can be used at the singular point as an ordinary function without care.", "The divergence theorem is unaffected by sources inside the closed surface.", "Singularities do not affect any integral equation."],
    applicationQuestion: "A Gaussian surface enclosing a point charge has nonzero flux although divergence is zero away from the charge. How should this be understood?",
    applicationCorrect: "The point charge is a singularity and should be handled by the integral form or a delta source.",
    applicationTraps: ["Gauss' law has failed.", "Electric field lines are closed.", "Charge is not a source."],
    scopeCorrect: "Integral forms are often more convenient than differential forms for concentrated charge singularities.",
    scopeTraps: ["The differential form needs no special interpretation at singularities.", "A Gaussian surface must be spherical.", "Only zero flux can enclose a point charge."]
  },
  {
    title: "free surface charge at a boundary",
    correct: "Free surface charge causes a jump in the normal component of D, and the jump equals sigma_f.",
    traps: ["Free surface charge causes a jump in tangential E.", "If sigma_f exists, potential must be discontinuous.", "sigma_f has no relation to the jump of D_n."],
    applicationQuestion: "If a dielectric-interface problem states sigma_f is nonzero, which boundary condition should be modified first?",
    applicationCorrect: "The continuity condition for normal D should be replaced by a jump condition.",
    applicationTraps: ["Potential continuity should be replaced by phi = 0.", "Tangential E continuity should be replaced by J_n continuity.", "Poisson equation should be changed to a source-free equation."],
    scopeCorrect: "The sign expression for sigma_f depends on whether the normal points from medium 1 to 2 or the reverse.",
    scopeTraps: ["The expression for sigma_f is independent of normal direction.", "Free surface charge is the same as polarization surface charge.", "The jump of D_n applies only to magnetic fields."]
  },
  {
    title: "identifying the carrier of induced charge",
    correct: "To identify induced charge, first check the carrier: on a conductor it is usually free charge, while on a dielectric it is usually polarization charge.",
    traps: ["All induced charge is free charge by default.", "All induced charge is image charge by default.", "The carrier does not affect the type of charge."],
    applicationQuestion: "If a problem says induced charge on a dielectric surface and does not specify free charge, how should it usually be interpreted?",
    applicationCorrect: "As polarization surface charge or bound surface charge.",
    applicationTraps: ["As conductor free surface charge.", "As a virtual image charge outside the solution region.", "As steady conduction current."],
    scopeCorrect: "At a conductor-dielectric interface, conductor-side sigma_f and dielectric-side rho_ps may need to be answered separately.",
    scopeTraps: ["Charges on both sides of the interface can be merged into one signless quantity.", "Image charge can be counted in real charge conservation.", "Carrier identification is useful only in magnetic-field problems."]
  },
  {
    title: "symbols and dimensions",
    correct: "rho usually denotes volume density and sigma denotes surface density; their units differ and they must not be interchanged.",
    traps: ["rho_f and sigma_f are only different notations with identical units.", "A volume charge density can be substituted directly into a surface-charge boundary condition.", "The distinction between volume density and surface density has no physical effect."],
    applicationQuestion: "If a problem asks for free surface charge at an interface, which symbol is more appropriate?",
    applicationCorrect: "sigma_f.",
    applicationTraps: ["rho_f.", "tau.", "C."],
    scopeCorrect: "Volume sources enter differential equations, while surface sources enter boundary jump conditions.",
    scopeTraps: ["A surface source should be inserted directly as an ordinary volume source in Poisson equation.", "A volume source can only appear in boundary conditions.", "The difference between rho and sigma only affects typography."]
  },
  {
    title: "field-line interpretation",
    correct: "Diverging field lines indicate a positive source, converging lines indicate a negative source, and circulating lines indicate a vortex source.",
    traps: ["Parallel field lines with unchanged density must indicate a positive source.", "Converging field lines correspond to positive divergence.", "Closed electrostatic field lines show that electrostatic fields are irrotational."],
    applicationQuestion: "If an electrostatic field-line plot shows closed loops, what should be suspected first?",
    applicationCorrect: "It is inconsistent with curl E = 0 and may not be an electrostatic field.",
    applicationTraps: ["It is the typical feature of an electrostatic field.", "It proves a positive point charge exists.", "It proves the potential is zero everywhere."],
    scopeCorrect: "Field-line interpretation is a local qualitative analysis and still needs equations and boundary conditions.",
    scopeTraps: ["A field-line plot can replace all quantitative boundary conditions.", "Field-line density can never reflect field strength.", "Any circulating field lines can be produced by stationary charges."]
  },
  {
    title: "capacitance of an isolated conducting sphere",
    correct: "An isolated conducting sphere of radius a in a uniform medium has capacitance C = 4 pi epsilon a.",
    traps: ["The isolated-sphere capacitance is C = 4 pi a/epsilon.", "The isolated-sphere capacitance is independent of the medium.", "The isolated-sphere capacitance changes with the charge Q on it."],
    applicationQuestion: "In deriving the capacitance of an isolated sphere, where does the relation between surface potential and Q come from?",
    applicationCorrect: "Integrating the external electric field from infinity to the sphere surface.",
    applicationTraps: ["Integrating a nonzero electric field inside the conductor.", "Integrating convection current density.", "Integrating Joule-loss density."],
    scopeCorrect: "The formula assumes the exterior of the sphere is an infinite uniform medium.",
    scopeTraps: ["It remains 4 pi epsilon a when other conductors are nearby.", "A half-space boundary does not change isolated-sphere capacitance.", "The internal field determines isolated-sphere capacitance."]
  },
  {
    title: "hemispace spherical electrode",
    correct: "The geometrical factor of a spherical electrode in a half-space is about half that of an isolated full-space sphere, so C = 2 pi epsilon a.",
    traps: ["The half-space spherical-electrode capacitance is exactly the same as that of an isolated sphere.", "The half-space boundary condition does not affect capacitance.", "The resistance of a half-space spherical electrode is 2 pi sigma_c a."],
    applicationQuestion: "In step-voltage type problems, what does the half-space spherical-electrode model mainly show?",
    applicationCorrect: "The half-space boundary condition changes the effective geometrical factor.",
    applicationTraps: ["The electric field in the half-space must be zero.", "Capacitance is determined only by voltage.", "Image charge must be a real charge."],
    scopeCorrect: "The half-space result depends on its specific boundary and electrode geometry and cannot be used for full space at will.",
    scopeTraps: ["The half-space formula applies to a complete spherical electrode in an infinite medium.", "Half-space geometry does not require a current return path.", "A half-space electrode has no conductance concept."]
  },
  {
    title: "RC of multilayer media",
    correct: "In multilayer media, if epsilon_i/sigma_c,i differs between layers, one cannot simply assign the same local tau to every layer.",
    traps: ["Any multilayer medium automatically satisfies RC = epsilon/sigma_c.", "Multilayer media never produce interfacial free surface charge.", "If the geometry is the same, differences in layer parameters can be ignored."],
    applicationQuestion: "In steady conduction through multilayer lossy media, what is the key condition for interfacial free surface charge?",
    applicationCorrect: "The two sides have different epsilon/sigma_c and there is normal current.",
    applicationTraps: ["The two sides choose different potential references.", "Both sides are vacuum.", "The tangential electric field at the interface is zero."],
    scopeCorrect: "If every layer has the same epsilon_i/sigma_c,i, the overall duality relation can be greatly simplified.",
    scopeTraps: ["If epsilon_i/sigma_c,i is the same, the electric field must be zero.", "Multilayer problems need no boundary conditions.", "Interface charge is determined only by the jump of tangential J."]
  },
  {
    title: "scope of Coulomb's law in electrostatics",
    correct: "Coulomb's law applies to interactions between stationary point charges, and in a medium the permittivity must be considered.",
    traps: ["Coulomb's law can be used unconditionally for any time-varying current distribution.", "The Coulomb force direction is unrelated to the line joining the charges.", "A medium does not affect epsilon in the point-charge field expression."],
    applicationQuestion: "When writing the electric field of a point charge in a uniform medium, which material parameter appears in the denominator?",
    applicationCorrect: "The permittivity epsilon of the medium.",
    applicationTraps: ["The conductivity sigma_c.", "The relaxation time tau.", "The resistance R."],
    scopeCorrect: "Near complex boundaries, the free-space Coulomb field alone is not enough; boundary conditions must also be satisfied.",
    scopeTraps: ["With a conductor boundary, the free-space point-charge field automatically satisfies all boundaries.", "Coulomb's law is not part of electrostatics.", "Point-charge field lines can close on themselves."]
  },
  {
    title: "potential and electric-field direction",
    correct: "The electric field points in the direction of fastest decrease of potential and satisfies E = -grad phi.",
    traps: ["The electric field points in the direction of fastest increase of potential.", "E is in the same direction as grad phi with no minus sign.", "Where potential is zero, the electric field must be zero."],
    applicationQuestion: "For an electric dipole, potential can be zero on the equatorial plane while E is nonzero. What does this show?",
    applicationCorrect: "Electric field depends on spatial variation of potential, not on the absolute potential value.",
    applicationTraps: ["Zero potential always means zero electric field.", "The far-field dipole formula is invalid.", "Electrostatic fields do not satisfy E = -grad phi."],
    scopeCorrect: "E = -grad phi holds for electrostatic or other irrotational electric fields.",
    scopeTraps: ["Any time-varying electric field can be represented only by scalar potential.", "Changing the reference constant of potential changes E.", "The normal electric field on an equipotential surface must be zero."]
  },
  {
    title: "dielectric shielding effect",
    correct: "Polarization charge in a linear dielectric usually partially cancels the field effect of free charge, showing shielding.",
    traps: ["For epsilon_r > 1, polarization charge always enhances the free volume source.", "In vacuum with epsilon_r = 1, dielectric polarization charge still exists.", "The limit epsilon_r -> infinity has no relation to the conductor-shielding picture."],
    applicationQuestion: "As epsilon_r increases, what happens to the total charge density rho_f + rho_p for the same free volume charge in a linear dielectric?",
    applicationCorrect: "It becomes rho_f/epsilon_r, so the effective source is reduced.",
    applicationTraps: ["It becomes epsilon_r rho_f, so the effective source increases.", "It is always exactly zero.", "It is independent of epsilon_r."],
    scopeCorrect: "This shielding proportion comes from the model of a uniform linear dielectric volume.",
    scopeTraps: ["A nonuniform dielectric needs no reanalysis of shielding.", "Shielding means free charge disappears.", "Shielding means polarization charge is externally supplied free charge."]
  }
];

function createQuestion(
  id: number,
  question: string,
  options: string[],
  correctText: string,
  explanation: string
): LegacyQuestion {
  const rotated = rotate(options, id % options.length);
  return {
    id,
    question,
    options: rotated,
    answer: rotated.indexOf(correctText),
    explanation,
    tags: [],
    difficulty: "基础" as Difficulty
  };
}

function expandSpec(spec: EnglishSpec, specIndex: number, startId: number): LegacyQuestion[] {
  const [trapA] = spec.traps;
  const baseId = startId + specIndex * 4;
  const explain = `The correct answer matches the core assumption and field relation for ${spec.title}. The other options confuse sources, boundary conditions, material assumptions, or physical meaning.`;

  return [
    createQuestion(baseId, `Regarding ${spec.title}, which statement is correct?`, [spec.correct, ...spec.traps], spec.correct, explain),
    createQuestion(baseId + 1, `Regarding ${spec.title}, which statement is false?`, [spec.correct, spec.scopeCorrect, spec.applicationCorrect, trapA], trapA, explain),
    createQuestion(baseId + 2, spec.applicationQuestion, [spec.applicationCorrect, ...spec.applicationTraps], spec.applicationCorrect, explain),
    createQuestion(baseId + 3, `Which statement about the scope or boundary interpretation of ${spec.title} is correct?`, [spec.scopeCorrect, ...spec.scopeTraps], spec.scopeCorrect, explain)
  ];
}

export const englishQuestions: LegacyQuestion[] = specs.flatMap((spec, index) => expandSpec(spec, index, 1));

export const englishQuestionById = new Map(englishQuestions.map((question) => [question.id, question]));
