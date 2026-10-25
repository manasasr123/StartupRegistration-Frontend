
import { useState, useEffect } from 'react';

const steps = [
  'Welcome',
  'Founder Account',
  'Founder Profile',
  'Startup Information',
  'Industry & Stage',
  'Company Information',
  'Location',
  'Team Details',
  'Startup Snapshot',
  'Upload Documents',
  'Review',
  'Registration Complete',
]

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [founder, setFounder] = useState(null);
  const [activeAccountEmail, setActiveAccountEmail] = useState(
  () => sessionStorage.getItem("activeAccountEmail") || ""
);
  const founderDraftKey = activeAccountEmail
  ? `founderRegistrationDraft:${activeAccountEmail}`
  : "founderRegistrationDraft";

const startupDraftKey = activeAccountEmail
  ? `startupRegistrationDraft:${activeAccountEmail}`
  : "startupRegistrationDraft";

  const [loginEmail, setLoginEmail] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [loginLoading, setLoginLoading] = useState(false);

useEffect(() => {
  localStorage.setItem("registrationCurrentStep", String(currentStep));
}, [currentStep]);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
const [documentsLoading, setDocumentsLoading] = useState(false);
const [registrationKey, setRegistrationKey] = useState(() => {
  const existingKey = sessionStorage.getItem("registrationKey");

  if (existingKey) return existingKey;

  const newKey = crypto.randomUUID();
  sessionStorage.setItem("registrationKey", newKey);
  return newKey;
});

const [form, setForm] = useState(() => {
  const saved = localStorage.getItem("founderRegistrationDraft");

  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        fullName: parsed.fullName || "",
        email: parsed.email || "",
        mobile: parsed.mobile || "",
        password: "",
        confirmPassword: "",
      };
    } catch (error) {
      console.error("Unable to restore founder draft:", error);
    }
  }

  return {
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  };
});

useEffect(() => {
  const key = activeAccountEmail
    ? `founderRegistrationDraft:${activeAccountEmail}`
    : "founderRegistrationDraft";

  localStorage.setItem(
    key,
    JSON.stringify({
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
    })
  );
}, [form.fullName, form.email, form.mobile, activeAccountEmail]);

  
const [registration, setRegistration] = useState(() => {
  const savedDraft = localStorage.getItem(
  activeAccountEmail
    ? `startupRegistrationDraft:${activeAccountEmail}`
    : "startupRegistrationDraft"
);

  if (savedDraft) {
    try {
      const parsedDraft = JSON.parse(savedDraft);
      return {
        ...parsedDraft,
        startupLogo: null,
        documents: {
          pitchDeck: null,
          companyProfile: null,
          businessPlan: null,
          financialModel: null,
          founderResume: null,
          productBrochure: null,
          demoVideo: null,
        },
      };
    } catch (error) {
      console.error('Unable to restore registration draft:', error);
    }
  }

  return {
    designation: '',
    linkedIn: '',
    experience: '',
    qualification: '',
    previousStartup: '',
    bio: '',
    skills: [],
    startupName: '',
    tagline: '',
    website: '',
    startupEmail: '',
    startupMobile: '',
    industry: '',
    startupStage: '',
    companyType: '',
    incorporationStatus: '',
    incorporationDate: '',
    cin: '',
    gstNumber: '',
    startupIndia: '',
    dpiitNumber: '',
    country: 'India',
    state: '',
    city: '',
    address: '',
    pinCode: '',
    founderCount: 1,
    founders: [{
      name: '',
      role: '',
      email: '',
      mobile: '',
      equityPercentage: '',
      linkedInProfile: '',
    }],
    problem: '',
    customers: '',
    uniqueValue: '',
    revenue: '',
    teamSize: '',
    fundingStage: '',
    documents: {
      pitchDeck: null,
      companyProfile: null,
      businessPlan: null,
      financialModel: null,
      founderResume: null,
      productBrochure: null,
      demoVideo: null,
    },
  };
});

useEffect(() => {
  if (!activeAccountEmail) return;

  const savedDraft = localStorage.getItem(
    `startupRegistrationDraft:${activeAccountEmail}`
  );

  if (savedDraft) {
    try {
      const parsedDraft = JSON.parse(savedDraft);

      setRegistration((previous) => ({
        ...previous,
        ...parsedDraft,
        startupLogo: null,
        documents: previous.documents,
      }));
    } catch (error) {
      console.error("Unable to restore account registration draft:", error);
    }
  }
}, [activeAccountEmail]);

useEffect(() => {
  if (!activeAccountEmail) return;

  const savedForm = localStorage.getItem(
    `founderRegistrationDraft:${activeAccountEmail}`
  );

  if (savedForm) {
    try {
      const parsed = JSON.parse(savedForm);

      setForm((previous) => ({
        ...previous,
        fullName: parsed.fullName || "",
        email: activeAccountEmail,
        mobile: parsed.mobile || "",
        password: "",
        confirmPassword: "",
      }));
    } catch (error) {
      console.error("Unable to restore founder draft:", error);
    }
  }
}, [activeAccountEmail]);


  

const startNewRegistration = () => {
  const newKey = crypto.randomUUID();

  // Start a new registration session
  sessionStorage.setItem("registrationKey", newKey);
  setRegistrationKey(newKey);

  // Remove the previous saved draft
  /*localStorage.removeItem("startupRegistrationDraft");
  localStorage.removeItem("founderRegistrationDraft");*/

  // Reset all registration fields to their initial values
  setRegistration({
    designation: '',
    linkedIn: '',
    experience: '',
    qualification: '',
    previousStartup: '',
    bio: '',
    skills: [],
    startupName: '',
    tagline: '',
    website: '',
    startupEmail: '',
    startupMobile: '',
    industry: '',
    startupStage: '',
    companyType: '',
    incorporationStatus: '',
    incorporationDate: '',
    cin: '',
    gstNumber: '',
    startupIndia: '',
    dpiitNumber: '',
    country: 'India',
    state: '',
    city: '',
    address: '',
    pinCode: '',
    founderCount: 1,
    founders: [
      {
        name: '',
        role: '',
        email: '',
        mobile: '',
        equityPercentage: '',
        linkedInProfile: '',
      },
    ],
    problem: '',
    customers: '',
    uniqueValue: '',
    revenue: '',
    teamSize: '',
    fundingStage: '',
    documents: {
      pitchDeck: null,
      companyProfile: null,
      businessPlan: null,
      financialModel: null,
      founderResume: null,
      productBrochure: null,
      demoVideo: null,
    },
  });

  setForm({
  fullName: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
});

  setUploadedDocuments([]);
  setCurrentStep(1);
};




const uploadDocument = async (file, documentType) => {
  if (!file) return;

  try {
    const founderResponse = await fetch(
      `https://startupregistration-backend.onrender.com/api/startups/founder?email=${encodeURIComponent(form.email)}`
    );

    if (!founderResponse.ok) {
      throw new Error("Could not find the registered founder");
    }

    const founderData = await founderResponse.json();

    const formData = new FormData();
    formData.append("founderId", founderData.id);
    formData.append("registrationKey", registrationKey);
    formData.append("documentType", documentType);
    formData.append("file", file);

    const response = await fetch(
      "https://startupregistration-backend.onrender.com/api/registration-documents/upload",
      {
        method: "POST",
        body: formData
      }
    );

    const result = await response.text();

    if (!response.ok) {
      throw new Error(result || "Upload failed");
    }

    alert(`${file.name} uploaded successfully!`);
  } catch (error) {
    console.error("Document upload failed:", error);
    alert(`Upload failed: ${error.message}`);
  }
};


const loadUploadedDocuments = async () => {
  try {
    setDocumentsLoading(true);

    const response = await fetch(
      `https://startupregistration-backend.onrender.com/api/registration-documents/registration/${registrationKey}`
    );

    if (!response.ok) {
      throw new Error("Could not load uploaded documents");
    }

    const data = await response.json();
    setUploadedDocuments(data);
  } catch (error) {
    console.error("Loading documents failed:", error);
    alert(error.message);
  } finally {
    setDocumentsLoading(false);
  }
};






useEffect(() => {
  const draft = {
    ...registration,
    startupLogo: null,
    founders: registration.founders,
    documents: {
      pitchDeck: null,
      companyProfile: null,
      businessPlan: null,
      financialModel: null,
      founderResume: null,
      productBrochure: null,
      demoVideo: null,
    },
  };

  if (activeAccountEmail) {
  localStorage.setItem(startupDraftKey, JSON.stringify(draft));
} else {
  localStorage.setItem("startupRegistrationDraft", JSON.stringify(draft));
}
}, [registration, activeAccountEmail, startupDraftKey]);


  function updateForm(event) {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

async function registerFounder() {
  try {
    const response = await fetch(
      'https://startupregistration-backend.onrender.com/api/founders/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          mobile: form.mobile,
          password: form.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(
        data.message ||
        Object.values(data).join('\n') ||
        'Registration failed.'
      );
      return false;
    }

    alert(data.message || 'Founder registered successfully.');
    return true;
  } catch (error) {
    alert(
      'Could not connect to the backend. Check that Spring Boot is running.'
    );
    return false;
  }
}



  function nextStep() {
    setCurrentStep((step) => Math.min(step + 1, 11))
  }

async function loadSavedStartupDetails(email) {
  try {
    const baseUrl = "https://startupregistration-backend.onrender.com";

    // 1. Fetch startup details
    const startupResponse = await fetch(
      `${baseUrl}/api/startups/details?email=${encodeURIComponent(email)}`
    );

    if (startupResponse.status === 404) {
      alert("No saved startup details found. You can start a new registration.");
      return false;
    }

    if (!startupResponse.ok) {
      throw new Error("Unable to load saved startup details.");
    }

    const startupData = await startupResponse.json();

    // 2. Fetch founder profile
    const profileResponse = await fetch(
      `${baseUrl}/api/founder-profiles/founder?email=${encodeURIComponent(email)}`
    );

    let profileData = {};

    if (profileResponse.ok) {
      profileData = await profileResponse.json();
    } else if (profileResponse.status !== 404) {
      throw new Error("Unable to load founder profile.");
    }

    // 3. Fetch the founder record to get the founder ID
    const founderResponse = await fetch(
      `${baseUrl}/api/startups/founder?email=${encodeURIComponent(email)}`
    );

    if (!founderResponse.ok) {
      throw new Error("Unable to retrieve founder account.");
    }

    const founderData = await founderResponse.json();

    // 4. Fetch team members using the founder ID
    const teamResponse = await fetch(
      `${baseUrl}/api/team-members/founder?founderId=${encodeURIComponent(founderData.id)}`
    );

    if (!teamResponse.ok) {
      throw new Error("Unable to load team members.");
    }

    const teamData = await teamResponse.json();

    // 5. Populate all saved registration sections
    setRegistration((previous) => ({
      ...previous,
      ...startupData,
designation: profileData.designation ?? "",
linkedIn: profileData.linkedin ?? "",
experience: profileData.experience ?? "",
qualification: profileData.qualification ?? "",
previousStartup: profileData.previousStartup ?? "",
bio: profileData.bio ?? "",
skills: Array.isArray(profileData.skills)
  ? profileData.skills
  : typeof profileData.skills === "string" && profileData.skills.trim()
    ? profileData.skills.split(",").map((skill) => skill.trim())
    : [],

      founders: teamData.length > 0
        ? teamData.map((member) => ({
            name: member.name ?? "",
            role: member.role ?? "",
            email: member.email ?? "",
            mobile: member.mobile ?? "",
            equityPercentage: member.equityPercentage ?? "",
            linkedInProfile: member.linkedinProfile ?? "",
            experience: member.experience ?? "",
          }))
        : previous.founders,

      founderCount: teamData.length > 0
        ? teamData.length
        : previous.founderCount,

      startupLogo: null,
      documents: previous.documents,
    }));

    return true;
  } catch (error) {
    console.error("Loading saved registration failed:", error);
    alert(error.message || "Unable to load saved registration.");
    return false;
  }
}


 
async function saveStartupDetails() {
  try {
    
const founderEmail = form.email;

const founderResponse = await fetch(
  `https://startupregistration-backend.onrender.com/api/startups/founder?email=${encodeURIComponent(founderEmail)}`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  }
);



if (!founderResponse.ok) {
  throw new Error(
    founderResponse.status === 404
      ? "Founder not found. Please register the founder account first."
      : "Unable to retrieve founder details."
  );
}

const founderData = await founderResponse.json();
const founderId = founderData.id;

if (!founderId) {
  throw new Error("Founder ID was not returned by the backend.");
}

    const startupPayload = {
      founderId,
      startupName: registration.startupName,
      tagline: registration.tagline,
      website: registration.website,
      startupEmail: registration.startupEmail,
      startupMobile: registration.startupMobile,
      industry: registration.industry,
      startupStage: registration.startupStage,
      companyType: registration.companyType,
      incorporationStatus: registration.incorporationStatus,
      incorporationDate: registration.incorporationDate || null,
      cin: registration.cin,
      gstNumber: registration.gstNumber,
      startupIndia: registration.startupIndia,
      dpiitNumber: registration.dpiitNumber,
      country: registration.country,
      state: registration.state,
      city: registration.city,
      address: registration.address,
      pinCode: registration.pinCode,
      problem: registration.problem,
      customers: registration.customers,
      uniqueValue: registration.uniqueValue,
      revenue: registration.revenue,
      teamSize: String(registration.teamSize ?? ""),
      fundingStage: registration.fundingStage,
    };

    const startupResponse = await fetch(
      "https://startupregistration-backend.onrender.com/api/startups/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(startupPayload),
      }
    );

    const startupResult = await startupResponse.text();

    if (!startupResponse.ok) {
      throw new Error(startupResult || "Saving startup details failed");
    }
    
    const profilePayload = {
      founderId: founderId,
      designation: registration.designation,
      linkedIn: registration.linkedIn,
      experience: registration.experience,
      qualification: registration.qualification,
      previousStartup: registration.previousStartup,
      bio: registration.bio,
      skills: registration.skills || [],
    };

    const profileResponse = await fetch(
      "https://startupregistration-backend.onrender.com/api/founder-profiles/save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profilePayload),
      }
    );

    const profileResult = await profileResponse.text();

    if (!profileResponse.ok) {
      throw new Error(
        profileResult || "Saving founder profile failed"
      );
    }

    
const teamPayload = {
  founderId: founderId,
  teamMembers: registration.founders.map((member) => ({
    name: member.name,
    role: member.role,
    email: member.email,
    mobile: member.mobile,
    equityPercentage: member.equityPercentage
      ? Number(member.equityPercentage)
      : null,
    linkedinProfile: member.linkedInProfile || "",
    experience: member.experience || ""
  }))
};

const teamResponse = await fetch(
  "https://startupregistration-backend.onrender.com/api/team-members/save",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(teamPayload)
  }
);

if (!teamResponse.ok) {
  throw new Error("Failed to save team members");
}



    alert("Registration saved successfully!");
    setCurrentStep(11);
  } catch (error) {
    console.error("Registration save failed:", error);
    alert(error.message || "Unable to save registration.");
  }
}


  function previousStep() {
    setCurrentStep((step) => Math.max(step - 1, 0))
  }
  const readinessFields = [
  registration.startupName,
  registration.industry,
  registration.startupStage,
  registration.companyType,
  registration.incorporationStatus,
  registration.state,
  registration.city,
  registration.address,
  registration.problem,
  registration.customers,
  registration.uniqueValue,
  registration.revenue,
  registration.teamSize,
  registration.fundingStage,
];

const readinessScore = Math.round(
  (readinessFields.filter(
    (value) => value != null && String(value).trim() !== ""
  ).length /
    readinessFields.length) *
    100
);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 md:px-12">
        <h1 className="text-xl font-bold text-blue-700">
          StartupReady AI
        </h1>
        <button
          onClick={() => setShowLogin(true)}
          className="rounded-lg border border-slate-300 px-5 py-2 hover:bg-slate-100"
        >
          Login
        </button>
      </header>

      
{showLogin ? (
  <main className="mx-auto max-w-md px-6 py-16">
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold">Welcome Back</h2>
      <p className="mt-2 text-slate-600">
        Log in to your StartupReady AI account.
      </p>

      <form
        className="mt-8 space-y-5"
        
onSubmit={async (event) => {
  event.preventDefault();
  setLoginLoading(true);

  try {
    const response = await fetch(
      "https://startupregistration-backend.onrender.com/api/founders/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || "Invalid email or password");
      return;
    }

    alert(`Welcome, ${data.fullName}!`);
const email = data.email.toLowerCase();

sessionStorage.setItem("activeAccountEmail", email);
setActiveAccountEmail(email);
setFounder(data);

const loaded = await loadSavedStartupDetails(email);

if (loaded) {
  setShowLogin(false);
  setLoginEmail("");
  setLoginPassword("");
}
  } catch (error) {
    alert("Unable to connect to the server. Please try again.");
  } finally {
    setLoginLoading(false);
  }
}}

      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email Address
          </label>
          <input
            type="email"
            required
            value={loginEmail}
onChange={(event) => setLoginEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            required
            value={loginPassword}
onChange={(event) => setLoginPassword(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {loginLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        type="button"
        onClick={() => setShowLogin(false)}
        className="mt-6 w-full text-sm font-medium text-blue-700 hover:underline"
      >
        ← Back to Home
      </button>
    </div>
  </main>
) : founder ? (
  <main className="mx-auto max-w-3xl px-6 py-12">
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-3xl font-bold">
        Welcome back, {founder.fullName}!
      </h2>

      <p className="mt-3 text-slate-600">
        Email: {founder.email}
      </p>

      <button
        onClick={async () => {
  const email = founder.email;
  const normalizedEmail = email.toLowerCase();

sessionStorage.setItem("activeAccountEmail", normalizedEmail);
setActiveAccountEmail(normalizedEmail);

  setForm((prev) => ({
    ...prev,
    fullName: founder.fullName || "",
    email,
    mobile: founder.mobile || "",
    password: "",
    confirmPassword: "",
  }));

  const loaded = await loadSavedStartupDetails(email);

  if (!loaded) {
  setRegistration({
    designation: "",
    linkedIn: "",
    experience: "",
    qualification: "",
    previousStartup: "",
    bio: "",
    skills: [],
    startupName: "",
    tagline: "",
    website: "",
    startupEmail: "",
    startupMobile: "",
    industry: "",
    startupStage: "",
    companyType: "",
    incorporationStatus: "",
    incorporationDate: "",
    cin: "",
    gstNumber: "",
    startupIndia: "",
    dpiitNumber: "",
    country: "India",
    state: "",
    city: "",
    address: "",
    pinCode: "",
    founderCount: 1,
    founders: [{
      name: "",
      role: "",
      email: "",
      mobile: "",
      equityPercentage: "",
      linkedInProfile: "",
      experience: "",
    }],
    problem: "",
    customers: "",
    uniqueValue: "",
    revenue: "",
    teamSize: "",
    fundingStage: "",
    documents: {
      pitchDeck: null,
      companyProfile: null,
      businessPlan: null,
      financialModel: null,
      founderResume: null,
      productBrochure: null,
      demoVideo: null,
    },
  });

  setForm((prev) => ({
    ...prev,
    fullName: founder.fullName || "",
    email,
    mobile: founder.mobile || "",
    password: "",
    confirmPassword: "",
  }));
}

  setFounder(null);
  setCurrentStep(loaded ? 3 : 2);
}}
        className="mt-6 rounded-lg bg-blue-600 px-5 py-3 text-white"
      >
        Continue Registration
      </button>

      <button
        onClick={() => {
  setFounder(null);
  setActiveAccountEmail("");
  sessionStorage.removeItem("activeAccountEmail");
  setCurrentStep(0);
}}
        className="ml-3 mt-6 rounded-lg border px-5 py-3"
      >
        Logout
      </button>
    </div>
  </main>
) : currentStep === 0 ? (

        <main className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-2 md:items-center">
          <section>
            <span className="inline-block rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              Your startup journey starts here
            </span>

            <h2 className="mt-6 text-4xl font-bold leading-tight md:text-5xl">
              Turn your startup vision into{' '}
              <span className="text-blue-600">funding readiness.</span>
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Build your startup profile, understand your business readiness,
              and prepare for your next growth opportunity.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={startNewRegistration}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Get Started →
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="rounded-lg px-5 py-3 font-medium hover:bg-slate-200"
              >
                Existing User
              </button>
              
            </div>

            <div className="mt-10 grid grid-cols-2 gap-5 text-sm">
              <div>
                <p className="font-semibold">12-step registration</p>
                <p className="mt-1 text-slate-500">Guided startup onboarding</p>
              </div>
              <div>
                <p className="font-semibold">Save & Continue</p>
                <p className="mt-1 text-slate-500">Continue your profile later</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              ✨
            </div>
            <h3 className="text-2xl font-bold">Build Your Startup Profile</h3>
            <p className="mt-3 leading-7 text-slate-600">
              Complete your founder profile, share your startup details,
              and prepare for the guided assessment.
            </p>

            <div className="mt-7 space-y-5">
              {[
                'Founder information',
                'Startup and company details',
                'Team and business snapshot',
                'Documents and profile review',
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 text-sm text-blue-700">
                    {index + 1}
                  </span>
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-sm text-slate-500">
              AI-assisted recommendations will be available when the AI
              service is integrated.
            </p>
          </section>
        </main>
      ) : (
        <main className="mx-auto max-w-3xl px-6 py-12">
          <div className="mb-8">
            <p className="text-sm font-medium text-blue-700">
              Step {currentStep + 1} of 12
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all"
                style={{ width: `${((currentStep + 1) / 12) * 100}%` }}
              />
            </div>
            <h2 className="mt-5 text-3xl font-bold">{steps[currentStep]}</h2>
          </div>

          {currentStep === 1 ? (
            <form
            autoComplete="off"
              className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
              
onSubmit={async (event) => {
  event.preventDefault()

  if (form.password !== form.confirmPassword) {
    alert('Passwords do not match.')
    return
  }

  if (!form.fullName.trim() || !form.email.trim() || !form.mobile.trim()) {
    alert('Please enter your name, email, and mobile number.')
    return
  }

  const registered = await registerFounder()

  if (registered) {
    nextStep()
  }
}}

            >
              {[
                ['fullName', 'Full Name', 'text'],
                ['email', 'Work Email', 'email'],
                ['mobile', 'Mobile Number', 'tel'],
                ['password', 'Password', 'password'],
                ['confirmPassword', 'Confirm Password', 'password'],
              ].map(([name, label, type]) => (
                <label key={name} className="block">
                  <span className="mb-2 block text-sm font-medium">{label}</span>
                 <input
  required
  name={name}
  type={type}
  value={form[name]}
  onChange={updateForm}
  autoComplete={
    name === 'password' || name === 'confirmPassword'
      ? 'new-password'
      : 'off'
  }
  className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
/>
                </label>
              ))}
              <p className="text-sm text-slate-500">
                Email and mobile OTP verification will be connected when the
                backend and verification services are implemented.
              </p>
              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </form>
          
) : currentStep === 2 ? (
  <form
    className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
    <label className="block">
      <span className="mb-2 block text-sm font-medium">Profile Photo</span>
      <input
        type="file"
        accept="image/*"
        className="w-full rounded-lg border border-slate-300 p-3"
      />
    </label>

    <label className="block">
      <span className="mb-2 block text-sm font-medium">Designation</span>
      
<select
  required
  value={registration.designation}
  onChange={(event) =>
    setRegistration({
      ...registration,
      designation: event.target.value,
    })
  }
  className="w-full rounded-lg border border-slate-300 p-3"
>
  <option value="">Select designation</option>
  <option value="Founder">Founder</option>
  <option value="Co-Founder">Co-Founder</option>
  <option value="CEO">CEO</option>
  <option value="CTO">CTO</option>
  <option value="Other">Other</option>
</select>

    </label>

    <label className="block">
      <span className="mb-2 block text-sm font-medium">LinkedIn Profile</span>
      <input
  type="url"
  placeholder="https://linkedin.com/in/your-profile"
  value={registration.linkedIn}
  onChange={(event) =>
    setRegistration({
      ...registration,
      linkedIn: event.target.value,
    })
  }
  className="w-full rounded-lg border border-slate-300 p-3"
/>
    </label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Years of Experience
  </span>

  <select
    required
    value={registration.experience}
    onChange={(event) =>
      setRegistration({
        ...registration,
        experience: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="">Select experience</option>
    <option value="0–2 years">0–2 years</option>
    <option value="3–5 years">3–5 years</option>
    <option value="6–10 years">6–10 years</option>
    <option value="10+ years">10+ years</option>
  </select>
</label>

    <label className="block">
      <span className="mb-2 block text-sm font-medium">Highest Qualification</span>
      <select
  required
  value={registration.qualification}
  onChange={(event) =>
    setRegistration({
      ...registration,
      qualification: event.target.value,
    })
  }
  className="w-full rounded-lg border border-slate-300 p-3"
>
  <option value="">Select qualification</option>
  <option value="Diploma">Diploma</option>
  <option value="Bachelor's Degree">Bachelor's Degree</option>
  <option value="Master's Degree">Master's Degree</option>
  <option value="PhD">PhD</option>
  <option value="Other">Other</option>
</select>
    </label>

    <fieldset>
  <legend className="mb-3 text-sm font-medium">
    Previous Startup Experience?
  </legend>

  <label className="mr-6">
    <input
      type="radio"
      name="previousStartup"
      value="yes"
      required
      checked={registration.previousStartup === "yes"}
      onChange={(event) =>
        setRegistration({
          ...registration,
          previousStartup: event.target.value,
        })
      }
    />{" "}
    Yes
  </label>

  <label>
    <input
      type="radio"
      name="previousStartup"
      value="no"
      required
      checked={registration.previousStartup === "no"}
      onChange={(event) =>
        setRegistration({
          ...registration,
          previousStartup: event.target.value,
        })
      }
    />{" "}
    No
  </label>
</fieldset>

    <label className="block">
      <span className="mb-2 block text-sm font-medium">Short Bio</span>
      <textarea
  rows={4}
  placeholder="Tell us about yourself and your entrepreneurial journey"
  value={registration.bio}
  onChange={(event) =>
    setRegistration({
      ...registration,
      bio: event.target.value,
    })
  }
  className="w-full rounded-lg border border-slate-300 p-3"
/>
    </label>

    <fieldset>
  <legend className="mb-3 text-sm font-medium">Skills</legend>

  <div className="flex flex-wrap gap-3">
    {[
      'AI', 'FinTech', 'Blockchain', 'SaaS', 'HealthTech',
      'Marketing', 'Sales', 'Product', 'Finance',
    ].map((skill) => (
      <label
        key={skill}
        className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2"
      >
        <input
          type="checkbox"
          name="skills"
          value={skill}
          checked={registration.skills.includes(skill)}
          onChange={(event) => {
            const updatedSkills = event.target.checked
              ? [...registration.skills, skill]
              : registration.skills.filter((item) => item !== skill);

            setRegistration({
              ...registration,
              skills: updatedSkills,
            });
          }}
        />
        {skill}
      </label>
    ))}
  </div>
</fieldset>

    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Continue →
    </button>
  </form>
) : currentStep === 3 ? (
  
  <form
    className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
   <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Startup Name *
  </span>

  <input
    type="text"
    required
    placeholder="Enter your startup name"
    value={registration.startupName}
    onChange={(event) =>
      setRegistration({
        ...registration,
        startupName: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Startup Logo
  </span>

  <input
    type="file"
    accept="image/*"
    onChange={(event) =>
      setRegistration({
        ...registration,
        startupLogo: event.target.files?.[0] || null,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />

  {registration.startupLogo && (
    <div className="mt-3">
      <img
        src={URL.createObjectURL(registration.startupLogo)}
        alt="Startup logo preview"
        className="h-20 w-20 rounded-lg border border-slate-200 object-contain"
      />
      <p className="mt-1 text-sm text-slate-500">
        {registration.startupLogo.name}
      </p>
    </div>
  )}
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Tagline
  </span>

  <input
    type="text"
    placeholder="A short description of your startup"
    value={registration.tagline}
    onChange={(event) =>
      setRegistration({
        ...registration,
        tagline: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Website
  </span>

  <input
    type="url"
    placeholder="https://example.com"
    value={registration.website}
    onChange={(event) =>
      setRegistration({
        ...registration,
        website: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Startup Email *
  </span>

  <input
    type="email"
    required
    placeholder="hello@example.com"
    value={registration.startupEmail}
    onChange={(event) =>
      setRegistration({
        ...registration,
        startupEmail: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Startup Mobile *
  </span>

  <input
    type="tel"
    required
    placeholder="Enter startup contact number"
    value={registration.startupMobile}
    onChange={(event) =>
      setRegistration({
        ...registration,
        startupMobile: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Continue →
    </button>
  </form>
) : currentStep === 4 ? (
  <form
    className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
    <div>
  <label className="mb-2 block text-sm font-medium">
    Choose Your Industry *
  </label>

  <select
    required
    value={registration.industry}
    onChange={(event) =>
      setRegistration({
        ...registration,
        industry: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="" disabled>
      Select industry
    </option>

    {[
      'FinTech',
      'HealthTech',
      'EdTech',
      'AgriTech',
      'AI',
      'Blockchain',
      'Cyber Security',
      'Retail',
      'Manufacturing',
      'Logistics',
      'Mobility',
      'Energy',
      'Climate Tech',
      'DeepTech',
      'SaaS',
      'IoT',
      'Web3',
      'Others',
    ].map((industry) => (
      <option key={industry} value={industry}>
        {industry}
      </option>
    ))}
  </select>
</div>
    <div>
  <p className="mb-3 text-sm font-medium">Startup Stage *</p>

  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
    {[
      'Idea',
      'Prototype',
      'MVP',
      'Pilot',
      'Revenue',
      'Growth',
      'Scaling',
    ].map((stage) => (
      <label
        key={stage}
        className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 p-4 hover:border-blue-500 hover:bg-blue-50"
      >
        <input
          type="radio"
          name="startupStage"
          value={stage}
          required
          checked={registration.startupStage === stage}
          onChange={(event) =>
            setRegistration({
              ...registration,
              startupStage: event.target.value,
            })
          }
        />

        <span>{stage}</span>
      </label>
    ))}
  </div>
</div>

    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Continue →
    </button>
  </form>
) : currentStep === 5 ? (
  <form
    className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Company Type *
  </span>

  <select
    required
    value={registration.companyType}
    onChange={(event) =>
      setRegistration({
        ...registration,
        companyType: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="" disabled>
      Select company type
    </option>
    <option value="Private Limited Company">Private Limited Company</option>
    <option value="Public Limited Company">Public Limited Company</option>
    <option value="LLP">LLP</option>
    <option value="Partnership">Partnership</option>
    <option value="Sole Proprietorship">Sole Proprietorship</option>
    <option value="Other">Other</option>
  </select>
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Incorporation Status *
  </span>

  <select
    required
    value={registration.incorporationStatus}
    onChange={(event) =>
      setRegistration({
        ...registration,
        incorporationStatus: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="" disabled>
      Select status
    </option>
    <option value="incorporated">Incorporated</option>
    <option value="not-incorporated">Not Incorporated</option>
  </select>
</label>

    
{String(registration.incorporationStatus || '').toLowerCase() === 'incorporated' && (
  <>
    <label className="block">
      <span className="mb-2 block text-sm font-medium">
        Incorporation Date
      </span>
      <input
        type="date"
        value={registration.incorporationDate}
        onChange={(event) =>
          setRegistration({
            ...registration,
            incorporationDate: event.target.value,
          })
        }
        className="w-full rounded-lg border border-slate-300 p-3"
      />
    </label>

    <label className="block">
      <span className="mb-2 block text-sm font-medium">CIN</span>
      <input
        type="text"
        placeholder="Corporate Identification Number"
        value={registration.cin}
        onChange={(event) =>
          setRegistration({
            ...registration,
            cin: event.target.value,
          })
        }
        className="w-full rounded-lg border border-slate-300 p-3"
      />
    </label>
  </>
)}


    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    GST Number
  </span>

  <input
    type="text"
    placeholder="GSTIN (if applicable)"
    value={registration.gstNumber}
    onChange={(event) =>
      setRegistration({
        ...registration,
        gstNumber: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <fieldset>
  <legend className="mb-3 text-sm font-medium">
    Startup India Recognition *
  </legend>

  <label className="mr-6">
    <input
      type="radio"
      name="startupIndia"
      value="yes"
      required
      checked={registration.startupIndia === "yes"}
      onChange={(event) =>
        setRegistration({
          ...registration,
          startupIndia: event.target.value,
        })
      }
    />{" "}
    Yes
  </label>

  <label>
    <input
      type="radio"
      name="startupIndia"
      value="no"
      required
      checked={registration.startupIndia === "no"}
      onChange={(event) =>
        setRegistration({
          ...registration,
          startupIndia: event.target.value,
        })
      }
    />{" "}
    No
  </label>
</fieldset>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    DPIIT Recognition Number
  </span>

  <input
    type="text"
    placeholder="Enter DPIIT number if available"
    value={registration.dpiitNumber}
    onChange={(event) =>
      setRegistration({
        ...registration,
        dpiitNumber: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <button type="submit" className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
      Continue →
    </button>
  </form>

) : currentStep === 6 ? (
  <form
    className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
    <h3 className="text-lg font-semibold">Office Address</h3>

   <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Country *
  </span>

  <select
    required
    value={registration.country}
    onChange={(event) =>
      setRegistration({
        ...registration,
        country: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="India">India</option>
    <option value="United States">United States</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Other">Other</option>
  </select>
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    State *
  </span>

  <input
    type="text"
    required
    placeholder="Enter state"
    value={registration.state}
    onChange={(event) =>
      setRegistration({
        ...registration,
        state: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    City *
  </span>

  <input
    type="text"
    required
    placeholder="Enter city"
    value={registration.city}
    onChange={(event) =>
      setRegistration({
        ...registration,
        city: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

   <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Address *
  </span>

  <textarea
    required
    rows="3"
    placeholder="Enter office address"
    value={registration.address}
    onChange={(event) =>
      setRegistration({
        ...registration,
        address: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    PIN Code *
  </span>

  <input
    type="text"
    required
    pattern="[0-9]{6}"
    maxLength={6}
    placeholder="6-digit PIN code"
    title="Enter a valid 6-digit PIN code"
    value={registration.pinCode}
    onChange={(event) =>
      setRegistration({
        ...registration,
        pinCode: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Continue →
    </button>
  </form>

) : currentStep === 7 ? (
  <form
    className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Number of Founders *
  </span>

  <select
    required
    value={registration.founderCount}
    onChange={(event) =>
      setRegistration({
        ...registration,
        founderCount: Number(event.target.value),
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
      <option key={number} value={number}>
        {number} {number === 1 ? 'Founder' : 'Founders'}
      </option>
    ))}
  </select>
</label>

<div className="space-y-4">
  {Array.from(
    { length: Number(registration.founderCount) },
    (_, index) => {
      const founder = registration.founders[index] || {
        name: '',
        role: '',
        email: '',
        mobile: '',
        equityPercentage: '',
        linkedInProfile: '',
        experience: '',
      };

      return (
        <div
          key={index}
          className="rounded-xl border border-slate-200 p-4"
        >
          <h3 className="mb-4 text-lg font-semibold">
            Founder {index + 1}
          </h3>

          <div className="space-y-4">
            {[
              ['Name', 'text', 'Enter full name', 'name'],
              ['Role', 'text', 'Founder / Co-Founder / CEO', 'role'],
              ['Email', 'email', 'name@example.com', 'email'],
              ['Mobile', 'tel', 'Enter mobile number', 'mobile'],
              ['Equity Percentage', 'number', 'Enter equity percentage', 'equityPercentage'],
              ['LinkedIn Profile', 'url', 'https://linkedin.com/in/profile', 'linkedInProfile'],
            ].map(([label, type, placeholder, field]) => (
              <label key={field} className="block">
                <span className="mb-2 block text-sm font-medium">
                  {label}{['Name', 'Role', 'Email'].includes(label) ? ' *' : ''}
                </span>

                <input
                  type={type}
                  required={['Name', 'Role', 'Email'].includes(label)}
                  min={type === 'number' ? 0 : undefined}
                  max={type === 'number' ? 100 : undefined}
                  placeholder={placeholder}
                  value={founder[field] ?? ''}
                  onChange={(event) => {
                    const updatedFounders = [...registration.founders];

                    while (updatedFounders.length <= index) {
                      updatedFounders.push({
                        name: '',
                        role: '',
                        email: '',
                        mobile: '',
                        equityPercentage: '',
                        linkedInProfile: '',
                        experience: '',
                      });
                    }

                    updatedFounders[index] = {
                      ...updatedFounders[index],
                      [field]: event.target.value,
                    };

                    setRegistration({
                      ...registration,
                      founders: updatedFounders,
                    });
                  }}
                  className="w-full rounded-lg border border-slate-300 p-3"
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Years of Experience
              </span>

              <select
                value={founder.experience ?? ''}
                onChange={(event) => {
                  const updatedFounders = [...registration.founders];

                  while (updatedFounders.length <= index) {
                    updatedFounders.push({
                      name: '',
                      role: '',
                      email: '',
                      mobile: '',
                      equityPercentage: '',
                      linkedInProfile: '',
                      experience: '',
                    });
                  }

                  updatedFounders[index] = {
                    ...updatedFounders[index],
                    experience: event.target.value,
                  };

                  setRegistration({
                    ...registration,
                    founders: updatedFounders,
                  });
                }}
                className="w-full rounded-lg border border-slate-300 p-3"
              >
                <option value="">Select experience</option>
                <option value="0–2 years">0–2 years</option>
                <option value="3–5 years">3–5 years</option>
                <option value="6–10 years">6–10 years</option>
                <option value="10+ years">10+ years</option>
              </select>
            </label>
          </div>
        </div>
      );
    }
  )}
</div>

    <p className="text-sm text-slate-500">
      This initial version displays one founder's details. Dynamic forms for
      multiple founders and validation of combined equity will be added next.
    </p>

    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Continue →
    </button>
  </form>

) : currentStep === 8 ? (
  <form
    className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
   <label className="block">
  <span className="mb-2 block text-sm font-medium">
    What problem are you solving? *
  </span>

  <textarea
    required
    rows="4"
    placeholder="Describe the problem your startup addresses..."
    value={registration.problem}
    onChange={(event) =>
      setRegistration({
        ...registration,
        problem: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Who are your customers? *
  </span>

  <textarea
    required
    rows="3"
    placeholder="Describe your target customers..."
    value={registration.customers}
    onChange={(event) =>
      setRegistration({
        ...registration,
        customers: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    What makes your startup unique? *
  </span>

  <textarea
    required
    rows="4"
    placeholder="Explain your competitive advantage..."
    value={registration.uniqueValue}
    onChange={(event) =>
      setRegistration({
        ...registration,
        uniqueValue: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  />
</label>

   <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Current Revenue *
  </span>

  <select
    required
    value={registration.revenue}
    onChange={(event) =>
      setRegistration({
        ...registration,
        revenue: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="" disabled>Select revenue range</option>
    <option value="Pre Revenue">Pre Revenue</option>
    <option value="Less than ₹10L">Less than ₹10L</option>
    <option value="₹10L–₹50L">₹10L–₹50L</option>
    <option value="₹50L–₹1Cr">₹50L–₹1Cr</option>
    <option value="₹1Cr+">₹1Cr+</option>
  </select>
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Team Size *
  </span>

  <select
    required
    value={registration.teamSize}
    onChange={(event) =>
      setRegistration({
        ...registration,
        teamSize: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="" disabled>Select team size</option>
    <option value="1–5">1–5</option>
    <option value="6–10">6–10</option>
    <option value="11–25">11–25</option>
    <option value="26–50">26–50</option>
    <option value="51–100">51–100</option>
    <option value="100+">100+</option>
  </select>
</label>

    <label className="block">
  <span className="mb-2 block text-sm font-medium">
    Funding Raised *
  </span>

  <select
    required
    value={registration.fundingStage}
    onChange={(event) =>
      setRegistration({
        ...registration,
        fundingStage: event.target.value,
      })
    }
    className="w-full rounded-lg border border-slate-300 p-3"
  >
    <option value="" disabled>Select funding stage</option>
    <option value="Bootstrapped">Bootstrapped</option>
    <option value="Friends & Family">Friends &amp; Family</option>
    <option value="Angel">Angel</option>
    <option value="Seed">Seed</option>
    <option value="Series A">Series A</option>
    <option value="Series B+">Series B+</option>
  </select>
</label>

    <button
      type="submit"
      className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
    >
      Continue →
    </button>
  </form>

) : currentStep === 9 ? (
  <form
    className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
    onSubmit={(event) => {
      event.preventDefault()
      nextStep()
    }}
  >
    <p className="text-slate-600">
      Upload supporting documents for your startup. This step is optional;
      you can skip it and continue.
    </p>

    {[
  { label: 'Pitch Deck', accept: '.pdf,.ppt,.pptx', key: 'pitchDeck' },
  { label: 'Company Profile', accept: '.pdf,.doc,.docx', key: 'companyProfile' },
  { label: 'Business Plan', accept: '.pdf,.doc,.docx', key: 'businessPlan' },
  { label: 'Financial Model', accept: '.pdf,.xls,.xlsx,.csv', key: 'financialModel' },
  { label: 'Founder Resume', accept: '.pdf,.doc,.docx', key: 'founderResume' },
  { label: 'Product Brochure', accept: '.pdf,.png,.jpg,.jpeg', key: 'productBrochure' },
  { label: 'Demo Video', accept: 'video/*', key: 'demoVideo' },
].map((document) => (
  <label
    key={document.key}
    className="block rounded-xl border border-slate-200 p-4"
  >
    <span className="mb-2 block font-medium">
      {document.label}
    </span>

    
<input
  id={`upload-${document.key}`}
  type="file"
  accept={document.accept}
  
onChange={(event) => {
  const file = event.target.files?.[0] || null;

  setRegistration({
    ...registration,
    documents: {
      ...registration.documents,
      [document.key]: file,
    },
  });

  
if (file) {
  uploadDocument(file, document.key);
}

}}

  className="hidden"
/>

<label
  htmlFor={`upload-${document.key}`}
  className="mt-3 flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-blue-300 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 hover:bg-blue-100"
>
  <icon name="upload" size="sm" />
  {registration.documents[document.key]
    ? 'Replace document'
    : 'Choose document'}
</label>

{registration.documents[document.key] && (
  <div className="mt-3 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
    <icon name="file-check" size="lg" />
    <div className="min-w-0 flex-1">
      <p className="truncate text-sm font-medium text-slate-800">
        {registration.documents[document.key].name}
      </p>
      <p className="text-xs text-slate-500">Document selected</p>
    </div>

    <button
      type="button"
      onClick={() =>
        setRegistration({
          ...registration,
          documents: {
            ...registration.documents,
            [document.key]: null,
          },
        })
      }
      className="text-sm text-red-600 hover:text-red-700"
    >
      Remove
    </button>
  </div>
)}


    {registration.documents[document.key] && (
      <p className="mt-2 text-sm text-slate-500">
        Selected: {registration.documents[document.key].name}
      </p>
    )}
  </label>
))}

    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={nextStep}
        className="w-full rounded-lg border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-100"
      >
        Skip for now
      </button>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Continue →
      </button>
    </div>
  </form>

) : currentStep === 10 ? (
  <section className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6">
    
<div>
  <h3 className="text-lg font-semibold">Review Your Registration</h3>
  <p className="mt-2 text-sm text-slate-600">
    Review your information before completing your startup profile.
    You can use Edit to return to earlier steps and make changes.
  </p>
</div>

<div className="mt-6 space-y-4">
  <div className="rounded-xl border border-slate-200 p-5">
    <h4 className="font-semibold text-slate-900">Founder Account</h4>
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      <div>
        <p className="text-sm text-slate-500">Full Name</p>
        <p className="font-medium">{form.fullName || 'Not provided'}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500">Email</p>
        <p className="font-medium">{form.email || 'Not provided'}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500">Mobile</p>
        <p className="font-medium">{form.mobile || 'Not provided'}</p>
      </div>
    </div>
  </div>
  <div className="rounded-xl border border-slate-200 p-5">
  <h4 className="font-semibold text-slate-900">Startup Information</h4>

  <div className="mt-3 grid gap-3 sm:grid-cols-2">
    <div>
      <p className="text-sm text-slate-500">Startup Name</p>
      <p className="font-medium">{registration.startupName || 'Not provided'}</p>
    </div>

    <div>
      <p className="text-sm text-slate-500">Tagline</p>
      <p className="font-medium">{registration.tagline || 'Not provided'}</p>
    </div>

    <div>
      <p className="text-sm text-slate-500">Website</p>
      <p className="font-medium">{registration.website || 'Not provided'}</p>
    </div>

    <div>
      <p className="text-sm text-slate-500">Startup Email</p>
      <p className="font-medium">{registration.startupEmail || 'Not provided'}</p>
    </div>

    <div>
      <p className="text-sm text-slate-500">Startup Mobile</p>
      <p className="font-medium">{registration.startupMobile || 'Not provided'}</p>
    </div>
  </div>
</div>

<div className="rounded-xl border border-slate-200 p-5">
  <h4 className="font-semibold text-slate-900">Industry & Stage</h4>

  <div className="mt-3 grid gap-3 sm:grid-cols-2">
    <div>
      <p className="text-sm text-slate-500">Industry</p>
      <p className="font-medium">
        {registration.industry || 'Not provided'}
      </p>
    </div>

    <div>
      <p className="text-sm text-slate-500">Startup Stage</p>
      <p className="font-medium">
        {registration.startupStage || 'Not provided'}
      </p>
    </div>
  </div>
</div>


<div className="rounded-xl border border-slate-200 p-5">
  <h4 className="font-semibold text-slate-900">
    Company Information
  </h4>

  <div className="mt-3 grid gap-3 sm:grid-cols-2">
    <div>
      <p className="text-sm text-slate-500">Company Type</p>
      <p className="font-medium">
        {registration.companyType || 'Not provided'}
      </p>
    </div>

    <div>
      <p className="text-sm text-slate-500">
        Incorporation Status
      </p>
      <p className="font-medium">
        {registration.incorporationStatus || 'Not provided'}
      </p>
    </div>

    {String(registration.incorporationStatus || '').toLowerCase() === 'incorporated' && (
      <>
        <div>
          <p className="text-sm text-slate-500">Incorporation Date</p>
          <p className="font-medium">
            {registration.incorporationDate || 'Not provided'}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">CIN</p>
          <p className="font-medium">
            {registration.cin || 'Not provided'}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">GST Number</p>
          <p className="font-medium">
            {registration.gstNumber || 'Not provided'}
          </p>
        </div>

        <div>
          <p className="text-sm text-slate-500">DPIIT Number</p>
          <p className="font-medium">
            {registration.dpiitNumber || 'Not provided'}
          </p>
        </div>
      </>
    )}

    <div>
      <p className="text-sm text-slate-500">Startup India</p>
      <p className="font-medium">
        {registration.startupIndia || 'Not provided'}
      </p>
    </div>
  </div>
</div>




  <div className="rounded-xl border border-slate-200 p-5">
    <h4 className="font-semibold text-slate-900">Founder Profile</h4>
    <div className="mt-3 grid gap-3 sm:grid-cols-2">
      <div>
        <p className="text-sm text-slate-500">Designation</p>
        <p className="font-medium">{registration.designation || 'Not provided'}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500">Experience</p>
        <p className="font-medium">{registration.experience || 'Not provided'}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500">Qualification</p>
        <p className="font-medium">{registration.qualification || 'Not provided'}</p>
      </div>
      <div>
        <p className="text-sm text-slate-500">LinkedIn</p>
        <p className="font-medium">{registration.linkedIn || 'Not provided'}</p>
      </div>
      <div className="sm:col-span-2">
        <p className="text-sm text-slate-500">Skills</p>
        <p className="font-medium">
          {Array.isArray(registration.skills) && registration.skills.length
            ? registration.skills.join(', ')
            : 'Not provided'}
        </p>
      </div>
      <div className="sm:col-span-2">
        <p className="text-sm text-slate-500">Bio</p>
        <p className="font-medium">{registration.bio || 'Not provided'}</p>
      </div>
    </div>
  </div>
</div>


    
<div className="rounded-xl border border-slate-200 p-5">
  <h4 className="font-semibold text-slate-900">Location</h4>
  <div className="mt-3 grid gap-3 sm:grid-cols-2">
    <div>
      <p className="text-sm text-slate-500">Country</p>
      <p className="font-medium">{registration.country || 'Not provided'}</p>
    </div>
    <div>
      <p className="text-sm text-slate-500">State</p>
      <p className="font-medium">{registration.state || 'Not provided'}</p>
    </div>
    <div>
      <p className="text-sm text-slate-500">City</p>
      <p className="font-medium">{registration.city || 'Not provided'}</p>
    </div>
    <div>
      <p className="text-sm text-slate-500">PIN Code</p>
      <p className="font-medium">{registration.pinCode || 'Not provided'}</p>
    </div>
    <div className="sm:col-span-2">
      <p className="text-sm text-slate-500">Office Address</p>
      <p className="font-medium">{registration.address || 'Not provided'}</p>
    </div>
  </div>
</div>

<div className="rounded-xl border border-slate-200 p-5">
  <h4 className="font-semibold text-slate-900">Team Details</h4>
  <div className="mt-3 space-y-4">
    {registration.founders.map((founder, index) => (
      <div key={index} className="rounded-lg bg-slate-50 p-4">
        <p className="font-medium">Founder {index + 1}</p>
        <p className="mt-2 text-sm">Name: {founder.name || 'Not provided'}</p>
        <p className="text-sm">Role: {founder.role || 'Not provided'}</p>
        <p className="text-sm">Email: {founder.email || 'Not provided'}</p>
        <p className="text-sm">Mobile: {founder.mobile || 'Not provided'}</p>
        <p className="text-sm">Equity: {founder.equityPercentage ? `${founder.equityPercentage}%` : 'Not provided'}</p>
        <p className="text-sm">LinkedIn: {founder.linkedInProfile || 'Not provided'}</p>
        <p className="text-sm">Experience: {founder.experience || 'Not provided'}</p>
      </div>
    ))}
  </div>
</div>

<div className="rounded-xl border border-slate-200 p-5">
  <h4 className="font-semibold text-slate-900">Startup Snapshot</h4>
  <div className="mt-3 grid gap-3 sm:grid-cols-2">
    <div>
      <p className="text-sm text-slate-500">Problem</p>
      <p className="font-medium">{registration.problem || 'Not provided'}</p>
    </div>
    <div>
      <p className="text-sm text-slate-500">Target Customers</p>
      <p className="font-medium">{registration.customers || 'Not provided'}</p>
    </div>
    <div className="sm:col-span-2">
      <p className="text-sm text-slate-500">Unique Value</p>
      <p className="font-medium">{registration.uniqueValue || 'Not provided'}</p>
    </div>
    <div>
      <p className="text-sm text-slate-500">Revenue</p>
      <p className="font-medium">{registration.revenue || 'Not provided'}</p>
    </div>
    <div>
      <p className="text-sm text-slate-500">Team Size</p>
      <p className="font-medium">{registration.teamSize || 'Not provided'}</p>
    </div>
    <div>
      <p className="text-sm text-slate-500">Funding Stage</p>
      <p className="font-medium">{registration.fundingStage || 'Not provided'}</p>
    </div>
  </div>
</div>

<div className="rounded-xl border border-slate-200 p-5">
  <h4 className="font-semibold text-slate-900">Documents</h4>
  <div className="mt-3 space-y-3">
    {[
      ['Pitch Deck', 'pitchDeck'],
      ['Company Profile', 'companyProfile'],
      ['Business Plan', 'businessPlan'],
      ['Financial Model', 'financialModel'],
      ['Founder Resume', 'founderResume'],
      ['Product Brochure', 'productBrochure'],
      ['Demo Video', 'demoVideo'],
    ].map(([label, key]) => (
      <div key={key} className="flex items-center justify-between gap-3">
        <span className="text-sm text-slate-600">{label}</span>
        <span className="break-all text-sm font-medium">
          {registration.documents[key]?.name || 'Not selected'}
        </span>
      </div>
    ))}
  </div>
</div>

<div className="rounded-xl border border-slate-200 p-5">
  <div className="flex items-center justify-between gap-3">
    <h4 className="font-semibold text-slate-900">
      Uploaded Documents
    </h4>

    <button
      type="button"
      onClick={loadUploadedDocuments}
      className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white"
    >
      Refresh
    </button>
  </div>

  {documentsLoading && (
    <p className="mt-3 text-sm text-slate-500">
      Loading documents...
    </p>
  )}

  {!documentsLoading && uploadedDocuments.length === 0 && (
    <p className="mt-3 text-sm text-slate-500">
      No uploaded documents found. Click Refresh.
    </p>
  )}

  <div className="mt-3 space-y-3">
    {uploadedDocuments.map((doc) => (
      <div key={doc.id} className="rounded-lg bg-slate-50 p-3">
        <p className="break-words font-medium">
          {doc.originalFilename}
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Type: {doc.documentType}
        </p>
        <p className="text-sm text-slate-500">
          Uploaded: {new Date(doc.uploadedAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
</div>


    
<button
  type="button"
  onClick={saveStartupDetails}
  className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
>
  Complete Registration →
</button>

  </section>

) : (
  <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
      ✓
    </div>

    <h3 className="mt-5 text-2xl font-bold text-slate-900">
      Registration Completed!
    </h3>

    <p className="mx-auto mt-3 max-w-xl text-slate-600">
      Your startup registration details have reached the final step.
      You can now review your next actions and prepare for the evaluation
      process.
    </p>

    
<div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
  <div className="rounded-xl border border-slate-200 p-5">
    <h4 className="font-semibold">Registration Status</h4>
    <p className="mt-2 text-sm text-green-700">
      Final step reached
    </p>
    <p className="mt-2 text-sm text-slate-500">
      Your registration details have been submitted to the backend.
      You can review your saved information and proceed to evaluation.
    </p>
  </div>

  <div className="rounded-xl border border-slate-200 p-5">
    <h4 className="font-semibold">Profile Readiness Score</h4>

    <p className="mt-3 text-3xl font-bold text-blue-700">
      {readinessScore}/100
    </p>

    <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
      <div
        className="h-full rounded-full bg-blue-600 transition-all"
        style={{ width: `${readinessScore}%` }}
      />
    </div>

    <p className="mt-3 text-sm text-slate-600">
      {readinessScore === 100
        ? "All 14 profile fields are completed."
        : `${readinessFields.filter(
            (value) => value != null && String(value).trim() !== ""
          ).length} of 14 profile fields completed.`}
    </p>

    <p className="mt-2 text-xs text-slate-500">
      This score measures profile completeness only. It is not an AI assessment
      or a prediction of funding success.
    </p>
  </div>
</div>

<div className="mt-8 rounded-xl bg-blue-50 p-5 text-left">
  <h4 className="font-semibold text-blue-900">
    Recommended Next Actions
  </h4>
  <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-blue-900">
    <li>Review your founder and startup information.</li>
    <li>Prepare supporting documents for evaluation.</li>
    <li>Proceed to the Startup Evaluation module.</li>
  </ul>
</div>

<button
  type="button"
  onClick={() => setCurrentStep(0)}
  className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
>
    Back to Welcome
</button>

</section>
)}

<div className="mt-6 flex justify-between">
  <button
    onClick={previousStep}
    disabled={currentStep === 1}
    className="rounded-lg border border-slate-300 px-5 py-2 disabled:opacity-40"
  >
    ← Previous
  </button>
  <button
    onClick={nextStep}
    disabled={currentStep === 11}
    className="rounded-lg bg-blue-600 px-5 py-2 text-white disabled:opacity-40"
  >
    Continue →
  </button>
</div>

<button
  type="button"
  onClick={() => {
    localStorage.setItem(
      "startupRegistrationDraft",
      JSON.stringify(registration)
    );
    alert("Progress saved. You can return to continue registration.");
    setCurrentStep(0);
  }}
  className="mt-5 text-sm font-medium text-blue-700 hover:underline"
>
  Save &amp; Exit
</button>

</main>
)}
</div>
)
}

export default App